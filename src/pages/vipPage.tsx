import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Flex, Text, Image } from "@chakra-ui/react";
import px2vw from "@/utils/px2vw";
import arrows from "@/assets/imgs/arrows.png";
import VIP, { VipProp } from "@/components/VIP";
import useSWR from "swr";
import { getTopPlayers } from "@/apis/leaderBoards";

function Index() {
  const router = useRouter();
  const [vipList, setVipList] = useState<VipProp[]>([]);
  const { data: getTopPlayersData } = useSWR(
    getTopPlayers.key,
    () => getTopPlayers.fetcher(),
    {
      revalidateOnFocus: false,
    }
  );
  useEffect(() => {
    if (getTopPlayersData) {
      setVipList(
        getTopPlayersData.map((item: any, index: number) => {
          return { ...item, place: index + 1 };
        })
      );
    }
  }, [getTopPlayersData]);
  return (
    <Flex direction="column" w="full">
      <Flex
        w="full"
        mb={{ base: px2vw(22), lg: 0 }}
        justifyContent="space-between"
        onClick={() => router.back()}
      >
        <Image src={arrows} w={px2vw(14.37)} h={px2vw(19.17)} my="auto" />
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
          Leader board
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
      <VIP list={vipList} />
    </Flex>
  );
}

export default Index;
