import React, { useEffect, useState } from "react";
import { Flex, Text, Image, useBoolean, useToast } from "@chakra-ui/react";
import { getI18nSSRProps, GetI18nServerSideProps } from "@/utils/i18n";
import px2vw from "@/utils/px2vw";
import { useRouter } from "next/router";
import LogIn from "@/components/LogIn";
import { deleteStore, getStore, setStore } from "@/utils/storage";
import globalStore from "@/stores/global";
import LoginOut from "@/components/LoginOut";
import { useWeb3React } from "@web3-react/core";
import { connectorLocalStorageKey } from "@/connect/connectors";
import logo from "@/assets/imgs/logo.png";
import homeTop from "@/assets/imgs/homeTop.png";
import homeTopMobile from "@/assets/imgs/homeTopMobile.png";
import buttonBg2 from "@/assets/imgs/buttonBg2.png";
import featuresIcon from "@/assets/imgs/featuresIcon.png";
import freeGamesIcon from "@/assets/imgs/freeGamesIcon.png";
import rewardsIcon from "@/assets/imgs/rewardsIcon.png";
import rewardsIconMobile from "@/assets/imgs/rewardsIconMobile.png";
import stableCoinsIcon from "@/assets/imgs/stableCoinsIcon.png";
import ship1 from "@/assets/imgs/ship1.png";
import ship2 from "@/assets/imgs/ship2.png";
import ship3 from "@/assets/imgs/ship3.png";
import ship4 from "@/assets/imgs/ship4.png";
import ship5 from "@/assets/imgs/ship5.png";
import ship6 from "@/assets/imgs/ship6.png";
import ship7 from "@/assets/imgs/ship7.png";
import footer1 from "@/assets/imgs/footer1.png";
import BaseModal from "@/components/BaseModal";
import BaseButtonNew from "@/components/BaseButtonNew";
import TopGame from "@/components/TopGame";
import TopSeller from "@/components/TopSeller";
import RewardsRule from "@/components/Layout/RewardsRule";
import copyFunction from "copy-to-clipboard";
import useSWR from "swr";
import { getTopEarning, getVisitors } from "@/apis/login";

function App() {
  const router = useRouter();
  const toast = useToast();
  const { userInfo } = globalStore();
  const [isLogin, setIsLogin] = useBoolean(userInfo?.id); // 是否登陆
  const { deactivate } = useWeb3React();
  const [loginModal, setLoginModal] = useBoolean(false); // 登陆弹窗
  const [logOut, setLogOut] = useBoolean(false); // 登出弹窗
  const [inviteCode] = useState(router.query.inviteCode);
  const [tourStep, setTourStep] = useState(0); // tour步骤
  const [topEarning, setTopEarning] = useState(0);
  const [visitor, setVisitor] = useState(0);
  const { data: getTopEarningData } = useSWR(
    [getTopEarning.key],
    () => getTopEarning.fetcher(),
    {
      revalidateOnFocus: false,
    }
  );
  const { data: getVisitorsData } = useSWR(
    [getVisitors.key],
    () => getVisitors.fetcher(),
    {
      revalidateOnFocus: false,
    }
  );
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

  useEffect(() => {
    if (getTopEarningData && getTopEarningData?.result) {
      setTopEarning(getTopEarningData?.top_earning);
    }
  }, [getTopEarningData]);

  useEffect(() => {
    if (getVisitorsData && getVisitorsData?.result) {
      setVisitor(getVisitorsData?.visitor);
    }
  }, [getVisitorsData]);

  return (
    <Flex w="full" minH="100vh">
      <Flex w="full" flexDir="column" mx="auto">
        {/* 第一页 */}
        <Flex
          w="full"
          h={{ base: `calc(100vh - ${px2vw(63)})`, lg: "100vh" }}
          pl={{ base: 0, lg: "204px" }}
          bgImage={{ base: homeTopMobile, lg: homeTop }}
          alignItems={{ base: "center", lg: "flex-start" }}
          bgSize="100% 100%"
          bgRepeat="no-repeat"
          flexDir="column"
          justifyContent="center"
          pb="60px"
          boxSizing="border-box"
        >
          <Flex
            flexDir="column"
            fontFamily="Eurostile"
            fontWeight="bolder"
            alignItems={{ base: "center", lg: "flex-start" }}
            fontSize={{ base: px2vw(40), lg: "60px" }}
            lineHeight={{ base: px2vw(50), lg: "60px" }}
          >
            <Text>WORLD’S #1</Text>
            <Text>WEB3 GATEWAY</Text>
          </Flex>
          <Flex>
            <BaseButtonNew mr={{ base: px2vw(15), lg: "27px" }}>
              <Text
                fontFamily="Eurostile"
                mt={{ base: px2vw(5), lg: "8px" }}
                onClick={() => router.push("/games")}
              >
                PLAY NOW
              </Text>
            </BaseButtonNew>
            <BaseButtonNew bgImage={buttonBg2}>
              <Text
                color="white.100"
                fontFamily="Eurostile"
                mt={{ base: px2vw(5), lg: "8px" }}
                onClick={() => setTourStep(1)}
              >
                TAKE A TOUR
              </Text>
            </BaseButtonNew>
          </Flex>
          {!isLogin && (
            <Flex
              display={{ base: "flex", lg: "none" }}
              mt={px2vw(30)}
              h={px2vw(50)}
              w={`calc(100% - ${px2vw(32)})`}
              mx="auto"
              fontSize={px2vw(17)}
              justifyContent="center"
              alignItems="center"
              bgColor="black.1600"
              borderRadius="5px"
              border="1px solid"
              borderColor="green.1000"
              fontFamily="Eurostile"
              fontWeight="bolder"
              color="green.1000"
              onClick={() => setLoginModal.on()}
            >
              <Text mt={px2vw(5)}>LOG IN</Text>
            </Flex>
          )}
        </Flex>
        {/* content */}
        <Flex
          pt={{ base: px2vw(40), lg: "120px" }}
          px={{ base: px2vw(16), lg: "0" }}
          pb={{ base: px2vw(70), lg: "200px" }}
          flexDir="column"
          alignItems="center"
          w="full"
          pos="relative"
          boxSizing="border-box"
        >
          {/* game */}
          <Flex
            flexDir={{ base: "column", lg: "row" }}
            justifyContent="center"
            mx="auto"
          >
            <TopGame
              usdc={topEarning}
              monthlyViews={visitor}
              mr={{ base: 0, lg: "30px" }}
              mb={{ base: px2vw(30), lg: 0 }}
            />
            <TopSeller>
              <Flex
                px={{ base: px2vw(16), lg: 0 }}
                flexDir="column"
                justifyContent="center"
                color="black.1600"
                fontFamily="Eurostile"
                fontWeight="400"
                boxSizing="border-box"
              >
                <Text
                  fontWeight="bolder"
                  fontSize={{ base: px2vw(25), lg: "35px" }}
                  lineHeight={{ base: px2vw(25), lg: "35px" }}
                  mb={{ base: px2vw(10), lg: "10px" }}
                >
                  CRICKET GAME
                </Text>
                <Flex
                  fontSize={{ base: px2vw(13), lg: "13px" }}
                  lineHeight={{ base: px2vw(13), lg: "13px" }}
                  mb={{ base: px2vw(10), lg: "10px" }}
                  opacity="0.8"
                >
                  <Text mr={{ base: px2vw(20), lg: "20px" }}>
                    Date：2022-07-24
                  </Text>
                  <Text>Game Category</Text>
                </Flex>
                <Text
                  fontWeight="600"
                  fontSize={{ base: px2vw(14), lg: "14px" }}
                  lineHeight={{ base: px2vw(22), lg: "22px" }}
                  mb={{ base: px2vw(10), lg: "20px" }}
                >
                  We are hosting multiple fun games and constantly launching new
                  games. They are all free-to-play
                </Text>
                <Flex
                  w={{ base: px2vw(173), lg: "173px" }}
                  h={{ base: px2vw(52), lg: "52px" }}
                  fontSize={{ base: px2vw(17), lg: "17px" }}
                  borderRadius="5px"
                  bgColor="black.1600"
                  color="white.100"
                  justifyContent="center"
                  alignItems="center"
                  fontFamily="Eurostile"
                  fontWeight="bolder"
                  cursor="pointer"
                  onClick={() =>
                    window.open(
                      // "https://app.gamifly.co/games/cricket/index.html"
                      "https://play.google.com/store/apps/details?id=com.alabs.cricket.scifi.league"
                    )
                  }
                >
                  <Text mt="5px">GET REWARDS</Text>
                </Flex>
              </Flex>
            </TopSeller>
          </Flex>
          {/* features */}
          <Flex flexDir="column" mt={{ base: px2vw(115), lg: "120px" }}>
            {/* title */}
            <Flex justifyContent="center" mb={{ base: px2vw(50), lg: "80px" }}>
              <Text
                fontFamily="Eurostile"
                fontWeight="bolder"
                color="white.100"
                fontSize={{ base: px2vw(35), lg: "35px" }}
                lineHeight={{ base: px2vw(35), lg: "35px" }}
              >
                FEATURES
              </Text>
              <Image
                src={featuresIcon}
                w={{ base: px2vw(30), lg: "30px" }}
                h={{ base: px2vw(23), lg: "23px" }}
                ml={{ base: px2vw(5), lg: "5px" }}
              />
            </Flex>
            {/* content */}
            <Flex flexDir={{ base: "column", lg: "row" }}>
              {/* Free Games */}
              <Flex
                flexDir={{ base: "column", lg: "row" }}
                mr={{ base: 0, lg: "35px" }}
                mb={{ base: px2vw(83), lg: 0 }}
              >
                <Flex
                  fontFamily="SofiaPro"
                  flexDir="column"
                  justifyContent="flex-end"
                  alignItems="center"
                  borderRadius="15px"
                  pos="relative"
                  w={{ base: "full", lg: "337px" }}
                  h={{ base: "auto", lg: "370px" }}
                  bgGradient={{
                    base: "none",
                    lg: "linear(to-b, #1C1C1C, black.100)",
                  }}
                >
                  <Image
                    pos="absolute"
                    src={freeGamesIcon}
                    w={{ base: px2vw(139), lg: "202px" }}
                    h={{ base: px2vw(118), lg: "171px" }}
                    top={{ base: px2vw(5), lg: "-20px" }}
                    right={{ base: px2vw(-45), lg: "auto" }}
                  />
                  <Flex
                    mr={{ base: px2vw(120), lg: 0 }}
                    px={{ base: 0, lg: "45px" }}
                    flexDir="column"
                    alignItems="center"
                    boxSizing="border-box"
                  >
                    <Text
                      fontSize={{ base: px2vw(24), lg: "31px" }}
                      lineHeight={{ base: px2vw(24), lg: "31px" }}
                      mb={{ base: px2vw(7), lg: "17px" }}
                      fontWeight="bolder"
                      color="green.1000"
                    >
                      Free Games
                    </Text>
                    <Text
                      w={{ base: px2vw(223), lg: "auto" }}
                      h={{ base: "auto", lg: "92px" }}
                      fontSize={{ base: px2vw(16), lg: "18px" }}
                      lineHeight={{ base: px2vw(16), lg: "18px" }}
                      mb={{ base: 0, lg: "42px" }}
                      fontWeight="400"
                      color="white.100"
                      textAlign="center"
                    >
                      We are hosting multiple fun games andconstantly launching
                      new games. They are all free-to-play
                    </Text>
                  </Flex>
                </Flex>
              </Flex>
              {/* Rewards */}
              <Flex
                flexDir={{ base: "column", lg: "row" }}
                mr={{ base: 0, lg: "35px" }}
                mb={{ base: px2vw(83), lg: 0 }}
              >
                <Flex
                  fontFamily="SofiaPro"
                  flexDir="column"
                  justifyContent="flex-end"
                  alignItems="center"
                  borderRadius="15px"
                  pos="relative"
                  w={{ base: "full", lg: "337px" }}
                  h={{ base: "auto", lg: "370px" }}
                  bgGradient={{
                    base: "none",
                    lg: "linear(to-b, #1C1C1C, black.100)",
                  }}
                >
                  <Image
                    src={rewardsIcon}
                    display={{ base: "none", lg: "flex" }}
                    pos="absolute"
                    w="119px"
                    h="187px"
                    top="-30px"
                  />
                  <Image
                    pos="absolute"
                    src={rewardsIconMobile}
                    display={{ base: "flex", lg: "none" }}
                    w={px2vw(77)}
                    h={px2vw(145)}
                    top={px2vw(-30)}
                    left={px2vw(-15)}
                  />
                  <Flex
                    flexDir="column"
                    alignItems="center"
                    ml={{ base: px2vw(120), lg: 0 }}
                  >
                    <Text
                      fontSize={{ base: px2vw(24), lg: "31px" }}
                      lineHeight={{ base: px2vw(24), lg: "31px" }}
                      mb={{ base: px2vw(7), lg: "17px" }}
                      fontWeight="bolder"
                      color="green.1000"
                    >
                      Rewards
                    </Text>
                    <Text
                      w={{ base: px2vw(223), lg: "auto" }}
                      h={{ base: "auto", lg: "92px" }}
                      fontSize={{ base: px2vw(16), lg: "18px" }}
                      lineHeight={{ base: px2vw(16), lg: "18px" }}
                      mb={{ base: 0, lg: "42px" }}
                      fontWeight="400"
                      color="white.100"
                      textAlign="center"
                    >
                      You will earn rewards when playing the games without any
                      investment.
                    </Text>
                  </Flex>
                </Flex>
              </Flex>
              {/* Stable Coins */}
              <Flex
                flexDir={{ base: "column", lg: "row" }}
                mr={{ base: 0, lg: "35px" }}
                mb={{ base: px2vw(83), lg: 0 }}
              >
                <Flex
                  fontFamily="SofiaPro"
                  flexDir="column"
                  justifyContent="flex-end"
                  alignItems="center"
                  borderRadius="15px"
                  pos="relative"
                  w={{ base: "full", lg: "337px" }}
                  h={{ base: "auto", lg: "370px" }}
                  bgGradient={{
                    base: "none",
                    lg: "linear(to-b, #1C1C1C, black.100)",
                  }}
                >
                  <Image
                    pos="absolute"
                    src={stableCoinsIcon}
                    w={{ base: px2vw(96), lg: "162px" }}
                    h={{ base: px2vw(107), lg: "152px" }}
                    top={{ base: px2vw(0), lg: "-20px" }}
                    right={{ base: px2vw(-30), lg: "auto" }}
                  />
                  <Flex
                    mr={{ base: px2vw(120), lg: 0 }}
                    px={{ base: 0, lg: "45px" }}
                    flexDir="column"
                    alignItems="center"
                    boxSizing="border-box"
                  >
                    <Text
                      fontSize={{ base: px2vw(24), lg: "31px" }}
                      lineHeight={{ base: px2vw(24), lg: "31px" }}
                      mb={{ base: px2vw(7), lg: "17px" }}
                      fontWeight="bolder"
                      color="green.1000"
                    >
                      Stable Coins
                    </Text>
                    <Text
                      w={{ base: px2vw(223), lg: "auto" }}
                      h={{ base: "auto", lg: "92px" }}
                      fontSize={{ base: px2vw(16), lg: "18px" }}
                      lineHeight={{ base: px2vw(16), lg: "18px" }}
                      mb={{ base: 0, lg: "42px" }}
                      fontWeight="400"
                      color="white.100"
                      textAlign="center"
                    >
                      Rewarding in USD Coin(USDC), you can enjoy the game
                      without thinking about the market volatility.
                    </Text>
                  </Flex>
                </Flex>
              </Flex>
            </Flex>
          </Flex>
          {/* PARTNERSHIP */}
          <Flex
            w="full"
            flexDir="column"
            alignItems="center"
            mt={{ base: px2vw(115), lg: "120px" }}
          >
            {/* title */}
            <Flex justifyContent="center" mb={{ base: px2vw(50), lg: "80px" }}>
              <Text
                fontFamily="Eurostile"
                fontWeight="bolder"
                color="white.100"
                fontSize={{ base: px2vw(35), lg: "35px" }}
                lineHeight={{ base: px2vw(35), lg: "35px" }}
              >
                PARTNERSHIP
              </Text>
              <Image
                src={featuresIcon}
                w={{ base: px2vw(30), lg: "30px" }}
                h={{ base: px2vw(23), lg: "23px" }}
                ml={{ base: px2vw(5), lg: "5px" }}
              />
            </Flex>
            {/* content */}
            <Flex
              w={{ base: "full", lg: "1080px" }}
              h={{ base: px2vw(270), lg: "342px" }}
              flexDir="column"
              justifyContent="space-around"
              borderRadius="15px"
              bgGradient="linear(to-b, RGBA(28, 28, 28, 0.69), black.100)"
            >
              <Flex justifyContent="center" alignItems="center">
                <Image
                  src={ship1}
                  w={{ base: px2vw(136), lg: "262px" }}
                  h={{ base: px2vw(19), lg: "35px" }}
                  mr={{ base: px2vw(54), lg: "135px" }}
                />
                <Image
                  src={ship2}
                  w={{ base: px2vw(116), lg: "199px" }}
                  h={{ base: px2vw(39), lg: "66px" }}
                />
              </Flex>
              <Flex justifyContent="center" alignItems="center">
                <Image
                  src={ship3}
                  w={{ base: px2vw(153), lg: "262px" }}
                  h={{ base: px2vw(39), lg: "66px" }}
                  mr={{ base: px2vw(40), lg: "98px" }}
                />
                <Image
                  src={ship4}
                  w={{ base: px2vw(79), lg: "135px" }}
                  h={{ base: px2vw(35), lg: "60px" }}
                  mr={{ base: 0, lg: "90px" }}
                />
                <Image
                  display={{ base: "none", lg: "flex" }}
                  src={ship5}
                  w={{ base: px2vw(136), lg: "233px" }}
                  h={{ base: px2vw(35), lg: "60px" }}
                />
              </Flex>
              <Flex
                display={{ base: "flex", lg: "none" }}
                justifyContent="center"
                alignItems="center"
              >
                <Image
                  src={ship5}
                  w={{ base: px2vw(136), lg: "233px" }}
                  h={{ base: px2vw(35), lg: "60px" }}
                  mr={px2vw(68)}
                />
                <Image
                  src={ship6}
                  w={{ base: px2vw(96), lg: "166px" }}
                  h={{ base: px2vw(38), lg: "66px" }}
                  mr={{ base: 0, lg: "140px" }}
                />
              </Flex>
              <Flex justifyContent="center" alignItems="center">
                <Image
                  display={{ base: "none", lg: "flex" }}
                  src={ship6}
                  w={{ base: px2vw(96), lg: "166px" }}
                  h={{ base: px2vw(38), lg: "66px" }}
                  mr={{ base: 0, lg: "140px" }}
                />
                <Image
                  src={ship7}
                  w={{ base: px2vw(203), lg: "350px" }}
                  h={{ base: px2vw(26), lg: "46px" }}
                />
              </Flex>
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
        // setLoginLoading={(boo: boolean) =>
        //   boo ? setLoginLoading.on() : setLoginLoading.off()
        // }
      />
      {/* log out */}
      <LoginOut
        logOut={logOut}
        setLogOut={(boo: boolean) => (boo ? setLogOut.on() : setLogOut.off())}
        confirmLogOut={() => {
          // setIsLogin.off();
          disconnectWallet();
        }}
      />
      {/* Tour弹窗 step1 */}
      <BaseModal isShow={tourStep === 1} close={() => setTourStep(0)}>
        <Flex
          pt={{ base: 0, lg: "55px" }}
          px={{ base: 0, lg: "55px" }}
          flexDir="column"
          boxSizing="border-box"
        >
          <Image
            src={logo}
            w="177px"
            h="40px"
            mb={{ base: px2vw(60), lg: "60px" }}
          />
          <Flex
            flexDir="column"
            fontFamily="SofiaPro"
            textAlign={{ base: "center", lg: "left" }}
            mb={{ base: px2vw(50), lg: "10px" }}
          >
            <Text
              color="green.1000"
              fontSize={{ base: px2vw(30), lg: "30px" }}
              lineHeight={{ base: px2vw(30), lg: "30px" }}
              mb={{ base: px2vw(30), lg: "5px" }}
            >
              Welcome to Gamifly!
            </Text>
            <Text
              color="white.100"
              fontSize={{ base: px2vw(23), lg: "23px" }}
              lineHeight={{ base: px2vw(23), lg: "23px" }}
            >
              {`World's # Web3 gateway where you can discover new games, compete
              in tournaments and win rewards. Be part of our growing community`}
            </Text>
          </Flex>
          <Flex
            borderRadius="20px"
            bgColor="#242424"
            cursor="pointer"
            alignItems="center"
            w="fit-content"
            h={{ base: px2vw(40), lg: "40px" }}
            px={{ base: px2vw(15), lg: "15px" }}
            mb={{ base: px2vw(142), lg: "60px" }}
            mx={{ base: "auto", lg: "inherit" }}
            onClick={() => window.open(" https://discord.gg/FMGNrjk75k")}
          >
            <Image
              src={footer1}
              w={{ base: px2vw(20), lg: "20px" }}
              h={{ base: px2vw(15), lg: "15px" }}
              mr={{ base: px2vw(8), lg: "8px" }}
            />
            <Text
              color="green.1000"
              fontFamily="Eurostile"
              fontSize={{ base: px2vw(13), lg: "13px" }}
              mt={{ base: px2vw(5), lg: "5px" }}
            >
              Click to join our discord group
            </Text>
          </Flex>
          <Flex justifyContent="flex-end">
            <Text
              fontFamily="Eurostile"
              color="green.1000"
              textDecor="underline"
              cursor="pointer"
              fontSize={{ base: px2vw(17), lg: "17px" }}
              lineHeight={{ base: px2vw(17), lg: "17px" }}
              mt={{ base: px2vw(5), lg: "5px" }}
              onClick={() => setTourStep(2)}
            >{`Step 1 of 4 >`}</Text>
          </Flex>
        </Flex>
      </BaseModal>
      {/* Tour弹窗 step2 */}
      <BaseModal isShow={tourStep === 2} close={() => setTourStep(0)}>
        <Flex
          pt={{ base: 0, lg: "55px" }}
          px={{ base: 0, lg: "55px" }}
          flexDir="column"
          boxSizing="border-box"
        >
          <Image
            src={logo}
            w="177px"
            h="40px"
            mb={{ base: px2vw(60), lg: "60px" }}
          />
          <Flex
            flexDir="column"
            fontFamily="SofiaPro"
            textAlign={{ base: "center", lg: "left" }}
            mb={{ base: px2vw(50), lg: "10px" }}
          >
            <Text
              color="green.1000"
              fontSize={{ base: px2vw(30), lg: "30px" }}
              lineHeight={{ base: px2vw(30), lg: "30px" }}
              mb={{ base: px2vw(30), lg: "5px" }}
            >
              Log In for Rewards
            </Text>
            <Text
              color="white.100"
              fontSize={{ base: px2vw(23), lg: "23px" }}
              lineHeight={{ base: px2vw(23), lg: "23px" }}
            >
              Login and get 0.01 USDC Now. We will create a free wallet for you
              when you login.
            </Text>
            <Text
              color="white.100"
              mt={{ base: px2vw(40), lg: "20px" }}
              fontSize={{ base: px2vw(23), lg: "23px" }}
              lineHeight={{ base: px2vw(23), lg: "23px" }}
            >
              Get your wallet and start your web3 adventure!!
            </Text>
          </Flex>
          <Flex
            borderRadius="20px"
            bgColor="#242424"
            cursor="pointer"
            alignItems="center"
            w="fit-content"
            h={{ base: px2vw(40), lg: "40px" }}
            px={{ base: px2vw(15), lg: "15px" }}
            mb={{ base: px2vw(125), lg: "40px" }}
            mx={{ base: "auto", lg: "inherit" }}
            onClick={() => {
              setTourStep(0);
              setLoginModal.on();
            }}
          >
            <Text
              color="green.1000"
              fontFamily="Eurostile"
              fontSize={{ base: px2vw(13), lg: "13px" }}
              mt={{ base: px2vw(5), lg: "5px" }}
            >
              Login and get USDC now
            </Text>
            {/* <Text
              color="blue.200"
              fontFamily="Eurostile"
              fontSize={{ base: px2vw(13), lg: "13px" }}
              ml={{ base: px2vw(5), lg: "5px" }}
              mt={{ base: px2vw(5), lg: "5px" }}
            >
              GET 0.01 USDC
            </Text> */}
          </Flex>
          <Flex justifyContent="space-between">
            <Text
              fontFamily="Eurostile"
              color="green.1000"
              textDecor="underline"
              cursor="pointer"
              fontSize={{ base: px2vw(17), lg: "17px" }}
              lineHeight={{ base: px2vw(17), lg: "17px" }}
              mt={{ base: px2vw(5), lg: "5px" }}
              onClick={() => setTourStep(1)}
            >
              {`< Back`}
            </Text>
            <Text
              fontFamily="Eurostile"
              color="green.1000"
              textDecor="underline"
              cursor="pointer"
              fontSize={{ base: px2vw(17), lg: "17px" }}
              lineHeight={{ base: px2vw(17), lg: "17px" }}
              mt={{ base: px2vw(5), lg: "5px" }}
              onClick={() => setTourStep(3)}
            >
              {`Step 2 of 4 >`}
            </Text>
          </Flex>
        </Flex>
      </BaseModal>
      {/* Tour弹窗 step3 */}
      <BaseModal isShow={tourStep === 3} close={() => setTourStep(0)}>
        <Flex
          pt={{ base: 0, lg: "55px" }}
          px={{ base: 0, lg: "55px" }}
          flexDir="column"
          boxSizing="border-box"
        >
          <Image
            src={logo}
            w="177px"
            h="40px"
            mb={{ base: px2vw(60), lg: "60px" }}
          />
          <Flex
            flexDir="column"
            fontFamily="SofiaPro"
            textAlign={{ base: "center", lg: "left" }}
            mb={{ base: px2vw(50), lg: "10px" }}
          >
            <Text
              color="green.1000"
              fontSize={{ base: px2vw(30), lg: "30px" }}
              lineHeight={{ base: px2vw(30), lg: "30px" }}
              mb={{ base: px2vw(30), lg: "5px" }}
            >
              Your wallet = Your benefits
            </Text>
            <Text
              color="white.100"
              fontSize={{ base: px2vw(23), lg: "23px" }}
              lineHeight={{ base: px2vw(23), lg: "23px" }}
            >
              Your wallet becomes your profile. Rewards will be in the form of
              web3 currency or NFTs.
            </Text>
            <Text
              color="white.100"
              mt={{ base: px2vw(40), lg: "20px" }}
              fontSize={{ base: px2vw(23), lg: "23px" }}
              lineHeight={{ base: px2vw(23), lg: "23px" }}
            >
              Get your exclusive Gamifly NFT rewards NOW!
            </Text>
          </Flex>
          <Flex
            borderRadius="20px"
            bgColor="#242424"
            cursor="pointer"
            alignItems="center"
            w="fit-content"
            h={{ base: px2vw(40), lg: "40px" }}
            px={{ base: px2vw(15), lg: "15px" }}
            mb={{ base: px2vw(95), lg: "40px" }}
            mx={{ base: "auto", lg: "inherit" }}
          >
            <Text
              color="green.1000"
              fontFamily="Eurostile"
              fontSize={{ base: px2vw(13), lg: "13px" }}
              mt={{ base: px2vw(5), lg: "5px" }}
              onClick={() => setTourStep(5)}
            >
              Click to see rewards rules
            </Text>
          </Flex>
          <Flex justifyContent="space-between">
            <Text
              fontFamily="Eurostile"
              color="green.1000"
              textDecor="underline"
              cursor="pointer"
              fontSize={{ base: px2vw(17), lg: "17px" }}
              lineHeight={{ base: px2vw(17), lg: "17px" }}
              mt={{ base: px2vw(5), lg: "5px" }}
              onClick={() => setTourStep(2)}
            >
              {`< Back`}
            </Text>
            <Text
              fontFamily="Eurostile"
              color="green.1000"
              textDecor="underline"
              cursor="pointer"
              fontSize={{ base: px2vw(17), lg: "17px" }}
              lineHeight={{ base: px2vw(17), lg: "17px" }}
              mt={{ base: px2vw(5), lg: "5px" }}
              onClick={() => setTourStep(4)}
            >
              {`Step 3 of 4 >`}
            </Text>
          </Flex>
        </Flex>
      </BaseModal>
      {/* Tour弹窗 step4 */}
      <BaseModal isShow={tourStep === 4} close={() => setTourStep(0)}>
        <Flex
          pt={{ base: 0, lg: "55px" }}
          px={{ base: 0, lg: "55px" }}
          flexDir="column"
          boxSizing="border-box"
        >
          <Image
            src={logo}
            w="177px"
            h="40px"
            mb={{ base: px2vw(60), lg: "30px" }}
          />
          <Flex
            flexDir="column"
            fontFamily="SofiaPro"
            textAlign={{ base: "center", lg: "left" }}
            mb={{ base: px2vw(50), lg: "10px" }}
          >
            <Text
              color="green.1000"
              fontSize={{ base: px2vw(30), lg: "30px" }}
              lineHeight={{ base: px2vw(30), lg: "30px" }}
              mb={{ base: px2vw(18), lg: "5px" }}
            >
              New to Web3?
            </Text>
            <Text
              color="white.100"
              fontSize={{ base: px2vw(23), lg: "23px" }}
              lineHeight={{ base: px2vw(23), lg: "23px" }}
            >
              Web3 is the fuyure of the internet. Your crypto wallet is the key
              to your web3 identity.
            </Text>
            <Text
              color="white.100"
              mt={{ base: px2vw(20), lg: "20px" }}
              fontSize={{ base: px2vw(23), lg: "23px" }}
              lineHeight={{ base: px2vw(23), lg: "23px" }}
            >
              Play games on Gamifly and earn web3 rewards.
            </Text>
            <Text
              color="white.100"
              mt={{ base: px2vw(20), lg: "20px" }}
              fontSize={{ base: px2vw(23), lg: "23px" }}
              lineHeight={{ base: px2vw(23), lg: "23px" }}
            >
              Invite a friend and earn credits.
            </Text>
          </Flex>
          <Flex
            borderRadius="20px"
            bgColor="#242424"
            cursor="pointer"
            alignItems="center"
            w="fit-content"
            h={{ base: px2vw(40), lg: "40px" }}
            px={{ base: px2vw(15), lg: "15px" }}
            mb={{ base: px2vw(91), lg: "20px" }}
            mx={{ base: "auto", lg: "inherit" }}
            onClick={() => {
              if (isLogin) {
                copyFunction(
                  `https://www.gamifly.co?inviteCode=${getStore(
                    "referralCode"
                  )}`
                );
                toast({
                  title: "referral link copy success",
                  status: "success",
                  duration: 3000,
                  isClosable: true,
                });
              } else {
                setLoginModal.on();
              }
            }}
          >
            <Text
              color="green.1000"
              fontFamily="Eurostile"
              fontSize={{ base: px2vw(13), lg: "13px" }}
              mt={{ base: px2vw(5), lg: "5px" }}
            >
              Click to get referral Link
            </Text>
          </Flex>
          <Flex justifyContent="space-between">
            <Text
              fontFamily="Eurostile"
              color="green.1000"
              textDecor="underline"
              cursor="pointer"
              fontSize={{ base: px2vw(17), lg: "17px" }}
              lineHeight={{ base: px2vw(17), lg: "17px" }}
              mt={{ base: px2vw(5), lg: "5px" }}
              onClick={() => setTourStep(3)}
            >
              {`< Back`}
            </Text>
            <Text
              fontFamily="Eurostile"
              color="green.1000"
              textDecor="underline"
              cursor="pointer"
              fontSize={{ base: px2vw(17), lg: "17px" }}
              lineHeight={{ base: px2vw(17), lg: "17px" }}
              mt={{ base: px2vw(5), lg: "5px" }}
              onClick={() => {
                setTourStep(0);
                setLoginModal.on();
              }}
            >
              {`START WEB3 JOURNEY NOW  >`}
            </Text>
          </Flex>
        </Flex>
      </BaseModal>
      {/* rule弹窗 */}
      <BaseModal isShow={tourStep === 5} close={() => setTourStep(0)}>
        <Flex
          pt={{ base: 0, lg: "55px" }}
          px={{ base: 0, lg: "55px" }}
          flexDir="column"
          boxSizing="border-box"
        >
          <Image
            src={logo}
            w="177px"
            h="40px"
            mb={{ base: px2vw(40), lg: "30px" }}
          />
          <Flex
            flexDir="column"
            fontFamily="SofiaPro"
            textAlign={{ base: "center", lg: "left" }}
            mb={{ base: px2vw(50), lg: "10px" }}
          >
            <Text
              color="green.1000"
              fontSize={{ base: px2vw(30), lg: "30px" }}
              lineHeight={{ base: px2vw(30), lg: "30px" }}
              mb={{ base: px2vw(40), lg: "50px" }}
            >
              Gamifly rewards rules
            </Text>
            <RewardsRule />
          </Flex>
          <Flex justifyContent="space-between">
            <Text
              fontFamily="Eurostile"
              color="green.1000"
              textDecor="underline"
              cursor="pointer"
              fontSize={{ base: px2vw(17), lg: "17px" }}
              lineHeight={{ base: px2vw(17), lg: "17px" }}
              mt={{ base: px2vw(5), lg: "5px" }}
              onClick={() => setTourStep(3)}
            >
              {`< Back`}
            </Text>
            <Text
              fontFamily="Eurostile"
              color="green.1000"
              textDecor="underline"
              cursor="pointer"
              fontSize={{ base: px2vw(17), lg: "17px" }}
              lineHeight={{ base: px2vw(17), lg: "17px" }}
              mt={{ base: px2vw(5), lg: "5px" }}
              onClick={() => setTourStep(4)}
            >
              {`Step 3 of 4 >`}
            </Text>
          </Flex>
        </Flex>
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
