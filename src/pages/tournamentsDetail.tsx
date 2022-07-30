import React, { useEffect, useState } from "react";
import { Flex, Image, Text } from "@chakra-ui/react";
import { getI18nSSRProps, GetI18nServerSideProps } from "@/utils/i18n";
import TournamentsItem from "@/components/TournamentsItem";
import { tournamentsItem } from "./tournaments";
import { useRouter } from "next/router";
import BaseButton from "@/components/BaseButton";
import arrows from "@/assets/imgs/arrows.png";
import px2vw from "@/utils/px2vw";
import { getTournaments } from "@/apis/tournaments";
import useSWR from "swr";

function App() {
  const router = useRouter();
  const [tournamentsList, setTournamentsList] = useState<tournamentsItem[]>([]);
  const { data: getTournamentsData } = useSWR(
    getTournaments.key,
    () => getTournaments.fetcher(),
    {
      revalidateOnFocus: false,
    }
  );

  useEffect(() => {
    if (getTournamentsData) {
      const list = getTournamentsData.map((item: any) => {
        const date = new Date(item?.start_date);
        const year = date.getFullYear();
        const month =
          date.getMonth() + 1 < 10
            ? `0${date.getMonth() + 1}`
            : date.getMonth() + 1;
        const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
        const rankList = item?.rank.map((ite: any, ind: number) => {
          return {
            ...ite,
            rank: ind + 1,
          };
        });
        return { ...item, time: `${day}.${month}.${year}`, rank: rankList };
      });
      console.log(list, "list");
      setTournamentsList(list);
    }
  }, [getTournamentsData]);
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
      {tournamentsList.length && (
        <TournamentsItem
          item={
            tournamentsList.filter(
              (item: tournamentsItem) => item.id === Number(router.query.id)
            )[0]
          }
          isDetail
        />
      )}
      <BaseButton
        w={`calc(100% - ${px2vw(60)})`}
        mx="auto"
        onClick={() =>
          window.open(
            tournamentsList.filter(
              (item: tournamentsItem) => item.id === Number(router.query.id)
            )[0]?.link
          )
        }
      >
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
