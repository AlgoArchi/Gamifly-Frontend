import React from "react";
import { Flex, Image, Text } from "@chakra-ui/react";
import px2vw from "@/utils/px2vw";
import leftLogo from "@/assets/imgs/leftLogo.png";
import pageOneImg from "@/assets/imgs/pageOneImg.png";

function Index() {
  return (
    <Flex
      w="full"
      minH="100vh"
      bgColor="black.100"
      pt={{ base: px2vw(20), lg: "32px" }}
      pb={{ base: px2vw(50), lg: "176px" }}
    >
      <Flex flexDir="column" mx="auto" w={{ base: "full", lg: "1280px" }}>
        {/* logo */}
        <Image
          src={leftLogo}
          w={{ base: px2vw(160), lg: "160px" }}
          h={{ base: px2vw(37), lg: "37px" }}
          ml={{ base: px2vw(20), lg: "50px" }}
          mb={{ base: px2vw(30), lg: "70px" }}
        />
        <Flex
          bgImage={pageOneImg}
          pl={{ base: px2vw(20), lg: "80px" }}
          flexDir="column"
          w="full"
          bgRepeat="no-repeat"
          bgPos={{ base: "bottom", lg: "top 70px right 20px" }}
        >
          <Text
            textTransform="uppercase"
            fontFamily="Orbitron"
            fontWeight="700"
            color="green.800"
            mb={{ base: px2vw(30), lg: "50px" }}
            w={{ base: "full", lg: "650px" }}
            fontSize={{ base: px2vw(40), lg: "65px" }}
            lineHeight={{ base: px2vw(50), lg: "82px" }}
          >
            ninja warriors Tournament
          </Text>
          <Text
            textTransform="uppercase"
            fontFamily="Orbitron"
            fontWeight="700"
            color="green.800"
            mb={{ base: px2vw(30), lg: "50px" }}
            w={{ base: "full", lg: "540px" }}
            fontSize={{ base: px2vw(20), lg: "25px" }}
            lineHeight={{ base: px2vw(25), lg: "30px" }}
          >
            Do you have what it takes to be the best ninja warrior?
          </Text>
          <Text
            textTransform="uppercase"
            fontFamily="Orbitron"
            fontWeight="700"
            color="green.800"
            w={{ base: "full", lg: "540px" }}
            fontSize={{ base: px2vw(20), lg: "25px" }}
            lineHeight={{ base: px2vw(25), lg: "30px" }}
          >
            Unlimited winners
          </Text>
          <Text
            textTransform="uppercase"
            fontFamily="Orbitron"
            fontWeight="700"
            color="green.800"
            w={{ base: "full", lg: "540px" }}
            fontSize={{ base: px2vw(16), lg: "23px" }}
            lineHeight={{ base: px2vw(20), lg: "30px" }}
          >
            - Win up to USD40
          </Text>
          <Text
            textTransform="uppercase"
            fontFamily="Orbitron"
            fontWeight="700"
            color="green.800"
            mb={{ base: px2vw(30), lg: "50px" }}
            fontSize={{ base: px2vw(16), lg: "23px" }}
            lineHeight={{ base: px2vw(20), lg: "30px" }}
          >
            - Competition period 10.8.2022 - 17.8.2022
          </Text>
          {/* 按钮组 */}
          <Flex
            flexDir={{ base: "column", lg: "row" }}
            mb={{ base: px2vw(30), lg: "50px" }}
            pr={{ base: px2vw(20), lg: "0" }}
            boxSizing="border-box"
          >
            <Flex
              justifyContent="center"
              alignItems="center"
              bgColor="#D9D9D9"
              color="black.100"
              fontFamily="Orbitron"
              fontWeight="700"
              textTransform="uppercase"
              cursor="pointer"
              fontSize={{ base: px2vw(20), lg: "25px" }}
              mr={{ base: px2vw(0), lg: "26px" }}
              mb={{ base: px2vw(20), lg: "0" }}
              w={{ base: "full", lg: "400px" }}
              h={{ base: px2vw(66), lg: "66px" }}
            >
              Enter your game ID
            </Flex>
            <Flex
              justifyContent="center"
              alignItems="center"
              color="black.100"
              bgColor="green.800"
              fontFamily="Orbitron"
              fontWeight="700"
              cursor="pointer"
              borderRadius="15px"
              fontSize={{ base: px2vw(20), lg: "25px" }}
              w={{ base: "full", lg: "222px" }}
              h={{ base: px2vw(66), lg: "66px" }}
            >
              GO!
            </Flex>
          </Flex>
          <Text
            textTransform="uppercase"
            fontFamily="Orbitron"
            fontWeight="700"
            color="green.800"
            fontSize={{ base: px2vw(18), lg: "23px" }}
            lineHeight={{ base: px2vw(25), lg: "30px" }}
          >
            {`No game id? Register here >>`}
          </Text>
        </Flex>
      </Flex>
    </Flex>
  );
}

export default React.memo(Index);
