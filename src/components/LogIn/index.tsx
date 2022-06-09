import React from "react";
import { Text, Image, Flex } from "@chakra-ui/react";
import px2vw from "@/utils/px2vw";
import faceBookSvg from "@/assets/imgs/facebook.svg";
import googleSvg from "@/assets/imgs/google.svg";
import metaMaskSvg from "@/assets/imgs/meta.svg";
import BaseModal from "../BaseModal";

export interface IProps {
  loginModal: boolean;
  setLoginModal: (boo: boolean) => void;
  setIsLogin?: (boo: boolean) => void;
}

function Index({ loginModal, setLoginModal, setIsLogin }: IProps) {
  // 登陆弹窗
  const LoginItem = React.memo(
    ({
      icon,
      name,
      withOutMb,
      click,
    }: {
      icon: string;
      name: string;
      withOutMb?: boolean;
      click: () => void;
    }) => (
      <Flex
        w="full"
        bgColor="whiteAlpha.200"
        cursor="pointer"
        h={{ base: px2vw(70), lg: "70px" }}
        px={{ base: px2vw(15), lg: "15px" }}
        mb={withOutMb ? "0" : { base: px2vw(10), lg: "10px" }}
        onClick={() => {
          click();
          setLoginModal(false);
        }}
      >
        <Image
          src={icon}
          my="auto"
          w={{ base: px2vw(50), lg: "50px" }}
          h={{ base: px2vw(50), lg: "50px" }}
          mr={{ base: px2vw(10), lg: "10px" }}
        />
        <Text
          fontFamily="Nunito"
          fontWeight="600"
          textAlign="left"
          color="white.100"
          fontSize={{ base: px2vw(16), lg: "16px" }}
          lineHeight={{ base: px2vw(70), lg: "70px" }}
        >
          {name}
        </Text>
      </Flex>
    )
  );
  return (
    <BaseModal
      w={{ base: px2vw(345), lg: "345px" }}
      h={{ base: px2vw(338), lg: "338px" }}
      mt={{ base: px2vw(200), lg: "200px" }}
      isShow={loginModal}
      close={() => setLoginModal(false)}
    >
      <Text
        fontFamily="Orbitron"
        fontWeight="600"
        textAlign="left"
        color="white.100"
        fontSize={{ base: px2vw(16), lg: "16px" }}
        mb={{ base: px2vw(24), lg: "24px" }}
      >
        Connect with
      </Text>
      <LoginItem
        icon={googleSvg}
        name="Google ID"
        click={() => setIsLogin?.(true)}
      />
      <LoginItem
        icon={faceBookSvg}
        name="Facebook"
        click={() => setIsLogin?.(true)}
      />
      <LoginItem
        withOutMb
        icon={metaMaskSvg}
        name="Meta Mask"
        click={() => setIsLogin?.(true)}
      />
    </BaseModal>
  );
}

export default React.memo(Index);
