import React, { useEffect, useState } from "react";
import { Flex, Image, Text, useBoolean, useToast } from "@chakra-ui/react";
import px2vw from "@/utils/px2vw";
import messageIcon from "@/assets/imgs/messageIcon.png";
import { withdraw } from "@/apis/withdraw";
import useSWR from "swr";
import CryptoWallet from "../CryptoWallet";
import BaseButton from "../BaseButton";
import globalStore from "@/stores/global";

export interface IProps {
  totalPrice: number;
  priceUnit: string;
  success: (hash: string, val: string) => void;
}

function Index({ success }: IProps) {
  const toast = useToast();
  const { userInfo } = globalStore();
  const [loading, setLoading] = useBoolean(false);
  const [isWithdraw, setWithdraw] = useBoolean(false);
  const [inputValue, setInputValue] = useState("");
  const { data: withdrawData } = useSWR(
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

  useEffect(() => {
    if (withdrawData?.result) {
      success(withdrawData?.hash, inputValue);
      setLoading.off();
      setWithdraw.off();
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
      p={{ base: px2vw(20), lg: "20px" }}
      flexDir="column"
      w="full"
      boxSizing="border-box"
      bgColor="black.300"
      borderRadius="6px"
      overflow="hidden"
    >
      <Text
        fontFamily="Orbitron"
        color="white.100"
        textStyle="18"
        fontWeight="600"
        mb={{ base: px2vw(20), lg: "20px" }}
        lineHeight={{ base: px2vw(23), lg: "23px" }}
      >
        Amount
      </Text>
      <CryptoWallet
        isInput
        withOutConversions
        w={{ base: "full", lg: "314px" }}
        nativePrice={inputValue}
        buttonLoading={loading}
        loadingText="Withdraw"
        nativeUnit="USDC"
        buttonText="Withdraw"
        inputValueChange={(val: string) => setInputValue(val)}
        buyClick={() => {
          if (inputValue !== "" && !isNaN(Number(inputValue))) {
            setLoading.on();
            setWithdraw.on();
          }
          // success();
        }}
      />
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
              USDC
            </Text>
          </Flex>
        </Flex>
        <BaseButton
          isLoading={loading}
          loadingText="Withdraw"
          fontFamily="Nunito"
          textStyle="16"
          w="full"
          onClick={() => {
            if (inputValue !== "" && !isNaN(Number(inputValue))) {
              setLoading.on();
              setWithdraw.on();
            }
          }}
        >
          Withdraw
        </BaseButton>
      </Flex>
    </Flex>
  );
}

export default React.memo(Index);
