import React from "react";
import { Flex, Image, Text } from "@chakra-ui/react";
import px2vw from "@/utils/px2vw";
import pageOneCenter from "@/assets/imgs/pageOneCenter.png";

function Index() {
  return (
    <Flex w="full" minH="100vh" bgColor="green.800" textTransform="uppercase">
      <Flex
        w={{ base: "full", lg: "1280px" }}
        px={{ base: px2vw(20), lg: "60px" }}
        flexDir="column"
        mx="auto"
        boxSizing="border-box"
      >
        <Text
          fontFamily="Orbitron"
          fontWeight="700"
          textAlign="center"
          color="black.100"
          mb={{ base: px2vw(30), lg: "50px" }}
          mt={{ base: px2vw(20), lg: "80px" }}
          fontSize={{ base: px2vw(40), lg: "65px" }}
          lineHeight={{ base: px2vw(50), lg: "65px" }}
        >
          Gameplay and prizes
        </Text>
        <Image
          mx="auto"
          src={pageOneCenter}
          w={{ base: "full", lg: "785px" }}
          h={{ base: px2vw(200), lg: "442px" }}
          mb={{ base: px2vw(30), lg: "90px" }}
        />
        <Flex
          flexDir={{ base: "column", lg: "row" }}
          justifyContent="space-between"
          mb={{ base: px2vw(50), lg: "80px" }}
        >
          <Flex
            flexDir="column"
            w={{ base: "full", lg: "372px" }}
            mb={{ base: px2vw(50), lg: "0" }}
          >
            <Text
              fontFamily="Orbitron"
              fontWeight="700"
              color="#855DFF"
              textAlign="center"
              fontSize={{ base: px2vw(25), lg: "25px" }}
              lineHeight={{ base: px2vw(30), lg: "30px" }}
              mb={{ base: px2vw(10), lg: "50px" }}
            >
              Bronze
            </Text>
            <Text
              fontFamily="Orbitron"
              fontWeight="700"
              color="black.100"
              textAlign="center"
              fontSize={{ base: px2vw(20), lg: "20px" }}
              lineHeight={{ base: px2vw(25), lg: "25px" }}
            >
              1500 points
            </Text>
            <Text
              fontFamily="Orbitron"
              fontWeight="700"
              color="black.100"
              textAlign="center"
              fontSize={{ base: px2vw(20), lg: "20px" }}
              lineHeight={{ base: px2vw(25), lg: "25px" }}
            >
              20 referrals
            </Text>
            <Text
              fontFamily="Orbitron"
              fontWeight="700"
              color="black.100"
              textAlign="center"
              fontSize={{ base: px2vw(20), lg: "20px" }}
              lineHeight={{ base: px2vw(25), lg: "25px" }}
              mb={{ base: px2vw(20), lg: "50px" }}
            >
              2 postings on social media
            </Text>
            <Text
              fontFamily="Orbitron"
              fontWeight="700"
              color="#855DFF"
              textAlign="center"
              fontSize={{ base: px2vw(20), lg: "20px" }}
              lineHeight={{ base: px2vw(25), lg: "25px" }}
            >
              $11 in cash and tokens
            </Text>
          </Flex>
          <Flex
            flexDir="column"
            w={{ base: "full", lg: "372px" }}
            mb={{ base: px2vw(50), lg: "0" }}
          >
            <Text
              fontFamily="Orbitron"
              fontWeight="700"
              color="#855DFF"
              textAlign="center"
              fontSize={{ base: px2vw(25), lg: "25px" }}
              lineHeight={{ base: px2vw(30), lg: "30px" }}
              mb={{ base: px2vw(10), lg: "50px" }}
            >
              silver
            </Text>
            <Text
              fontFamily="Orbitron"
              fontWeight="700"
              color="black.100"
              textAlign="center"
              fontSize={{ base: px2vw(20), lg: "20px" }}
              lineHeight={{ base: px2vw(25), lg: "25px" }}
            >
              1750 points
            </Text>
            <Text
              fontFamily="Orbitron"
              fontWeight="700"
              color="black.100"
              textAlign="center"
              fontSize={{ base: px2vw(20), lg: "20px" }}
              lineHeight={{ base: px2vw(25), lg: "25px" }}
            >
              30 referrals
            </Text>
            <Text
              fontFamily="Orbitron"
              fontWeight="700"
              color="black.100"
              textAlign="center"
              fontSize={{ base: px2vw(20), lg: "20px" }}
              lineHeight={{ base: px2vw(25), lg: "25px" }}
              mb={{ base: px2vw(20), lg: "50px" }}
            >
              2 postings on social media
            </Text>
            <Text
              fontFamily="Orbitron"
              fontWeight="700"
              color="#855DFF"
              textAlign="center"
              fontSize={{ base: px2vw(20), lg: "20px" }}
              lineHeight={{ base: px2vw(25), lg: "25px" }}
            >
              $25 in cash and tokens
            </Text>
          </Flex>
          <Flex flexDir="column" w={{ base: "full", lg: "372px" }}>
            <Text
              fontFamily="Orbitron"
              fontWeight="700"
              color="#855DFF"
              textAlign="center"
              fontSize={{ base: px2vw(25), lg: "25px" }}
              lineHeight={{ base: px2vw(30), lg: "30px" }}
              mb={{ base: px2vw(10), lg: "50px" }}
            >
              gold
            </Text>
            <Text
              fontFamily="Orbitron"
              fontWeight="700"
              color="black.100"
              textAlign="center"
              fontSize={{ base: px2vw(20), lg: "20px" }}
              lineHeight={{ base: px2vw(25), lg: "25px" }}
            >
              2000 points
            </Text>
            <Text
              fontFamily="Orbitron"
              fontWeight="700"
              color="black.100"
              textAlign="center"
              fontSize={{ base: px2vw(20), lg: "20px" }}
              lineHeight={{ base: px2vw(25), lg: "25px" }}
            >
              40 referrals
            </Text>
            <Text
              fontFamily="Orbitron"
              fontWeight="700"
              color="black.100"
              textAlign="center"
              fontSize={{ base: px2vw(20), lg: "20px" }}
              lineHeight={{ base: px2vw(25), lg: "25px" }}
              mb={{ base: px2vw(20), lg: "50px" }}
            >
              2 postings on social media
            </Text>
            <Text
              fontFamily="Orbitron"
              fontWeight="700"
              color="#855DFF"
              textAlign="center"
              fontSize={{ base: px2vw(20), lg: "20px" }}
              lineHeight={{ base: px2vw(25), lg: "25px" }}
            >
              $40 in cash and tokens
            </Text>
          </Flex>
        </Flex>
        <Flex
          flexDir="column"
          alignItems="center"
          color="black.100"
          fontFamily="Orbitron"
          fontWeight="700"
          textAlign="center"
          fontSize={{ base: px2vw(24), lg: "35px" }}
          lineHeight={{ base: px2vw(35), lg: "43px" }}
        >
          <Text mb={{ base: px2vw(30), lg: "50px" }}>steps</Text>
          <Text mb={{ base: px2vw(30), lg: "50px" }}>
            1. Play ninja run and hit minimum points.
          </Text>
          <Text
            w={{ base: "95%", lg: "930px" }}
            mb={{ base: px2vw(30), lg: "50px" }}
          >
            2. share your game play on social media with your friends.
          </Text>
          <Text
            w={{ base: "95%", lg: "930px" }}
            mb={{ base: px2vw(80), lg: "80px" }}
          >
            3. get them to join and win guaranteed prizes.
          </Text>
        </Flex>
      </Flex>
    </Flex>
  );
}

export default React.memo(Index);
