import React, { useEffect, useState } from "react";
import { Text, Image, Flex, useToast, useBoolean } from "@chakra-ui/react";
import WalletConnectProvider from "@walletconnect/web3-provider";
import px2vw from "@/utils/px2vw";
import faceBookSvg from "@/assets/imgs/faceBookLogin.png";
import googleSvg from "@/assets/imgs/googleLogin.png";
import metaMaskSvg from "@/assets/imgs/metaMaskLogin.png";
import walletIcon from "@/assets/imgs/walletIcon.png";
import BaseModal from "../BaseModal";
import { useWeb3React } from "@web3-react/core";
import { switchNetwork } from "@/connect/wallet";
import { ethers } from "ethers";
import { connectorLocalStorageKey, injected } from "@/connect/connectors";
import { deleteStore, getStore, setStore } from "@/utils/storage";
import { walletLogin, login } from "@/apis/login";
import { setReferral } from "@/apis/userInfo";
import useSWR from "swr";
import globalStore from "@/stores/global";
import { useRouter } from "next/router";

export interface IProps {
  loginModal: boolean;
  setLoginModal: (boo: boolean) => void;
  setIsLogin?: (boo: boolean) => void;
  setLoginLoading?: (boo: boolean) => void;
}

function Index({
  loginModal,
  setLoginModal,
  setIsLogin,
  setLoginLoading,
}: IProps) {
  const message = "This is just for verifying wallet owner";
  const router = useRouter();
  const toast = useToast();
  const { userInfo, globalAccount } = globalStore();
  const [friendCode, setFriendCode] = useState(null);
  const [accessToken, setAccessToken] = useState("");
  const { activate, chainId, account, deactivate } = useWeb3React();
  const [signature, setSignature] = useState("");
  const [isMetaMask, setIsMetaMask] = useBoolean(false);
  const [random, setRandom] = useState(0);
  const { data: walletLoginData } = useSWR(
    isMetaMask && signature && random ? [walletLogin.key, random] : null,
    (_) =>
      walletLogin.fetcher({
        wallet_address: account || globalAccount,
        signature: signature,
        signed_message: message,
      }),
    { revalidateOnFocus: false }
  );
  const { data: setReferralData } = useSWR(
    userInfo && userInfo?.id && friendCode
      ? [setReferral.key, friendCode]
      : null,
    (_) =>
      setReferral.fetcher({
        user_id: userInfo?.id,
        code: friendCode,
      }),
    { revalidateOnFocus: false }
  );

  const { data: loginData } = useSWR(
    accessToken ? [login.key, accessToken] : null,
    (_) =>
      login.fetcher({
        accessToken: accessToken,
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
        handleSign();
        setIsMetaMask.on();
        setRandom(Math.random());
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const walletConnectClick = async () => {
    try {
      let chainIds = 0;
      //  Create WalletConnect Provider
      const provider = new WalletConnectProvider({
        bridge: "https://bridge.walletconnect.org",
        rpc: {
          1: "https://mainnet.infura.io/v3/175a6f6149e04964a38455979e4825fe",
          56: "https://bsc-dataseed1.binance.org",
          66: "https://exchainrpc.okex.org",
          128: "https://http-mainnet-node.huobichain.com",
          137: "https://rpc-mainnet.maticvigil.com",
          42161: "https://arb1.arbitrum.io/rpc",
        },
        infuraId: "b3cd627a61e1439cb43f6dbb6c4400b1",
      });
      window.walletConnectProvider = provider;
      provider.on("accountsChanged", (accounts: string[]) => {
        setTimeout(() => {
          if (chainIds === 137) {
            setLoginLoading?.(true);
            globalStore.setState({
              globalAccount: accounts[0],
            });
            setStore(connectorLocalStorageKey, "true");
            setIsMetaMask.on();
            setRandom(Math.random());
            handleSign();
          }
        }, 1000);
      });
      provider.on("chainChanged", (chainId: number) => {
        chainIds = chainId;
        if (chainId !== 137) {
          logOut();
        }
      });
      provider.on("disconnect", () => {
        setIsLogin?.(false);
      });
      //  Enable session (triggers QR Code modal)
      await provider.enable();
    } catch (err) {
      console.log(err, "err");
    }
  };

  const handleSign = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = await provider.getSigner();
    const signature = await signer.signMessage(message);
    setSignature(signature);
  };

  useEffect(() => {
    if (walletLoginData) {
      setAccessToken(walletLoginData.access_token);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [walletLoginData]);

  useEffect(() => {
    if (loginData) {
      setStore("userInfo", loginData);
      globalStore.setState({
        userInfo: loginData,
      });
      setIsMetaMask.off();
      setAccessToken("");
      console.log("login success!");
      setFriendCode(getStore("friendCode"));
      setIsLogin?.(true);
      setLoginLoading?.(false);
      router.push(router.pathname);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loginData]);

  useEffect(() => {
    if (setReferralData === undefined) return;
    if (setReferralData && setReferralData?.result === "success") {
      toast({
        title: "success",
        description: "Inviter binding success",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } else {
      toast({
        title: "Inviter binding fail",
        description: setReferralData?.reason,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setReferralData]);

  const logOut = async () => {
    toast({
      title: `Please switch your wallet to the polygon chain`,
      status: "error",
      isClosable: true,
    });
    setIsLogin?.(false);
    disconnectWallet();
  };

  const disconnectWallet = async () => {
    try {
      await deactivate();
      await window.walletConnectProvider?.disconnect();
      deleteStore(connectorLocalStorageKey);
      deleteStore("referralCode");
      deleteStore("friendCode");
      setLoginLoading?.(false);
      setStore("isLogin", false);
      setIsLogin?.(false);
      setTimeout(() => {
        globalStore.setState({
          userInfo: null,
        });
        window.walletConnectProvider = null;
        deleteStore("userInfo");
      }, 1000);
    } catch (err) {
      console.error(err);
    }
  };

  // 登陆弹窗
  const LoginItem = React.memo(
    ({
      icon,
      name,
      withOutMb,
      click,
    }: {
      icon: string;
      name: string;
      withOutMb?: boolean;
      click: () => void;
    }) => (
      <Flex
        w={{ base: px2vw(300), lg: "340px" }}
        h={{ base: px2vw(50), lg: "50px" }}
        mb={withOutMb ? "0" : { base: px2vw(28), lg: "10px" }}
        justifyContent="center"
        alignItems="center"
        bgColor="transparent"
        border="1px solid"
        borderColor="green.1000"
        cursor="pointer"
        onClick={() => {
          click();
          setLoginModal(false);
          name !== "WalletConnect" && setLoginLoading?.(true);
        }}
      >
        <Image
          src={icon}
          my="auto"
          w={{ base: px2vw(22), lg: "22px" }}
          h={{ base: px2vw(22), lg: "22px" }}
          mr={{ base: px2vw(8), lg: "8px" }}
        />
        <Text
          fontFamily="Nunito"
          fontWeight="600"
          textAlign="left"
          color="white.100"
          fontSize={{ base: px2vw(16), lg: "16px" }}
          lineHeight={{ base: px2vw(70), lg: "70px" }}
        >
          Sign in with {name}
        </Text>
      </Flex>
    )
  );
  return (
    <BaseModal
      borderRadius="10px"
      pt={{ base: px2vw(155), lg: "140px" }}
      pl={{ base: px2vw(44), lg: "100px" }}
      boxSizing="border-box"
      isShow={loginModal}
      close={() => setLoginModal(false)}
    >
      <Text
        fontFamily="Eurostile"
        fontWeight="700"
        color="white.100"
        fontSize={{ base: px2vw(35), lg: "35px" }}
        lineHeight={{ base: px2vw(35), lg: "35px" }}
        mb={{ base: px2vw(28), lg: "15px" }}
      >
        CONNECT WITH
      </Text>
      <LoginItem
        icon={googleSvg}
        name="Google ID"
        click={() =>
          (window.location.href = "https://app.gamifly.co:3001/auth/google")
        }
      />
      <LoginItem
        icon={faceBookSvg}
        name="Facebook"
        click={() =>
          (window.location.href = "https://app.gamifly.co:3001/auth/facebook")
        }
      />
      <LoginItem
        icon={metaMaskSvg}
        name="Meta Mask"
        click={() => metamaskClick()}
      />
      <LoginItem
        withOutMb
        icon={walletIcon}
        name="WalletConnect"
        click={() => walletConnectClick()}
      />
    </BaseModal>
  );
}

export default React.memo(Index);
