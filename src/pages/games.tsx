import React, { useEffect, useState } from "react";
import { Flex, Text, Image } from "@chakra-ui/react";
import { getI18nSSRProps, GetI18nServerSideProps } from "@/utils/i18n";
import useSWR from "swr";
import px2vw from "@/utils/px2vw";
import { getGameList, getGameTypes } from "@/apis/games";
import TopSeller from "@/components/TopSeller";
import playIcon from "@/assets/imgs/playIcon.png";
import featuresIcon from "@/assets/imgs/featuresIcon.png";
import randomPlay from "@/assets/imgs/randomPlay.png";

function App() {
  const [gamesTypes, setGamesTypes] = useState<any>(null);
  const [activeGameType, setActiveGameType] = useState({ index: 0, id: 0 });
  const [gameList, setGameList] = useState<any>([]);
  const [newList, setNewList] = useState<any>([]);

  const { data: getGameListData } = useSWR(
    activeGameType?.id > 0 ? [getGameList.key, activeGameType] : null,
    () => getGameList.fetcher(activeGameType?.id),
    {
      revalidateOnFocus: false,
    }
  );

  const { data: getGameTypesData } = useSWR(
    getGameTypes.key,
    () => getGameTypes.fetcher(),
    {
      revalidateOnFocus: false,
    }
  );

  useEffect(() => {
    if (getGameTypesData) {
      setGamesTypes(getGameTypesData);
      setActiveGameType({ index: 0, id: getGameTypesData[0]?.id });
    }
  }, [getGameTypesData]);

  useEffect(() => {
    if (getGameListData && gamesTypes && gamesTypes.length) {
      activeGameType.index + 1 < gamesTypes.length &&
        setActiveGameType({
          index: activeGameType.index + 1,
          id: gamesTypes[activeGameType.index + 1].id,
        });
      const obj = {
        id: gamesTypes[activeGameType.index].id,
        title: gamesTypes[activeGameType.index].name,
        list: getGameListData,
      };
      setGameList([...gameList, ...[obj]]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getGameListData]);

  useEffect(() => {
    const list = newList;
    gameList.map((item: any) => {
      item.list.map((ite: any) => {
        if (!list.includes(ite)) {
          list.push(ite);
        }
      });
    });
    setNewList(list);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameList]);

  const randomClick = () => {
    const random_number = Math.floor(
      Math.random() * Math.floor(newList.length)
    );
    window.open(newList[random_number]?.link);
  };

  const returnTypeName = (type: any) => {
    let val = "";
    gamesTypes.map((item: any) => {
      if (type === String(item?.id)) {
        val = item?.name;
      }
    });
    return val;
  };

  return (
    <Flex w="full" minH="100vh" flexDir="column" pt={{ base: 0, lg: "150px" }}>
      <TopSeller
        w="full"
        h={{ base: "420px", lg: "423px" }}
        mt={{ base: px2vw(20), lg: 0 }}
        mb={{ base: px2vw(60), lg: "60px" }}
      >
        <Flex
          px={{ base: px2vw(16), lg: 0 }}
          flexDir="column"
          justifyContent="center"
          color="black.1600"
          fontFamily="Eurostile"
          fontWeight="400"
          boxSizing="border-box"
        >
          <Text
            fontWeight="bolder"
            fontSize={{ base: px2vw(25), lg: "35px" }}
            lineHeight={{ base: px2vw(25), lg: "35px" }}
            mb={{ base: px2vw(10), lg: "10px" }}
          >
            CRICKET GAME
          </Text>
          <Flex
            fontSize={{ base: px2vw(13), lg: "13px" }}
            lineHeight={{ base: px2vw(13), lg: "13px" }}
            mb={{ base: px2vw(10), lg: "10px" }}
            opacity="0.8"
          >
            <Text mr={{ base: px2vw(20), lg: "20px" }}>Date：2022-07-24</Text>
            <Text>ESPORTS GAME</Text>
          </Flex>
          <Text
            fontWeight="600"
            fontSize={{ base: px2vw(14), lg: "14px" }}
            lineHeight={{ base: px2vw(22), lg: "22px" }}
            mb={{ base: px2vw(10), lg: "20px" }}
          >
            Bat-and-Ball Game, Play to earn. Welcome to the first Cricket
            Metaverse!
          </Text>
          <Flex
            w={{ base: px2vw(173), lg: "173px" }}
            h={{ base: px2vw(52), lg: "52px" }}
            fontSize={{ base: px2vw(17), lg: "17px" }}
            borderRadius="5px"
            bgColor="transparent"
            border="1px solid"
            borderColor="black.1600"
            color="black.1600"
            justifyContent="center"
            alignItems="center"
            fontFamily="Eurostile"
            fontWeight="bolder"
            cursor="pointer"
            onClick={() =>
              window.open(
                // "https://app.gamifly.co/games/cricket/index.html"
                "https://play.google.com/store/apps/details?id=com.alabs.cricket.scifi.league"
              )
            }
          >
            <Image src={playIcon} mr="10px" />
            <Text mt="8px" fontWeight="bolder">
              PLAY NOW
            </Text>
          </Flex>
        </Flex>
      </TopSeller>
      {/* gameList */}
      <Flex
        flexDir="column"
        borderTop="1px solid"
        borderColor={{ base: "black.1800", lg: "transparent" }}
        pt={{ base: px2vw(30), lg: 0 }}
      >
        {/* title */}
        <Flex
          justifyContent="space-between"
          alignItems="center"
          mb={{ base: px2vw(25), lg: "60px" }}
        >
          <Image
            src={randomPlay}
            display={{ base: "none", lg: "flex" }}
            opacity="0"
          />
          <Flex justifyContent="center">
            <Text
              fontFamily="Eurostile"
              fontWeight="bolder"
              color="white.100"
              mt={{ base: px2vw(5), lg: "5px" }}
              fontSize={{ base: px2vw(23), lg: "35px" }}
              lineHeight={{ base: px2vw(23), lg: "35px" }}
            >
              GAME LOBBY
            </Text>
            <Image
              src={featuresIcon}
              w={{ base: px2vw(30), lg: "30px" }}
              h={{ base: px2vw(23), lg: "23px" }}
              ml={{ base: px2vw(5), lg: "5px" }}
            />
          </Flex>
          <Image
            src={randomPlay}
            w={{ base: px2vw(119), lg: "119px" }}
            h={{ base: px2vw(31), lg: "31px" }}
            cursor="pointer"
            onClick={() => randomClick()}
          />
        </Flex>
        {/* list */}
        <Flex flexWrap="wrap" justifyContent="space-between">
          {newList.map((item: any, index: number) => {
            return (
              <Flex
                key={index}
                mb={{ base: px2vw(10), lg: "20px" }}
                flexDir="column"
              >
                <Flex
                  w={{ base: px2vw(160), lg: "258px" }}
                  h={{ base: px2vw(90), lg: "194px" }}
                  p={{ base: px2vw(15), lg: "15px" }}
                  bgImage={`${window.imgUrl.gameUrl}${item?.image}`}
                  borderRadius="15px"
                  flexDir="column"
                  justifyContent="flex-end"
                  bgSize="100% 100%"
                  bgRepeat="no-repeat"
                  boxSizing="border-box"
                  cursor="pointer"
                  onClick={() => window.open(item?.link)}
                >
                  <Flex
                    display={{ base: "none", lg: "flex" }}
                    fontFamily="SofiaPro"
                    fontWeight="600"
                    fontSize="18px"
                    lineHeight="18px"
                    color="white.100"
                    mb="10px"
                  >
                    {item?.title}
                  </Flex>
                  <Flex
                    display={{ base: "none", lg: "flex" }}
                    justifyContent="space-between"
                    fontFamily="Eurostile"
                    fontWeight="400"
                    fontSize="13px"
                    lineHeight="13px"
                    color="white.100"
                  >
                    <Text>{returnTypeName(item?.game_type)}</Text>
                    {item?.views && <Text>1487 views</Text>}
                  </Flex>
                </Flex>
                <Flex
                  display={{ base: "flex", lg: "none" }}
                  fontSize={px2vw(13)}
                  lineHeight={px2vw(13)}
                  mt={px2vw(5)}
                  justifyContent="center"
                  fontFamily="SofiaPro"
                  fontWeight="600"
                  color="white.100"
                >
                  {item?.title}
                </Flex>
              </Flex>
            );
          })}
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
