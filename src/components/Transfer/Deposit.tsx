import React, { useEffect, useState } from "react";
import { Flex, Box, Text, Image, useBoolean } from "@chakra-ui/react";
import px2vw from "@/utils/px2vw";
import messageIcon from "@/assets/imgs/messageIcon.png";
import transferLine from "@/assets/imgs/transferLine.png";
import PaymentMethod from "../PaymentMethod";
import GamiflyWallet from "../GamiflyWallet";
import CryptoWallet from "../CryptoWallet";
import BaseButton from "../BaseButton";
import { useWeb3React } from "@web3-react/core";
import globalStore from "@/stores/global";
import { recharge } from "@/connect/wallet";
import { deposit } from "@/apis/deposit";
import useSWR from "swr";

export interface IProps {
  paymentMethod: number;
  totalPrice?: number;
  setPaymentMethod: (type: number) => void;
  success: (val: string, hash: string) => void;
}

function Index({
  // totalPrice,
  paymentMethod,
  setPaymentMethod,
  success,
}: IProps) {
  const { library, account } = useWeb3React();
  const { userInfo, globalAccount } = globalStore();
  const [inputValue, setInputValue] = useState("");
  const [isDeposit, setIsDeposit] = useBoolean(false);
  const [hash, setHash] = useState("");
  const [loading, setLoading] = useBoolean(false);
  const token = "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174";

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

  useEffect(() => {
    if (hash) {
      setIsDeposit.on();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hash]);

  useEffect(() => {
    if (depositData) {
      success(inputValue, hash);
      setLoading.off();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [depositData]);

  return (
    <Flex
      minH={{ base: "auto", lg: "486px" }}
      flexDir={{ base: "column", lg: "row" }}
      bgColor={{ base: "transparent", lg: "black.300" }}
      pb={{ base: px2vw(148), lg: 0 }}
      borderRadius="6px"
      overflow={"hidden"}
    >
      {/* left */}
      <Flex
        pos="relative"
        flexDir="column"
        w={{ base: "full", lg: "70%" }}
        p={{
          base: 0,
          lg: "20px 20px 20px 5px",
        }}
      >
        {/* Payment method */}
        <Box pl={{ base: 0, lg: "15px" }}>
          <PaymentMethod
            withOutWallet
            paymentMethod={paymentMethod}
            setPaymentMethod={(type: number) => setPaymentMethod(type)}
          />
        </Box>

        <Image
          display={{ base: "none", lg: "block" }}
          src={transferLine}
          h="100%"
          pos="absolute"
          right="0"
          top="0"
        />
      </Flex>
      {/* right */}
      <Flex
        w={{ base: "full", lg: "30%" }}
        flexDir="column"
        p={{ base: 0, lg: "20px" }}
        mt={{ base: px2vw(20), lg: 0 }}
      >
        <Text
          fontFamily="Orbitron"
          color="white.100"
          textStyle="18"
          fontWeight="600"
          mb={{ base: px2vw(20), lg: "20px" }}
          lineHeight={{ base: px2vw(23), lg: "23px" }}
        >
          Total amount
        </Text>
        {paymentMethod === 1 || paymentMethod === 2 ? (
          <GamiflyWallet
            price={0}
            buttonLoading={loading}
            buttonText="Deposit"
            loadingText="Deposit"
            unit="GMF"
            // buyClick={() => success()}
          />
        ) : (
          <CryptoWallet
            buttonLoading={loading}
            nativePrice={inputValue}
            otherPrice={21.3}
            nativeUnit="USDC"
            otherUnit="TRX"
            buttonText="Deposit"
            loadingText="Deposit"
            isInput
            inputValueChange={(val) => setInputValue(val)}
            // buyClick={() => success()}
            buyClick={() => {
              setLoading.on();
              recharge(
                library,
                String(account || globalAccount),
                token,
                userInfo,
                inputValue,
                (res: string) => setHash(res)
              );
            }}
          />
        )}
      </Flex>
      {/* mobile buy */}
      <Flex
        flexDir="column"
        display={{ base: "flex", lg: "none" }}
        h={px2vw(148)}
        p={px2vw(15)}
        w="full"
        boxSizing="border-box"
        bgColor="black.1200"
        color="white.100"
        pos="fixed"
        borderTopLeftRadius="6px"
        borderTopRightRadius="6px"
        bottom={0}
        left={0}
        zIndex={1}
      >
        {/* price */}
        <Flex
          w="full"
          h={px2vw(20)}
          justifyContent="space-between"
          mb={px2vw(15)}
        >
          <Text
            fontFamily="Nunito"
            fontWeight="600"
            textStyle="16"
            lineHeight={px2vw(20)}
          >
            Total amount:
          </Text>
          <Flex>
            <Image
              src={messageIcon}
              w={px2vw(20)}
              h={px2vw(20)}
              mr={px2vw(8)}
            />
            <Text
              fontFamily="Orbitron"
              fontWeight="400"
              textStyle="16"
              color="green.100"
              lineHeight={px2vw(20)}
            >
              {inputValue}
            </Text>
          </Flex>
        </Flex>
        <BaseButton
          fontFamily="Nunito"
          textStyle="16"
          w="full"
          loadingText="Deposit"
          isLoading={loading}
          onClick={() => {
            setLoading.on();
            recharge(
              library,
              String(account || globalAccount),
              token,
              userInfo,
              inputValue,
              (res: string) => setHash(res),
              () => setLoading.off()
            );
          }}
        >
          Deposit
        </BaseButton>
      </Flex>
    </Flex>
  );
}

export default React.memo(Index);
