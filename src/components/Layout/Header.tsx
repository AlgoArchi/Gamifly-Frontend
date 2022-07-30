import React, { useEffect, useState } from "react";
import {
  Box,
  Drawer,
  DrawerBody,
  DrawerContent,
  Flex,
  HStack,
  Image,
  Text,
  useBoolean,
} from "@chakra-ui/react";
import px2vw from "@/utils/px2vw";
import notificationIcon from "@/assets/imgs/notificationIcon.webp";
import close from "@/assets/imgs/greenClose.webp";
import userProfile from "@/assets/imgs/userProfile.png";
import BaseButton from "../BaseButton";
import styles from "./style.module.scss";
import LoginOut from "../LoginOut";
import LogIn from "../LogIn";
import MessageList, { messageItem } from "../MessageList";
import { deleteStore, setStore } from "@/utils/storage";
import { useWeb3React } from "@web3-react/core";
import { connectorLocalStorageKey } from "@/connect/connectors";
import globalStore from "@/stores/global";
import { useRouter } from "next/router";

export interface IProps {
  notificationList: any;
  loginOutClick: () => void;
}

function Index({ notificationList, loginOutClick }: IProps) {
  const router = useRouter();
  const { userInfo } = globalStore();
  const { deactivate } = useWeb3React();
  const [logOut, setLogOut] = useBoolean(false); // 登出弹窗
  const [loginModal, setLoginModal] = useBoolean(false); // 登陆弹窗
  const [isLogin, setIsLogin] = useBoolean(userInfo?.id); // 是否登陆
  const [notification, setNotification] = useState(1); // 未读消息数量
  const [open, setOpen] = useBoolean(false);
  const [newMessageList, setNewMessageList] = useState<messageItem[]>([]);
  const [previousMessageList, setPreviousMessageList] = useState<messageItem[]>(
    []
  );
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
      setNotification(noList.length);
    }
  }, [notificationList]);

  return (
    <Flex
      display={{ base: "none", lg: "flex" }}
      justifyContent="flex-end"
      w="full"
      h={{ base: px2vw(40), lg: "72px" }}
    >
      {isLogin ? (
        <HStack spacing="20px">
          <BaseButton
            className={styles.notificationIcon}
            w="64px"
            h="52px"
            border="2px solid"
            borderColor="green.100"
            bgColor="transparent"
            boxShadow="none"
            pos="relative"
            _hover={{
              bgColor: "green.100",
              boxShadow: "0px 2px 50px #5EC6B8",
            }}
            _active={{
              bgColor: "green.100",
              boxShadow: "0px 2px 26px #5EC6B8",
            }}
            onClick={() => setOpen.on()}
          >
            <Image src={notificationIcon} />
            {notification > 0 && (
              <Box
                w="10px"
                h="10px"
                borderRadius="50%"
                bgColor="green.100"
                pos="absolute"
                top="12px"
                right="19px"
              />
            )}
          </BaseButton>
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
            onClick={() => setLogOut.on()}
          >
            Log Out
          </BaseButton>
        </HStack>
      ) : (
        <HStack>
          <BaseButton
            isLoading={loginLoading}
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
            onClick={() => setLoginModal.on()}
          >
            Log In
          </BaseButton>
        </HStack>
      )}
      {/* log out */}
      <LoginOut
        logOut={logOut}
        setLogOut={(boo: boolean) => (boo ? setLogOut.on() : setLogOut.off())}
        confirmLogOut={() => {
          setIsLogin.off();
          disconnectWallet();
          loginOutClick();
          setLoginLoading.off();
        }}
      />
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
      <Image
        src={
          userInfo?.avatar
            ? `${window.imgUrl.imageUrl}${userInfo?.avatar}`
            : userProfile
        }
        w="52px"
        h="52px"
        ml="15px"
        my="auto"
        borderRadius="50%"
        cursor="pointer"
        onClick={() => router.push("/profile")}
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
  );
}

export default React.memo(Index);
