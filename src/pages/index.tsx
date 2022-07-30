import React, { useEffect } from "react";
import { Flex, Text, Image, useBoolean } from "@chakra-ui/react";
import { getI18nSSRProps, GetI18nServerSideProps } from "@/utils/i18n";
import px2vw from "@/utils/px2vw";
import BaseButton from "@/components/BaseButton";
import loginLogo from "@/assets/imgs/loginLogo.png";
import loginBg from "@/assets/imgs/loginBg.jpg";
import loginBgMobile from "@/assets/imgs/loginBgMobile.jpg";
// import loginGo from "@/assets/imgs/loginGo.png";
import { useRouter } from "next/router";
import LogIn from "@/components/LogIn";
import { deleteStore, setStore } from "@/utils/storage";
import globalStore from "@/stores/global";
import LoginOut from "@/components/LoginOut";
import { useWeb3React } from "@web3-react/core";
import { connectorLocalStorageKey } from "@/connect/connectors";

function App() {
  const router = useRouter();
  const { userInfo } = globalStore();
  const { deactivate } = useWeb3React();
  const [loginModal, setLoginModal] = useBoolean(false); // 登陆弹窗
  const [isLogin, setIsLogin] = useBoolean(userInfo?.id); // 是否登陆
  const [logOut, setLogOut] = useBoolean(false); // 登出弹窗
  const [loginLoading, setLoginLoading] = useBoolean(false);
  const disconnectWallet = async () => {
    try {
      await deactivate();
      deleteStore(connectorLocalStorageKey);
      setStore("isLogin", false);
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    if (userInfo && userInfo?.id) setIsLogin.on();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userInfo]);
  return (
    <Flex
      w="full"
      h="100vh"
      bgImage={{ base: loginBgMobile, lg: loginBg }}
      bgSize="100% 100%"
    >
      <Flex w={{ base: "full", lg: "1280px" }} flexDir="column" mx="auto">
        {/* header */}
        <Flex
          h={{ base: px2vw(66), lg: "113px" }}
          w="full"
          justifyContent="space-between"
        >
          <Image
            src={loginLogo}
            ml={{ base: px2vw(10), lg: 0 }}
            w="160px"
            h="36px"
            my="auto"
          />
          <Flex
            display={{ base: "none", lg: "flex" }}
            justifyContent="center"
            alignItems="center"
            onClick={() => router.push("/games")}
          >
            <Text
              cursor="pointer"
              fontWeight="400"
              textStyle="18"
              color="white.100"
            >
              Games
            </Text>
          </Flex>
          <Flex
            display={{ base: "none", lg: "flex" }}
            justifyContent="center"
            alignItems="center"
            onClick={() => router.push("/purchase")}
          >
            <Text
              cursor="pointer"
              fontWeight="400"
              textStyle="18"
              color="white.100"
            >
              NFT
            </Text>
          </Flex>
          <Flex
            display={{ base: "none", lg: "flex" }}
            justifyContent="center"
            alignItems="center"
            onClick={() => router.push("/tournaments")}
          >
            <Text
              cursor="pointer"
              fontWeight="400"
              textStyle="18"
              color="white.100"
            >
              Tournament
            </Text>
          </Flex>
          <Flex
            display={{ base: "none", lg: "flex" }}
            justifyContent="center"
            alignItems="center"
            onClick={() => router.push("/leaderBoards")}
          >
            <Text
              cursor="pointer"
              fontWeight="400"
              textStyle="18"
              color="white.100"
            >
              Leader Boards
            </Text>
          </Flex>
          {isLogin ? (
            <BaseButton
              w="133px"
              h="52px"
              bgColor="transparent"
              border="2px solid"
              borderColor="blue.100"
              boxShadow="none"
              fontFamily="Nunito"
              fontSize="16px"
              fontWeight="600"
              color="blue.100"
              my="auto"
              onClick={() => setLogOut.on()}
            >
              Log Out
            </BaseButton>
          ) : (
            <BaseButton
              isLoading={loginLoading}
              mr={{ base: px2vw(10), lg: 0 }}
              loadingText="Log In"
              w="133px"
              h="52px"
              bgColor="transparent"
              border="2px solid"
              borderColor="blue.100"
              boxShadow="none"
              fontFamily="Nunito"
              fontSize="16px"
              fontWeight="600"
              color="blue.100"
              my="auto"
              onClick={() => setLoginModal.on()}
            >
              Log In
            </BaseButton>
          )}
        </Flex>
        {/* content */}
        <Flex w="full" h="calc(100vh - 113px)" pos="relative">
          <BaseButton
            pos="absolute"
            right="115px"
            bottom="130px"
            onClick={() => setLoginModal.on()}
          >
            Get Rewards
          </BaseButton>
          {/* <Image
            display={{ base: "none", lg: "block" }}
            src={loginGo}
            zIndex={2}
            w="275px"
            h="77px"
            pos="absolute"
            right="115px"
            bottom="130px"
            cursor="pointer"
            onClick={() => router.push("/games")}
          />
          <Image
            display={{ base: "block", lg: "none" }}
            src={loginGo}
            zIndex={2}
            w={px2vw(192)}
            h={px2vw(60)}
            pos="absolute"
            left={px2vw(27)}
            bottom={px2vw(86)}
            cursor="pointer"
            onClick={() => router.push("/games")}
          /> */}
        </Flex>
      </Flex>
      {/* login modal */}
      <LogIn
        loginModal={loginModal}
        setLoginModal={(boo: boolean) =>
          boo ? setLoginModal.on() : setLoginModal.off()
        }
        setIsLogin={(boo: boolean) => {
          {
            if (boo) {
              setStore("isLogin", true);
              router.push("/games");
            } else {
              setStore("isLogin", false);
              // router.push("/games");
            }
          }
        }}
        setLoginLoading={(boo: boolean) =>
          boo ? setLoginLoading.on() : setLoginLoading.off()
        }
      />
      {/* log out */}
      <LoginOut
        logOut={logOut}
        setLogOut={(boo: boolean) => (boo ? setLogOut.on() : setLogOut.off())}
        confirmLogOut={() => {
          setIsLogin.off();
          disconnectWallet();
        }}
      />
    </Flex>
  );
}

export const getServerSideProps = async (ctx: GetI18nServerSideProps) => {
  return {
    props: { ...(await getI18nSSRProps(ctx, ["home"])) },
  };
};
export default App;
