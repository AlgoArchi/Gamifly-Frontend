import React from "react";
import { Flex, Text, Image, FlexProps, Input } from "@chakra-ui/react";
import px2vw from "@/utils/px2vw";
import line from "@/assets/imgs/greenLine.png";
import BaseButton from "../BaseButton";

export interface IProps extends FlexProps {
  unit: string;
  price: string | number;
  buttonText?: string;
  withOutButton?: boolean;
  isInput?: boolean;
  buttonLoading?: boolean;
  loadingText?: string;
  inputValueChange?: (val: string) => void;
  buyClick?: () => void;
}

function Index({
  unit,
  price,
  buttonText,
  withOutButton,
  isInput = false,
  buyClick,
  inputValueChange,
  buttonLoading,
  loadingText,
  ...prop
}: IProps) {
  return (
    <Flex flexDir="column" {...prop}>
      <Flex w="full" h={{ base: px2vw(57), lg: "57px" }}>
        <Flex
          w={{ base: `calc(100% - ${px2vw(100)})`, lg: "calc(100% - 100px)" }}
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
          borderTopLeftRadius="6px"
          borderBottomLeftRadius="6px"
        >
          {!isInput ? (
            <Text>{price}</Text>
          ) : (
            <Input
              // eslint-disable-next-line jsx-a11y/no-autofocus
              autoFocus
              border="none"
              outline="none"
              bgColor="transparent"
              p="0"
              _focusVisible={{
                border: "none",
                outline: "none",
              }}
              placeholder="0"
              value={price}
              onChange={(e) => inputValueChange?.(e.target.value)}
            />
          )}

          <Image
            src={line}
            w={{ base: px2vw(2), lg: "2px" }}
            pos="absolute"
            right={{ base: px2vw(-2), lg: "-2px" }}
            top="0"
          />
        </Flex>
        <Flex
          w={{ base: px2vw(100), lg: "100px" }}
          alignItems="center"
          fontFamily="Nunito"
          fontWeight="400"
          textStyle="16"
          color="white.100"
          lineHeight={{ base: px2vw(57), lg: "57px" }}
          px={{ base: px2vw(15), lg: "15px" }}
          bgColor="black.600"
          borderTopRightRadius="6px"
          borderBottomRightRadius="6px"
        >
          <Text>{unit}</Text>
        </Flex>
      </Flex>
      {!withOutButton && (
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
      )}
    </Flex>
  );
}

export default React.memo(Index);
