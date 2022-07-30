import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Flex, Text, Image } from "@chakra-ui/react";
import px2vw from "@/utils/px2vw";
import arrows from "@/assets/imgs/arrows.png";
import TopReferrals, { TopReferralsProp } from "@/components/TopReferrals";
import useSWR from "swr";
import { getTopReferrals } from "@/apis/leaderBoards";

function Index() {
  const router = useRouter();
  const [topList, setTopList] = useState<TopReferralsProp[]>([]);
  const { data: getTopReferralsData } = useSWR(
    getTopReferrals.key,
    () => getTopReferrals.fetcher(),
    {
      revalidateOnFocus: false,
    }
  );
  useEffect(() => {
    if (getTopReferralsData) {
      setTopList(
        getTopReferralsData.map((item: any, index: number) => {
          return { ...item, place: index + 1 };
        })
      );
    }
  }, [getTopReferralsData]);
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
      <TopReferrals list={topList} />
    </Flex>
  );
}

export default Index;
