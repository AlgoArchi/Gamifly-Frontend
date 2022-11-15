import React, { useEffect, useState } from "react";
import {
  Flex,
  Text,
  Image,
  useBoolean,
  Spinner,
  useToast,
} from "@chakra-ui/react";
import px2vw from "@/utils/px2vw";
import usdc from "@/assets/imgs/usdc.png";
import gamiflyToken from "@/assets/imgs/gamiflyToken.png";
import globalStore from "@/stores/global";
import { recharge } from "@/connect/wallet";
import { useWeb3React } from "@web3-react/core";
import { deposit } from "@/apis/deposit";
import { withdraw } from "@/apis/withdraw";
import useSWR from "swr";

export interface IProps {
  inputVal: string;
  address: string;
  chooseType: string;
  gmfVal?: string;
  backClick: (type: string) => void;
  confirmClick: () => void;
}

function Index({
  inputVal,
  address,
  chooseType,
  gmfVal,
  backClick,
  confirmClick,
}: IProps) {
  const toast = useToast();
  const { library, account } = useWeb3React();
  const { userInfo, globalAccount } = globalStore();
  const [loading, setLoading] = useBoolean(false);
  const [depositHash, setDepositHash] = useState("");
  const [isDeposit, setIsDeposit] = useBoolean(false);
  const [isWithdraw, setWithdraw] = useBoolean(false);
  const token = "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174";

  const { data: depositData } = useSWR(
    userInfo &&
      userInfo?.platform_wallet &&
      depositHash &&
      isDeposit &&
      deposit.key,
    () =>
      deposit.fetcher({
        hash: depositHash,
        wallet_address: userInfo?.platform_wallet,
      }),
    {
      revalidateOnFocus: false,
    }
  );

  const { data: withdrawData } = useSWR(
    userInfo && userInfo?.platform_wallet && isWithdraw
      ? [withdraw.key, isWithdraw, gmfVal]
      : null,
    () =>
      withdraw.fetcher({
        user_id: userInfo?.id,
        accessToken: userInfo?.access_token,
        withdrawable_amount: Number(gmfVal),
        withdraw_address: address,
      }),
    {
      revalidateOnFocus: false,
    }
  );

  useEffect(() => {
    if (depositHash) {
      setIsDeposit.on();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [depositHash]);

  useEffect(() => {
    if (depositData) {
      setLoading.off();
      confirmClick();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [depositData]);

  useEffect(() => {
    if (withdrawData?.result) {
      // success(withdrawData?.hash, inputValue);
      setLoading.off();
      setWithdraw.off();
      confirmClick();
    } else if (withdrawData?.message) {
      toast({
        title: "Fail",
        description: withdrawData?.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      setLoading.off();
      setWithdraw.off();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [withdrawData]);

  return (
    <Flex
      w={{ base: "full", lg: "496px" }}
      py={{ base: px2vw(25), lg: "30px" }}
      px={{ base: px2vw(25), lg: "60px" }}
      h="fit-content"
      flexDir="column"
      alignItems="center"
      border="1px solid"
      borderColor="black.1800"
      borderRadius="40px"
      boxSizing="border-box"
    >
      <Text fontFamily="SofiaPro" textStyle="14" color="gray.500" mr="auto">
        Step 3/4
      </Text>
      <Text
        fontFamily="SofiaPro"
        fontWeight="600"
        color="white.100"
        mr="auto"
        fontSize={{ base: px2vw(21), lg: "21px" }}
        lineHeight={{ base: px2vw(40), lg: "40px" }}
      >
        Review Order
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
        {chooseType === "Deposit"
          ? `Please confirm the amount of Gamifly token you are going to purchase with us :`
          : `Please confirm the amount of Gamifly token you are going to withdraw :`}
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
      {/* price */}
      <Flex mr="auto" flexDir="column" mb={{ base: px2vw(60), lg: "60px" }}>
        <Flex alignItems="flex-end">
          <Text
            fontFamily="SofiaPro"
            fontWeight="black"
            color="green.1000"
            mr={{ base: px2vw(5), lg: "5px" }}
            fontSize={{ base: px2vw(65), lg: "65px" }}
            lineHeight={{ base: px2vw(65), lg: "65px" }}
          >
            {Number(inputVal)}
          </Text>
          <Flex mb="10px">
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
              opacity="0.6"
              lineHeight={{ base: px2vw(18), lg: "18px" }}
            >
              USDC
            </Text>
          </Flex>
        </Flex>

        <Flex alignItems="center">
          <Text
            fontFamily="SofiaPro"
            fontWeight="bold"
            fontSize={{ base: px2vw(19), lg: "19px" }}
            lineHeight={{ base: px2vw(25), lg: "25px" }}
          >
            ≈ {Number(gmfVal)}
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
      </Flex>
      {/* buttons */}
      <Flex w="full" flexDir="column" justifyContent="space-between">
        {/* confirm */}
        <Flex
          mb={{ base: px2vw(15), lg: "15px" }}
          h={{ base: px2vw(40), lg: "50px" }}
          w="full"
          border="1px solid"
          borderColor="green.1000"
          bgColor="green.1000"
          borderRadius="5px"
          justifyContent="center"
          alignItems="center"
          cursor="pointer"
          onClick={() => {
            setLoading.on();
            if (chooseType === "Deposit") {
              recharge(
                library,
                String(account || globalAccount),
                token,
                userInfo,
                inputVal,
                (res: string) => setDepositHash(res)
              );
            } else {
              setWithdraw.on();
            }
          }}
        >
          {loading ? (
            <Spinner />
          ) : (
            <Text
              fontSize={{ base: px2vw(17), lg: "17px" }}
              fontFamily="Eurostile"
              fontWeight="bold"
              color="black.1600"
            >
              {chooseType === "Deposit"
                ? `DEPOSIT WITH ${Number(inputVal)} USDC`
                : `WITHDRAW ${Number(inputVal)} USDC`}
            </Text>
          )}
        </Flex>
        {/* back */}
        <Flex
          mb={{ base: "15px", lg: "15px" }}
          h={{ base: "50px", lg: "50px" }}
          w="full"
          border="1px solid"
          borderColor="green.1000"
          borderRadius="5px"
          justifyContent="center"
          alignItems="center"
          cursor="pointer"
          onClick={() => backClick(chooseType)}
        >
          <Text
            fontSize={{ base: "17px", lg: "17px" }}
            fontFamily="Eurostile"
            fontWeight="bold"
            color="green.1000"
          >
            EDIT
          </Text>
        </Flex>
      </Flex>
    </Flex>
  );
}

export default React.memo(Index);
