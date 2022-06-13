import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  Drawer,
  DrawerBody,
  DrawerContent,
  Flex,
  Image,
  Text,
  useBoolean,
} from "@chakra-ui/react";
import px2vw from "@/utils/px2vw";
import menu from "@/assets/imgs/menu.webp";
import userProfile from "@/assets/imgs/userProfile.png";
import close from "@/assets/imgs/greenClose.webp";
import logout from "@/assets/imgs/logout.webp";
import invite from "@/assets/imgs/invite.webp";
import { ButtonArr, buttonItem, PageArr, pageItem, pageList } from "./LeftMenu";
import LoginOut from "../LoginOut";
import LogIn from "../LogIn";
import InviteFriend from "../InviteFriend";
import FriendCode from "../FriendCode";

function Index() {
  const router = useRouter();
  const [inviteCode] = useState(router.query.inviteCode);
  const [open, setOpen] = useBoolean(false);
  const [logOut, setLogOut] = useBoolean(false); // 登出弹窗
  const [loginModal, setLoginModal] = useBoolean(false); // 登陆弹窗
  const [isLogin, setIsLogin] = useBoolean(false); // 是否登陆
  const [inviteShow, setInviteShow] = useBoolean(false);
  const [friendShow, setFriendShow] = useBoolean(false);
  // 按钮数组
  const buttonList: buttonItem[] = [
    {
      name: "Invite friend",
      icon: invite,
      click: () => setInviteShow.on(),
    },
  ];
  useEffect(() => {
    if (inviteCode) {
      setFriendShow.on();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inviteCode]);
  return (
    <Flex
      display={{ base: "flex", lg: "none" }}
      w="full"
      h={px2vw(55)}
      pt={px2vw(15)}
      justifyContent="space-between"
    >
      <Image
        src={menu}
        w={px2vw(33)}
        h={px2vw(33)}
        my="auto"
        onClick={() => setOpen.on()}
      />
      <Text
        fontSize={px2vw(18)}
        lineHeight={px2vw(40)}
        fontFamily="Orbitron"
        fontWeight="600"
        color="white.100"
      >
        {
          pageList.filter((item: pageItem) => item.path === router.pathname)[0]
            ?.name
        }
      </Text>
      <Image
        src={userProfile}
        w={px2vw(40)}
        h={px2vw(40)}
        my="auto"
        onClick={() => router.push("/profile")}
      />
      {/* Drawer */}
      <Drawer isOpen={open} placement="left" onClose={() => setOpen.off()}>
        <DrawerContent bgColor="black.1100" pt={px2vw(60)} pb={px2vw(20)}>
          <Image
            src={close}
            w={px2vw(36)}
            h={px2vw(36)}
            pos="absolute"
            right={px2vw(20)}
            top={px2vw(15)}
          />
          <DrawerBody h={`calc(100vh - ${px2vw(60)})`} p="0">
            <Flex
              h="full"
              flexDir="column"
              justifyContent="space-between"
              pb={px2vw(30)}
            >
              {/* 页面 */}
              <Flex flexDir="column">
                <PageArr router={router} click={() => setOpen.off()} />
                <Flex justifyContent="center" mt={px2vw(10)}>
                  <ButtonArr
                    click={() => setOpen.off()}
                    buttonList={buttonList}
                  />
                </Flex>
              </Flex>
              {/* 登录登出按钮 */}
              <Flex h={px2vw(27)} ml={px2vw(35)}>
                {isLogin ? (
                  // 登出
                  <Flex
                    onClick={() => {
                      setOpen.off();
                      setLogOut.on();
                    }}
                  >
                    <Image
                      src={logout}
                      w={px2vw(27)}
                      h={px2vw(27)}
                      mr={px2vw(20)}
                      my="auto"
                    />
                    <Text
                      fontSize={px2vw(14)}
                      lineHeight={px2vw(27)}
                      fontFamily="Orbitron"
                      fontWeight="600"
                      color="blue.100"
                    >
                      Log out
                    </Text>
                  </Flex>
                ) : (
                  // 登录
                  <Flex
                    onClick={() => {
                      setOpen.off();
                      setLoginModal.on();
                    }}
                  >
                    <Image
                      src={logout}
                      w={px2vw(27)}
                      h={px2vw(27)}
                      mr={px2vw(20)}
                      my="auto"
                      transform="rotate(180deg)"
                    />
                    <Text
                      fontSize={px2vw(14)}
                      lineHeight={px2vw(27)}
                      fontFamily="Orbitron"
                      fontWeight="600"
                      color="blue.100"
                    >
                      Log In
                    </Text>
                  </Flex>
                )}
              </Flex>
            </Flex>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
      {/* log out */}
      <LoginOut
        logOut={logOut}
        setLogOut={(boo: boolean) => (boo ? setLogOut.on() : setLogOut.off())}
        confirmLogOut={() => setIsLogin.off()}
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
      <FriendCode isShow={friendShow} setIsShow={() => setFriendShow.off()} />
    </Flex>
  );
}

export default React.memo(Index);
