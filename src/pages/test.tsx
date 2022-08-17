import React from "react";
import { Flex } from "@chakra-ui/react";
import PageOneTop from "@/components/PageOne/PageOneTop";
import PageOneCenter from "@/components/PageOne/PageOneCenter";
import PageOneBottom from "@/components/PageOne/PageOneBottom";

function Index() {
  return (
    <Flex flexDir="column" w="full" minH="100vh">
      <PageOneTop />
      <PageOneCenter />
      <PageOneBottom />
    </Flex>
  );
}

export default Index;
