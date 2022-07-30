import React from "react";
import { Text, Flex, Image, FlexProps } from "@chakra-ui/react";
import px2vw from "@/utils/px2vw";
import { useRouter } from "next/router";
import BaseCheck from "../BaseCheck";

export interface NFTItemProp {
  image: string;
  id?: string | number;
  name?: string;
  price?: string;
  total_amount?: string;
  unit?: string;
  unitIcon?: string;
  content?: string;
  isActive?: boolean;
  created?: string;
  status?: number;
}

export interface IProps extends FlexProps {
  index: number;
  item: NFTItemProp;
  isSimple?: boolean;
  multiple?: boolean;
  listLength?: number;
  itemClick?: (obj: NFTItemProp) => void;
  activeClick?: (index: number, obj: NFTItemProp) => void;
}

function Index({
  index,
  item,
  isSimple,
  multiple,
  itemClick,
  activeClick,
  listLength,
  ...prop
}: IProps) {
  const router = useRouter();
  return (
    <Flex
      flexDir="column"
      justifyContent="flex-end"
      px={{ base: px2vw(10), lg: "10px" }}
      py={{ base: px2vw(12), lg: "12px" }}
      mt={{ base: px2vw(10), lg: "10px" }}
      bgImage={item.image}
      bgSize="100% 100%"
      bgRepeat="no-repeat"
      boxSizing="border-box"
      pos="relative"
      borderRadius="6px"
      cursor={isSimple ? "default" : "pointer"}
      onClick={() => {
        itemClick?.(item);
      }}
      {...prop}
    >
      {multiple && (
        <BaseCheck
          pos="absolute"
          w={{ base: px2vw(26), lg: "26px" }}
          h={{ base: px2vw(26), lg: "26px" }}
          mr={{ base: px2vw(20), lg: "20px" }}
          top={{ base: px2vw(15), lg: "15px" }}
          left={{ base: px2vw(15), lg: "15px" }}
          isActive={item?.isActive as boolean}
          onClick={(e) => {
            e.stopPropagation();
            activeClick?.(index, item);
          }}
        />
      )}
      {item?.name && (
        <Text
          fontFamily="Nunito"
          fontWeight="500"
          fontSize={{ base: px2vw(12), lg: "10px" }}
          lineHeight={{ base: px2vw(16), lg: "14px" }}
          mb={{ base: px2vw(4), lg: "4px" }}
        >
          {item?.name}
        </Text>
      )}
      <Flex>
        {item?.unitIcon && (
          <Image
            src={item?.unitIcon}
            w={{ base: px2vw(15), lg: "15px" }}
            h={{ base: px2vw(15), lg: "15px" }}
            mr={{ base: px2vw(5), lg: "5px" }}
          />
        )}
        {item?.price && (
          <Text
            fontFamily="Nunito"
            fontWeight="700"
            fontSize={{ base: px2vw(14), lg: "12px" }}
            lineHeight={{ base: px2vw(15), lg: "15px" }}
          >
            {item?.price} {item?.unit || "GMF"}
          </Text>
        )}
      </Flex>
      {listLength &&
        index === listLength - 1 &&
        router.pathname !== "/myNft" &&
        router.pathname !== "/purchase" && (
          <Flex
            alignItems="center"
            justifyContent="center"
            pos="absolute"
            left="0"
            top="0"
            w="100%"
            h="100%"
            bgColor="black.600"
            fontFamily="Nunito"
            fontWeight="700"
            textStyle="18"
            color="white.100"
            cursor="pointer"
            onClick={() => router.push("/myNft")}
          >
            View all
          </Flex>
        )}
    </Flex>
  );
}

export default React.memo(Index);
