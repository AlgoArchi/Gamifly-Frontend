import React from "react";
import { Center, Flex, Text, Image } from "@chakra-ui/react";
import px2vw from "@/utils/px2vw";
import { getI18nSSRProps, GetI18nServerSideProps } from "@/utils/i18n";
import downLoad from "@/assets/imgs/downLoad.png";

function App() {
  const downFile = () => {
    const oa = document.createElement("a");
    oa.href =
      "https://app.gamifly.co/gamifly_server/server/assets/files/whitepaper.pdf";
    oa.setAttribute("target", "_blank");
    document.body.appendChild(oa);
    oa.click();
  };
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
        Gamifly info
      </Text>
      <Center
        w="full"
        h={{ base: px2vw(175), lg: "233px" }}
        bgColor="black.300"
        borderRadius="6px"
      >
        <Center
          w={{ base: px2vw(215), lg: "215px" }}
          h={{ base: px2vw(53), lg: "63px" }}
          bgColor="green.300"
          cursor="pointer"
          onClick={() => downFile()}
        >
          <Image
            my="auto"
            src={downLoad}
            w={{ base: px2vw(18), lg: "18px" }}
            h={{ base: px2vw(23), lg: "23px" }}
            mr={{ base: px2vw(18), lg: "18px" }}
          />
          <Text
            color="green.100"
            fontFamily="Orbitron"
            fontWeight="600"
            fontSize={{ base: px2vw(14), lg: "14px" }}
            lineHeight={{ base: px2vw(53), lg: "63px" }}
          >
            Whitepaper
          </Text>
        </Center>
      </Center>
    </Flex>
  );
}

export const getServerSideProps = async (ctx: GetI18nServerSideProps) => {
  return {
    props: { ...(await getI18nSSRProps(ctx, ["home"])) },
  };
};
export default App;
