import React, { useEffect } from "react";
import { Flex, Image, useBoolean } from "@chakra-ui/react";
import px2vw from "@/utils/px2vw";
import advertisementBg from "@/assets/imgs/advertisementBg.png";
import advertisementBgMobile from "@/assets/imgs/advertisementBgMobile.png";
import advertisementLogo from "@/assets/imgs/advertisementLogo.png";
import BaseButton from "@/components/BaseButton";
import { useRouter } from "next/router";
import globalStore from "@/stores/global";
import LogIn from "@/components/LogIn";
import { setStore } from "@/utils/storage";

function Index() {
  const router = useRouter();
  const { userInfo } = globalStore();
  const [isLogin, setIsLogin] = useBoolean(userInfo?.id); // 是否登陆
  const [loginModal, setLoginModal] = useBoolean(false); // 登陆弹窗
  const [loginLoading, setLoginLoading] = useBoolean(false);
  useEffect(() => {
    if (userInfo && userInfo?.id) setIsLogin.on();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userInfo]);
  return (
    <Flex
      direction="column"
      w="full"
      h="100vh"
      pos="relative"
      bgImage={{ base: advertisementBgMobile, lg: advertisementBg }}
      bgSize={{ base: "100% auto", lg: "100% 100%" }}
      bgRepeat="no-repeat"
      bgPos="top center"
    >
      <Image
        pos="absolute"
        m="auto"
        cursor="pointer"
        src={advertisementLogo}
        w={{ base: px2vw(250.82), lg: "21.5vw" }}
        h={{ base: px2vw(84), lg: "12.2vh" }}
        top={{ base: px2vw(85), lg: "42%" }}
        left={{ base: "16%", lg: "22%" }}
        onClick={() => router.push("/")}
      />
      <BaseButton
        pos="absolute"
        m="auto"
        cursor="pointer"
        loadingText="Get Rewards"
        isLoading={loginLoading}
        w={{ base: `calc(100% - ${px2vw(80)})`, lg: "18vw" }}
        h={{ base: px2vw(52), lg: "52px" }}
        bottom={{ base: px2vw(50), lg: "19%" }}
        right={{ base: px2vw(40), lg: "22.3%" }}
        boxShadow="none"
        onClick={() => {
          if (isLogin) {
            router.push("/games");
          } else {
            setLoginModal.on();
          }
        }}
      >
        Get Rewards
      </BaseButton>
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
    </Flex>
  );
}

export default Index;
