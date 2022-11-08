import React, { useEffect, useState } from "react";
import {
  Flex,
  Input,
  Text,
  Image,
  useBoolean,
  Spinner,
} from "@chakra-ui/react";
import px2vw from "@/utils/px2vw";
import copySuccessIcon from "@/assets/imgs/copySuccess.png";
import usdc from "@/assets/imgs/usdc.png";
import gamiflyToken from "@/assets/imgs/gamiflyToken.png";
// import messageIcon from "@/assets/imgs/messageIcon.png";
// import transferLine from "@/assets/imgs/transferLine.png";
// import PaymentMethod from "../PaymentMethod";
// import GamiflyWallet from "../GamiflyWallet";
// import CryptoWallet from "../CryptoWallet";
// import BaseButton from "../BaseButton";
// import { useWeb3React } from "@web3-react/core";
import globalStore from "@/stores/global";
// import { recharge } from "@/connect/wallet";
import { deposit, getGMFPrice } from "@/apis/deposit";
import useSWR from "swr";

export interface IProps {
  // paymentMethod: number;
  // totalPrice?: number;
  // setPaymentMethod: (type: number) => void;
  // success: (val: string, hash: string) => void;
  backClick: () => void;
  confirmClick: (val: string, gmf: string) => void;
}

function Index({ backClick, confirmClick }: IProps) {
  // const { library, account } = useWeb3React();
  const { userInfo } = globalStore();
  const [inputValue, setInputValue] = useState("");
  const [isDeposit, setIsDeposit] = useBoolean(false);
  const [hash] = useState("");
  // const [setLoading] = useBoolean(false);
  const [gmfPrice, setGmfPrice] = useState("");
  const [getNewPriceLoading, setGetNewPriceLoading] = useBoolean(false);
  // const token = "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174";

  const { data: depositData } = useSWR(
    userInfo && userInfo?.platform_wallet && hash && isDeposit && deposit.key,
    () =>
      deposit.fetcher({
        hash: hash,
        wallet_address: userInfo?.platform_wallet,
      }),
    {
      revalidateOnFocus: false,
    }
  );
  const { data: getGMFPriceData } = useSWR(
    Number(inputValue) ? [getGMFPrice.key, inputValue] : null,
    () => getGMFPrice.fetcher(inputValue),
    {
      revalidateOnFocus: false,
    }
  );

  useEffect(() => {
    if (getGMFPriceData) {
      setGmfPrice(getGMFPriceData.value);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getGMFPriceData]);

  useEffect(() => {
    setGetNewPriceLoading.off();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gmfPrice]);

  useEffect(() => {
    if (hash) {
      setIsDeposit.on();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hash]);

  useEffect(() => {
    if (depositData) {
      // success(inputValue, hash);
      // setLoading.off();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [depositData]);

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
          {`${userInfo?.platform_wallet?.substring(
            0,
            5
          )}...${userInfo?.platform_wallet?.substring(
            userInfo?.platform_wallet.length - 4,
            userInfo?.platform_wallet.length
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
              if (e.target.value !== "" && Number(e.target.value) !== 0) {
                setGetNewPriceLoading.on();
              }
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
        {inputValue && (
          <Flex mt="10px">
            {getNewPriceLoading ? (
              <Spinner size="xs" />
            ) : (
              <Flex alignItems="center">
                <Text
                  fontFamily="SofiaPro"
                  fontWeight="bold"
                  fontSize={{ base: px2vw(19), lg: "19px" }}
                  lineHeight={{ base: px2vw(25), lg: "25px" }}
                >
                  ≈ {Number(gmfPrice)} GMF
                </Text>
                <Image
                  src={gamiflyToken}
                  w={{ base: px2vw(25), lg: "25px" }}
                  h={{ base: px2vw(25), lg: "25px" }}
                  mx={{ base: px2vw(5), lg: "5px" }}
                />
                <Text
                  fontFamily="SofiaPro"
                  fontWeight="bold"
                  textStyle="12"
                  lineHeight={{ base: px2vw(25), lg: "25px" }}
                >
                  Gamifly token
                </Text>
              </Flex>
            )}
          </Flex>
        )}
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
              confirmClick(inputValue, gmfPrice);
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
    //   minH={{ base: "auto", lg: "486px" }}
    //   flexDir={{ base: "column", lg: "row" }}
    //   bgColor={{ base: "transparent", lg: "black.300" }}
    //   pb={{ base: px2vw(148), lg: 0 }}
    //   borderRadius="6px"
    //   overflow={"hidden"}
    // >
    //   <Flex
    //     w={{ base: "full", lg: "30%" }}
    //     flexDir="column"
    //     p={{ base: 0, lg: "20px" }}
    //     mt={{ base: px2vw(20), lg: 0 }}
    //   >
    //     <Text
    //       fontFamily="Orbitron"
    //       color="white.100"
    //       textStyle="18"
    //       fontWeight="600"
    //       mb={{ base: px2vw(20), lg: "20px" }}
    //       lineHeight={{ base: px2vw(23), lg: "23px" }}
    //     >
    //       Total amount
    //     </Text>
    //     {paymentMethod === 1 || paymentMethod === 2 ? (
    //       <GamiflyWallet
    //         price={0}
    //         buttonLoading={loading}
    //         buttonText="Deposit"
    //         loadingText="Deposit"
    //         unit="GMF"
    //       />
    //     ) : (
    //       <CryptoWallet
    //         buttonLoading={loading}
    //         nativePrice={inputValue}
    //         otherPrice={21.3}
    //         nativeUnit="USDC"
    //         otherUnit="TRX"
    //         buttonText="Deposit"
    //         loadingText="Deposit"
    //         isInput
    //         inputValueChange={(val) => setInputValue(val)}
    //         buyClick={() => {
    //           setLoading.on();
    //           recharge(
    //             library,
    //             String(account || globalAccount),
    //             token,
    //             userInfo,
    //             inputValue,
    //             (res: string) => setHash(res)
    //           );
    //         }}
    //       />
    //     )}
    //   </Flex>
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
    //         </Text>
    //       </Flex>
    //     </Flex>
    //     <BaseButton
    //       fontFamily="Nunito"
    //       textStyle="16"
    //       w="full"
    //       loadingText="Deposit"
    //       isLoading={loading}
    //       onClick={() => {
    //         setLoading.on();
    //         recharge(
    //           library,
    //           String(account || globalAccount),
    //           token,
    //           userInfo,
    //           inputValue,
    //           (res: string) => setHash(res),
    //           () => setLoading.off()
    //         );
    //       }}
    //     >
    //       Deposit
    //     </BaseButton>
    //   </Flex>
    // </Flex>
  );
}

export default React.memo(Index);
