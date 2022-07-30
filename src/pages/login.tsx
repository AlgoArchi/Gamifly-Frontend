import React, { useEffect } from "react";
import { Box, Flex, Text, Image, useBoolean, useToast } from "@chakra-ui/react";
import { getI18nSSRProps, GetI18nServerSideProps } from "@/utils/i18n";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { useRouter } from "next/router";
import px2vw from "@/utils/px2vw";
import Registration from "@/assets/imgs/Registration.webp";
import Registrationmob from "@/assets/imgs/Registrationmob.png";
import googleid from "@/assets/imgs/googleid.webp";
import facebook from "@/assets/imgs/facebook.png";
import metamask from "@/assets/imgs/metamask.webp";
import BaseModal from "@/components/BaseModal";
import { useWeb3React } from "@web3-react/core";
import { connectorLocalStorageKey, injected } from "@/connect/connectors";
import { switchNetwork } from "@/connect/wallet";
import { setStore } from "@/utils/storage";
import { walletLogin } from "@/apis/login";
import useSWR from "swr";
import TermsOfUse from "@/components/TermsOfUse";
import PrivacyPolicy from "@/components/PrivacyPolicy";
import globalStore from "@/stores/global";

// 输入框组件
export const LoginItem = React.memo(
  ({
    img,
    text,
    click,
  }: {
    img: string;
    text: string;
    click: () => void;
    id?: string;
  }) => (
    <Flex
      w={{ base: "full", lg: "384px" }}
      h={{ base: px2vw(68), lg: "68px" }}
      lineHeight={{ base: px2vw(48), lg: "48px" }}
      mx={{ base: px2vw(0), lg: "8px" }}
      my={{ base: px2vw(4), lg: "4px" }}
      p={{ base: px2vw(8), lg: "8px" }}
      border="2px solid"
      fontFamily="Nunito"
      fontWeight="700"
      fontSize={{ base: px2vw(18), lg: "18px" }}
      color="blue.100"
      opacity="0.8"
      textDecoration="none"
      _hover={{
        boxShadow: "0px 2px 50px #3d50ff",
      }}
      cursor="pointer"
      onClick={() => click()}
    >
      <Image src={img} />
      <Text>{text}</Text>
    </Flex>
  )
);

function App() {
  const toast = useToast();
  const { globalAccount } = globalStore();
  const { activate, chainId, account } = useWeb3React();
  const router = useRouter();
  const [showTermsOfService, setShowTermsOfService] = useBoolean(false);
  const [showPrivacyPolicy, setShowPrivacyPolicy] = useBoolean(false);
  const [isLogin, setIsLogin] = useBoolean(false);

  const { data: walletLoginData } = useSWR(
    isLogin ? [walletLogin.key] : null,
    (_) =>
      walletLogin.fetcher({
        wallet_address: account || globalAccount,
      }),
    { revalidateOnFocus: false }
  );

  const metamaskClick = async () => {
    // 是否为正确网络
    if (chainId !== 137) {
      const res = await switchNetwork(137);
      if (!res) {
        toast({
          title: `add network fail`,
          status: "error",
          isClosable: true,
        });
        return;
      } else if (res === "no metamask") {
        toast({
          title: `Please install the metamask plugin`,
          status: "error",
          isClosable: true,
        });
      }
    }
    // eslint-disable-next-line no-async-promise-executor
    new Promise<void>(async (resolve) => {
      try {
        await activate(injected, undefined, true);
        resolve();
      } catch (error) {
        console.log(error);
      }
    })
      .then(() => {
        setStore(connectorLocalStorageKey, "true");
        setStore("isLogin", true);
        setIsLogin.on();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const walletConnectClick = async () => {
    //  Create WalletConnect Provider
    const provider = new WalletConnectProvider({
      bridge: "https://bridge.walletconnect.org",
      rpc: { 137: "https://rpc-mainnet.maticvigil.com" },
      infuraId: "b993e781ff0e4ef39d3bed71a59fe142",
    });
    window.walletConnectProvider = provider;
    provider.on("accountsChanged", (accounts: string[]) => {
      globalStore.setState({
        globalAccount: accounts[0],
      });
      setStore(connectorLocalStorageKey, "true");
      setStore("isLogin", true);
      setIsLogin.on();
    });
    provider.on("chainChanged", (chainId: number) => {
      if (chainId !== 137) {
        toast({
          title: `Please switch your wallet to the polygon chain`,
          status: "error",
          isClosable: true,
        });
      }
    });
    //  Enable session (triggers QR Code modal)
    await provider.enable();
  };

  useEffect(() => {
    if (walletLoginData) {
      router.push(`/games?accessToken=${walletLoginData.access_token}`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [walletLoginData]);

  return (
    <Box
      w="full"
      h={{ base: "inherit", lg: "100vh" }}
      bgColor="black.1000"
      bgImage={{ base: Registrationmob, lg: Registration }}
      bgSize={{ base: `${px2vw(217)} ${px2vw(300)}`, lg: "100% 100%" }}
      bgRepeat="no-repeat"
      bgPos="center top"
      pl={{ base: px2vw(15), lg: "80px" }}
      pr={{ base: px2vw(12), lg: "0" }}
      pt={{ base: px2vw(300), lg: "0" }}
      pb={{ base: px2vw(35), lg: "0" }}
    >
      <Flex
        flexDirection="column"
        w={{ base: "full", lg: "384px" }}
        m={{ base: 0, lg: "12px" }}
        mt={{ base: px2vw(0), lg: "386px" }}
      >
        <Text
          fontSize={{ base: px2vw(56), lg: "60px" }}
          mb={{ base: px2vw(4), lg: "4px" }}
          lineHeight="1"
          fontWeight="700"
          color="white.100"
        >
          Continue
        </Text>
        {/* 登陆按钮组 */}
        <Flex
          w={{ base: "full", lg: "fit-content" }}
          flexDirection="column"
          mb={{ base: px2vw(24), lg: "24px" }}
        >
          <LoginItem
            img={googleid}
            text="Google ID"
            click={() =>
              (window.location.href = "https://app.gamifly.co:3001/auth/google")
            }
          />
          <LoginItem
            img={facebook}
            text="Facebook"
            click={() =>
              (window.location.href =
                "https://app.gamifly.co:3001/auth/facebook")
            }
          />
          <LoginItem
            img={metamask}
            text="Metamask"
            click={() => {
              metamaskClick();
            }}
          />
          <LoginItem
            img={metamask}
            text="WalletConnect"
            click={() => {
              walletConnectClick();
            }}
          />
        </Flex>
        {/* 游客登陆 */}
        <Flex
          flexDir="column"
          mb={{ base: px2vw(56), lg: "56px" }}
          onClick={() => router.push("/games")}
        >
          <Text
            textAlign="center"
            textStyle="14"
            fontFamily="Nunito"
            color="white.100"
            opacity={0.65}
            lineHeight={{ base: px2vw(20), lg: "20px" }}
            mb={{ base: px2vw(7), lg: "7px" }}
          >
            Or
          </Text>
          <Text
            textAlign="center"
            textStyle="18"
            fontFamily="Nunito"
            cursor="pointer"
            opacity={0.8}
            lineHeight={{ base: px2vw(20), lg: "20px" }}
          >
            Play as Guest
          </Text>
        </Flex>
        {/* 协议 */}
        <Flex
          mx="auto"
          flexWrap="wrap"
          color="blue.100"
          fontFamily="Nunito"
          textStyle="14"
          fontWeight="400"
          alignItems="center"
          textAlign="center"
          lineHeight={{ base: px2vw(20), lg: "20px" }}
        >
          By continuing you agree to the
          <Text
            display="inline-flex"
            fontWeight="700"
            textDecor="underline"
            cursor="pointer"
            mx="5px"
            onClick={() => setShowTermsOfService.on()}
          >
            Terms
          </Text>
        </Flex>
        <Flex
          mx="auto"
          flexWrap="wrap"
          color="blue.100"
          fontFamily="Nunito"
          textStyle="14"
          fontWeight="400"
          alignItems="center"
          textAlign="center"
          lineHeight={{ base: px2vw(20), lg: "20px" }}
        >
          <Text
            display="inline-flex"
            fontWeight="700"
            textDecor="underline"
            cursor="pointer"
            mx="5px"
            onClick={() => setShowTermsOfService.on()}
          >
            of Service
          </Text>
          and
          <Text
            display="inline-flex"
            fontWeight="700"
            textDecor="underline"
            cursor="pointer"
            textAlign="center"
            ml="5px"
            onClick={() => setShowPrivacyPolicy.on()}
          >
            Privacy Policy
          </Text>
        </Flex>
      </Flex>
      {/* Terms of Service */}
      <BaseModal
        isShow={showTermsOfService}
        close={() => setShowTermsOfService.off()}
      >
        <TermsOfUse />
      </BaseModal>
      {/* Privacy Policy */}
      <BaseModal
        isShow={showPrivacyPolicy}
        close={() => setShowPrivacyPolicy.off()}
      >
        <PrivacyPolicy />
      </BaseModal>
    </Box>
  );
}

export const getServerSideProps = async (ctx: GetI18nServerSideProps) => {
  return {
    props: { ...(await getI18nSSRProps(ctx, ["home"])) },
  };
};
export default App;
