import React from "react";
import { Flex, Text } from "@chakra-ui/react";
import px2vw from "@/utils/px2vw";

function Index() {
  return (
    <Flex w="full" minH="100vh" bgColor="#333" textTransform="uppercase">
      <Flex
        w={{ base: "full", lg: "1280px" }}
        py={{ base: px2vw(30), lg: "70px" }}
        px={{ base: px2vw(20), lg: "90px" }}
        fontSize={{ base: px2vw(20), lg: "20px" }}
        lineHeight={{ base: px2vw(25), lg: "25px" }}
        flexDir="column"
        mx="auto"
        boxSizing="border-box"
        fontFamily="Orbitron"
        fontWeight="700"
      >
        <Text mb={{ base: px2vw(30), lg: "30px" }}>Game rules</Text>
        <Text mb={{ base: px2vw(10), lg: "10px" }}>
          1. only limited to players in philippines
        </Text>
        <Text mb={{ base: px2vw(10), lg: "10px" }}>
          2. prizes will be transferred via drops or bank transfer
        </Text>
        <Text mb={{ base: px2vw(10), lg: "10px" }}>
          3. Gamifly reserve the right to reward or not reward users.
        </Text>
        <Text>
          4. All terms and conditions are expressly served under terms of
          service and privacy policies
        </Text>
      </Flex>
    </Flex>
  );
}

export default React.memo(Index);
