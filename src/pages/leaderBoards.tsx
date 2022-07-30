import React, { useEffect, useState } from "react";
import { Flex, Text, Image } from "@chakra-ui/react";
import { getI18nSSRProps, GetI18nServerSideProps } from "@/utils/i18n";
import VIP, { VipProp } from "@/components/VIP";
import TopReferrals, { TopReferralsProp } from "@/components/TopReferrals";
import px2vw from "@/utils/px2vw";
import arrows from "@/assets/imgs/arrows.png";
import { useRouter } from "next/router";
import useSWR from "swr";
import { getTopPlayers, getTopReferrals } from "@/apis/leaderBoards";

function Index() {
  const router = useRouter();
  const [vipList, setVipList] = useState<VipProp[]>([]);
  const [topList, setTopList] = useState<TopReferralsProp[]>([]);
  const { data: getTopPlayersData } = useSWR(
    getTopPlayers.key,
    () => getTopPlayers.fetcher(),
    {
      revalidateOnFocus: false,
    }
  );
  const { data: getTopReferralsData } = useSWR(
    getTopReferrals.key,
    () => getTopReferrals.fetcher(),
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
    <Flex
      w="full"
      flexDir={{ base: "column", lg: "row" }}
      justifyContent="space-between"
    >
      <Flex
        display={{ base: "none", lg: "flex" }}
        w={{ base: "full", lg: "60%" }}
        borderRadius="6px"
      >
        <VIP list={vipList} />
      </Flex>
      <Flex
        display={{ base: "none", lg: "flex" }}
        w={{ base: "full", lg: "calc(40% - 20px)" }}
      >
        <TopReferrals list={topList} />
      </Flex>
      {/* mobile */}
      <Flex
        display={{ base: "flex", lg: "none" }}
        flexDir="column"
        fontFamily="Nunito"
        fontWeight="600"
        textStyle="16"
      >
        <Flex
          justifyContent="space-between"
          bgColor="black.600"
          w="full"
          h={px2vw(55)}
          mb={px2vw(5)}
          px={px2vw(20)}
          lineHeight={px2vw(55)}
          onClick={() => router.push("/vipPage")}
        >
          <Text color="yellow.100">VIP</Text>
          <Image
            my="auto"
            transform="rotate(180deg)"
            src={arrows}
            w={px2vw(12.5)}
            h={px2vw(21.33)}
          />
        </Flex>
        <Flex
          justifyContent="space-between"
          bgColor="black.600"
          w="full"
          h={px2vw(55)}
          lineHeight={px2vw(55)}
          px={px2vw(20)}
          onClick={() => router.push("/topReferralsPage")}
        >
          <Text>Credit</Text>
          <Image
            my="auto"
            transform="rotate(180deg)"
            src={arrows}
            w={px2vw(12.5)}
            h={px2vw(21.33)}
          />
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
export default Index;
