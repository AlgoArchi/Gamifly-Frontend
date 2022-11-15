import React, { useEffect } from "react";
import { Flex, useBoolean, Image } from "@chakra-ui/react";
import ProfileInfo from "@/components/ProfileInfo";
import ProfileData from "@/components/ProfileData";
import ProfileNoLogin from "@/components/ProfileNoLogin";
import profileMobile from "@/assets/imgs/profileMobile.png";
import { useState } from "react";
import px2vw from "@/utils/px2vw";
import { useRouter } from "next/router";
import globalStore from "@/stores/global";

function Index() {
  const router = useRouter();
  const [isLogin] = useState(true);
  const [isSetMode, setIsSetMode] = useBoolean(false);
  const { userInfo } = globalStore();

  useEffect(() => {
    if (
      window.location.href.indexOf("accessToken") === -1 &&
      (userInfo?.access_token == "" || userInfo?.access_token == null)
    ) {
      router.push("/");
    }
    // eslint-disable-next-line
  }, [userInfo?.access_token]);

  return (
    <Flex direction="column" w="full" pt={{ base: 0, lg: "150px" }}>
      <Image
        display={{ base: "flex", lg: "none" }}
        src={profileMobile}
        pos="absolute"
        top="0"
        left="0"
        w="full"
        zIndex="0"
      />
      <Flex
        mt={{ base: px2vw(105), lg: 0 }}
        flexDir={{ base: "column", lg: "row" }}
        justifyContent="center"
        alignItems="flex-start"
        overflow="hidden"
        zIndex="1"
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
