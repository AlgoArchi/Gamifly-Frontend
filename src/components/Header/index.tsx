import React from "react";
import { Flex, HStack, Button } from "@chakra-ui/react";

function Index() {
  return (
    <Flex padding="30px 60px" bgColor="white.100" justify="space-between">
      <HStack spacing="20px" color="blue.400" textStyle="16">
        <Button bgColor="blue.100" color="white.100">
          Earn Rewards
        </Button>
        <Button bgColor="blue.100" color="white.100">
          Log Out
        </Button>
      </HStack>
    </Flex>
  );
}

export default React.memo(Index);
