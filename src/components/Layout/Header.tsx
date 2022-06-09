import React, { useState } from "react";
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
import BaseButton from "../BaseButton";
import styles from "./style.module.scss";
import LoginOut from "../LoginOut";
import LogIn from "../LogIn";
import MessageList, { messageItem } from "../MessageList";

function Index() {
  const [logOut, setLogOut] = useBoolean(false); // 登出弹窗
  const [loginModal, setLoginModal] = useBoolean(false); // 登陆弹窗
  const [isLogin, setIsLogin] = useBoolean(false); // 是否登陆
  const [notification] = useState(1); // 未读消息数量
  const [open, setOpen] = useBoolean(false);
  const newMessageList: messageItem[] = [
    {
      content:
        "You received an Reward  21 Gamefly token. Check it in your Gamifly wallet!",
      time: "12.02.2022",
    },
    {
      content:
        "You received an Reward  21 Gamefly token. Check it in your Gamifly wallet!",
      time: "12.02.2022",
    },
  ];
  const previousMessageList: messageItem[] = [
    {
      content:
        "You received an Reward  21 Gamefly token. Check it in your Gamifly wallet!",
      time: "12.02.2022",
    },
    {
      content:
        "You received an Reward  21 Gamefly token. Check it in your Gamifly wallet!",
      time: "12.02.2022",
    },
    {
      content:
        "You received an Reward  21 Gamefly token. Check it in your Gamifly wallet!",
      time: "12.02.2022",
    },
  ];

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
          >
            Earn Rewards
          </BaseButton>
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
            <MessageList messageList={newMessageList} />
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
