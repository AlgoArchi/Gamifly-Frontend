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
import { ethers } from "ethers";
// import { useWeb3React } from "@web3-react/core";
// import { recharge } from "@/connect/wallet";
import { getGMFPrice } from "@/apis/deposit";
import { ERC20Abi } from "@/abi/ERC20Abi";
import useSWR from "swr";

export interface IProps {
  // paymentMethod: number;
  // totalPrice?: number;
  // setPaymentMethod: (type: number) => void;
  // success: (val: string, hash: string) => void;
  connectedAddress: string;
  backClick: () => void;
  confirmClick: (val: string, gmf: string) => void;
}

function Index({ connectedAddress, backClick, confirmClick }: IProps) {
  const [inputValue, setInputValue] = useState("");
  // const [setLoading] = useBoolean(false);
  const [gmfPrice, setGmfPrice] = useState("");
  const [getNewPriceLoading, setGetNewPriceLoading] = useBoolean(false);
  const [isBalance, setIsBalance] = useBoolean(true);

  const usdcAddress = "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174";

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
    const checkingBalance = async () => {
      const metamaskProvider = window.ethereum;
      await metamaskProvider.request({ method: "eth_requestAccounts" });
      const provider = new ethers.providers.Web3Provider(metamaskProvider);
      const signer = provider.getSigner();
      const usdcContract = new ethers.Contract(usdcAddress, ERC20Abi, signer);
      const usdcBalance =
        (await usdcContract.balanceOf(connectedAddress)) / 10 ** 6;
      console.log("USDC Balance", usdcBalance);
      // eslint-disable-next-line react-hooks/exhaustive-deps

      if (usdcBalance >= Number(inputValue)) {
        setIsBalance.on();
        // eslint-disable-next-line react-hooks/exhaustive-deps
      } else {
        setIsBalance.off();
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }
    };
    checkingBalance();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputValue]);

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
        mb={{ base: "8px", lg: "10px" }}
      >
        Enter the amount of deposit
      </Text>
      {/* address */}
      <Flex
        w={{ base: px2vw(300), lg: "300px" }}
        h={{ base: px2vw(40), lg: "40px" }}
        mb={{ base: "40px", lg: "50px" }}
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
          {`${connectedAddress?.substring(
            0,
            5
          )}...${connectedAddress?.substring(
            connectedAddress.length - 4,
            connectedAddress.length
          )}`}
        </Text>
      </Flex>
      {/* input */}
      <Flex w="full" flexDir="column" mb={{ base: "18px", lg: "20px" }}>
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
              opacity: 1,
            }}
            placeholder="Enter USDC value here"
            value={inputValue}
            onChange={(e) => {
              if (e.target.value !== "" && Number(e.target.value) !== 0) {
                setGetNewPriceLoading.on();
              }
              setInputValue?.(e.target.value);
            }}
            disabled
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

        {isBalance ? (
          <>
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
          </>
        ) : (
          <Text
            fontFamily="SofiaPro"
            color="red"
            fontWeight="bold"
            textStyle="12"
            lineHeight={{ base: "25px", lg: "25px" }}
            mr="auto"
            pl={{ base: "20px", lg: "20px" }}
          >
            You don&apos;t have enough balance in your account!
          </Text>
        )}

        {/* Price Buttons */}
        <Flex mt={{ base: "15px", lg: "15px" }} justifyContent="space-around">
          {/* $2 button */}
          <Flex
            border="1px solid"
            borderRadius="15px"
            justifyContent="center"
            alignItems="center"
            cursor="pointer"
            w={{ base: "90px", lg: "100px" }}
            h={{ base: "25px", lg: "25px" }}
            bgColor={Number(inputValue) == 2 ? "green.1000" : "#749733"}
            borderColor={Number(inputValue) == 2 ? "green.1000" : "#749733"}
            onClick={() => {
              setInputValue("2");
            }}
          >
            <Text
              fontSize={{ base: "15px", lg: "17px" }}
              fontFamily="Eurostile"
              fontWeight="bold"
              color="black.1600"
            >
              $2
            </Text>
          </Flex>

          {/* $5 button */}
          <Flex
            border="1px solid"
            borderRadius="15px"
            justifyContent="center"
            alignItems="center"
            cursor="pointer"
            w={{ base: "90px", lg: "100px" }}
            h={{ base: "25px", lg: "25px" }}
            bgColor={Number(inputValue) == 5 ? "green.1000" : "#749733"}
            borderColor={Number(inputValue) == 5 ? "green.1000" : "#749733"}
            onClick={() => {
              setInputValue("5");
            }}
          >
            <Text
              fontSize={{ base: "15px", lg: "17px" }}
              fontFamily="Eurostile"
              fontWeight="bold"
              color="black.1600"
            >
              $5
            </Text>
          </Flex>

          {/* $10 button */}
          <Flex
            border="1px solid"
            borderRadius="15px"
            justifyContent="center"
            alignItems="center"
            cursor="pointer"
            w={{ base: "90px", lg: "100px" }}
            h={{ base: "25px", lg: "25px" }}
            bgColor={Number(inputValue) == 10 ? "green.1000" : "#749733"}
            borderColor={Number(inputValue) == 10 ? "green.1000" : "#749733"}
            onClick={() => {
              setInputValue("10");
            }}
          >
            <Text
              fontSize={{ base: "15px", lg: "17px" }}
              fontFamily="Eurostile"
              fontWeight="bold"
              color="black.1600"
            >
              $10
            </Text>
          </Flex>
        </Flex>
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
            fontSize={{ base: "17px", lg: "17px" }}
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
            if (isBalance) {
              confirmClick(inputValue, gmfPrice);
            }
          }}
        >
          <Text
            fontSize={{ base: "17px", lg: "17px" }}
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
