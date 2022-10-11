import React from "react";
import px2vw from "@/utils/px2vw";
import { Text, Flex, FlexProps } from "@chakra-ui/react";

function Index({ ...prop }: FlexProps) {
  return (
    <Flex flexDir="column" {...prop}>
      {/* title */}
      <Flex
        fontFamily="Eurostile"
        fontWeight="bolder"
        color="green.1000"
        fontSize={{ base: px2vw(17), lg: "17px" }}
        lineHeight={{ base: px2vw(17), lg: "17px" }}
        mb={{ base: px2vw(12), lg: "22px" }}
      >
        <Text
          w={{ base: px2vw(96), lg: "96px" }}
          mr={{ base: px2vw(37), lg: "19px" }}
          mt={{ base: px2vw(5), lg: "5px" }}
        >
          ACTION
        </Text>
        <Text mt={{ base: px2vw(5), lg: "5px" }}>REWARDS</Text>
      </Flex>
      {/* sign in */}
      <Flex
        fontFamily="SofiaPro"
        fontWeight="500"
        color="white.100"
        fontSize={{ base: px2vw(14), lg: "14px" }}
        lineHeight={{ base: px2vw(14), lg: "14px" }}
        mb={{ base: px2vw(12), lg: "12px" }}
      >
        <Text
          w={{ base: px2vw(96), lg: "96px" }}
          mr={{ base: px2vw(37), lg: "19px" }}
        >
          Sign in
        </Text>
        <Text>0.01 USDC</Text>
      </Flex>
      {/* Daily log in */}
      <Flex
        fontFamily="SofiaPro"
        fontWeight="500"
        color="white.100"
        fontSize={{ base: px2vw(14), lg: "14px" }}
        lineHeight={{ base: px2vw(14), lg: "14px" }}
        mb={{ base: px2vw(12), lg: "12px" }}
      >
        <Text
          w={{ base: px2vw(96), lg: "96px" }}
          mr={{ base: px2vw(37), lg: "19px" }}
        >
          Daily log in
        </Text>
        <Text>0.01 USDC</Text>
      </Flex>
      {/* Play any game */}
      <Flex
        fontFamily="SofiaPro"
        fontWeight="500"
        color="white.100"
        fontSize={{ base: px2vw(14), lg: "14px" }}
        lineHeight={{ base: px2vw(14), lg: "14px" }}
        mb={{ base: px2vw(12), lg: "12px" }}
      >
        <Text
          w={{ base: px2vw(96), lg: "96px" }}
          mr={{ base: px2vw(37), lg: "19px" }}
        >
          Play any game
        </Text>
        <Text>0.01 USDC per 10min played</Text>
      </Flex>
      {/* Referral */}
      <Flex
        fontFamily="SofiaPro"
        fontWeight="500"
        color="white.100"
        fontSize={{ base: px2vw(14), lg: "14px" }}
        lineHeight={{ base: px2vw(14), lg: "14px" }}
        mb={{ base: px2vw(12), lg: "12px" }}
      >
        <Text
          w={{ base: px2vw(96), lg: "96px" }}
          mr={{ base: px2vw(37), lg: "19px" }}
        >
          Play any game
        </Text>
        <Flex flexDir="column">
          <Text>0.01 USDC per referral</Text>
          <Text>(first 100 referrals)</Text>
        </Flex>
      </Flex>
    </Flex>
  );
}

export default React.memo(Index);
