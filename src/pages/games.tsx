import React, { useEffect, useState } from "react";
import { Flex, Text, Image, useBoolean } from "@chakra-ui/react";
import { getI18nSSRProps, GetI18nServerSideProps } from "@/utils/i18n";
import useSWR from "swr";
import px2vw from "@/utils/px2vw";
import LoadingPage from "@/components/LoadingPage";
import { getGameList, getGameTypes } from "@/apis/games";
import gaminIcon from "@/assets/imgs/gameIcon.png";

function App() {
  const [loadingShow, setLoadingShow] = useBoolean(true);
  const [gamesTypes, setGamesTypes] = useState<any>(null);
  const [activeGameType, setActiveGameType] = useState({ index: 0, id: 0 });
  const [gameList, setGameList] = useState<any>([]);

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
      activeGameType.index + 1 === gamesTypes.length && setLoadingShow.off();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getGameListData, setLoadingShow]);

  return (
    <Flex w="full" flexDir="column">
      <Text
        display={{ base: "none", lg: "block" }}
        fontFamily="Orbitron"
        fontWeight="400"
        fontSize={{ base: px2vw(32), lg: "32px" }}
        lineHeight={{ base: px2vw(32), lg: "32px" }}
        mb="20px"
        color="white.100"
      >
        Games
      </Text>
      {gameList && gameList.length && (
        <Flex flexDir="column">
          {gameList.map((ite: any, ind: number) => {
            return (
              <Flex
                display={ite.list.length ? "flex" : "none"}
                flexDir="column"
                key={ind}
                mb={{ base: px2vw(10), lg: "10px" }}
              >
                <Flex>
                  <Flex
                    px={{ base: px2vw(18), lg: "18px" }}
                    h={{ base: px2vw(36), lg: "36px" }}
                    mb={{ base: px2vw(18), lg: "18px" }}
                    border="1px solid"
                    borderColor="blue.100"
                    justifyContent="center"
                    alignItems="center"
                    borderRadius="4px"
                  >
                    <Text
                      fontFamily="Orbitron"
                      fontWeight="700"
                      textStyle="18"
                      color="green.100"
                    >
                      {ite?.title}
                    </Text>
                  </Flex>
                  <Image
                    h={{ base: px2vw(36), lg: "36px" }}
                    w={{ base: px2vw(17), lg: "17px" }}
                    ml={{ base: px2vw(10), lg: "10px" }}
                    src={gaminIcon}
                  />
                </Flex>
                <Flex
                  w="full"
                  justifyContent={{ base: "space-between", lg: "flex-start" }}
                  flexWrap="wrap"
                >
                  {ite.list.map((item: any, index: number) => {
                    return (
                      <Flex
                        key={index}
                        w={{ base: "48%", lg: "10%" }}
                        h={{ base: "max-content", lg: "auto" }}
                        mr={{ base: 0, lg: "20px" }}
                        mb={{ base: px2vw(20), lg: "20px" }}
                        onClick={() => window.open(item?.link)}
                        borderRadius="6px"
                        flexDir="column"
                        cursor="pointer"
                      >
                        <Image
                          src={`${window.imgUrl.gameUrl}${item?.image}`}
                          w={{ base: "100%", lg: "100%" }}
                          h={{ base: px2vw(100), lg: "80px" }}
                          borderRadius="6px"
                        />
                        <Flex
                          flexDir="column"
                          mt={{ base: px2vw(10), lg: "10px" }}
                        >
                          <Text
                            w="full"
                            h={{ base: px2vw(12), lg: "14px" }}
                            fontSize={{ base: px2vw(12), lg: "14px" }}
                            lineHeight={{ base: px2vw(12), lg: "14px" }}
                            textAlign="center"
                            fontFamily="Orbitron"
                            fontWeight="700"
                            color="white.100"
                            overflow="hidden"
                            whiteSpace="nowrap"
                            textOverflow="ellipsis"
                          >
                            {item?.title}
                          </Text>
                          {/* <Text
                            fontFamily="Nunito"
                            fontWeight="400"
                            textStyle="16"
                            color="white.500"
                            lineHeight={{ base: px2vw(22), lg: "22px" }}
                            mb={{ base: px2vw(30), lg: "30px" }}
                          >
                            {item?.content}
                          </Text>
                          <BaseButton
                            w={{ base: "full", lg: "160px" }}
                            fontFamily="Nunito"
                            fontWeight="600"
                            textStyle="16"
                            color="white.100"
                            onClick={() => window.open(item?.link)}
                          >
                            Play
                          </BaseButton> */}
                        </Flex>
                      </Flex>
                    );
                  })}
                </Flex>
              </Flex>
            );
          })}
        </Flex>
      )}

      <LoadingPage
        progress={48}
        isShow={loadingShow}
        setIsShow={() => setLoadingShow.off()}
      />
    </Flex>
  );
}

export const getServerSideProps = async (ctx: GetI18nServerSideProps) => {
  return {
    props: { ...(await getI18nSSRProps(ctx, ["home"])) },
  };
};
export default App;
