import React, { useState } from "react";
import {
  Flex,
  Image,
  Input,
  Text,
  useBoolean,
  // useToast,
} from "@chakra-ui/react";
import px2vw from "@/utils/px2vw";
import copySuccessIcon from "@/assets/imgs/copySuccess.png";
import usdc from "@/assets/imgs/usdc.png";
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
    >
      <Text fontFamily="SofiaPro" textStyle="14" color="gray.500" mr="auto">
        Step 2/4
      </Text>
      <Text
        fontFamily="SofiaPro"
        fontWeight="600"
        color="white.100"
        mr="auto"
        fontSize={{ base: px2vw(21), lg: "21px" }}
        lineHeight={{ base: px2vw(40), lg: "40px" }}
        mb={{ base: px2vw(36), lg: "58px" }}
      >
        Enter the amount of deposit
      </Text>
      {/* address */}
      <Flex
        w={{ base: px2vw(300), lg: "300px" }}
        h={{ base: px2vw(40), lg: "40px" }}
        mb={{ base: px2vw(15), lg: "15px" }}
        alignItems="center"
        justifyContent="center"
        mr="auto"
        bgColor="black.100"
        borderRadius="30px"
      >
        <Image
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
          mr={{ base: px2vw(10), lg: "10px" }}
        >
          Your are connected with
        </Text>
        <Text
          fontFamily="SofiaPro"
          color="green.1000"
          textDecor="underline"
          fontSize={{ base: px2vw(13), lg: "13px" }}
          lineHeight={{ base: px2vw(13), lg: "13px" }}
        >
          {`${userInfo?.external_wallet_address?.substring(
            0,
            5
          )}...${userInfo?.external_wallet_address?.substring(
            userInfo?.external_wallet_address.length - 4,
            userInfo?.external_wallet_address.length
          )}`}
        </Text>
      </Flex>
      {/* input */}
      <Flex w="full" flexDir="column" mb={{ base: px2vw(110), lg: "110px" }}>
        <Flex
          w="full"
          h={{ base: px2vw(70), lg: "70px" }}
          px={{ base: px2vw(17), lg: "17px" }}
          justifyContent="space-between"
          alignItems="center"
          boxSizing="border-box"
          borderRadius="20px"
          border="1px solid"
          borderColor="green.1000"
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
              color: "green.1000",
              opacity: 0.6,
            }}
            placeholder="Enter USDC value here"
            onChange={(e) => {
              setInputValue?.(e.target.value);
            }}
          />
          <Flex
            ml={{ base: px2vw(10), lg: "10px" }}
            mr={{ base: px2vw(20), lg: "20px" }}
          >
            <Image
              src={usdc}
              w={{ base: px2vw(18), lg: "18px" }}
              h={{ base: px2vw(18), lg: "18px" }}
              mr={{ base: px2vw(5), lg: "5px" }}
            />
            <Text
              fontFamily="SofiaPro"
              textStyle="12"
              fontWeight="600"
              color="white.100"
              lineHeight={{ base: px2vw(18), lg: "18px" }}
            >
              USDC
            </Text>
          </Flex>
        </Flex>
      </Flex>
      {/* buttons */}
      <Flex w="full" justifyContent="space-between">
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
            mt={{ base: px2vw(5), lg: "5px" }}
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
          bgColor={inputValue === "" ? "gray.800" : "green.1000"}
          borderColor={inputValue === "" ? "gray.800" : "green.1000"}
          onClick={() => {
            if (inputValue !== "") {
              confirmClick(inputValue);
            }
          }}
        >
          <Text
            mt={{ base: px2vw(5), lg: "5px" }}
            fontSize={{ base: px2vw(17), lg: "17px" }}
            fontFamily="Eurostile"
            fontWeight="bold"
            color={inputValue === "" ? "gray.700" : "black.1600"}
          >
            CONFIRM
          </Text>
        </Flex>
      </Flex>
    </Flex>
    // <Flex
    //   p={{ base: px2vw(20), lg: "20px" }}
    //   flexDir="column"
    //   w="full"
    //   boxSizing="border-box"
    //   bgColor="black.300"
    //   borderRadius="6px"
    //   overflow="hidden"
    // >
    //   <Text
    //     fontFamily="Orbitron"
    //     color="white.100"
    //     textStyle="18"
    //     fontWeight="600"
    //     mb={{ base: px2vw(20), lg: "20px" }}
    //     lineHeight={{ base: px2vw(23), lg: "23px" }}
    //   >
    //     Amount
    //   </Text>
    //   <CryptoWallet
    //     isInput
    //     withOutConversions
    //     w={{ base: "full", lg: "314px" }}
    //     nativePrice={inputValue}
    //     buttonLoading={loading}
    //     loadingText="Withdraw"
    //     nativeUnit="USDC"
    //     buttonText="Withdraw"
    //     inputValueChange={(val: string) => setInputValue(val)}
    //     buyClick={() => {
    //       if (inputValue !== "" && !isNaN(Number(inputValue))) {
    //         setLoading.on();
    //         setWithdraw.on();
    //       }
    //       // success();
    //     }}
    //   />
    //   {/* mobile buy */}
    //   <Flex
    //     flexDir="column"
    //     display={{ base: "flex", lg: "none" }}
    //     h={px2vw(148)}
    //     p={px2vw(15)}
    //     w="full"
    //     boxSizing="border-box"
    //     bgColor="black.1200"
    //     color="white.100"
    //     pos="fixed"
    //     borderTopLeftRadius="6px"
    //     borderTopRightRadius="6px"
    //     bottom={0}
    //     left={0}
    //     zIndex={1}
    //   >
    //     {/* price */}
    //     <Flex
    //       w="full"
    //       h={px2vw(20)}
    //       justifyContent="space-between"
    //       mb={px2vw(15)}
    //     >
    //       <Text
    //         fontFamily="Nunito"
    //         fontWeight="600"
    //         textStyle="16"
    //         lineHeight={px2vw(20)}
    //       >
    //         Total amount:
    //       </Text>
    //       <Flex>
    //         <Image
    //           src={messageIcon}
    //           w={px2vw(20)}
    //           h={px2vw(20)}
    //           mr={px2vw(8)}
    //         />
    //         <Text
    //           fontFamily="Orbitron"
    //           fontWeight="400"
    //           textStyle="16"
    //           color="green.100"
    //           lineHeight={px2vw(20)}
    //         >
    //           {inputValue}
    //           USDC
    //         </Text>
    //       </Flex>
    //     </Flex>
    //     <BaseButton
    //       isLoading={loading}
    //       loadingText="Withdraw"
    //       fontFamily="Nunito"
    //       textStyle="16"
    //       w="full"
    //       onClick={() => {
    //         if (inputValue !== "" && !isNaN(Number(inputValue))) {
    //           setLoading.on();
    //           setWithdraw.on();
    //         }
    //       }}
    //     >
    //       Withdraw
    //     </BaseButton>
    //   </Flex>
    // </Flex>
  );
}

export default React.memo(Index);
