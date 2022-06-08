import React, { useState } from "react";
import { useRouter } from "next/router";
import {
  Container,
  Flex,
  HStack,
  useBoolean,
  Image,
  Box,
  Text,
} from "@chakra-ui/react";
import px2vw from "@/utils/px2vw";
import notificationIcon from "@/assets/imgs/notificationIcon.webp";
import LeftMenu from "./LeftMenu";
import BaseButton from "../BaseButton";
import styles from "./style.module.scss";
import BaseModal from "../BaseModal";

export interface LayoutProps {
  children: any;
}

function Index({ children }: LayoutProps) {
  const router = useRouter();
  const loginRouter = router?.pathname !== "/" && router?.pathname !== "/login";
  const [logOut, setLogOut] = useBoolean(false); // 是否登陆
  const [isLogin, setIsLogin] = useBoolean(false); // 是否登陆
  const [notification] = useState(1); // 未读消息数量
  return (
    <Flex
      w="full"
      justifyContent="flex-start"
      bg="black.900"
      pos="relative"
      overflowX="hidden"
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
            right={{ base: px2vw(-100), lg: "-100px" }}
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
        w={loginRouter ? { base: "full", lg: "calc(100% - 237px)" } : "full"}
        pl={loginRouter ? { base: px2vw(15), lg: "20px" } : 0}
        pr={loginRouter ? { base: px2vw(15), lg: "40px" } : 0}
        flexDirection="column"
        justifyContent="space-start"
        zIndex={1}
      >
        {/* 顶部Header */}
        {loginRouter && (
          <Flex
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
                  onClick={() => setIsLogin.on()}
                >
                  Log In
                </BaseButton>
              </HStack>
            )}
          </Flex>
        )}
        {/* 页面 */}
        {loginRouter ? (
          <Flex pt={{ base: px2vw(18), lg: "20px" }} h="calc(100vh - 72px)">
            {children}
          </Flex>
        ) : (
          children
        )}
        {/* log out */}
        <BaseModal
          isShow={logOut}
          close={() => setLogOut.off()}
          w={{ base: px2vw(336), lg: "336px" }}
          h={{ base: px2vw(180), lg: "180px" }}
          mt={{ base: "0", lg: "200px" }}
          px="0"
        >
          <Flex flexDir="column">
            <Text
              fontFamily="Orbitron"
              fontWeight="600"
              textAlign="center"
              color="white.100"
              fontSize={{ base: px2vw(22), lg: "22px" }}
              mb={{ base: px2vw(30), lg: "30px" }}
            >
              Log out?
            </Text>
            <Flex justifyContent="space-between">
              <BaseButton
                w={{ base: px2vw(130), lg: "130px" }}
                fontFamily="Nunito"
                fontSize="16px"
                fontWeight="600"
                onClick={() => setLogOut.off()}
              >
                Cancel
              </BaseButton>
              <BaseButton
                w={{ base: px2vw(130), lg: "130px" }}
                fontFamily="Nunito"
                fontSize="16px"
                fontWeight="600"
                bgColor="transparent"
                border="2px solid"
                borderColor="blue.100"
                color="blue.100"
                onClick={() => {
                  setIsLogin.off();
                  setLogOut.off();
                }}
              >
                Log out
              </BaseButton>
            </Flex>
          </Flex>
        </BaseModal>
      </Flex>
    </Flex>
  );
}

export default React.memo(Index);
