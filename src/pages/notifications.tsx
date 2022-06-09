import React from "react";
import { Box, Text } from "@chakra-ui/react";
import { getI18nSSRProps, GetI18nServerSideProps } from "@/utils/i18n";
import MessageList, { messageItem } from "@/components/MessageList";

function App() {
  const newMessageList: messageItem[] = [
    {
      content:
        "You received an Reward  21 Gamefly token. Check it in your Gamifly wallet!",
      time: "12.02.2022",
    },
    {
      content:
        "You received an Reward  21 Gamefly token. Check it in your Gamifly wallet!",
      time: "12.02.2022",
    },
  ];
  const previousMessageList: messageItem[] = [
    {
      content:
        "You received an Reward  21 Gamefly token. Check it in your Gamifly wallet!",
      time: "12.02.2022",
    },
    {
      content:
        "You received an Reward  21 Gamefly token. Check it in your Gamifly wallet!",
      time: "12.02.2022",
    },
    {
      content:
        "You received an Reward  21 Gamefly token. Check it in your Gamifly wallet!",
      time: "12.02.2022",
    },
  ];
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
