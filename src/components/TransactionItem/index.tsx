import React from "react";
import { Text, Flex, Image, FlexProps, useToast } from "@chakra-ui/react";
import px2vw from "@/utils/px2vw";
import copyFunction from "copy-to-clipboard";
import scan from "@/assets/imgs/scan.png";
import copy from "@/assets/imgs/transactionsCopy.png";

export interface transactionItem {
  datetime: string;
  type: string;
  asset: string;
  amount: string | number;
  destination: string;
  transaction_id: string;
  status: number;
}

export interface IProps extends FlexProps {
  index?: number;
  item: transactionItem;
  isSimple?: boolean;
}

function Index({ item, isSimple }: IProps) {
  const toast = useToast();
  // 处理日期格式
  const returnTime = (time: string) => {
    const date = new Date(time);
    const year = date.getFullYear();
    const month =
      date.getMonth() + 1 < 10
        ? `0${date.getMonth() + 1}`
        : date.getMonth() + 1;
    const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
    const hour = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours();
    const min =
      date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();
    return `${day}-${month}-${year} ${hour}:${min}`;
  };
  return (
    <Flex
      w={{ base: "max-content", lg: "100%" }}
      h={{ base: px2vw(50), lg: "50px" }}
      lineHeight={{ base: px2vw(50), lg: "50px" }}
      px={{ base: px2vw(20), lg: "20px" }}
      justifyContent={isSimple ? "flex-start" : "space-between"}
      boxSizing="border-box"
      fontFamily="Nunito"
      color="white.100"
      textStyle="14"
      fontWeight="400"
      // bgColor={index % 2 === 0 ? "black.300" : "black.400"}
      bgColor="black.1600"
      borderBottom="1px solid"
      borderColor="black.1800"
    >
      <Flex w={{ base: px2vw(163), lg: "200px" }}>
        <Text>{returnTime(item.datetime)}</Text>
      </Flex>
      <Flex w={{ base: px2vw(110), lg: !isSimple ? "180px" : "250px" }}>
        <Text>{item.type}</Text>
      </Flex>
      {!isSimple && (
        <Flex w={{ base: px2vw(107), lg: "107px" }}>
          <Text>{item.asset}</Text>
        </Flex>
      )}
      <Flex
        w={{ base: px2vw(109), lg: !isSimple ? "150px" : "200px" }}
        color="green.1000"
      >
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
          {/* <Image
            src={scan}
            w={{ base: px2vw(14), lg: "14px" }}
            h={{ base: px2vw(14), lg: "14px" }}
            ml={{ base: px2vw(10), lg: "10px" }}
            mr={{ base: px2vw(5), lg: "5px" }}
            my="auto"
            cursor="pointer"
            onClick={() =>
              window.open(`https://polygonscan.com/tx/${item.destination}`)
            }
          /> */}
          <Image
            src={copy}
            w={{ base: px2vw(14), lg: "14px" }}
            h={{ base: px2vw(14), lg: "14px" }}
            my="auto"
            ml={{ base: px2vw(10), lg: "10px" }}
            cursor="pointer"
            onClick={() => {
              copyFunction(item.destination);
              toast({
                title: "success",
                status: "success",
                duration: 3000,
                isClosable: true,
              });
            }}
          />
        </Flex>
      )}
      {!isSimple && (
        <Flex w={{ base: px2vw(109), lg: "109px" }}>
          <Text>
            {item.transaction_id.substring(0, 5) +
              "..." +
              item.transaction_id.substring(
                item.transaction_id.length - 6,
                item.transaction_id.length
              )}
          </Text>
          <Image
            src={scan}
            w={{ base: px2vw(14), lg: "14px" }}
            h={{ base: px2vw(14), lg: "14px" }}
            ml={{ base: px2vw(10), lg: "10px" }}
            mr={{ base: px2vw(5), lg: "5px" }}
            my="auto"
            cursor="pointer"
            onClick={() =>
              window.open(`https://polygonscan.com/tx/${item.transaction_id}`)
            }
          />
          <Image
            src={copy}
            w={{ base: px2vw(14), lg: "14px" }}
            h={{ base: px2vw(14), lg: "14px" }}
            my="auto"
            cursor="pointer"
            onClick={() => {
              copyFunction(item.transaction_id);
              toast({
                title: "success",
                status: "success",
                duration: 3000,
                isClosable: true,
              });
            }}
          />
        </Flex>
      )}
      <Flex justifyContent="flex-end" w={{ base: px2vw(140), lg: "140px" }}>
        <Flex
          flexDir="column"
          justifyContent="center"
          bgColor={
            item.status === 0
              ? "green.100"
              : item.status === 1
              ? "yellow.200"
              : "red"
          }
          my="auto"
          w={{ base: px2vw(85), lg: "85px" }}
          h={{ base: px2vw(22), lg: "22px" }}
        >
          <Text textAlign="center">
            {item.status === 0
              ? "Success"
              : item.status === 1
              ? "In progress"
              : "Fail"}
          </Text>
        </Flex>
      </Flex>
    </Flex>
  );
}

export default React.memo(Index);
