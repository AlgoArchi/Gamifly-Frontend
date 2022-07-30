import React from "react";
import { Flex, Text, Image, FlexProps, useToast } from "@chakra-ui/react";
import px2vw from "@/utils/px2vw";
import invite from "@/assets/imgs/invite.png";
// import share from "@/assets/imgs/share.png";
import copy from "@/assets/imgs/copy.png";
import { getStore } from "@/utils/storage";
import copyFunction from "copy-to-clipboard";
import BaseModal from "../BaseModal";
import BaseButton from "../BaseButton";

export interface IProps extends FlexProps {
  isShow: boolean;
  setIsShow: () => void;
}

function Index({ isShow, setIsShow, ...prop }: IProps) {
  const toast = useToast();
  return (
    <BaseModal
      isShow={isShow}
      close={() => setIsShow()}
      p="0"
      zIndex={3}
      w={{ base: `calc(100% - ${px2vw(30)})`, lg: "454px" }}
      h={{ base: "513px", lg: "561px" }}
      {...prop}
    >
      <Flex
        flexDir="column"
        alignItems="center"
        fontFamily="Orbitron"
        py={{ base: px2vw(35), lg: "35px" }}
      >
        <Image
          src={invite}
          w="full"
          h={{ base: px2vw(217), lg: "287px" }}
          pb={{ base: px2vw(15), lg: "15px" }}
        />
        <Text
          fontWeight="600"
          textStyle="22"
          mb={{ base: px2vw(20), lg: "20px" }}
        >
          Your code
        </Text>
        <Text
          fontWeight="600"
          textStyle="26"
          color="green.100"
          letterSpacing={5}
          mb={{ base: px2vw(20), lg: "20px" }}
        >
          {getStore("referralCode")}
        </Text>
        <Text
          fontWeight="400"
          textStyle="16"
          textAlign="center"
          w={{ base: px2vw(300), lg: "420px" }}
          lineHeight={{ base: px2vw(22), lg: "22px" }}
          mb={{ base: px2vw(20), lg: "20px" }}
        >
          Use your code to invite friends to the app. You will get a reward for
          each friend you invite.
        </Text>
        <Flex
          px={{ base: px2vw(25), lg: "30px" }}
          w="full"
          boxSizing="border-box"
          justifyContent="center"
        >
          {/* <BaseButton
            w={{ base: px2vw(140), lg: "190px" }}
            border="1px solid"
            borderColor="blue.100"
            bgColor="transparent"
            color="blue.100"
            boxShadow="none"
            _hover={{
              borderColor: "blue.100",
              bgColor: "transparent",
              color: "blue.100",
              boxShadow: "none",
            }}
            _active={{
              borderColor: "blue.100",
              bgColor: "transparent",
              color: "blue.100",
              boxShadow: "none",
            }}
            onClick={() => setIsShow()}
          >
            <Image
              src={share}
              w={{ base: px2vw(19.5), lg: "19.5px" }}
              h={{ base: px2vw(18), lg: "18px" }}
              mr={{ base: px2vw(5), lg: "5px" }}
            />
            Share
          </BaseButton> */}
          <BaseButton
            w={{ base: px2vw(140), lg: "190px" }}
            border="1px solid"
            borderColor="blue.100"
            bgColor="transparent"
            color="blue.100"
            boxShadow="none"
            _hover={{
              borderColor: "blue.100",
              bgColor: "transparent",
              color: "blue.100",
              boxShadow: "none",
            }}
            _active={{
              borderColor: "blue.100",
              bgColor: "transparent",
              color: "blue.100",
              boxShadow: "none",
            }}
            onClick={() => {
              copyFunction(
                `https://www.gamifly.co/games?inviteCode=${getStore(
                  "referralCode"
                )}`
              );
              toast({
                title: "success",
                status: "success",
                duration: 3000,
                isClosable: true,
              });
            }}
          >
            <Image
              src={copy}
              w={{ base: px2vw(19.5), lg: "19.5px" }}
              h={{ base: px2vw(18), lg: "18px" }}
              mr={{ base: px2vw(5), lg: "5px" }}
            />
            Copy Link
          </BaseButton>
        </Flex>
      </Flex>
    </BaseModal>
  );
}

export default React.memo(Index);
