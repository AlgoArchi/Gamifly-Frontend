import React from "react";
import { Flex, Text, Image } from "@chakra-ui/react";
import px2vw from "@/utils/px2vw";
import usdc from "@/assets/imgs/usdc.png";
import gamiflyToken from "@/assets/imgs/gamiflyToken.png";
import { useRouter } from "next/router";

export interface IProps {
  inputVal: string;
  gmfVal?: string;
}

function Index({ inputVal, gmfVal }: IProps) {
  const router = useRouter();
  return (
    <Flex
      w={{ base: "full", lg: "496px" }}
      h={{ base: "fit-content", lg: "480px" }}
      py={{ base: px2vw(25), lg: "30px" }}
      px={{ base: px2vw(25), lg: "60px" }}
      flexDir="column"
      alignItems="center"
      border="1px solid"
      borderColor="black.1800"
      borderRadius="40px"
      boxSizing="border-box"
    >
      <Text fontFamily="SofiaPro" textStyle="14" color="gray.500" mr="auto">
        Step 4/4
      </Text>
      <Text
        fontFamily="SofiaPro"
        fontWeight="600"
        color="white.100"
        mr="auto"
        fontSize={{ base: px2vw(21), lg: "21px" }}
        lineHeight={{ base: px2vw(40), lg: "40px" }}
        mb={{ base: px2vw(50), lg: "50px" }}
      >
        Order placed
      </Text>
      <Text
        fontFamily="Eurostile"
        fontWeight="black"
        color="green.1000"
        mr="auto"
        fontSize={{ base: px2vw(35), lg: "35px" }}
        lineHeight={{ base: px2vw(35), lg: "35px" }}
      >
        YOUR TRANSACTION IS ON THE WAY!
      </Text>
      <Flex
        mr="auto"
        fontFamily="SofiaPro"
        fontSize={{ base: px2vw(18), lg: "18px" }}
        lineHeight={{ base: px2vw(30), lg: "30px" }}
        mb={{ base: px2vw(12), lg: "12px" }}
      >
        <Text color="white.100" mr="5px">
          You
        </Text>
        <Text color="green.1000">sent</Text>
      </Flex>
      <Flex mr="auto" alignItems="flex-end">
        <Text
          fontFamily="SofiaPro"
          fontWeight="black"
          color="white.100"
          mr={{ base: px2vw(5), lg: "5px" }}
          fontSize={{ base: px2vw(40), lg: "40px" }}
          lineHeight={{ base: px2vw(40), lg: "40px" }}
        >
          {Number(gmfVal || inputVal).toFixed(2)}
        </Text>
        <Flex mb="2px">
          <Image
            src={gmfVal ? gamiflyToken : usdc}
            w={{ base: px2vw(25), lg: "25px" }}
            h={{ base: px2vw(25), lg: "25px" }}
            mx={{ base: px2vw(10), lg: "10px" }}
          />
          <Text
            fontFamily="SofiaPro"
            fontWeight="bold"
            textStyle="12"
            lineHeight={{ base: px2vw(25), lg: "25px" }}
          >
            {gmfVal ? "Gamifly token" : "USDC"}
          </Text>
        </Flex>
      </Flex>
      <Text
        mr="auto"
        fontFamily="SofiaPro"
        fontWeight="500"
        color="white.100"
        mb={{ base: px2vw(60), lg: "60px" }}
        fontSize={{ base: px2vw(18), lg: "18px" }}
        lineHeight={{ base: px2vw(30), lg: "30px" }}
      >
        to an external address.
      </Text>
      {/* buttons */}
      <Flex w="full" justifyContent="space-between">
        {/* back */}
        <Flex
          h={{ base: px2vw(40), lg: "50px" }}
          w="full"
          border="1px solid"
          borderColor="green.1000"
          bgColor="green.1000"
          borderRadius="5px"
          justifyContent="center"
          alignItems="center"
          cursor="pointer"
        >
          <Text
            mt={{ base: px2vw(5), lg: "5px" }}
            fontSize={{ base: px2vw(17), lg: "17px" }}
            fontFamily="Eurostile"
            fontWeight="bold"
            color="black.1600"
            onClick={() => router.push("/profile")}
          >
            VIEW DETAILS
          </Text>
        </Flex>
      </Flex>
    </Flex>
  );
}

export default React.memo(Index);
