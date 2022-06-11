import React from "react";
import { Flex, Text, Image, FlexProps } from "@chakra-ui/react";
import px2vw from "@/utils/px2vw";
import cryptoIc from "@/assets/imgs/cryptoIcon.png";
import arrows from "@/assets/imgs/arrows.png";
import GamiflyWallet from "../GamiflyWallet";
import BaseButton from "../BaseButton";

export interface IProps extends FlexProps {
  nativePrice: string | number;
  nativeUnit: string;
  otherPrice: string | number;
  otherUnit: string;
  buyClick?: () => void;
}

function Index({
  nativePrice,
  nativeUnit,
  otherPrice,
  otherUnit,
  buyClick,
  ...prop
}: IProps) {
  return (
    <Flex flexDir="column" {...prop}>
      <Flex
        p={{ base: px2vw(15), lg: "15px" }}
        mb={{ base: px2vw(10), lg: "10px" }}
        h={{ base: px2vw(57), lg: "57px" }}
        alignItems="center"
        boxSizing="border-box"
        bgColor="black.600"
        w="full"
      >
        <Image
          src={cryptoIc}
          w={{ base: px2vw(26), lg: "26px" }}
          h={{ base: px2vw(26), lg: "26px" }}
          mr={{ base: px2vw(10), lg: "10px" }}
        />
        <Text
          fontFamily="Nunito"
          fontWeight="400"
          textStyle="16"
          color="white.100"
        >
          Infinity Wallet
        </Text>
      </Flex>
      <Flex
        flexDir="column"
        pos="relative"
        mb={{ base: px2vw(20), lg: "20px" }}
      >
        <GamiflyWallet
          withOutButton
          price={nativePrice}
          unit={nativeUnit}
          mb="3px"
        />
        <GamiflyWallet
          withOutButton
          price={otherPrice}
          unit={otherUnit}
          mb="3px"
        />
        <Flex
          w="23px"
          h="23px"
          borderRadius="50%"
          bgColor="black.100"
          flexDir="column"
          alignItems="center"
          justifyContent="center"
          m="auto"
          pos="absolute"
          left="0"
          right="0"
          top="0"
          bottom="0"
        >
          <Image src={arrows} w="5px" h="7px" transform="rotate(90deg)" />
          <Image src={arrows} w="5px" h="7px" transform="rotate(-90deg)" />
        </Flex>
      </Flex>
      <BaseButton
        display={{ base: "none", lg: "block" }}
        w={{ base: "full", lg: "314px" }}
        mt={{ base: px2vw(20), lg: "20px" }}
        fontFamily="Nunito"
        fontWeight="600"
        textStyle="16"
        onClick={() => buyClick?.()}
      >
        Buy
      </BaseButton>
    </Flex>
  );
}

export default React.memo(Index);
