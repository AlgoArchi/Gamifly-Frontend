import React, { useEffect, useState } from "react";
import {
  Flex,
  Text,
  Image,
  FlexProps,
  useBoolean,
  Spinner,
  Box,
} from "@chakra-ui/react";
import px2vw from "@/utils/px2vw";
import cryptoIc from "@/assets/imgs/cryptoIcon.png";
import { getGMFPrice } from "@/apis/deposit";
import useSWR from "swr";
import GamiflyWallet from "../GamiflyWallet";
import BaseButton from "../BaseButton";

export interface IProps extends FlexProps {
  nativePrice: string | number;
  nativeUnit: string;
  otherPrice?: string | number;
  otherUnit?: string;
  buttonText?: string;
  isInput?: boolean;
  buttonLoading?: boolean;
  loadingText?: string;
  withOutConversions?: boolean;
  inputValueChange?: (val: string) => void;
  buyClick?: () => void;
}

function Index({
  nativePrice,
  nativeUnit,
  otherPrice,
  otherUnit,
  buyClick,
  buttonText,
  isInput,
  buttonLoading,
  loadingText,
  withOutConversions,
  inputValueChange,
  ...prop
}: IProps) {
  const [getNewPriceLoading, setGetNewPriceLoading] = useBoolean(false);
  const [usdcPrice, setUsdcPrice] = useState("0");
  const [getNewPrice, setGetNewPrice] = useState(0);
  const [gmfPrice, setGmfPrice] = useState("");
  const { data: getGMFPriceData } = useSWR(
    !withOutConversions && usdcPrice && Number(usdcPrice) && getNewPrice
      ? [getGMFPrice.key, getNewPrice]
      : null,
    () => getGMFPrice.fetcher(usdcPrice),
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
    if (nativePrice && Number(nativePrice)) {
      setGetNewPriceLoading.on();
      setUsdcPrice(nativePrice as string);
      setGetNewPrice(Math.random());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nativePrice]);

  return (
    <Flex flexDir="column" {...prop}>
      <Flex
        p={{ base: px2vw(15), lg: "15px" }}
        mb={{ base: px2vw(10), lg: "10px" }}
        h={{ base: px2vw(57), lg: "57px" }}
        alignItems="center"
        boxSizing="border-box"
        bgColor="black.600"
        w="full"
        borderRadius="6px"
      >
        <Image
          src={cryptoIc}
          w={{ base: px2vw(26), lg: "26px" }}
          h={{ base: px2vw(26), lg: "26px" }}
          mr={{ base: px2vw(10), lg: "10px" }}
        />
        <Text
          fontFamily="Nunito"
          fontWeight="400"
          textStyle="16"
          color="white.100"
        >
          Gamifly Account
        </Text>
      </Flex>
      <Flex flexDir="column" pos="relative">
        <GamiflyWallet
          withOutButton
          price={nativePrice}
          unit={nativeUnit || ""}
          isInput={isInput}
          inputValueChange={(val: string) => {
            inputValueChange?.(val);
            if (val === "") return;
            setGetNewPriceLoading.on();
            setUsdcPrice(val);
            setTimeout(() => {
              setGetNewPrice(Math.random());
            }, 1000);
          }}
          mb="3px"
        />
        {!withOutConversions && (
          <Box>
            {getNewPriceLoading ? (
              <Spinner size="xs" mt="5px" />
            ) : (
              <Text mt="5px">≈ {Number(gmfPrice)} GMF</Text>
            )}
          </Box>
        )}

        {/* <Flex
          w="23px"
          h="23px"
          borderRadius="50%"
          bgColor="black.100"
          flexDir="column"
          alignItems="center"
          justifyContent="center"
          m="auto"
          pos="absolute"
          left="0"
          right="0"
          top="0"
          bottom="0"
        >
          <Image src={arrows} w="5px" h="7px" transform="rotate(90deg)" />
          <Image src={arrows} w="5px" h="7px" transform="rotate(-90deg)" />
        </Flex> */}
      </Flex>
      <BaseButton
        isLoading={buttonLoading || false}
        loadingText={loadingText}
        display={{ base: "none", lg: "flex" }}
        w={{ base: "full", lg: "full" }}
        mt={{ base: px2vw(20), lg: "20px" }}
        fontFamily="Nunito"
        fontWeight="600"
        textStyle="16"
        onClick={() => buyClick?.()}
      >
        {buttonText || "Buy"}
      </BaseButton>
    </Flex>
  );
}

export default React.memo(Index);
