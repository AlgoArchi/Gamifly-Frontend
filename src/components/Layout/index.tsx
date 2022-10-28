import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Flex, useBoolean, useToast, Image } from "@chakra-ui/react";
import px2vw from "@/utils/px2vw";
import { login } from "@/apis/login";
import { getReferralCode, setReferral } from "@/apis/userInfo";
import { requestReward } from "@/apis/login";
import { getNotifications } from "@/apis/notifications";
import useSWR from "swr";
import { deleteStore, getStore, setStore } from "@/utils/storage";
import globalStore from "@/stores/global";
import ruleIcon from "@/assets/imgs/ruleIcon.png";
// import footer1 from "@/assets/imgs/footer1.png";
// import footer2 from "@/assets/imgs/footer2.png";
// import footer3 from "@/assets/imgs/footer3.png";
// import footer4 from "@/assets/imgs/footer4.png";
// import LeftMenu from "./LeftMenu";
import Header from "./Header";
import HeaderMobile from "./HeaderMobile";
import Footer from "./Footer";
import MyRewards from "./MyRewards";
import RewardsRule from "./RewardsRule";

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
  const [showRule, setShowRule] = useBoolean(false);
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
        accessToken: userInfo?.access_token,
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
      setFriendCode(getStore("inviteCode"));
      setNotificationsRandom(Math.random());
      router.push(router.pathname);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
      deleteStore("inviteCode");
    } else {
      toast({
        title: "Inviter binding fail",
        description: setReferralData?.reason,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      deleteStore("inviteCode");
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
      bg={{ base: "black.100", lg: "black.1600" }}
      pos="relative"
      overflowX={{ base: "hidden", lg: "auto" }}
      // _before={{
      //   content: "''",
      //   pos: "absolute",
      //   top: 0,
      //   left: 0,
      //   w: "full",
      //   h: "full",
      //   bgColor: "white.400",
      //   filter: "blur(200px)",
      // }}
    >
      {/* 内容 */}
      <Flex
        w={{ base: "full", lg: router?.pathname === "/" ? "full" : "1280px" }}
        px={{ base: router?.pathname === "/" ? 0 : px2vw(16), lg: 0 }}
        pt={{ base: px2vw(90), lg: 0 }}
        mx="auto"
        boxSizing="border-box"
        flexDirection="column"
        justifyContent="space-start"
        zIndex={1}
      >
        {/* 顶部Header */}
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
        {/* 页面 */}
        {children}
        <Footer />
        {/* 右侧浮窗 */}
        {!showRule ? (
          <MyRewards helpClick={() => setShowRule.on()} />
        ) : (
          <Flex
            display={{ base: "none", lg: "flex" }}
            w="390px"
            h="200px"
            pos="fixed"
            bottom="90px"
            right="0"
            bgColor="black.1900"
            border="1px solid"
            borderColor="green.1000"
            borderRadius="15px"
            borderRight="none"
            borderTopRightRadius="0"
            borderBottomRightRadius="0"
          >
            <Image
              w="8px"
              h="16px"
              my="auto"
              ml="12px"
              mr="33px"
              cursor="pointer"
              src={ruleIcon}
              onClick={() => setShowRule.off()}
            />
            <RewardsRule mt="16px" />
          </Flex>
        )}
      </Flex>
    </Flex>
  );
}

export default React.memo(Index);
