import React, { useEffect, useState } from "react";
import { Flex, Text } from "@chakra-ui/react";
import { getI18nSSRProps, GetI18nServerSideProps } from "@/utils/i18n";
import TournamentsItem from "@/components/TournamentsItem";
import { getTournaments } from "@/apis/tournaments";
import useSWR from "swr";

export interface touRakingItem {
  rank: number;
  name: string;
  avatar: string;
  score: number;
}

export interface tournamentsItem {
  id: number;
  title: string;
  time: string;
  content: string;
  image: string;
  link: string;
  rank: touRakingItem[];
}

function App() {
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
      setTournamentsList(list);
    }
  }, [getTournamentsData]);

  return (
    <Flex w="full" flexDir="column" pt={{ base: 0, lg: "150px" }}>
      <Text
        display={{ base: "none", lg: "block" }}
        fontFamily="Orbitron"
        fontWeight="700"
        fontSize="36px"
        lineHeight="36px"
        mb="25px"
        color="white.100"
      >
        Tournaments
      </Text>
      {tournamentsList.map((item: tournamentsItem, index: number) => (
        <TournamentsItem key={index} item={item} />
      ))}
    </Flex>
  );
}

export const getServerSideProps = async (ctx: GetI18nServerSideProps) => {
  return {
    props: { ...(await getI18nSSRProps(ctx, ["home"])) },
  };
};
export default App;
