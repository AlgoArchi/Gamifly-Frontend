import React from "react";
import { Flex, Text, Image } from "@chakra-ui/react";
import px2vw from "@/utils/px2vw";
import usdc from "@/assets/imgs/usdc.png";
import gamiflyToken from "@/assets/imgs/gamiflyToken.png";
import { useRouter } from "next/router";

export interface IProps {
  address: string;
  chooseType: string;
  inputVal: string;
  gmfVal?: string;
  backClick: () => void;
}

function Index({ address, chooseType, inputVal, gmfVal, backClick }: IProps) {
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
        fontSize={{ base: "21px", lg: "21px" }}
        lineHeight={{ base: "40px", lg: "40px" }}
        mb={{ base: "15px", lg: "15px" }}
      >
        Order placed
      </Text>
      <Text
        fontFamily="Eurostile"
        fontWeight="black"
        color="green.1000"
        mr="auto"
        fontSize={{ base: "30px", lg: "30px" }}
        lineHeight={{ base: "30px", lg: "30px" }}
        mb={{ base: "15px", lg: "15px" }}
      >
        YOUR TRANSACTION IS ON THE WAY!
      </Text>

      {/* address */}
      <Flex
        w={{ base: "300px", lg: "300px" }}
        h={{ base: "50px", lg: "50px" }}
        mb={{ base: "30px", lg: "30px" }}
        mr="auto"
        alignItems="center"
        justifyContent="space-between"
        bgColor="black.100"
        borderRadius="30px"
        px={{ base: "15px", lg: "15px" }}
      >
        <>
          <Text
            fontFamily="SofiaPro"
            fontWeight="600"
            color="green.1000"
            fontSize={{ base: "13px", lg: "13px" }}
            lineHeight={{ base: "13px", lg: "13px" }}
            mr={{ base: "10px", lg: "10px" }}
          >
            {chooseType === "Deposit" ? "Deposit from" : "Withdraw to"}
          </Text>
        </>
        <Flex>
          <Text
            fontFamily="SofiaPro"
            fontWeight="600"
            color="#BABABA"
            fontSize={{ base: "17px", lg: "17px" }}
            lineHeight={{ base: "13px", lg: "13px" }}
            mr={{ base: "10px", lg: "10px" }}
          >
            Account
          </Text>
          <Text
            fontFamily="SofiaPro"
            color="green.1000"
            textDecor="underline"
            fontSize={{ base: "13px", lg: "13px" }}
            lineHeight={{ base: "13px", lg: "13px" }}
          >
            {`${address.substring(0, 5)}...${address.substring(
              address.length - 4,
              address.length
            )}`}
          </Text>
        </Flex>
      </Flex>

      <Flex
        mr="auto"
        fontFamily="SofiaPro"
        fontSize={{ base: "18px", lg: "18px" }}
        lineHeight={{ base: "20px", lg: "20px" }}
        mb={{ base: "5px", lg: "5px" }}
      >
        <Text color="white.100" mr="5px">
          You just
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
        mb={{ base: "10px", lg: "10px" }}
        fontSize={{ base: px2vw(18), lg: "18px" }}
        lineHeight={{ base: px2vw(30), lg: "30px" }}
      >
        {chooseType == "Deposit"
          ? "to your Gamifly address"
          : "to your external external address."}
      </Text>
      {/* buttons */}
      <Flex w="full" justifyContent="space-between" mt="auto">
        {/* back */}
        <Flex
          h={{ base: "40px", lg: "40px" }}
          w="full"
          border="1px solid"
          borderColor="green.1000"
          bgColor="green.1000"
          borderRadius="5px"
          justifyContent="center"
          alignItems="center"
          cursor="pointer"
          mb={{ base: "10px", lg: "10px" }}
        >
          <Text
            fontSize={{ base: px2vw(17), lg: "17px" }}
            fontFamily="Eurostile"
            fontWeight="bold"
            color="black.1600"
            onClick={() => backClick()}
          >
            TRANSFER MORE
          </Text>
        </Flex>
      </Flex>

      <Flex w="full" justifyContent="space-between">
        {/* back */}
        <Flex
          h={{ base: "40px", lg: "40px" }}
          w="full"
          border="1px solid"
          borderColor="green.1000"
          borderRadius="5px"
          justifyContent="center"
          alignItems="center"
          cursor="pointer"
        >
          <Text
            fontSize={{ base: px2vw(17), lg: "17px" }}
            fontFamily="Eurostile"
            fontWeight="bold"
            color="green.1000"
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
