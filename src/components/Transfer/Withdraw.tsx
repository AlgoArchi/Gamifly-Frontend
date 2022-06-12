import React from "react";
import { Flex, Image, Text } from "@chakra-ui/react";
import px2vw from "@/utils/px2vw";
import messageIcon from "@/assets/imgs/messageIcon.png";
import CryptoWallet from "../CryptoWallet";
import BaseButton from "../BaseButton";

export interface IProps {
  totalPrice: number;
  priceUnit: string;
  success: () => void;
}

function Index({ totalPrice, priceUnit, success }: IProps) {
  return (
    <Flex
      p={{ base: px2vw(20), lg: "20px" }}
      flexDir="column"
      w="full"
      boxSizing="border-box"
      bgColor="black.300"
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
        w={{ base: "full", lg: "314px" }}
        nativePrice={77.7}
        nativeUnit="GMF"
        otherPrice={21.3}
        otherUnit="TRX"
        buttonText="Withdraw"
        buyClick={() => success()}
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
              {totalPrice}
              {priceUnit}
            </Text>
          </Flex>
        </Flex>
        <BaseButton
          fontFamily="Nunito"
          textStyle="16"
          w="full"
          onClick={() => success()}
        >
          Withdraw
        </BaseButton>
      </Flex>
    </Flex>
  );
}

export default React.memo(Index);
