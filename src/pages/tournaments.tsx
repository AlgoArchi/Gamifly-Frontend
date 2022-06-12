import React from "react";
import { Flex, Text } from "@chakra-ui/react";
import { getI18nSSRProps, GetI18nServerSideProps } from "@/utils/i18n";
import userProfile from "@/assets/imgs/userProfile.png";
import tournamentPhoto from "@/assets/imgs/tournamentPhoto.png";
import TournamentsItem from "@/components/TournamentsItem";

export interface touRakingItem {
  id: number;
  rank: number;
  userName: string;
  userIcon: string;
  score: number;
}

export interface tournamentsItem {
  id: number;
  name: string;
  time: string;
  description: string;
  photo: string;
  rankings: touRakingItem[];
}
export const list: tournamentsItem[] = [
  {
    id: 1,
    name: "Tournamnet name",
    time: "04.05.2022",
    photo: tournamentPhoto,
    description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. <br />Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. <br />Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`,
    rankings: [
      {
        id: 1,
        rank: 1,
        userName: "User Name",
        userIcon: userProfile,
        score: 10,
      },
      {
        id: 2,
        rank: 2,
        userName: "User Name",
        userIcon: userProfile,
        score: 9,
      },
      {
        id: 3,
        rank: 3,
        userName: "User Name",
        userIcon: userProfile,
        score: 8,
      },
      {
        id: 4,
        rank: 4,
        userName: "User Name",
        userIcon: userProfile,
        score: 7,
      },
      {
        id: 5,
        rank: 5,
        userName: "User Name",
        userIcon: userProfile,
        score: 6,
      },
      {
        id: 6,
        rank: 6,
        userName: "User Name",
        userIcon: userProfile,
        score: 5,
      },
      {
        id: 7,
        rank: 7,
        userName: "User Name",
        userIcon: userProfile,
        score: 4,
      },
      {
        id: 8,
        rank: 8,
        userName: "User Name",
        userIcon: userProfile,
        score: 3,
      },
      {
        id: 9,
        rank: 9,
        userName: "User Name",
        userIcon: userProfile,
        score: 2,
      },
      {
        id: 10,
        rank: 10,
        userName: "User Name",
        userIcon: userProfile,
        score: 1,
      },
    ],
  },
  {
    id: 2,
    name: "Tournamnet name2",
    time: "04.05.2022",
    photo: tournamentPhoto,
    description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. <br />Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. <br />Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`,
    rankings: [
      {
        id: 1,
        rank: 1,
        userName: "User Name",
        userIcon: userProfile,
        score: 10,
      },
      {
        id: 2,
        rank: 2,
        userName: "User Name",
        userIcon: userProfile,
        score: 9,
      },
      {
        id: 3,
        rank: 3,
        userName: "User Name",
        userIcon: userProfile,
        score: 8,
      },
      {
        id: 4,
        rank: 4,
        userName: "User Name",
        userIcon: userProfile,
        score: 7,
      },
      {
        id: 5,
        rank: 5,
        userName: "User Name",
        userIcon: userProfile,
        score: 6,
      },
      {
        id: 6,
        rank: 6,
        userName: "User Name",
        userIcon: userProfile,
        score: 5,
      },
      {
        id: 7,
        rank: 7,
        userName: "User Name",
        userIcon: userProfile,
        score: 4,
      },
      {
        id: 8,
        rank: 8,
        userName: "User Name",
        userIcon: userProfile,
        score: 3,
      },
      {
        id: 9,
        rank: 9,
        userName: "User Name",
        userIcon: userProfile,
        score: 2,
      },
      {
        id: 10,
        rank: 10,
        userName: "User Name",
        userIcon: userProfile,
        score: 1,
      },
    ],
  },
];

function App() {
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
        Tournaments
      </Text>
      {list.map((item: tournamentsItem, index: number) => (
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
