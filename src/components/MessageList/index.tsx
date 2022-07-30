import React, { useEffect, useState } from "react";
import { Flex, FlexProps, Image, Text } from "@chakra-ui/react";
import px2vw from "@/utils/px2vw";
import messageIcon from "@/assets/imgs/messageIcon.png";
import { setReadNotification } from "@/apis/notifications";
import useSWR from "swr";

export interface IProps extends FlexProps {
  type?: number;
  messageList: messageItem[];
}

export interface messageItem {
  id?: number;
  icon?: string;
  title?: string;
  content: string;
  datetime: string;
  status?: number;
  user_id?: number;
}

function Index({ type = 1, messageList }: IProps) {
  const [notificationIds, setNotificationIds] = useState<any>(null);
  const { data: _setReadNotificationData } = useSWR(
    notificationIds ? [setReadNotification.key, notificationIds] : null,
    (_) => setReadNotification.fetcher({ notification_id: notificationIds }),
    { revalidateOnFocus: false }
  );

  useEffect(() => {
    if (type === 0 && messageList.length > 0) {
      setNotificationIds(messageList.map((item) => item?.id));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messageList]);
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
            {item.datetime}
          </Text>
        </Flex>
      ))}
    </Flex>
  );
}

export default React.memo(Index);
