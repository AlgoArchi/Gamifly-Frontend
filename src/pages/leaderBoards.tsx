import React from "react";
import { Flex, Text, Image } from "@chakra-ui/react";
import { getI18nSSRProps, GetI18nServerSideProps } from "@/utils/i18n";
import VIP, { VipProp } from "@/components/VIP";
import userProfile from "@/assets/imgs/userProfile.png";
import TopReferrals, { TopReferralsProp } from "@/components/TopReferrals";
import px2vw from "@/utils/px2vw";
import arrows from "@/assets/imgs/arrows.png";
import { useRouter } from "next/router";

export const vipList: VipProp[] = [
  {
    id: 1,
    place: 1,
    userName: "User Name",
    userNameImg: userProfile,
    gemiflyTokens: 500000,
    nft: 1322,
  },
  {
    id: 2,
    place: 2,
    userName: "User Name",
    userNameImg: userProfile,
    gemiflyTokens: 456000,
    nft: 441,
  },
  {
    id: 3,
    place: 3,
    userName: "User Name",
    userNameImg: userProfile,
    gemiflyTokens: 232300,
    nft: 765,
  },
  {
    id: 4,
    place: 4,
    userName: "User Name",
    userNameImg: userProfile,
    gemiflyTokens: 232300,
    nft: 765,
  },
  {
    id: 5,
    place: 5,
    userName: "User Name",
    userNameImg: userProfile,
    gemiflyTokens: 232300,
    nft: 765,
  },
  {
    id: 6,
    place: 6,
    userName: "User Name",
    userNameImg: userProfile,
    gemiflyTokens: 500000,
    nft: 1322,
  },
  {
    id: 7,
    place: 7,
    userName: "User Name",
    userNameImg: userProfile,
    gemiflyTokens: 456000,
    nft: 441,
  },
  {
    id: 8,
    place: 8,
    userName: "User Name",
    userNameImg: userProfile,
    gemiflyTokens: 232300,
    nft: 765,
  },
  {
    id: 9,
    place: 9,
    userName: "User Name",
    userNameImg: userProfile,
    gemiflyTokens: 232300,
    nft: 765,
  },
  {
    id: 10,
    place: 10,
    userName: "User Name",
    userNameImg: userProfile,
    gemiflyTokens: 232300,
    nft: 765,
  },
  {
    id: 11,
    place: 11,
    userName: "User Name",
    userNameImg: userProfile,
    gemiflyTokens: 500000,
    nft: 1322,
  },
  {
    id: 12,
    place: 12,
    userName: "User Name",
    userNameImg: userProfile,
    gemiflyTokens: 456000,
    nft: 441,
  },
  {
    id: 13,
    place: 13,
    userName: "User Name",
    userNameImg: userProfile,
    gemiflyTokens: 232300,
    nft: 765,
  },
  {
    id: 14,
    place: 14,
    userName: "User Name",
    userNameImg: userProfile,
    gemiflyTokens: 232300,
    nft: 765,
  },
  {
    id: 15,
    place: 15,
    userName: "User Name",
    userNameImg: userProfile,
    gemiflyTokens: 232300,
    nft: 765,
  },
  {
    id: 16,
    place: 16,
    userName: "User Name",
    userNameImg: userProfile,
    gemiflyTokens: 500000,
    nft: 1322,
  },
  {
    id: 17,
    place: 17,
    userName: "User Name",
    userNameImg: userProfile,
    gemiflyTokens: 456000,
    nft: 441,
  },
  {
    id: 18,
    place: 18,
    userName: "User Name",
    userNameImg: userProfile,
    gemiflyTokens: 232300,
    nft: 765,
  },
  {
    id: 19,
    place: 19,
    userName: "User Name",
    userNameImg: userProfile,
    gemiflyTokens: 232300,
    nft: 765,
  },
  {
    id: 20,
    place: 20,
    userName: "User Name",
    userNameImg: userProfile,
    gemiflyTokens: 232300,
    nft: 765,
  },
];
export const topList: TopReferralsProp[] = [
  {
    id: 1,
    place: 1,
    userName: "User Name",
    userNameImg: userProfile,
    invitedFriends: 1211,
  },
  {
    id: 2,
    place: 2,
    userName: "User Name",
    userNameImg: userProfile,
    invitedFriends: 1211,
  },
  {
    id: 3,
    place: 3,
    userName: "User Name",
    userNameImg: userProfile,
    invitedFriends: 1211,
  },
  {
    id: 4,
    place: 4,
    userName: "User Name",
    userNameImg: userProfile,
    invitedFriends: 1211,
  },
  {
    id: 5,
    place: 5,
    userName: "User Name",
    userNameImg: userProfile,
    invitedFriends: 1211,
  },
  {
    id: 6,
    place: 6,
    userName: "User Name",
    userNameImg: userProfile,
    invitedFriends: 1211,
  },
  {
    id: 7,
    place: 7,
    userName: "User Name",
    userNameImg: userProfile,
    invitedFriends: 1211,
  },
  {
    id: 8,
    place: 8,
    userName: "User Name",
    userNameImg: userProfile,
    invitedFriends: 1211,
  },
  {
    id: 9,
    place: 9,
    userName: "User Name",
    userNameImg: userProfile,
    invitedFriends: 1211,
  },
  {
    id: 10,
    place: 10,
    userName: "User Name",
    userNameImg: userProfile,
    invitedFriends: 1211,
  },
  {
    id: 11,
    place: 11,
    userName: "User Name",
    userNameImg: userProfile,
    invitedFriends: 1211,
  },
  {
    id: 12,
    place: 12,
    userName: "User Name",
    userNameImg: userProfile,
    invitedFriends: 1211,
  },
  {
    id: 13,
    place: 13,
    userName: "User Name",
    userNameImg: userProfile,
    invitedFriends: 1211,
  },
  {
    id: 14,
    place: 14,
    userName: "User Name",
    userNameImg: userProfile,
    invitedFriends: 1211,
  },
  {
    id: 15,
    place: 15,
    userName: "User Name",
    userNameImg: userProfile,
    invitedFriends: 1211,
  },
  {
    id: 16,
    place: 16,
    userName: "User Name",
    userNameImg: userProfile,
    invitedFriends: 1211,
  },
  {
    id: 17,
    place: 17,
    userName: "User Name",
    userNameImg: userProfile,
    invitedFriends: 1211,
  },
  {
    id: 18,
    place: 18,
    userName: "User Name",
    userNameImg: userProfile,
    invitedFriends: 1211,
  },
  {
    id: 19,
    place: 19,
    userName: "User Name",
    userNameImg: userProfile,
    invitedFriends: 1211,
  },
  {
    id: 20,
    place: 20,
    userName: "User Name",
    userNameImg: userProfile,
    invitedFriends: 1211,
  },
];
function App() {
  const router = useRouter();
  return (
    <Flex
      w="full"
      flexDir={{ base: "column", lg: "row" }}
      justifyContent="space-between"
    >
      <Flex
        display={{ base: "none", lg: "flex" }}
        w={{ base: "full", lg: "60%" }}
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
export default App;
