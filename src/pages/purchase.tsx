import React, { useState } from "react";
import { Box, Flex, Text } from "@chakra-ui/react";
import { CheckIcon } from "@chakra-ui/icons";
import { getI18nSSRProps, GetI18nServerSideProps } from "@/utils/i18n";
import px2vw from "@/utils/px2vw";
import BaseButton from "@/components/BaseButton";

function App() {
  const [step, setStep] = useState(1); // 步骤
  const [chooseType, setChooseType] = useState("");
  return (
    <Flex w="full" flexDir="column">
      {/* Title */}
      <Text
        display={{ base: "none", lg: "block" }}
        mb={{ base: px2vw(35), lg: "35px" }}
        fontFamily="Orbitron"
        fontWeight="700"
        fontSize="36px"
        color="white.100"
      >
        Make a Purchase
      </Text>
      <Flex flexDir="column">
        {/* Purchase type */}
        <Flex flexDir="column" mb={{ base: px2vw(30), lg: "30px" }}>
          {/* Text */}
          <Flex
            fontFamily="Orbitron"
            fontWeight="600"
            textStyle="16"
            color="white.100"
            mb={{ base: px2vw(15), lg: "15px" }}
            lineHeight={{ base: px2vw(20), lg: "20px" }}
          >
            <Text color="green.100">{step}</Text>
            <Text mx="5px">/</Text>
            <Text>3. Purchase type</Text>
          </Flex>
          {/* Progress */}
          <Box
            w="full"
            bgColor="green.600"
            pos="relative"
            h={{ base: px2vw(4), lg: "4px" }}
            _after={{
              content: "''",
              w: step === 1 ? "33.33%" : step === 2 ? "66.66%" : "100%",
              h: { base: px2vw(4), lg: "4px" },
              bgColor: "green.100",
              pos: "absolute",
              top: 0,
              left: 0,
            }}
          />
        </Flex>
        {/* Content */}
        <Flex flexDir="column">
          <Flex
            flexDir={{ base: "column", lg: "row" }}
            mb={{ base: px2vw(30), lg: "30px" }}
            justifyContent="space-between"
          >
            {/* Credit */}
            <Flex
              w={{ base: "full", lg: "570px" }}
              h={{ base: px2vw(96), lg: "96px" }}
              p={{ base: `${px2vw(35)} ${px2vw(30)}`, lg: "35px 30px" }}
              bgColor="black.600"
              cursor="pointer"
              onClick={() => {
                setChooseType(chooseType === "Credit" ? "" : "Credit");
              }}
            >
              <Box
                w={{ base: px2vw(26), lg: "26px" }}
                h={{ base: px2vw(26), lg: "26px" }}
                mr={{ base: px2vw(20), lg: "20px" }}
                bgColor={chooseType === "Credit" ? "blue.100" : "gray.100"}
                pos="relative"
              >
                <CheckIcon
                  display={chooseType === "Credit" ? "block" : "none"}
                  fontSize={{ base: px2vw(18), lg: "18px" }}
                  color="white.100"
                  m="auto"
                  pos="absolute"
                  top={0}
                  right={0}
                  bottom={0}
                  left={0}
                />
              </Box>
              <Text
                fontFamily="Nunito"
                fontWeight="600"
                color="white.100"
                fontSize={{ base: px2vw(18), lg: "18px" }}
                lineHeight={{ base: px2vw(26), lg: "26px" }}
              >
                Credit
              </Text>
            </Flex>
            {/* NFT */}
            <Flex
              w={{ base: "full", lg: "570px" }}
              h={{ base: px2vw(96), lg: "96px" }}
              p={{ base: `${px2vw(35)} ${px2vw(30)}`, lg: "35px 30px" }}
              bgColor="black.600"
              cursor="pointer"
              onClick={() => {
                setChooseType(chooseType === "NFT" ? "" : "NFT");
              }}
            >
              <Box
                w={{ base: px2vw(26), lg: "26px" }}
                h={{ base: px2vw(26), lg: "26px" }}
                mr={{ base: px2vw(20), lg: "20px" }}
                bgColor={chooseType === "NFT" ? "blue.100" : "gray.100"}
                pos="relative"
              >
                <CheckIcon
                  display={chooseType === "NFT" ? "block" : "none"}
                  fontSize={{ base: px2vw(18), lg: "18px" }}
                  color="white.100"
                  m="auto"
                  pos="absolute"
                  top={0}
                  right={0}
                  bottom={0}
                  left={0}
                />
              </Box>
              <Text
                fontFamily="Nunito"
                fontWeight="600"
                color="white.100"
                fontSize={{ base: px2vw(18), lg: "18px" }}
                lineHeight={{ base: px2vw(26), lg: "26px" }}
              >
                NFT
              </Text>
            </Flex>
          </Flex>
          <BaseButton
            fontFamily="Nunito"
            textStyle="16"
            w={{ base: `calc(100vw - ${px2vw(30)})`, lg: "314px" }}
            pos={{ base: "fixed", lg: "inherit" }}
            bottom={px2vw(45)}
            left={px2vw(15)}
          >
            Continue
          </BaseButton>
        </Flex>
      </Flex>
    </Flex>
  );
}

export const getServerSideProps = async (ctx: GetI18nServerSideProps) => {
  return {
    props: { ...(await getI18nSSRProps(ctx, ["home"])) },
  };
};
export default App;
