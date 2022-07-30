import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  Container,
  Flex,
  Text,
  Image,
  useBoolean,
  useToast,
} from "@chakra-ui/react";
import px2vw from "@/utils/px2vw";
import { login } from "@/apis/login";
import { getReferralCode, setReferral } from "@/apis/userInfo";
import { requestReward } from "@/apis/login";
import { getNotifications } from "@/apis/notifications";
import useSWR from "swr";
import { getStore, setStore } from "@/utils/storage";
import globalStore from "@/stores/global";
import footer1 from "@/assets/imgs/footer1.png";
import footer2 from "@/assets/imgs/footer2.png";
import footer3 from "@/assets/imgs/footer3.png";
import footer4 from "@/assets/imgs/footer4.png";
import LeftMenu from "./LeftMenu";
import Header from "./Header";
import HeaderMobile from "./HeaderMobile";
import BaseModal from "../BaseModal";
import TermsOfUse from "../TermsOfUse";
import PrivacyPolicy from "../PrivacyPolicy";

export interface LayoutProps {
  children: any;
}

function Index({ children }: LayoutProps) {
  const router = useRouter();
  const toast = useToast();
  const [interVals, setInterVals] = useState<any>(null);
  const [getRequestReward, setGetRequestReward] = useState(0);
  const [notificationsRandom, setNotificationsRandom] = useState(0);
  const [notificationList, setNotificationList] = useState([]);
  const { userInfo } = globalStore();
  const [friendCode, setFriendCode] = useState(null);
  const [accessToken, setAccessToken] = useState<any>(null);
  const loginRouter =
    router?.pathname !== "/" &&
    router?.pathname !== "/login" &&
    router.pathname !== "/advertisement";
  const [showTermsOfService, setShowTermsOfService] = useBoolean(false);
  const [showPrivacyPolicy, setShowPrivacyPolicy] = useBoolean(false);
  const { data: loginData } = useSWR(
    accessToken ? [login.key] : null,
    (_) =>
      login.fetcher({
        accessToken: accessToken,
      }),
    { revalidateOnFocus: false }
  );
  const { data: getReferralCodeData } = useSWR(
    userInfo && userInfo?.id ? [getReferralCode.key] : null,
    (_) => getReferralCode.fetcher(userInfo?.id),
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
  const { data: _requestRewardData } = useSWR(
    userInfo && userInfo?.id && getRequestReward
      ? [requestReward.key, getRequestReward]
      : null,
    (_) =>
      requestReward.fetcher({
        user_id: userInfo?.id,
        type: 1,
      }),
    { revalidateOnFocus: false }
  );
  const { data: getNotificationsData } = useSWR(
    userInfo && userInfo?.id && notificationsRandom
      ? [getNotifications.key, notificationsRandom]
      : null,
    (_) => getNotifications.fetcher(userInfo?.id),
    { revalidateOnFocus: false }
  );

  useEffect(() => {
    if (loginData) {
      setStore("userInfo", loginData);
      globalStore.setState({
        userInfo: loginData,
      });
      setStore("isLogin", true);
      console.log("login success");
      setFriendCode(getStore("friendCode"));
      setNotificationsRandom(Math.random());
    }
  }, [loginData]);

  useEffect(() => {
    setAccessToken(router.query.accessToken);
  }, [router]);

  // 当用户刷新页面时，url不具有accessToken，且store中含有userInfo时，增加userInfo数据,检查store中是否含有userInfo，如果有，增加计时器
  useEffect(() => {
    setStore("time", new Date().getTime());
    if (!router.query.accessToken && getStore("userInfo")) {
      globalStore.setState({
        userInfo: getStore("userInfo"),
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 当用户刷新页面时,检查store中是否含有userInfo，如果有，增加计时器。同时，获取通知接口
  useEffect(() => {
    if (getStore("userInfo") || userInfo?.id) {
      const interV = setInterval(() => {
        setGetRequestReward(Math.random);
      }, 600000);
      setInterVals(interV);
      setNotificationsRandom(Math.random());
    } else {
      clearInterval(interVals);
      setGetRequestReward(0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router]);

  useEffect(() => {
    if (getReferralCodeData) {
      setStore("referralCode", getReferralCodeData);
    }
  }, [getReferralCodeData]);

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

  useEffect(() => {
    if (getNotificationsData) {
      setNotificationList(getNotificationsData);
    }
  }, [getNotificationsData]);

  return (
    <Flex
      justifyContent="flex-start"
      bg={loginRouter ? "black.900" : "#17192E"}
      pl={{ base: "0", lg: loginRouter ? "237px" : "0" }}
      pos="relative"
      overflowX={{ base: "hidden", lg: "auto" }}
      _before={{
        content: "''",
        pos: "absolute",
        top: 0,
        left: 0,
        w: "full",
        h: "full",
        bgColor: "white.400",
        filter: "blur(200px)",
      }}
    >
      {/* 两个背景图 */}
      {loginRouter && (
        <>
          {/* 蓝色背景圆圈 */}
          <Container
            pos="absolute"
            bottom={{ base: "auto", lg: "100px" }}
            top={{ base: "20%", lg: "auto" }}
            left={{ base: px2vw(-120), lg: "60px" }}
            w={{ base: px2vw(250), lg: "326px" }}
            h={{ base: px2vw(180), lg: "278px" }}
            bgColor="blue.100"
            filter={{ base: "blur(75px)", lg: "blur(100px)" }}
          />
          {/* 绿色背景圆圈 */}
          <Container
            pos="absolute"
            top={{ base: "auto", lg: "35%" }}
            bottom={{ base: "15%", lg: "auto" }}
            right="0"
            w={{ base: px2vw(230), lg: "326px" }}
            h={{ base: px2vw(190), lg: "318px" }}
            bgColor="green.100"
            boxShadow="0px 4px 200px #5EC6B8"
            borderRadius="100px"
            filter={{ base: "blur(75px)", lg: "blur(100px)" }}
          />
        </>
      )}
      {/* 左侧边导航栏 */}
      {loginRouter && <LeftMenu />}
      {/* 右侧内容 */}
      <Flex
        w="full"
        pl={loginRouter ? { base: px2vw(15), lg: "20px" } : 0}
        pr={loginRouter ? { base: px2vw(15), lg: "20px" } : 0}
        flexDirection="column"
        justifyContent="space-start"
        zIndex={1}
      >
        {/* 顶部Header */}
        {loginRouter && (
          <>
            <Header
              notificationList={notificationList}
              loginOutClick={() => {
                clearInterval(interVals);
                setGetRequestReward(0);
              }}
            />
            <HeaderMobile
              loginOutClick={() => {
                clearInterval(interVals);
                setGetRequestReward(0);
              }}
            />
          </>
        )}
        {/* 页面 */}
        {loginRouter ? (
          <Flex
            flexDir="column"
            justifyContent="space-between"
            py={{ base: px2vw(30), lg: "20px" }}
            minH={{
              base: `calc(100vh - ${px2vw(55)})`,
              lg: "calc(100vh - 72px)",
            }}
            // overflowX="auto"
          >
            {children}
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
        ) : (
          children
        )}
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
    </Flex>
  );
}

export default React.memo(Index);
