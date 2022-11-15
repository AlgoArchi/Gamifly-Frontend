import React, { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import {
  Flex,
  HStack,
  Image,
  Text,
  useBoolean,
  useToast,
} from "@chakra-ui/react";
import px2vw from "@/utils/px2vw";
import menu from "@/assets/imgs/menu.png";
import logo from "@/assets/imgs/logo.png";
import close from "@/assets/imgs/close.png";
import userProfile from "@/assets/imgs/userProfile.png";
import menuHome from "@/assets/imgs/menuHome.png";
import menuNotifications from "@/assets/imgs/menuNotifications.png";
import mobileLine from "@/assets/imgs/mobileLine.png";
import footer1 from "@/assets/imgs/footer1.png";
import footer2 from "@/assets/imgs/footer2.png";
import footer3 from "@/assets/imgs/footer3.png";
import footer4 from "@/assets/imgs/footer4.png";
import LoginOut from "../LoginOut";
import LogIn from "../LogIn";
import InviteFriend from "../InviteFriend";
import FriendCode from "../FriendCode";
import { useWeb3React } from "@web3-react/core";
import { deleteStore, getStore, setStore } from "@/utils/storage";
import { connectorLocalStorageKey } from "@/connect/connectors";
import globalStore from "@/stores/global";
import copyFunction from "copy-to-clipboard";
import menuGame from "@/assets/imgs/menuGame.png";
import menuNFT from "@/assets/imgs/menuNFT.png";
import menuTou from "@/assets/imgs/menuTou.png";
import menuWithdraw from "@/assets/imgs/menuWithdraw.png";

export interface IProps {
  loginOutClick: () => void;
}

export interface pageItem {
  name: string;
  path: string;
  icon?: string;
}
// 页面数组
export const pageList: pageItem[] = [
  {
    name: "GAMES",
    icon: menuGame,
    path: "/games",
  },
  {
    name: "NFT",
    icon: menuNFT,
    path: "/purchase",
  },
  {
    name: "TOURNAMENTS",
    icon: menuTou,
    path: "/tournaments",
  },
  // {
  //   name: "ABOUT US",
  //   icon: menuAbout,
  //   path: "",
  // },
  // {
  //   name: "Leader boards",
  //   path: "/leaderBoards",
  // },
  // {
  //   name: "Notifications",
  //   path: "/notifications",
  // },
  // {
  //   name: "Gamifly info",
  //   path: "/gamiflyInfo",
  // },
  {
    name: "TOP UP & WITHDRAW",
    icon: menuWithdraw,
    path: "/transfer",
  },
];

function Index({ loginOutClick }: IProps) {
  const router = useRouter();
  const toast = useToast();
  const { userInfo } = globalStore();
  const { deactivate } = useWeb3React();
  const [inviteCode] = useState(router.query.inviteCode);
  const [open, setOpen] = useBoolean(false);
  const [logOut, setLogOut] = useBoolean(false); // 登出弹窗
  const [loginModal, setLoginModal] = useBoolean(false); // 登陆弹窗
  const [isLogin, setIsLogin] = useBoolean(userInfo?.id); // 是否登陆
  const [inviteShow, setInviteShow] = useBoolean(false);
  const [friendShow, setFriendShow] = useBoolean(false);

  const disconnectWallet = async () => {
    try {
      await deactivate();
      deleteStore(connectorLocalStorageKey);
      setStore("isLogin", false);
    } catch (err) {
      console.error(err);
    }
  };

  const userImg = useMemo(
    () => (
      <Image
        src={
          userInfo?.avatar
            ? `${window.imgUrl.imageUrl}${userInfo?.avatar}`
            : userProfile
        }
        w={px2vw(37)}
        h={px2vw(37)}
        mr={px2vw(12)}
        borderRadius="50%"
        my="auto"
        onClick={() => router.push("/profile")}
      />
    ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [userInfo]
  );

  useEffect(() => {
    if (inviteCode) {
      if (
        (userInfo && userInfo?.id && !userInfo?.referral_id) ||
        !userInfo?.id
      ) {
        setFriendShow.on();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inviteCode]);

  useEffect(() => {
    if (userInfo && userInfo?.id) {
      setIsLogin.on();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userInfo]);

  return (
    <Flex
      display={{ base: "flex", lg: "none" }}
      w="full"
      pos="fixed"
      top="0"
      left="0"
      bgColor="RGBA(15, 15, 15, 0.5)"
      justifyContent="space-between"
      zIndex={9}
      h={px2vw(90)}
      px={px2vw(16)}
    >
      <Image
        w={px2vw(124)}
        h={px2vw(28)}
        my="auto"
        src={logo}
        onClick={() => router.push("/")}
      />
      <Image
        src={menu}
        w={px2vw(20)}
        h={px2vw(18)}
        my="auto"
        onClick={() => setOpen.on()}
      />
      {/* Navbar */}
      <Flex
        display={open ? "flex" : "none"}
        w={px2vw(292)}
        flexDir="column"
        h="100vh"
        pos="fixed"
        top="0"
        right="0"
        backdropFilter="blur(50px)"
        zIndex="9"
      >
        <Image
          src={mobileLine}
          w={px2vw(8)}
          h={px2vw(110)}
          m="auto"
          pos="absolute"
          left="0"
          top="0"
          bottom="0"
          transform="rotate(180deg)"
        />
        {/* Close*/}
        <Flex
          h={px2vw(90)}
          w="full"
          justifyContent="flex-end"
          alignItems="center"
          borderBottom="1px solid"
          borderColor="green.1000"
        >
          <Image
            src={close}
            w={px2vw(18)}
            h={px2vw(18)}
            mr={px2vw(27)}
            onClick={() => setOpen.off()}
          />
        </Flex>
        {/* Content */}
        <Flex
          px={px2vw(15)}
          pt={px2vw(35)}
          fontSize={px2vw(19)}
          color="white.100"
          alignItems="flex-start"
          flexDir="column"
          boxSizing="border-box"
          fontFamily="Eurostile"
          fontWeight="bolder"
        >
          {/* Content above */}
          <Flex
            w="full"
            flexDir="column"
            pl={px2vw(20)}
            mb={px2vw(30)}
            boxSizing="border-box"
          >
            {/* PROFILE  */}
            <Flex mb={px2vw(30)} w="full">
              {userImg}
              <Text lineHeight={px2vw(37)} mt={px2vw(5)}>
                PROFILE
              </Text>
            </Flex>
            {/* HOME  */}
            <Flex
              w="full"
              mb={px2vw(25)}
              onClick={() => {
                router.push("/");
                setOpen.off();
              }}
            >
              <Image
                src={menuHome}
                w={px2vw(40)}
                h={px2vw(40)}
                mr={px2vw(10)}
              />
              <Text lineHeight={px2vw(37)} mt={px2vw(5)}>
                HOME
              </Text>
            </Flex>
            {/* Page */}
            <Flex w="full" flexDir="column">
              {pageList.map((item: pageItem, index: number) => {
                return (
                  <Flex
                    key={index}
                    mb={px2vw(25)}
                    onClick={() => {
                      if (item?.path === "") {
                        toast({
                          title: `coming soon`,
                          status: "info",
                          isClosable: true,
                        });
                      } else {
                        router.push(item?.path);
                        setOpen.off();
                      }
                    }}
                  >
                    <Image
                      src={item?.icon}
                      w={px2vw(40)}
                      h={px2vw(40)}
                      mr={px2vw(10)}
                    />
                    <Text lineHeight={px2vw(37)} mt={px2vw(5)}>
                      {item?.name}
                    </Text>
                  </Flex>
                );
              })}
            </Flex>
            {/* NOTIFICATIONS  */}
            <Flex
              mb={px2vw(30)}
              onClick={() => {
                router.push("/notifications");
                setOpen.off();
              }}
            >
              <Image
                src={menuNotifications}
                w={px2vw(40)}
                h={px2vw(40)}
                mr={px2vw(10)}
              />
              <Text lineHeight={px2vw(37)} mt={px2vw(5)}>
                NOTIFICATIONS
              </Text>
            </Flex>
            {/* 链接 */}
            <Flex>
              <HStack spacing={px2vw(13)}>
                <Flex
                  w="40px"
                  h="40px"
                  alignItems="center"
                  justifyContent="center"
                  bgColor="black.100"
                  borderRadius="12px"
                  cursor="pointer"
                  _hover={{
                    boxShadow: "0px 2px 20px RGBA(203, 252, 98, 0.28)",
                  }}
                  _active={{
                    boxShadow: "0px 2px 20px RGBA(203, 252, 98, 0.28)",
                  }}
                  onClick={() => window.open(" https://discord.gg/FMGNrjk75k")}
                >
                  <Image src={footer1} />
                </Flex>
                <Flex
                  w="40px"
                  h="40px"
                  alignItems="center"
                  justifyContent="center"
                  bgColor="black.100"
                  borderRadius="12px"
                  cursor="pointer"
                  _hover={{
                    boxShadow: "0px 2px 20px RGBA(203, 252, 98, 0.28)",
                  }}
                  _active={{
                    boxShadow: "0px 2px 20px RGBA(203, 252, 98, 0.28)",
                  }}
                  onClick={() => window.open("https://twitter.com/Gamiflyco")}
                >
                  <Image src={footer4} />
                </Flex>
                <Flex
                  w="40px"
                  h="40px"
                  alignItems="center"
                  justifyContent="center"
                  bgColor="black.100"
                  borderRadius="12px"
                  cursor="pointer"
                  _hover={{
                    boxShadow: "0px 2px 20px RGBA(203, 252, 98, 0.28)",
                  }}
                  _active={{
                    boxShadow: "0px 2px 20px RGBA(203, 252, 98, 0.28)",
                  }}
                  onClick={() => window.open("http://t.me/gamifly")}
                >
                  <Image src={footer3} />
                </Flex>
                <Flex
                  w="40px"
                  h="40px"
                  alignItems="center"
                  justifyContent="center"
                  bgColor="black.100"
                  borderRadius="12px"
                  cursor="pointer"
                  _hover={{
                    boxShadow: "0px 2px 20px RGBA(203, 252, 98, 0.28)",
                  }}
                  _active={{
                    boxShadow: "0px 2px 20px RGBA(203, 252, 98, 0.28)",
                  }}
                  onClick={() =>
                    window.open(
                      "https://instagram.com/gamifly?igshid=YmMyMTA2M2Y="
                    )
                  }
                >
                  <Image src={footer2} />
                </Flex>
              </HStack>
            </Flex>
          </Flex>
          {/* Invite friends */}
          {isLogin && (
            <Flex
              w="full"
              justifyContent="center"
              alignItems="center"
              backgroundColor="black.1600"
              border="1px solid"
              borderColor="green.1000"
              boxShadow="0px 2px 30px RGBA(196, 248, 99, 0.4)"
              borderRadius={px2vw(5)}
              h={px2vw(50)}
              mb={px2vw(12)}
              onClick={() => {
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
              }}
            >
              <Text
                fontFamily="Eurostile"
                fontWeight="bolder"
                color="green.1000"
                fontSize={px2vw(17)}
                mt={px2vw(5)}
              >
                INVITE FRIENDS
              </Text>
            </Flex>
          )}
          {/* Log in Button */}
          <Flex
            w="full"
            justifyContent="center"
            alignItems="center"
            backgroundColor="green.1000"
            border="1px solid"
            borderColor="green.1000"
            borderRadius={px2vw(5)}
            h={px2vw(50)}
            mb={px2vw(12)}
            onClick={() => {
              if (isLogin) {
                setOpen.off();
                setLogOut.on();
                disconnectWallet();
              } else {
                setOpen.off();
                setLoginModal.on();
              }
            }}
          >
            <Text
              fontFamily="Eurostile"
              fontWeight="bolder"
              color="black.1600"
              fontSize={px2vw(17)}
              mt={px2vw(5)}
            >
              {isLogin ? "LOG OUT" : "LOG IN"}
            </Text>
          </Flex>
        </Flex>
      </Flex>
      {/* 遮罩 */}
      <Flex
        display={open ? "flex" : "none"}
        w={`calc(100% - ${px2vw(292)})`}
        h="100vh"
        pos="fixed"
        left="0"
        top="0"
        bgColor="black.500"
        onClick={() => setOpen.off()}
      />
      {/* log out */}
      <LoginOut
        logOut={logOut}
        setLogOut={(boo: boolean) => (boo ? setLogOut.on() : setLogOut.off())}
        confirmLogOut={() => {
          setIsLogin.off();
          loginOutClick();
        }}
      />
      {/* login modal */}
      <LogIn
        loginModal={loginModal}
        setLoginModal={(boo: boolean) =>
          boo ? setLoginModal.on() : setLoginModal.off()
        }
        setIsLogin={(boo: boolean) =>
          boo ? setIsLogin.on() : setIsLogin.off()
        }
      />
      <InviteFriend isShow={inviteShow} setIsShow={() => setInviteShow.off()} />
      <FriendCode
        code={inviteCode}
        isShow={friendShow}
        setIsShow={() => setFriendShow.off()}
      />
    </Flex>
  );
}

export default React.memo(Index);
