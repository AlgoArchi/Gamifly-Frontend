import React, { useEffect, useState } from "react";
import { Box, Text } from "@chakra-ui/react";
import { getI18nSSRProps, GetI18nServerSideProps } from "@/utils/i18n";
import MessageList, { messageItem } from "@/components/MessageList";
import { getNotifications } from "@/apis/notifications";
import useSWR from "swr";
import globalStore from "@/stores/global";

function App() {
  const { userInfo } = globalStore();
  const [newMessageList, setNewMessageList] = useState<messageItem[]>([]);
  const [previousMessageList, setPreviousMessageList] = useState<messageItem[]>(
    []
  );
  const { data: getNotificationsData } = useSWR(
    userInfo && userInfo?.id ? [getNotifications.key] : null,
    (_) => getNotifications.fetcher(userInfo?.id),
    { revalidateOnFocus: false }
  );
  useEffect(() => {
    if (getNotificationsData && getNotificationsData.length > 0) {
      const noList: messageItem[] = [];
      const list: messageItem[] = [];
      getNotificationsData.map((item: any) => {
        item?.status === 0 ? noList.push(item) : list.push(item);
      });
      setNewMessageList(noList);
      setPreviousMessageList(list);
    }
  }, [getNotificationsData]);
  return (
    <Box w="full">
      <Text
        fontFamily="Nunito"
        textStyle="14"
        fontWeight="400"
        color="white.500"
        mb="10px"
      >
        New
      </Text>
      <MessageList messageList={newMessageList} />
      <Text
        fontFamily="Nunito"
        textStyle="14"
        fontWeight="400"
        color="white.500"
        my="10px"
      >
        Previous
      </Text>
      <MessageList messageList={previousMessageList} />
    </Box>
  );
}

export const getServerSideProps = async (ctx: GetI18nServerSideProps) => {
  return {
    props: { ...(await getI18nSSRProps(ctx, ["home"])) },
  };
};
export default App;
