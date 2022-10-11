import React from "react";
import { Flex, Image, Text, useBoolean, useToast } from "@chakra-ui/react";
import px2vw from "@/utils/px2vw";
import logo from "@/assets/imgs/logo.png";
import BaseModal from "../BaseModal";
import TermsOfUse from "../TermsOfUse";
import PrivacyPolicy from "../PrivacyPolicy";
import { useRouter } from "next/router";

function Index() {
  const router = useRouter();
  const toast = useToast();
  const [showTermsOfService, setShowTermsOfService] = useBoolean(false);
  const [showPrivacyPolicy, setShowPrivacyPolicy] = useBoolean(false);
  return (
    <Flex
      w="full"
      px={{ base: router?.pathname === "/" ? px2vw(16) : 0, lg: 0 }}
    >
      <Flex
        w={{ base: "full", lg: "1280px" }}
        pt={{ base: px2vw(24), lg: "44px" }}
        pb={{ base: px2vw(30), lg: "70px" }}
        pr={{ base: 0, lg: "70px" }}
        boxSizing="border-box"
        flexDir="column"
        borderTop="1px solid"
        borderColor="black.1800"
        mx="auto"
      >
        {/* 上方 */}
        <Flex
          justifyContent={{ base: "flex-start", lg: "space-between" }}
          flexDir={{ base: "column", lg: "row" }}
        >
          {/* 左侧 */}
          <Flex flexDir="column">
            <Image
              src={logo}
              w={{ base: px2vw(137), lg: "168px" }}
              h={{ base: px2vw(31), lg: "38px" }}
              mb={{ base: px2vw(32), lg: "56px" }}
            />
            <Flex
              flexDir="column"
              fontFamily="Eurostile"
              fontWeight="bolder"
              bgGradient="linear(to-r, #32C5FF,#B620E0, #F7B500)"
              bgClip="text"
              fontSize={{ base: px2vw(35), lg: "35px" }}
              lineHeight={{ base: px2vw(35), lg: "35px" }}
              mb={{ base: px2vw(27), lg: "55px" }}
            >
              <Text>{`WORLD'S #1`}</Text>
              <Text>{`WEB3 GATEWAY`}</Text>
            </Flex>
          </Flex>
          {/* 右侧 */}
          <Flex w={{ base: "auto", lg: "300px" }} mt={{ base: 0, lg: "20px" }}>
            {/* Gamifly */}
            <Flex flexDir="column" mr={{ base: px2vw(56), lg: "94px" }}>
              <Text
                fontFamily="SofiaPro"
                fontWeight="600"
                color="white.100"
                fontSize={{ base: px2vw(18), lg: "18px" }}
                mb={{ base: px2vw(23), lg: "23px" }}
              >
                Gamifly
              </Text>
              <Flex
                flexDir="column"
                color="gray.400"
                fontFamily="SofiaPro"
                fontSize={{ base: px2vw(15), lg: "15px" }}
                lineHeight={{ base: px2vw(15), lg: "15px" }}
              >
                <Text
                  w="fit-content"
                  cursor="pointer"
                  borderBottom="1px solid"
                  borderColor="gray.400"
                  mb={{ base: px2vw(20), lg: "20px" }}
                  _hover={{
                    color: "green.1000",
                    borderColor: "green.1000",
                  }}
                  onClick={() => {
                    toast({
                      title: `coming soon`,
                      status: "info",
                      isClosable: true,
                    });
                  }}
                >
                  About US
                </Text>
                <Text
                  w="fit-content"
                  cursor="pointer"
                  borderBottom="1px solid"
                  borderColor="gray.400"
                  mb={{ base: px2vw(20), lg: "20px" }}
                  _hover={{
                    color: "green.1000",
                    borderColor: "green.1000",
                  }}
                  onClick={() => router.push("/games")}
                >
                  All Games
                </Text>
                <Text
                  w="fit-content"
                  cursor="pointer"
                  borderBottom="1px solid"
                  borderColor="gray.400"
                  _hover={{
                    color: "green.1000",
                    borderColor: "green.1000",
                  }}
                  onClick={() => {
                    toast({
                      title: `coming soon`,
                      status: "info",
                      isClosable: true,
                    });
                  }}
                >
                  Launch with us
                </Text>
              </Flex>
            </Flex>
            {/* Recources */}
            <Flex flexDir="column">
              <Text
                fontFamily="SofiaPro"
                fontWeight="600"
                color="white.100"
                fontSize={{ base: px2vw(18), lg: "18px" }}
                mb={{ base: px2vw(23), lg: "23px" }}
                onClick={() => {
                  toast({
                    title: `coming soon`,
                    status: "info",
                    isClosable: true,
                  });
                }}
              >
                Recources
              </Text>
              <Flex
                flexDir="column"
                color="gray.400"
                fontFamily="SofiaPro"
                fontSize={{ base: px2vw(15), lg: "15px" }}
                lineHeight={{ base: px2vw(15), lg: "15px" }}
              >
                <Text
                  w="fit-content"
                  cursor="pointer"
                  borderBottom="1px solid"
                  borderColor="gray.400"
                  mb={{ base: px2vw(20), lg: "20px" }}
                  _hover={{
                    color: "green.1000",
                    borderColor: "green.1000",
                  }}
                  onClick={() => {
                    toast({
                      title: `coming soon`,
                      status: "info",
                      isClosable: true,
                    });
                  }}
                >
                  Support
                </Text>
                <Text
                  w="fit-content"
                  cursor="pointer"
                  borderBottom="1px solid"
                  borderColor="gray.400"
                  _hover={{
                    color: "green.1000",
                    borderColor: "green.1000",
                  }}
                  onClick={() => {
                    toast({
                      title: `coming soon`,
                      status: "info",
                      isClosable: true,
                    });
                  }}
                >
                  Shop
                </Text>
              </Flex>
            </Flex>
          </Flex>
        </Flex>
        {/* 下方 */}
        <Flex
          mt={{ base: px2vw(32), lg: 0 }}
          flexDir={{ base: "column", lg: "row" }}
          justifyContent={{ base: "flex-start", lg: "space-between" }}
        >
          <Text
            fontFamily="SofiaPro"
            fontWeight="600"
            color="white.100"
            order={{ base: 2, lg: 0 }}
            mt={{ base: px2vw(37), lg: 0 }}
            fontSize={{ base: px2vw(18), lg: "18px" }}
            lineHeight={{ base: px2vw(18), lg: "18px" }}
          >
            @2022 Gamifly, Inc. All Rights Reserved.
          </Text>
          <Flex
            justifyContent="flex-start"
            fontFamily="SofiaPro"
            fontWeight="400"
            color="blue.300"
            w={{ base: "auto", lg: "300px" }}
            flexDir={{ base: "column", lg: "row" }}
            fontSize={{ base: px2vw(15), lg: "15px" }}
          >
            <Text
              mr={{ base: 0, lg: "18px" }}
              w="fit-content"
              borderBottom="1px solid"
              borderColor="blue.300"
              cursor="pointer"
              _hover={{
                color: "white.100",
                borderColor: "white.100",
              }}
              onClick={() => {
                toast({
                  title: `coming soon`,
                  status: "info",
                  isClosable: true,
                });
              }}
            >
              Copyright
            </Text>
            <Text
              mr={{ base: 0, lg: "18px" }}
              mt={{ base: px2vw(23), lg: 0 }}
              w="fit-content"
              borderBottom="1px solid"
              borderColor="blue.300"
              cursor="pointer"
              _hover={{
                color: "white.100",
                borderColor: "white.100",
              }}
              onClick={() => setShowTermsOfService.on()}
            >
              Term of service
            </Text>
            <Text
              mt={{ base: px2vw(23), lg: 0 }}
              w="fit-content"
              borderBottom="1px solid"
              borderColor="blue.300"
              cursor="pointer"
              _hover={{
                color: "white.100",
                borderColor: "white.100",
              }}
              onClick={() => setShowPrivacyPolicy.on()}
            >
              Privacy policy
            </Text>
          </Flex>
        </Flex>
        {/* 移动端邀请好友 */}
        {/* <Flex
          w="full"
          justifyContent="center"
          alignItems="center"
          backgroundColor="black.1600"
          border="1px solid"
          borderColor="green.1000"
          boxShadow="0px 2px 30px RGBA(196, 248, 99, 0.4)"
          borderRadius={px2vw(5)}
          display={{ base: "flex", lg: "none" }}
          mt={px2vw(50)}
          h={px2vw(50)}
        >
          <Text
            fontFamily="Eurostile"
            fontWeight="bolder"
            color="green.1000"
            fontSize={px2vw(17)}
            mt={px2vw(5)}
          >
            INVITE FRIENDS
          </Text>
        </Flex> */}
      </Flex>
      {/* Terms of Service */}
      <BaseModal
        px={{ base: px2vw(50), lg: "100px" }}
        pt={{ base: px2vw(50), lg: "100px" }}
        pb={{ base: px2vw(50), lg: "80px" }}
        isShow={showTermsOfService}
        close={() => setShowTermsOfService.off()}
      >
        <Flex overflow="auto">
          <TermsOfUse />
        </Flex>
      </BaseModal>
      {/* Privacy Policy */}
      <BaseModal
        px={{ base: px2vw(50), lg: "100px" }}
        pt={{ base: px2vw(50), lg: "100px" }}
        pb={{ base: px2vw(50), lg: "80px" }}
        isShow={showPrivacyPolicy}
        close={() => setShowPrivacyPolicy.off()}
      >
        <Flex overflow="auto">
          <PrivacyPolicy />
        </Flex>
      </BaseModal>
    </Flex>
  );
}

export default React.memo(Index);
