import React from "react";
import { Flex, Text } from "@chakra-ui/react";
import px2vw from "@/utils/px2vw";
import BaseButton from "@/components/BaseButton";
import BaseCheck from "@/components/BaseCheck";

export interface IProps {
  chooseType: string;
  continueClick: () => void;
  setChooseType: (type: string) => void;
}

function Index({ chooseType, continueClick, setChooseType }: IProps) {
  return (
    <Flex flexDir="column">
      <Flex
        flexDir={{ base: "column", lg: "row" }}
        mb={{ base: px2vw(30), lg: "30px" }}
        justifyContent="space-between"
      >
        {/* Deposit */}
        <Flex
          w={{ base: "full", lg: `calc(50% - 10px)` }}
          h={{ base: px2vw(96), lg: "96px" }}
          p={{ base: `${px2vw(35)} ${px2vw(30)}`, lg: "35px 30px" }}
          justifyContent={{ base: "space-between", lg: "flex-start" }}
          mb={{ base: px2vw(5), lg: 0 }}
          bgColor="black.600"
          borderRadius="6px"
          cursor="pointer"
          onClick={() => {
            setChooseType("Deposit");
          }}
        >
          <BaseCheck
            isActive={chooseType === "Deposit"}
            bgColor={chooseType === "Deposit" ? "green.100" : "gray.100"}
            border="none"
          />
          <Text
            fontFamily="Nunito"
            fontWeight="600"
            color="white.100"
            fontSize={{ base: px2vw(18), lg: "18px" }}
            lineHeight={{ base: px2vw(26), lg: "26px" }}
            order={{ base: -1, lg: 1 }}
          >
            Deposit
          </Text>
        </Flex>
        {/* Withdraw */}
        <Flex
          w={{ base: "full", lg: `calc(50% - 10px)` }}
          h={{ base: px2vw(96), lg: "96px" }}
          p={{ base: `${px2vw(35)} ${px2vw(30)}`, lg: "35px 30px" }}
          justifyContent={{ base: "space-between", lg: "flex-start" }}
          bgColor="black.600"
          cursor="pointer"
          borderRadius="6px"
          onClick={() => {
            setChooseType("Withdraw");
          }}
        >
          <BaseCheck
            isActive={chooseType === "Withdraw"}
            bgColor={chooseType === "Withdraw" ? "green.100" : "gray.100"}
            border="none"
          />
          <Text
            fontFamily="Nunito"
            fontWeight="600"
            color="white.100"
            fontSize={{ base: px2vw(18), lg: "18px" }}
            lineHeight={{ base: px2vw(26), lg: "26px" }}
            order={{ base: -1, lg: 1 }}
          >
            Withdraw
          </Text>
        </Flex>
      </Flex>
      <BaseButton
        fontFamily="Nunito"
        textStyle="16"
        w={{ base: `calc(100vw - ${px2vw(30)})`, lg: "314px" }}
        pos={{ base: "fixed", lg: "inherit" }}
        bottom={px2vw(45)}
        left={px2vw(15)}
        onClick={() => {
          continueClick();
        }}
      >
        Continue
      </BaseButton>
    </Flex>
  );
}

export default React.memo(Index);
