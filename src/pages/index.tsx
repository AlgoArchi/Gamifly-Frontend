import React, { useEffect, useState } from "react";
import { Flex, Text, Image, useBoolean } from "@chakra-ui/react";
import { getI18nSSRProps, GetI18nServerSideProps } from "@/utils/i18n";
import px2vw from "@/utils/px2vw";
import BaseButton from "@/components/BaseButton";
import loginLogo from "@/assets/imgs/loginLogo.png";
import loginBg from "@/assets/imgs/loginBg.png";
import loginBgMobile from "@/assets/imgs/loginBgMobile.png";
import loginTitle from "@/assets/imgs/loginTitle.png";
import cricketBg from "@/assets/imgs/cricketBg.png";
import cricketBgMobile from "@/assets/imgs/cricketBgMobile.png";
// import loginGo from "@/assets/imgs/loginGo.png";
import { useRouter } from "next/router";
import LogIn from "@/components/LogIn";
import { deleteStore, setStore } from "@/utils/storage";
import globalStore from "@/stores/global";
import LoginOut from "@/components/LoginOut";
import { useWeb3React } from "@web3-react/core";
import { connectorLocalStorageKey } from "@/connect/connectors";
import footer1 from "@/assets/imgs/footer1.png";
import footer2 from "@/assets/imgs/footer2.png";
import footer3 from "@/assets/imgs/footer3.png";
import footer4 from "@/assets/imgs/footer4.png";
import BaseModal from "@/components/BaseModal";
import TermsOfUse from "@/components/TermsOfUse";
import PrivacyPolicy from "@/components/PrivacyPolicy";

function App() {
  const router = useRouter();
  const { userInfo } = globalStore();
  const { deactivate } = useWeb3React();
  const [loginModal, setLoginModal] = useBoolean(false); // 登陆弹窗
  const [isLogin, setIsLogin] = useBoolean(userInfo?.id); // 是否登陆
  const [logOut, setLogOut] = useBoolean(false); // 登出弹窗
  const [loginLoading, setLoginLoading] = useBoolean(false);
  const [inviteCode] = useState(router.query.inviteCode);
  const [showTermsOfService, setShowTermsOfService] = useBoolean(false);
  const [showPrivacyPolicy, setShowPrivacyPolicy] = useBoolean(false);
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

  useEffect(() => {
    if (inviteCode) {
      if (
        (userInfo && userInfo?.id && !userInfo?.referral_id) ||
        !userInfo?.id
      ) {
        setStore("inviteCode", inviteCode);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inviteCode]);

  return (
    <Flex
      w="full"
      minH="100vh"
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
        <Image
          mx="auto"
          src={loginTitle}
          w={{ base: px2vw(326), lg: "452px" }}
          h={{ base: px2vw(106), lg: "147px" }}
          mt={{ base: px2vw(10), lg: "40px" }}
          mb={{ base: px2vw(40), lg: "60px" }}
        />

        {/* content */}
        <Flex flexDir="column" alignItems="center" w="full" pos="relative">
          {/* Cricket Game */}
          <Flex
            w={{ base: px2vw(334), lg: "906px" }}
            h={{ base: "439px", lg: "313px" }}
            mb={{ base: px2vw(90), lg: "70px" }}
            px={{ base: px2vw(26), lg: "38px" }}
            pt={{ base: px2vw(33), lg: "47px" }}
            pb={{ base: px2vw(33), lg: "38px" }}
            bgImage={{ base: cricketBgMobile, lg: cricketBg }}
            flexDir="column"
            justifyContent={{ base: "flex-end", lg: "flex-start" }}
            bgSize="100%"
            bgRepeat="no-repeat"
            boxSizing="border-box"
            pos="relative"
            cursor="pointer"
            onClick={() => setLoginModal.on()}
          >
            <Text
              fontFamily="Eurostile"
              fontWeight="bold"
              fontSize={{ base: px2vw(30), lg: "30px" }}
              lineHeight={{ base: px2vw(30), lg: "30px" }}
              mb={{ base: px2vw(8), lg: "8px" }}
            >
              Cricket Game
            </Text>
            <Flex
              fontFamily="SofiaPro"
              fontWeight="700"
              justifyContent="center"
              alignItems="center"
              bgColor="blue.100"
              pos="absolute"
              left="0"
              top={px2vw(28)}
              w={px2vw(100)}
              h={px2vw(25)}
              fontSize={px2vw(12)}
              display={{ base: "flex", lg: "none" }}
            >
              Top Seller
            </Flex>
            <Flex
              display={{ base: "none", lg: "flex" }}
              fontFamily="SofiaPro"
              fontWeight="700"
              fontSize="14px"
              mb="15px"
              w="98px"
              h="25px"
              justifyContent="center"
              alignItems="center"
              pos="relative"
              color="blue.200"
              _after={{
                content: '""',
                pos: "absolute",
                top: "0",
                left: "0",
                w: "full",
                h: "full",
                bgColor: "gray.300",
                opacity: 0.23,
              }}
            >
              Top Seller
            </Flex>
            <Text
              w={{ base: "full", lg: "386px" }}
              fontSize={{ base: px2vw(18), lg: "18px" }}
              lineHeight={{ base: px2vw(22), lg: "22px" }}
              mb={{ base: px2vw(32), lg: "32px" }}
              fontFamily="SofiaPro"
              fontWeight="400"
            >
              We are hosting multiple fun games and constantly launching new
              games. They are all free-to-play
            </Text>
            <BaseButton
              w={{ base: px2vw(160), lg: "197px" }}
              h={{ base: px2vw(52), lg: "52px" }}
              fontFamily="SofiaPro"
              fontWeight="700"
            >
              Get Rewards
            </BaseButton>
          </Flex>
          {/* About us */}
          <Flex
            w={{ base: `calc(100% - ${px2vw(60)})`, lg: "auto" }}
            flexDir="column"
          >
            <Text
              fontFamily="Eurostile"
              fontWeight="400"
              textAlign={{ base: "left", lg: "center" }}
              fontSize={{ base: px2vw(40), lg: "40px" }}
              lineHeight={{ base: px2vw(40), lg: "40px" }}
              mb={{ base: px2vw(38), lg: "23px" }}
            >
              About us
            </Text>
            <Flex flexDir="column" display={{ base: "flex", lg: "none" }}>
              <Flex flexDir="column" mb={px2vw(40)}>
                <Text
                  fontSize={px2vw(27)}
                  lineHeight={px2vw(27)}
                  mb={px2vw(5)}
                  color="green.100"
                  fontFamily="Eurostile"
                  fontWeight="400"
                >
                  Free Games
                </Text>
                <Text
                  fontSize={px2vw(18)}
                  lineHeight={px2vw(22)}
                  fontFamily="SofiaPro"
                  fontWeight="400"
                >
                  We are hosting multiple fun games andconstantly launching new
                  games. They are all free-to-play
                </Text>
              </Flex>
              <Flex flexDir="column" mb={px2vw(40)}>
                <Text
                  fontSize={px2vw(27)}
                  lineHeight={px2vw(27)}
                  mb={px2vw(5)}
                  color="green.100"
                  fontFamily="Eurostile"
                  fontWeight="400"
                >
                  Rewards
                </Text>
                <Text
                  fontSize={px2vw(18)}
                  lineHeight={px2vw(22)}
                  fontFamily="SofiaPro"
                  fontWeight="400"
                >
                  You will earn rewards when playing the games without any
                  investment.
                </Text>
              </Flex>
              <Flex flexDir="column">
                <Text
                  fontSize={px2vw(27)}
                  lineHeight={px2vw(27)}
                  mb={px2vw(5)}
                  color="green.100"
                  fontFamily="Eurostile"
                  fontWeight="400"
                >
                  Stable Coins
                </Text>
                <Text
                  fontSize={px2vw(18)}
                  lineHeight={px2vw(22)}
                  fontFamily="SofiaPro"
                  fontWeight="400"
                >
                  Rewarding in USD Coin(USDC), you can enjoy the game without
                  thinking about the market volatility.
                </Text>
              </Flex>
            </Flex>
            <Flex
              display={{ base: "none", lg: "flex" }}
              w="906px"
              h="313px"
              mb="70px"
              borderRadius="30px"
              px="40px"
              pt="80px"
              border="1px solid"
              borderColor="blue.100"
              pos="relative"
              overflow="hidden"
              boxSizing="border-box"
              justifyContent="space-around"
              alignItems="flex-start"
              _after={{
                content: '""',
                pos: "absolute",
                top: 0,
                left: 0,
                w: "full",
                h: "full",
                bgColor: "black.100",
                opacity: 0.6,
              }}
            >
              <Flex w="250px" flexDir="column" zIndex={1}>
                <Text
                  fontSize="34px"
                  lineHeight="34px"
                  color="green.100"
                  mb="15px"
                  textAlign="center"
                  fontFamily="Eurostile"
                  fontWeight="400"
                >
                  Free Games
                </Text>
                <Text
                  fontSize="18px"
                  lineHeight="22px"
                  textAlign="center"
                  fontFamily="SofiaPro"
                  fontWeight="400"
                >
                  We are hosting multiple fun games andconstantly launching new
                  games. They are all free-to-play
                </Text>
              </Flex>
              <Flex w="250px" flexDir="column" zIndex={1}>
                <Text
                  fontSize="34px"
                  lineHeight="34px"
                  color="green.100"
                  mb="15px"
                  textAlign="center"
                  fontFamily="Eurostile"
                  fontWeight="400"
                >
                  Rewards
                </Text>
                <Text
                  fontSize="18px"
                  lineHeight="22px"
                  textAlign="center"
                  fontFamily="SofiaPro"
                  fontWeight="400"
                >
                  You will earn rewards when playing the games without any
                  investment.
                </Text>
              </Flex>
              <Flex w="250px" flexDir="column" zIndex={1}>
                <Text
                  fontSize="34px"
                  lineHeight="34px"
                  color="green.100"
                  mb="15px"
                  textAlign="center"
                  fontFamily="Eurostile"
                  fontWeight="400"
                >
                  Stable Coins
                </Text>
                <Text
                  fontSize="18px"
                  lineHeight="22px"
                  textAlign="center"
                  fontFamily="SofiaPro"
                  fontWeight="400"
                >
                  Rewarding in USD Coin(USDC), you can enjoy the game without
                  thinking about the market volatility.
                </Text>
              </Flex>
            </Flex>
          </Flex>
          <BaseButton
            w={{ base: px2vw(332), lg: "247px" }}
            h={{ base: px2vw(52), lg: "52px" }}
            mt={{ base: px2vw(54), lg: "40px" }}
            mx="auto"
            onClick={() => setLoginModal.on()}
          >
            Get Rewards
          </BaseButton>
          {/* twitters */}
          <Flex
            w={{ base: "full", lg: "360px" }}
            h={{ base: px2vw(300), lg: "300px" }}
            flexDir="column"
            alignItems="center"
            justifyContent="center"
            // display={{ base: "none", lg: "flex" }}
            mx="auto"
            mt="50px"
          >
            <Text
              textStyle="18"
              color="white.100"
              textAlign="center"
              fontWeight="700"
              mb={{ base: px2vw(20), lg: "20px" }}
            >
              Join Our Community
            </Text>
            <Flex mb={{ base: px2vw(28), lg: "28px" }}>
              {/* Discord */}
              <Flex
                w={{ base: px2vw(46), lg: "46px" }}
                h={{ base: px2vw(46), lg: "46px" }}
                mr={{ base: px2vw(15), lg: "15px" }}
                borderRadius={{ base: px2vw(12), lg: "12px" }}
                bgColor="black.100"
                justifyContent="center"
                alignItems="center"
                boxShadow="0px 2px 26px #3d50ff"
                cursor="pointer"
                onClick={() => window.open(" https://discord.gg/FMGNrjk75k")}
              >
                <Image src={footer1} />
              </Flex>
              {/* Instagram */}
              <Flex
                w={{ base: px2vw(46), lg: "46px" }}
                h={{ base: px2vw(46), lg: "46px" }}
                mr={{ base: px2vw(15), lg: "15px" }}
                borderRadius={{ base: px2vw(12), lg: "12px" }}
                bgColor="black.100"
                justifyContent="center"
                alignItems="center"
                boxShadow="0px 2px 26px #3d50ff"
                cursor="pointer"
                onClick={() =>
                  window.open(
                    "https://instagram.com/gamifly?igshid=YmMyMTA2M2Y="
                  )
                }
              >
                <Image src={footer2} />
              </Flex>
              {/* Telegram */}
              <Flex
                w={{ base: px2vw(46), lg: "46px" }}
                h={{ base: px2vw(46), lg: "46px" }}
                mr={{ base: px2vw(15), lg: "15px" }}
                borderRadius={{ base: px2vw(12), lg: "12px" }}
                bgColor="black.100"
                justifyContent="center"
                alignItems="center"
                boxShadow="0px 2px 26px #3d50ff"
                cursor="pointer"
                onClick={() => window.open("http://t.me/gamifly")}
              >
                <Image src={footer3} />
              </Flex>
              {/* twitter */}
              <Flex
                w={{ base: px2vw(46), lg: "46px" }}
                h={{ base: px2vw(46), lg: "46px" }}
                borderRadius={{ base: px2vw(12), lg: "12px" }}
                bgColor="black.100"
                justifyContent="center"
                alignItems="center"
                boxShadow="0px 2px 26px #3d50ff"
                cursor="pointer"
                onClick={() => window.open("https://twitter.com/Gamiflyco")}
              >
                <Image src={footer4} />
              </Flex>
            </Flex>
            <Flex
              fontSize={{ base: px2vw(15), lg: "15px" }}
              lineHeight={{ base: px2vw(15), lg: "15px" }}
              fontWeight="700"
              color="white.100"
              opacity="0.6"
            >
              <Text
                textDecor="underline"
                cursor="pointer"
                onClick={() => setShowTermsOfService.on()}
              >
                Term of service
              </Text>
              <Text mx="10px">and</Text>
              <Text
                textDecor="underline"
                cursor="pointer"
                onClick={() => setShowPrivacyPolicy.on()}
              >
                Privacy policy
              </Text>
            </Flex>
          </Flex>
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
    </Flex>
  );
}

export const getServerSideProps = async (ctx: GetI18nServerSideProps) => {
  return {
    props: { ...(await getI18nSSRProps(ctx, ["home"])) },
  };
};
export default App;
