import React from "react";
import { Text, Flex, Image, FlexProps } from "@chakra-ui/react";
import px2vw from "@/utils/px2vw";
import { useRouter } from "next/router";

export interface NFTItemProp {
  img: string;
  name?: string;
  price?: string;
  unit?: string;
  unitIcon?: string;
  description?: string;
}

export interface IProps extends FlexProps {
  index: number;
  item: NFTItemProp;
  isSimple?: boolean;
  itemClick?: (obj: NFTItemProp) => void;
}

function Index({ index, item, isSimple, itemClick, ...prop }: IProps) {
  const router = useRouter();
  return (
    <Flex
      flexDir="column"
      justifyContent="flex-end"
      px={{ base: px2vw(10), lg: "10px" }}
      py={{ base: px2vw(12), lg: "12px" }}
      mt={{ base: px2vw(10), lg: "10px" }}
      bgImage={item.img}
      bgSize="100% 100%"
      bgRepeat="no-repeat"
      boxSizing="border-box"
      pos="relative"
      cursor={isSimple ? "default" : "pointer"}
      onClick={() => {
        itemClick?.(item);
      }}
      {...prop}
    >
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
        {item?.price && item?.unit && (
          <Text
            fontFamily="Nunito"
            fontWeight="700"
            fontSize={{ base: px2vw(14), lg: "12px" }}
            lineHeight={{ base: px2vw(15), lg: "15px" }}
          >
            {item?.price}
            {item?.unit}
          </Text>
        )}
      </Flex>
      {index === 7 && router.pathname !== "/myNft" && (
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
