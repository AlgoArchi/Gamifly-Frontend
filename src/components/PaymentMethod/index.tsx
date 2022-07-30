import React from "react";
import { Text, Flex } from "@chakra-ui/react";
import px2vw from "@/utils/px2vw";
import BaseCheck from "../BaseCheck";

export interface IProps {
  paymentMethod: number;
  withOutWallet?: boolean;
  setPaymentMethod: (type: number) => void;
}

function Index({ paymentMethod, withOutWallet, setPaymentMethod }: IProps) {
  const MethodItem = React.memo(
    ({
      type,
      typeName,
      widthOutMb,
    }: {
      type: number;
      typeName: string;
      widthOutMb?: boolean;
    }) => {
      return (
        <Flex
          w="full"
          bgColor="black.600"
          cursor="pointer"
          borderRadius="6px"
          justifyContent={{ base: "space-between", lg: "flex-start" }}
          mb={widthOutMb ? 0 : { base: px2vw(10), lg: "10px" }}
          h={{ base: px2vw(55), lg: "76px" }}
          p={{ base: `${px2vw(17.5)} ${px2vw(18)}`, lg: "25px 30px" }}
          onClick={() => setPaymentMethod(type)}
        >
          <BaseCheck
            isActive={paymentMethod === type}
            w={{ base: px2vw(20), lg: "26px" }}
            h={{ base: px2vw(20), lg: "26px" }}
            mr="0"
          />
          <Text
            fontFamily="Nunito"
            fontWeight="600"
            textStyle={{ base: "16", lg: "18" }}
            ml={{ base: 0, lg: "20px" }}
            lineHeight={{ base: px2vw(20), lg: "20px" }}
            order={{ base: -1, lg: 1 }}
          >
            {typeName}
          </Text>
        </Flex>
      );
    }
  );
  return (
    <Flex flexDir="column">
      <Text
        mb={{ base: px2vw(15), lg: "15px" }}
        fontFamily="Orbitron"
        fontWeight="600"
        textStyle={{ base: "16", lg: "18" }}
        color="white.100"
      >
        Payment method
      </Text>
      <Flex flexDir="column">
        {!withOutWallet && <MethodItem type={1} typeName="Gamifly Account" />}
        {/* <MethodItem type={2} typeName="Credit / debit card" /> */}
        <MethodItem type={3} widthOutMb typeName="DeFi Wallet" />
      </Flex>
    </Flex>
  );
}

export default React.memo(Index);
