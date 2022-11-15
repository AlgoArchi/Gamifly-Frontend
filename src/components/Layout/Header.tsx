import React, { useEffect, useState } from "react";
import {
  Drawer,
  DrawerBody,
  DrawerContent,
  Flex,
  HStack,
  Image,
  Text,
  useBoolean,
} from "@chakra-ui/react";
import notificationIcon from "@/assets/imgs/notificationIcon.png";
import transferIcon from "@/assets/imgs/transfer.webp";
import close from "@/assets/imgs/greenClose.webp";
import userProfile from "@/assets/imgs/userProfile.png";
import buttonBg from "@/assets/imgs/buttonBg.png";
import footer1 from "@/assets/imgs/footer1.png";
import footer2 from "@/assets/imgs/footer2.png";
import footer3 from "@/assets/imgs/footer3.png";
import footer4 from "@/assets/imgs/footer4.png";
import logo from "@/assets/imgs/logo.png";
import menuGame from "@/assets/imgs/menuGame.png";
import menuNFT from "@/assets/imgs/menuNFT.png";
import menuTou from "@/assets/imgs/menuTou.png";
// import menuAbout from "@/assets/imgs/menuAbout.png";
import BaseButton from "../BaseButton";
import styles from "./style.module.scss";
// import LoginOut from "../LoginOut";
import LogIn from "../LogIn";
import MessageList, { messageItem } from "../MessageList";
import { setStore } from "@/utils/storage";
// import { useWeb3React } from "@web3-react/core";
// import { connectorLocalStorageKey } from "@/connect/connectors";
import globalStore from "@/stores/global";
import { useRouter } from "next/router";

export interface IProps {
  notificationList: any;
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
  // {
  //   name: "TOP UP & WITHDRAW",
  //   icon: menuWithdraw,
  //   path: "/transfer",
  // },
];

function Index({ notificationList }: IProps) {
  const router = useRouter();
  const { userInfo } = globalStore();
  // const { deactivate } = useWeb3React();
  // const [logOut, setLogOut] = useBoolean(false); // 登出弹窗
  const [loginModal, setLoginModal] = useBoolean(false); // 登陆弹窗
  const [isLogin, setIsLogin] = useBoolean(userInfo?.id); // 是否登陆
  // const [notification, setNotification] = useState(1); // 未读消息数量
  const [open, setOpen] = useBoolean(false);
  const [newMessageList, setNewMessageList] = useState<messageItem[]>([]);
  const [previousMessageList, setPreviousMessageList] = useState<messageItem[]>(
    []
  );
  const [loginLoading, setLoginLoading] = useBoolean(false);

  // const disconnectWallet = async () => {
  //   try {
  //     await deactivate();
  //     deleteStore(connectorLocalStorageKey);
  //     setStore("isLogin", false);
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };

  useEffect(() => {
    if (userInfo && userInfo?.id) {
      setIsLogin.on();
    } else {
      setIsLogin.off();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userInfo]);

  useEffect(() => {
    if (notificationList && notificationList.length > 0) {
      const noList: messageItem[] = [];
      const list: messageItem[] = [];
      notificationList.map((item: any) => {
        item?.status === 0 ? noList.push(item) : list.push(item);
      });
      setNewMessageList(noList);
      setPreviousMessageList(list);
      // setNotification(noList.length);
    }
  }, [notificationList]);

  return (
    <Flex
      display={{ base: "none", lg: "flex" }}
      w="full"
      h="150px"
      py="50px"
      pos="fixed"
      top="0"
      left="0"
      backdropFilter="blur(15px)"
      zIndex="9"
    >
      <Flex
        justifyContent="space-between"
        alignItems="center"
        w="1280px"
        mx="auto"
      >
        {/* 左侧 */}
        <Flex alignItems="center">
          <Image
            src={logo}
            w="163px"
            h="37px"
            mr="50px"
            cursor="pointer"
            onClick={() => router.push("/")}
          />
          <HStack spacing="50px" alignItems="center">
            {pageList.map((item: pageItem, index: number) => {
              return (
                <Text
                  key={index}
                  fontSize="15px"
                  fontWeight="bolder"
                  lineHeight="15px"
                  fontFamily="Eurostile"
                  cursor="pointer"
                  _hover={{
                    color: "green.1000",
                  }}
                  _active={{
                    color: "green.1000",
                  }}
                  onClick={() => router.push(item?.path)}
                >
                  {item?.name}
                </Text>
              );
            })}
          </HStack>
        </Flex>
        {/* 右侧 */}
        <Flex alignItems="center">
          <HStack spacing="13px" mr="13px">
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
                window.open("https://instagram.com/gamifly?igshid=YmMyMTA2M2Y=")
              }
            >
              <Image src={footer2} />
            </Flex>
          </HStack>
          {isLogin ? (
            <BaseButton
              className={styles.notificationIcon}
              w="140px"
              h="40px"
              bgColor="black.100"
              borderRadius="12px"
              boxShadow="none"
              pos="relative"
              _hover={{
                boxShadow: "0px 2px 20px RGBA(203, 252, 98, 0.28)",
              }}
              _active={{
                boxShadow: "0px 2px 20px RGBA(203, 252, 98, 0.28)",
              }}
              onClick={() => setOpen.on()}
            >
              <Image w="32px" h="32px" src={notificationIcon} />
              <Text
                fontFamily="Eurostile"
                fontSize="13px"
                lineHeight="13px"
                mt="3px"
                color="white.100"
              >
                NOTIFICATIONS
              </Text>
            </BaseButton>
          ) : (
            <BaseButton
              isLoading={loginLoading}
              bgImage={buttonBg}
              bgSize="100%"
              loadingText="Log In"
              w="180px"
              h="50px"
              bgColor="transparent"
              boxShadow="none"
              fontFamily="Eurostile"
              fontSize="17px"
              fontWeight="800"
              color="black.1700"
              _hover={{
                bgColor: "transparent",
              }}
              _active={{
                bgColor: "transparent",
              }}
              onClick={() => setLoginModal.on()}
            >
              Log In
            </BaseButton>
          )}

          {isLogin && (
            <BaseButton
              px={{ base: "4px", lg: "4px" }}
              ml={{ base: "11px", lg: "13px" }}
              h="40px"
              bgColor="green.1000"
              borderRadius="12px"
              boxShadow="none"
              pos="relative"
              _hover={{
                boxShadow: "0px 2px 20px RGBA(203, 252, 98, 0.28)",
              }}
              _active={{
                boxShadow: "0px 2px 20px RGBA(203, 252, 98, 0.28)",
              }}
              onClick={() => router.push("/transfer")}
            >
              <Image
                filter="brightness(100) invert(1)"
                w="20px"
                h="20px"
                mr={{ base: "2px", lg: "3px" }}
                src={transferIcon}
              />
              <Text
                fontFamily="Eurostile"
                fontSize="15px"
                lineHeight="13px"
                fontWeight="1000"
                color="black.100"
              >
                TOP UP & WITHDRAW
              </Text>
            </BaseButton>
          )}

          {/* 头像 */}
          {isLogin && (
            <Image
              src={
                userInfo?.avatar
                  ? `${window.imgUrl.imageUrl}${userInfo?.avatar}`
                  : userProfile
              }
              w="45px"
              h="45px"
              ml="13px"
              my="auto"
              borderRadius="50%"
              cursor="pointer"
              onClick={() => router.push("/profile")}
            />
          )}
        </Flex>
        {/* login modal */}
        <LogIn
          loginModal={loginModal}
          setLoginModal={(boo: boolean) =>
            boo ? setLoginModal.on() : setLoginModal.off()
          }
          setIsLogin={(boo: boolean) => {
            {
              console.log(boo, "收到的boo");
              if (boo) {
                setStore("isLogin", true);
                setIsLogin.on();
              } else {
                setStore("isLogin", false);
                setIsLogin.off();
              }
            }
          }}
          setLoginLoading={(boo: boolean) => {
            boo ? setLoginLoading.on() : setLoginLoading.off();
          }}
        />
        {/* Drawer */}
        <Drawer
          isOpen={open}
          size="sm"
          placement="right"
          onClose={() => setOpen.off()}
        >
          <DrawerContent w="355px" bgColor="black.700" pt="50px" px="15px">
            <DrawerBody h="calc(100vh - 50px" p="0">
              {/* 标题及关闭按钮 */}
              <Flex justifyContent="space-between" mb="15px">
                <Text
                  fontFamily="Orbitron"
                  fontSize="22px"
                  fontWeight="600"
                  lineHeight="30px"
                  color="white.100"
                >
                  Notifications
                </Text>
                <Image
                  src={close}
                  w="30px"
                  h="30px"
                  cursor="pointer"
                  onClick={() => setOpen.off()}
                />
              </Flex>
              {/* 列表 */}
              <Text
                fontFamily="Nunito"
                textStyle="14"
                fontWeight="400"
                color="white.500"
                mb="10px"
              >
                New
              </Text>
              <MessageList type={0} messageList={newMessageList} />
              <Text
                fontFamily="Nunito"
                textStyle="14"
                fontWeight="400"
                color="white.500"
                my="10px"
              >
                Previous
              </Text>
              <MessageList messageList={previousMessageList} />
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </Flex>
    </Flex>
  );
}

export default React.memo(Index);
