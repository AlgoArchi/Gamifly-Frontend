import React from "react";
import { Flex, Text, Box, Image, FlexProps } from "@chakra-ui/react";
import px2vw from "@/utils/px2vw";
import line from "@/assets/imgs/greenLine.png";
import BaseButton from "../BaseButton";

export interface IProps extends FlexProps {
  unit: string;
  price: string | number;
  withOutButton?: boolean;
  buyClick?: () => void;
}

function Index({ unit, price, withOutButton, buyClick, ...prop }: IProps) {
  return (
    <Flex flexDir="column" {...prop}>
      <Flex w="full" h={{ base: px2vw(57), lg: "57px" }}>
        <Flex
          w={{ base: px2vw(211), lg: "211px" }}
          alignItems="center"
          fontFamily="Nunito"
          fontWeight="600"
          textStyle="18"
          color="white.100"
          pos="relative"
          lineHeight={{ base: px2vw(57), lg: "57px" }}
          px={{ base: px2vw(15), lg: "15px" }}
          mr={{ base: px2vw(2), lg: "2px" }}
          bgColor="black.600"
        >
          <Text>{price}</Text>
          <Image
            src={line}
            w={{ base: px2vw(2), lg: "2px" }}
            pos="absolute"
            right={{ base: px2vw(-2), lg: "-2px" }}
            top="0"
          />
        </Flex>
        <Flex
          w={{ base: `calc(100% - ${px2vw(211)})`, lg: "calc(100% - 211px)" }}
          alignItems="center"
          fontFamily="Nunito"
          fontWeight="400"
          textStyle="16"
          color="white.100"
          lineHeight={{ base: px2vw(57), lg: "57px" }}
          px={{ base: px2vw(15), lg: "15px" }}
          bgColor="black.600"
        >
          <Text>{unit}</Text>
        </Flex>
      </Flex>
      {!withOutButton && (
        <BaseButton
          display={{ base: "none", lg: "block" }}
          w={{ base: "full", lg: "314px" }}
          mt={{ base: px2vw(20), lg: "20px" }}
          fontFamily="Nunito"
          fontWeight="600"
          textStyle="16"
          onClick={() => buyClick?.()}
        >
          Buy
        </BaseButton>
      )}
    </Flex>
  );
}

export default React.memo(Index);
