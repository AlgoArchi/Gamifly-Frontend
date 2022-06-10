import React from "react";
import { useRouter } from "next/router";
import { Container, Flex } from "@chakra-ui/react";
import px2vw from "@/utils/px2vw";
import LeftMenu from "./LeftMenu";
import Header from "./Header";
import HeaderMobile from "./HeaderMobile";

export interface LayoutProps {
  children: any;
}

function Index({ children }: LayoutProps) {
  const router = useRouter();
  const loginRouter = router?.pathname !== "/" && router?.pathname !== "/login";

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
        pr={loginRouter ? { base: px2vw(15), lg: "20px" } : 0}
        flexDirection="column"
        justifyContent="space-start"
        zIndex={1}
      >
        {/* 顶部Header */}
        {loginRouter && (
          <>
            <Header />
            <HeaderMobile />
          </>
        )}
        {/* 页面 */}
        {loginRouter ? (
          <Flex
            py={{ base: px2vw(30), lg: "20px" }}
            minH={{
              base: `calc(100vh - ${px2vw(55)})`,
              lg: "calc(100vh - 72px)",
            }}
          >
            {children}
          </Flex>
        ) : (
          children
        )}
      </Flex>
    </Flex>
  );
}

export default React.memo(Index);
