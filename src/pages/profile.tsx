import React from "react";
import { Flex, Text, useBoolean } from "@chakra-ui/react";

import ProfileInfo from "@/components/ProfileInfo";
import ProfileData from "@/components/ProfileData";
import ProfileNoLogin from "@/components/ProfileNoLogin";
import px2vw from "@/utils/px2vw";
import { useState } from "react";

function Index() {
  const [isLogin] = useState(true);
  const [isSetMode, setIsSetMode] = useBoolean(false);
  return (
    <Flex direction="column" w="full">
      <Text
        display={{ base: "none", lg: "block" }}
        mb={{ base: px2vw(25), lg: "25px" }}
        color="white.100"
        textStyle="36"
        fontWeight="700"
        lineHeight={{ base: px2vw(45), lg: "45px" }}
      >
        Profile
      </Text>
      <Flex
        flexDir={{ base: "column", lg: "row" }}
        alignItems="flex-start"
        bgColor={{ base: "transparent", lg: "black.300" }}
      >
        <ProfileInfo
          isSetMode={isSetMode}
          saveClick={() => setIsSetMode.toggle()}
        />
        {isLogin ? <ProfileData /> : <ProfileNoLogin />}
      </Flex>
    </Flex>
  );
}

export default Index;
