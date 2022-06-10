import React from "react";
import { Text, Flex, FlexProps } from "@chakra-ui/react";
import px2vw from "@/utils/px2vw";

export interface transactionItem {
  time: string;
  type: string;
  asset: string;
  amount: string;
  destination: string;
  txID: string;
  status: string;
}

export interface IProps extends FlexProps {
  index: number;
  item: transactionItem;
  isSimple?: boolean;
}

function Index({ index, item, isSimple }: IProps) {
  return (
    <Flex
      w={{ base: "max-content", lg: "100%" }}
      h={{ base: px2vw(50), lg: "50px" }}
      lineHeight={{ base: px2vw(50), lg: "50px" }}
      px={{ base: px2vw(20), lg: "20px" }}
      justifyContent={isSimple ? "flex-start" : "space-between"}
      boxSizing="border-box"
      fontFamily="Nunito"
      color="white.600"
      textStyle="14"
      fontWeight="400"
      bgColor={index % 2 === 0 ? "black.300" : "black.400"}
    >
      <Flex w={{ base: px2vw(163), lg: "163px" }}>
        <Text>{item.time}</Text>
      </Flex>
      <Flex w={{ base: px2vw(110), lg: "110px" }}>
        <Text>{item.type}</Text>
      </Flex>
      <Flex w={{ base: px2vw(107), lg: "107px" }}>
        <Text>{item.asset}</Text>
      </Flex>
      <Flex w={{ base: px2vw(109), lg: "109px" }}>
        <Text>{item.amount}</Text>
      </Flex>
      {!isSimple && (
        <Flex w={{ base: px2vw(217), lg: "217px" }}>
          <Text>
            {item.destination.substring(0, 5) +
              "..." +
              item.destination.substring(
                item.destination.length - 2,
                item.destination.length
              )}
          </Text>
        </Flex>
      )}
      {!isSimple && (
        <Flex w={{ base: px2vw(109), lg: "109px" }}>
          <Text>
            {item.txID.substring(0, 5) +
              "..." +
              item.txID.substring(item.txID.length - 6, item.txID.length)}
          </Text>
        </Flex>
      )}
      <Flex justifyContent="flex-end" w={{ base: px2vw(140), lg: "140px" }}>
        <Flex
          flexDir="column"
          justifyContent="center"
          bgColor={
            item.status === "Success"
              ? "green.100"
              : item.status === "In progress"
              ? "yellow.200"
              : "red"
          }
          my="auto"
          w={{ base: px2vw(85), lg: "85px" }}
          h={{ base: px2vw(22), lg: "22px" }}
        >
          <Text textAlign="center">{item.status}</Text>
        </Flex>
      </Flex>
    </Flex>
  );
}

export default React.memo(Index);
