import React from "react";
import { Box, Flex, Text, Image, useBoolean } from "@chakra-ui/react";
import { getI18nSSRProps, GetI18nServerSideProps } from "@/utils/i18n";
import { useRouter } from "next/router";
import px2vw from "@/utils/px2vw";
import Registration from "@/assets/imgs/Registration.webp";
import Registrationmob from "@/assets/imgs/Registrationmob.png";
import googleid from "@/assets/imgs/googleid.webp";
import facebook from "@/assets/imgs/facebook.png";
import metamask from "@/assets/imgs/metamask.webp";
import BaseModal from "@/components/BaseModal";
// 输入框组件
export const LoginItem = React.memo(
  ({ img, text, click }: { img: string; text: string; click: () => void }) => (
    <Flex
      w={{ base: "full", lg: "384px" }}
      h={{ base: px2vw(68), lg: "68px" }}
      lineHeight={{ base: px2vw(48), lg: "48px" }}
      mx={{ base: px2vw(0), lg: "8px" }}
      my={{ base: px2vw(4), lg: "4px" }}
      p={{ base: px2vw(8), lg: "8px" }}
      border="2px solid"
      fontFamily="Nunito"
      fontWeight="700"
      fontSize={{ base: px2vw(18), lg: "18px" }}
      color="blue.100"
      opacity="0.8"
      textDecoration="none"
      _hover={{
        boxShadow: "0px 2px 50px #3d50ff",
      }}
      cursor="pointer"
      onClick={() => click()}
    >
      <Image src={img} />
      <Text>{text}</Text>
    </Flex>
  )
);

function App() {
  const [showTermsOfService, setShowTermsOfService] = useBoolean(false);
  const [showPrivacyPolicy, setShowPrivacyPolicy] = useBoolean(false);
  const router = useRouter();
  return (
    <Box
      w="full"
      h={{ base: "inherit", lg: "100vh" }}
      bgColor="black.1000"
      bgImage={{ base: Registrationmob, lg: Registration }}
      bgSize={{ base: `${px2vw(217)} ${px2vw(300)}`, lg: "100% 100%" }}
      bgRepeat="no-repeat"
      bgPos="center top"
      pl={{ base: px2vw(15), lg: "80px" }}
      pr={{ base: px2vw(12), lg: "0" }}
      pt={{ base: px2vw(300), lg: "0" }}
      pb={{ base: px2vw(35), lg: "0" }}
    >
      <Flex
        flexDirection="column"
        w={{ base: "full", lg: "384px" }}
        m={{ base: 0, lg: "12px" }}
        mt={{ base: px2vw(0), lg: "386px" }}
      >
        <Text
          fontSize={{ base: px2vw(56), lg: "60px" }}
          mb={{ base: px2vw(4), lg: "4px" }}
          lineHeight="1"
          fontWeight="700"
          color="white.100"
        >
          Continue
        </Text>
        {/* 登陆按钮组 */}
        <Flex
          w={{ base: "full", lg: "fit-content" }}
          flexDirection="column"
          mb={{ base: px2vw(24), lg: "24px" }}
        >
          <LoginItem
            img={googleid}
            text="Google ID"
            click={() => router.push("/games")}
          />
          <LoginItem
            img={facebook}
            text="Facebook"
            click={() => router.push("/games")}
          />
          <LoginItem
            img={metamask}
            text="Metamask"
            click={() => router.push("/games")}
          />
        </Flex>
        {/* 游客登陆 */}
        <Flex flexDir="column" mb={{ base: px2vw(56), lg: "56px" }}>
          <Text
            textAlign="center"
            textStyle="14"
            fontFamily="Nunito"
            color="white.100"
            opacity={0.65}
            lineHeight={{ base: px2vw(20), lg: "20px" }}
            mb={{ base: px2vw(7), lg: "7px" }}
          >
            Or
          </Text>
          <Text
            textAlign="center"
            textStyle="18"
            fontFamily="Nunito"
            cursor="pointer"
            opacity={0.8}
            lineHeight={{ base: px2vw(20), lg: "20px" }}
          >
            Play as Guest
          </Text>
        </Flex>
        {/* 协议 */}
        <Text
          color="blue.100"
          fontFamily="Nunito"
          textStyle="14"
          fontWeight="400"
          textAlign="center"
          lineHeight={{ base: px2vw(20), lg: "20px" }}
        >
          By continuing you agree to the{" "}
          <Text
            display="inline-flex"
            fontWeight="700"
            textDecor="underline"
            cursor="pointer"
            onClick={() => setShowTermsOfService.on()}
          >
            Terms of Service
          </Text>{" "}
          and{" "}
          <Text
            display="inline-flex"
            fontWeight="700"
            textDecor="underline"
            cursor="pointer"
            onClick={() => setShowPrivacyPolicy.on()}
          >
            Privacy Policy
          </Text>
        </Text>
      </Flex>
      {/* Terms of Service */}
      <BaseModal
        isShow={showTermsOfService}
        close={() => setShowTermsOfService.off()}
      >
        <Text
          fontFamily="Orbitron"
          color="white.100"
          fontWeight="600"
          fontSize={{ base: px2vw(22), lg: "22px" }}
          lineHeight={{ base: px2vw(28), lg: "28px" }}
          mb={{ base: px2vw(20), lg: "20px" }}
        >
          Terms and Conditions
        </Text>
        <Text
          fontFamily="Nunito"
          color="white.500"
          fontWeight="400"
          fontSize={{ base: px2vw(16), lg: "16px" }}
          lineHeight={{ base: px2vw(22), lg: "22px" }}
          mb={{ base: px2vw(20), lg: "20px" }}
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </Text>
        <Text
          fontFamily="Nunito"
          color="white.500"
          fontWeight="400"
          fontSize={{ base: px2vw(16), lg: "16px" }}
          lineHeight={{ base: px2vw(22), lg: "22px" }}
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </Text>
      </BaseModal>
      {/* Privacy Policy */}
      <BaseModal
        isShow={showPrivacyPolicy}
        close={() => setShowPrivacyPolicy.off()}
      >
        <Text
          fontFamily="Orbitron"
          color="white.100"
          fontWeight="600"
          fontSize={{ base: px2vw(22), lg: "22px" }}
          lineHeight={{ base: px2vw(28), lg: "28px" }}
          mb={{ base: px2vw(20), lg: "20px" }}
        >
          Privacy Policy
        </Text>
        <Text
          fontFamily="Nunito"
          color="white.500"
          fontWeight="400"
          fontSize={{ base: px2vw(16), lg: "16px" }}
          lineHeight={{ base: px2vw(22), lg: "22px" }}
          mb={{ base: px2vw(20), lg: "20px" }}
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </Text>
        <Text
          fontFamily="Nunito"
          color="white.500"
          fontWeight="400"
          fontSize={{ base: px2vw(16), lg: "16px" }}
          lineHeight={{ base: px2vw(22), lg: "22px" }}
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </Text>
      </BaseModal>
    </Box>
  );
}

export const getServerSideProps = async (ctx: GetI18nServerSideProps) => {
  return {
    props: { ...(await getI18nSSRProps(ctx, ["home"])) },
  };
};
export default App;
