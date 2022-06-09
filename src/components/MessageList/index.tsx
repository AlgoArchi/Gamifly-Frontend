import React from "react";
import { Flex, FlexProps, Image, Text } from "@chakra-ui/react";
import px2vw from "@/utils/px2vw";
import messageIcon from "@/assets/imgs/messageIcon.png";

export interface IProps extends FlexProps {
  messageList: messageItem[];
}

export interface messageItem {
  icon?: string;
  title?: string;
  content: string;
  time: string;
}

function Index({ messageList }: IProps) {
  return (
    <Flex w="full" flexDir="column">
      {messageList.map((item: messageItem, index: number) => (
        <Flex
          key={index}
          w="full"
          flexDir="column"
          boxSizing="border-box"
          bgColor="black.700"
          minH={{ base: px2vw(123), lg: "123px" }}
          p={{ base: px2vw(15), lg: "15px" }}
          mb={{ base: px2vw(5), lg: "5px" }}
          filter="drop-shadow(0px 2px 15px rgba(94, 198, 184, 0.4))"
        >
          {/* 标题 */}
          <Flex mb={{ base: px2vw(10), lg: "10px" }}>
            <Image
              src={item?.icon || messageIcon}
              w={{ base: px2vw(20), lg: "30px" }}
              h={{ base: px2vw(20), lg: "30px" }}
              mr={{ base: px2vw(10), lg: "10px" }}
            />
            <Text
              fontFamily="Orbitron"
              fontWeight="600"
              fontSize={{ base: px2vw(14), lg: "14px" }}
              lineHeight={{ base: px2vw(20), lg: "30px" }}
            >
              {item?.title || "Reward"}
            </Text>
          </Flex>
          {/* 内容 */}
          <Text
            fontFamily="Nunito"
            fontWeight="400"
            color="white.100"
            fontSize={{ base: px2vw(14), lg: "14px" }}
            lineHeight={{ base: px2vw(19), lg: "19px" }}
            mb={{ base: px2vw(10), lg: "10px" }}
          >
            {item.content}
          </Text>
          {/* 时间 */}
          <Text
            fontFamily="Nunito"
            fontWeight="400"
            color="white.500"
            opacity={0.65}
            fontSize={{ base: px2vw(12), lg: "12px" }}
            lineHeight={{ base: px2vw(12), lg: "12px" }}
          >
            {item.time}
          </Text>
        </Flex>
      ))}
    </Flex>
  );
}

export default React.memo(Index);
