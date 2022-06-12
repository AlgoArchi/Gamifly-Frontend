import React from "react";
import { Flex, Image, Text } from "@chakra-ui/react";
import { getI18nSSRProps, GetI18nServerSideProps } from "@/utils/i18n";
import TournamentsItem from "@/components/TournamentsItem";
import { list, tournamentsItem } from "./tournaments";
import { useRouter } from "next/router";
import BaseButton from "@/components/BaseButton";
import arrows from "@/assets/imgs/arrows.png";
import px2vw from "@/utils/px2vw";

function App() {
  const router = useRouter();
  return (
    <Flex w="full" flexDir="column">
      <Flex
        w="full"
        mb={{ base: px2vw(22), lg: 0 }}
        justifyContent="space-between"
        onClick={() => router.back()}
      >
        <Image
          display={{ base: "block", lg: "none" }}
          src={arrows}
          w={px2vw(14.37)}
          h={px2vw(19.17)}
          my="auto"
        />
        <Text
          textAlign="center"
          fontFamily="Orbitron"
          color="white.100"
          w={{ base: px2vw(233), lg: "auto" }}
          fontWeight={{ base: "600", lg: "700" }}
          fontSize={{ base: px2vw(18), lg: "36px" }}
          lineHeight={{ base: px2vw(23), lg: "45px" }}
          mb={{ base: 0, lg: "25px" }}
        >
          Tournamets Name
        </Text>
        <Image
          display={{ base: "block", lg: "none" }}
          src={arrows}
          w={px2vw(14.37)}
          h={px2vw(19.17)}
          my="auto"
          opacity={0}
        />
      </Flex>
      <TournamentsItem
        item={
          list.filter(
            (item: tournamentsItem) => item.id === Number(router.query.id)
          )[0]
        }
        isDetail
      />
      <BaseButton w={`calc(100% - ${px2vw(60)})`} mx="auto">
        GO
      </BaseButton>
    </Flex>
  );
}

export const getServerSideProps = async (ctx: GetI18nServerSideProps) => {
  return {
    props: { ...(await getI18nSSRProps(ctx, ["home"])) },
  };
};
export default App;
