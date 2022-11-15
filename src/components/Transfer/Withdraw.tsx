import React, { useState } from "react";
import {
  Flex,
  // Image,
  Input,
  Text,
  useBoolean,
  // useToast,
} from "@chakra-ui/react";
import { ethers } from "ethers";
import px2vw from "@/utils/px2vw";
// import copySuccessIcon from "@/assets/imgs/copySuccess.png";
// import usdc from "@/assets/imgs/usdc.png";
// import gamiflyToken from "@/assets/imgs/gamiflyToken.png";
// import messageIcon from "@/assets/imgs/messageIcon.png";
import { withdraw } from "@/apis/withdraw";
import useSWR from "swr";
// import CryptoWallet from "../CryptoWallet";
// import BaseButton from "../BaseButton";
import globalStore from "@/stores/global";

export interface IProps {
  // totalPrice: number;
  // priceUnit: string;
  // success: (hash: string, val: string) => void;
  backClick: () => void;
  confirmClick: (val: string) => void;
}

function Index({ backClick, confirmClick }: IProps) {
  // const toast = useToast();
  const { userInfo } = globalStore();
  // const [loading, setLoading] = useBoolean(false);
  const [isWithdraw] = useBoolean(false);
  const [inputValue, setInputValue] = useState("");
  const [isAddress, setIsAddress] = useBoolean(true);
  const { data: _withdrawData } = useSWR(
    userInfo && userInfo?.platform_wallet && isWithdraw
      ? [withdraw.key, isWithdraw, inputValue]
      : null,
    () =>
      withdraw.fetcher({
        user_id: userInfo?.id,
        amount: inputValue,
        accessToken: userInfo?.access_token,
        external_wallet: userInfo?.external_wallet_address,
      }),
    {
      revalidateOnFocus: false,
    }
  );

  // useEffect(() => {
  //   if(ethers.utils.isAddress(inputValue)){
  //     setIsAddress.on();
  //   } else {
  //     setIsAddress.off();
  //   }
  // }, [inputValue])

  const checkingAddress = () => {
    if (ethers.utils.isAddress(inputValue)) {
      setIsAddress.on();
      confirmClick(inputValue);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    } else {
      setIsAddress.off();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }
  };

  // useEffect(() => {
  //   if (withdrawData?.result) {
  //     success(withdrawData?.hash, inputValue);
  //     setLoading.off();
  //     setWithdraw.off();
  //   } else if (withdrawData?.message) {
  //     toast({
  //       title: "Fail",
  //       description: withdrawData?.message,
  //       status: "error",
  //       duration: 3000,
  //       isClosable: true,
  //     });
  //     setLoading.off();
  //     setWithdraw.off();
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [withdrawData]);

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
      justifyContent="center"
    >
      <Text fontFamily="SofiaPro" textStyle="14" color="gray.500" mr="auto">
        Step 1/4
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
        Withdraw to Metamask address
      </Text>
      <Text
        fontFamily="SofiaPro"
        fontWeight="500"
        color="gray.700"
        mr="auto"
        fontSize={{ base: px2vw(14), lg: "14px" }}
        lineHeight={{ base: px2vw(18), lg: "18px" }}
        mb={{ base: px2vw(15), lg: "15px" }}
      >
        The address is where your winning rewards goes
      </Text>

      {/* address */}
      <Text
        fontFamily="SofiaPro"
        fontWeight="600"
        color="green.1000"
        mr="auto"
        fontSize={{ base: "21px", lg: "21px" }}
        lineHeight={{ base: "40px", lg: "40px" }}
        mb={{ base: "15px", lg: "15px" }}
        ml={{ base: "20px", lg: "20px" }}
      >
        ADD ADDRESS
      </Text>

      {/* input */}
      <Flex w="full" flexDir="column" mb={{ base: "10px", lg: "10px" }}>
        <Flex
          w="full"
          h={{ base: "40px", lg: "40px" }}
          px={{ base: "17px", lg: "17px" }}
          justifyContent="space-between"
          alignItems="center"
          boxSizing="border-box"
          borderRadius="50px"
          border="1px solid"
          borderColor="black"
          bgColor="black"
        >
          <Input
            // eslint-disable-next-line jsx-a11y/no-autofocus
            autoFocus
            border="none"
            outline="none"
            bgColor="transparent"
            p="0"
            color="green.1000"
            _focusVisible={{
              border: "none",
              outline: "none",
            }}
            _placeholder={{
              fontFamily: "SofiaPro",
              textStyle: 14,
              color: "gray.700",
              opacity: 0.6,
            }}
            placeholder="Please enter your Metamask wallet address here"
            onChange={(e) => {
              setInputValue?.(e.target.value);
            }}
          />
        </Flex>
      </Flex>
      {/* Address checking */}
      <Flex
        w={{ base: px2vw(300), lg: "300px" }}
        h={{ base: px2vw(40), lg: "40px" }}
        mb={{ base: "110px", lg: "110px" }}
        alignItems="left"
        justifyContent="left"
      >
        {isAddress ? (
          <>
            {/* <Image
            src={copySuccessIcon}
            w={{ base: px2vw(13), lg: "13px" }}
            h={{ base: px2vw(13), lg: "13px" }}
            mr={{ base: px2vw(5), lg: "5px" }}
          />
          <Text
            fontFamily="SofiaPro"
            fontWeight="600"
            color="#BABABA"
            fontSize={{ base: px2vw(13), lg: "13px" }}
            lineHeight={{ base: px2vw(13), lg: "13px" }}
          >
          Valid address
          </Text> */}
          </>
        ) : (
          <Text
            fontFamily="SofiaPro"
            fontWeight="600"
            color="red"
            fontSize={{ base: px2vw(13), lg: "13px" }}
            lineHeight={{ base: px2vw(13), lg: "13px" }}
          >
            Please enter a valid address
          </Text>
        )}
      </Flex>

      {/* buttons */}
      <Flex w="full" justifyContent="space-between" mt="auto">
        {/* back */}
        <Flex
          w={{ base: px2vw(118), lg: "160px" }}
          h={{ base: px2vw(40), lg: "50px" }}
          border="1px solid"
          borderColor="green.1000"
          borderRadius="5px"
          justifyContent="center"
          alignItems="center"
          cursor="pointer"
          onClick={() => backClick()}
        >
          <Text
            fontSize={{ base: px2vw(17), lg: "17px" }}
            fontFamily="Eurostile"
            fontWeight="bold"
            color="green.1000"
          >
            BACK
          </Text>
        </Flex>
        {/* confirm */}
        <Flex
          border="1px solid"
          borderRadius="5px"
          justifyContent="center"
          alignItems="center"
          cursor={inputValue === "" ? "no-drop" : "pointer"}
          w={{ base: px2vw(118), lg: "160px" }}
          h={{ base: px2vw(40), lg: "50px" }}
          bgColor={inputValue === "" ? "#749733" : "green.1000"}
          borderColor={inputValue === "" ? "#749733" : "green.1000"}
          onClick={() => {
            if (inputValue !== "") {
              checkingAddress();
            }
          }}
        >
          <Text
            fontSize={{ base: px2vw(17), lg: "17px" }}
            fontFamily="Eurostile"
            fontWeight="bold"
            color="black.1600"
          >
            CONFIRM
          </Text>
        </Flex>
      </Flex>
    </Flex>
  );
}

export default React.memo(Index);
