import React from "react";
import { Box, Flex, Text, Image } from "@chakra-ui/react";
import { getI18nSSRProps, GetI18nServerSideProps } from "@/utils/i18n";
import px2vw from "@/utils/px2vw";
import Landingpagedesktop from "@/assets/imgs/Landingpagedesktop.webp";
import Landingpagemobile from "@/assets/imgs/Landingpagemobile.webp";
import logo from "@/assets/imgs/logo.webp";
import BaseButton from "@/components/BaseButton";
import { useRouter } from "next/router";

function App() {
  const router = useRouter();
  return (
    <Box
      w="full"
      h="100vh"
      bgImage={{ base: Landingpagemobile, lg: Landingpagedesktop }}
      bgSize="100% 100%"
    >
      <Flex
        w={{ base: "full", lg: "720px" }}
        px={{ base: px2vw(15), lg: "16px" }}
        h="inherit"
        flexDirection="column"
        justifyContent={{ base: "space-between", lg: "center" }}
        bgColor={{ base: "none", lg: "black.300" }}
      >
        <Image
          src={logo}
          w={{ base: px2vw(300), lg: "80%" }}
          mt={{ base: px2vw(48), lg: "0" }}
        />
        <Flex flexDirection="column" mt={{ base: 0, lg: "32px" }}>
          <Text
            fontWeight="800"
            fontSize={{ base: px2vw(36), lg: "60px" }}
            lineHeight="1"
            color="white.100"
          >
            Web3 Rewards For All
          </Text>
          <BaseButton
            w={{ base: "full", lg: "400px" }}
            h={{ base: px2vw(68), lg: "68px" }}
            fontSize={{ base: px2vw(20), lg: "20px" }}
            fontFamily="Nunito"
            fontWeight="700"
            mt="32px"
            onClick={() => router.push("/login")}
          >
            Get Reward
          </BaseButton>
        </Flex>
        {/* 占位符，用于内容绝对居中 */}
        <Image
          display={{ base: "block", lg: "none" }}
          mb={px2vw(16)}
          opacity="0"
          src={logo}
          w={{ base: px2vw(300), lg: "80%" }}
        />
      </Flex>
    </Box>
  );
}

export const getServerSideProps = async (ctx: GetI18nServerSideProps) => {
  return {
    props: { ...(await getI18nSSRProps(ctx, ["home"])) },
  };
};
export default App;
