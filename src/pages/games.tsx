import React, { useEffect } from "react";
import { Flex, Text, Image, useBoolean } from "@chakra-ui/react";
import { getI18nSSRProps, GetI18nServerSideProps } from "@/utils/i18n";
import px2vw from "@/utils/px2vw";
import image6 from "@/assets/imgs/image6.webp";
import image8 from "@/assets/imgs/image8.webp";
import BaseButton from "@/components/BaseButton";
import LoadingPage from "@/components/LoadingPage";

function App() {
  const [loadingShow, setLoadingShow] = useBoolean(true);
  useEffect(() => {
    setTimeout(() => {
      setLoadingShow.off();
    }, 1000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Flex w="full" flexDir="column">
      <Text
        display={{ base: "none", lg: "block" }}
        fontFamily="Orbitron"
        fontWeight="700"
        fontSize="36px"
        mb="25px"
        color="white.100"
      >
        Let’s choose the game
      </Text>
      <Flex flexDir={{ base: "column", lg: "row" }}>
        <Flex
          flexDir="column"
          bgColor="black.300"
          w={{ base: "full", lg: "557px" }}
          h={{ base: "max-content", lg: "590px" }}
          mr={{ base: 0, lg: "20px" }}
          mb={{ base: px2vw(20), lg: 0 }}
        >
          <Image
            src={image6}
            w={{ base: "full", lg: "557px" }}
            h={{ base: px2vw(325), lg: "325px" }}
          />
          <Flex
            flexDir="column"
            p={{
              base: px2vw(20),
              lg: "25px 20px 20px",
            }}
          >
            <Text
              fontFamily="Orbitron"
              fontWeight="700"
              textStyle={{ base: "20", lg: "26" }}
              color="white.100"
              lineHeight={{ base: px2vw(25), lg: "33px" }}
              mb={{ base: px2vw(12), lg: "18px" }}
            >
              Fishing Expert
            </Text>
            <Text
              fontFamily="Nunito"
              fontWeight="400"
              textStyle="16"
              color="white.500"
              lineHeight={{ base: px2vw(22), lg: "22px" }}
              mb={{ base: px2vw(30), lg: "30px" }}
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </Text>
            <BaseButton
              w={{ base: "full", lg: "160px" }}
              fontFamily="Nunito"
              fontWeight="600"
              textStyle="16"
              color="white.100"
            >
              Play
            </BaseButton>
          </Flex>
        </Flex>
        <Flex
          flexDir="column"
          bgColor="black.300"
          w={{ base: "full", lg: "557px" }}
          h={{ base: "max-content", lg: "590px" }}
          mr={{ base: 0, lg: "20px" }}
          mb={{ base: px2vw(20), lg: 0 }}
        >
          <Image
            src={image8}
            w={{ base: "full", lg: "557px" }}
            h={{ base: px2vw(325), lg: "325px" }}
          />
          <Flex
            flexDir="column"
            p={{
              base: px2vw(20),
              lg: "25px 20px 20px",
            }}
          >
            <Text
              fontFamily="Orbitron"
              fontWeight="700"
              textStyle={{ base: "20", lg: "26" }}
              color="white.100"
              lineHeight={{ base: px2vw(25), lg: "33px" }}
              mb={{ base: px2vw(12), lg: "18px" }}
            >
              Axie infinity
            </Text>
            <Text
              fontFamily="Nunito"
              fontWeight="400"
              textStyle="16"
              color="white.500"
              lineHeight={{ base: px2vw(22), lg: "22px" }}
              mb={{ base: px2vw(30), lg: "30px" }}
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat exercitation ullamco
              laboris nisi u...
            </Text>
            <BaseButton
              w={{ base: "full", lg: "160px" }}
              fontFamily="Nunito"
              fontWeight="600"
              textStyle="16"
              color="white.100"
            >
              Play
            </BaseButton>
          </Flex>
        </Flex>
      </Flex>
      <LoadingPage
        progress={48}
        isShow={loadingShow}
        setIsShow={() => setLoadingShow.off()}
      />
    </Flex>
  );
}

export const getServerSideProps = async (ctx: GetI18nServerSideProps) => {
  return {
    props: { ...(await getI18nSSRProps(ctx, ["home"])) },
  };
};
export default App;
