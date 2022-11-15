import React, { useState, useEffect } from "react";
import {
  Flex,
  Image,
  Input,
  Text,
  useBoolean,
  Spinner,
  // useToast,
} from "@chakra-ui/react";
import px2vw from "@/utils/px2vw";
// import copySuccessIcon from "@/assets/imgs/copySuccess.png";
import gamiflyToken from "@/assets/imgs/gamiflyToken.png";
import usdc from "@/assets/imgs/usdc.png";
// import gamiflyToken from "@/assets/imgs/gamiflyToken.png";
// import messageIcon from "@/assets/imgs/messageIcon.png";
import { withdraw } from "@/apis/withdraw";
import useSWR from "swr";
// import CryptoWallet from "../CryptoWallet";
// import BaseButton from "../BaseButton";
import globalStore from "@/stores/global";
import { getGMFPrice } from "@/apis/deposit";
import { getWithdrawableAmount } from "@/apis/userInfo";

export interface IProps {
  // totalPrice: number;
  // priceUnit: string;
  // success: (hash: string, val: string) => void;
  withdrawAddress: string;
  backClick: () => void;
  confirmClick: (val: string, gmf: string) => void;
}

function Index({ withdrawAddress, backClick, confirmClick }: IProps) {
  // const toast = useToast();
  const { userInfo } = globalStore();
  // const [loading, setLoading] = useBoolean(false);
  const [isWithdraw] = useBoolean(false);
  const [inputValue, setInputValue] = useState("");
  const [gmfPrice, setGmfPrice] = useState("");
  const [availablePrice, setAvailablePrice] = useState(true);
  const [getNewPriceLoading, setGetNewPriceLoading] = useBoolean(false);
  const [withdrawableAmount, setWithdrawableAmount] = useState("");
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

  const { data: getGMFPriceData } = useSWR(
    Number(inputValue) ? [getGMFPrice.key, inputValue] : null,
    () => getGMFPrice.fetcher(inputValue),
    {
      revalidateOnFocus: false,
    }
  );

  const { data: getWithdrawableAmountData } = useSWR(
    userInfo && userInfo?.id ? [getWithdrawableAmount.key] : null,
    (_) => getWithdrawableAmount.fetcher(userInfo?.id),
    { revalidateOnFocus: false }
  );

  useEffect(() => {
    if (getGMFPriceData) {
      setGmfPrice(getGMFPriceData.value);
    }
  }, [getGMFPriceData]);

  useEffect(() => {
    setGetNewPriceLoading.off();
    // eslint-disable-next-line
  }, [gmfPrice]);

  useEffect(() => {
    if (inputValue > withdrawableAmount) {
      setAvailablePrice(false);
    } else {
      setAvailablePrice(true);
    }
    // eslint-disable-next-line
  }, [inputValue]);

  useEffect(() => {
    if (getWithdrawableAmountData && getWithdrawableAmountData?.amount) {
      setWithdrawableAmount(getWithdrawableAmountData?.amount);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    } else {
      setWithdrawableAmount("0");
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }
  }, [getWithdrawableAmountData]);

  return (
    <Flex
      w={{ base: "full", lg: "496px" }}
      h={{ base: "fit-content", lg: "480px" }}
      py={{ base: "30px", lg: "30px" }}
      px={{ base: "60px", lg: "60px" }}
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
        fontSize={{ base: "21px", lg: "21px" }}
        lineHeight={{ base: "40px", lg: "40px" }}
        mb={{ base: "15px", lg: "15px" }}
      >
        Enter the amount of withdraw
      </Text>
      {/* address */}
      <Flex
        w={{ base: "300px", lg: "300px" }}
        h={{ base: "40px", lg: "40px" }}
        mb={{ base: "60px", lg: "60px" }}
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
            Withdraw to
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
            {`${withdrawAddress.substring(0, 5)}...${withdrawAddress.substring(
              withdrawAddress.length - 4,
              withdrawAddress.length
            )}`}
          </Text>
        </Flex>
      </Flex>
      {/* input */}
      <Flex w="full" flexDir="column" mb={{ base: "10px", lg: "10px" }}>
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
            ml={{ base: "10px", lg: "10px" }}
            mr={{ base: "20px", lg: "20px" }}
          >
            <Image
              src={usdc}
              w={{ base: "18px", lg: "18px" }}
              h={{ base: "18px", lg: "18px" }}
              mr={{ base: "5px", lg: "5px" }}
            />
            <Text
              fontFamily="SofiaPro"
              textStyle="12"
              fontWeight="600"
              color="white.100"
              lineHeight={{ base: "18px", lg: "18px" }}
            >
              USDC
            </Text>
          </Flex>
        </Flex>
      </Flex>

      {inputValue && (
        <Flex mr="auto" pl={{ base: "20px", lg: "20px" }}>
          {getNewPriceLoading ? (
            <Spinner size="xs" />
          ) : (
            <Flex>
              <Text
                fontFamily="SofiaPro"
                fontWeight="bold"
                fontSize={{ base: "19px", lg: "19px" }}
                lineHeight={{ base: "25px", lg: "25px" }}
              >
                ≈ {Number(gmfPrice)} GMF
              </Text>
              <Image
                src={gamiflyToken}
                w={{ base: "25px", lg: "25px" }}
                h={{ base: "25px", lg: "25px" }}
                mx={{ base: "5px", lg: "5px" }}
              />
              <Text
                fontFamily="SofiaPro"
                fontWeight="bold"
                textStyle="12"
                lineHeight={{ base: "25px", lg: "25px" }}
              >
                Gamifly token
              </Text>
            </Flex>
          )}
        </Flex>
      )}

      <Text
        fontFamily="SofiaPro"
        fontWeight="bold"
        textStyle="12"
        lineHeight={{ base: "25px", lg: "25px" }}
        mr="auto"
        pl={{ base: "20px", lg: "20px" }}
      >
        Available withdraw value: ${withdrawableAmount}
      </Text>

      {!availablePrice && (
        <Text
          fontFamily="SofiaPro"
          color="red"
          fontWeight="bold"
          textStyle="12"
          lineHeight={{ base: "25px", lg: "25px" }}
          mr="auto"
          pl={{ base: "20px", lg: "20px" }}
        >
          Please enter valid amount
        </Text>
      )}

      {/* buttons */}
      <Flex
        w="full"
        justifyContent="space-between"
        mt="auto"
        // mt={{ base: "80px", lg: "80px" }}
      >
        {/* back */}
        <Flex
          w={{ base: "160px", lg: "160px" }}
          h={{ base: "50px", lg: "50px" }}
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
          bgColor={inputValue === "" ? "#749733" : "green.1000"}
          borderColor={inputValue === "" ? "#749733" : "green.1000"}
          onClick={() => {
            if (availablePrice) {
              confirmClick(inputValue, gmfPrice);
            }
          }}
        >
          <Text
            mt={{ base: px2vw(5), lg: "5px" }}
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
