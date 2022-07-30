import React, { useEffect, useState } from "react";
import { Flex, Box, Text, Image, useBoolean } from "@chakra-ui/react";
import px2vw from "@/utils/px2vw";
import BaseButton from "@/components/BaseButton";
import closeIcon from "@/assets/imgs/greenClose.webp";
import messageIcon from "@/assets/imgs/messageIcon.png";
import styles from "@/components/ProfileData/style.module.scss";
import useSWR from "swr";
import { getNFTTypes } from "@/apis/NFTs";
import NFTItem, { NFTItemProp } from "../NFTItem";
import BaseModal from "../BaseModal";

export interface screeningItem {
  id: string;
  title: string;
}

export interface IProps {
  nftList: NFTItemProp[];
  screening: screeningItem | null;
  totalPrice: number;
  setNftList: (list: NFTItemProp[]) => void;
  chooseScreening: (item: screeningItem) => void;
  continueClick: () => void;
}

function Index({
  nftList,
  screening,
  totalPrice,
  chooseScreening,
  continueClick,
  setNftList,
}: IProps) {
  const [chooseNft, setChooseNft] = useState<null | NFTItemProp>(null);
  const [isShow, setIsShow] = useBoolean(false);
  const [screeningList, setScreeningList] = useState<screeningItem[]>([
    {
      id: "all",
      title: "All",
    },
  ]);
  const { data: getNFTTypesData } = useSWR(
    getNFTTypes.key,
    () => getNFTTypes.fetcher(),
    {
      revalidateOnFocus: false,
    }
  );

  useEffect(() => {
    if (getNFTTypesData) {
      setScreeningList([...screeningList, ...getNFTTypesData]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getNFTTypesData]);

  return (
    <Flex
      w="full"
      flexDir="column"
      overflowX="hidden"
      pb={{ base: px2vw(148), lg: "0" }}
    >
      {/* mobile Total amount */}
      {nftList.filter((item: NFTItemProp) => item?.isActive).length > 0 && (
        <Flex
          flexDir="column"
          display={{ base: "flex", lg: "none" }}
          h={px2vw(148)}
          p={px2vw(15)}
          w="full"
          boxSizing="border-box"
          bgColor="black.1200"
          color="white.100"
          pos="fixed"
          borderTopLeftRadius="6px"
          borderTopRightRadius="6px"
          bottom={0}
          left={0}
          zIndex={1}
        >
          {/* price */}
          <Flex
            w="full"
            h={px2vw(20)}
            justifyContent="space-between"
            mb={px2vw(15)}
          >
            <Text
              fontFamily="Nunito"
              fontWeight="600"
              textStyle="16"
              lineHeight={px2vw(20)}
            >
              Total amount:
            </Text>
            <Flex>
              <Image
                src={messageIcon}
                w={px2vw(20)}
                h={px2vw(20)}
                mr={px2vw(8)}
              />
              <Text
                fontFamily="Orbitron"
                fontWeight="400"
                textStyle="16"
                color="green.100"
                lineHeight={px2vw(20)}
              >
                {totalPrice}
              </Text>
            </Flex>
          </Flex>
          <BaseButton
            fontFamily="Nunito"
            textStyle="16"
            w="full"
            onClick={() => continueClick()}
          >
            Continue
          </BaseButton>
        </Flex>
      )}

      {/* activeList */}
      {nftList.filter((item: NFTItemProp) => item?.isActive).length > 0 && (
        <Flex
          display={{ base: "none", lg: "flex" }}
          minH="98px"
          p="15px 15px 0"
          mb="30px"
          justifyContent="space-between"
          w="full"
          bgColor="black.300"
          boxSizing="border-box"
          borderRadius="6px"
        >
          {/* active NFT */}
          <Flex flexWrap="wrap" w="70%">
            {nftList
              .filter((item: NFTItemProp) => item?.isActive)
              .map((item: NFTItemProp, index: number) => (
                <Box key={index} pos="relative">
                  <Image
                    src={item.image}
                    w="68px"
                    h="68px"
                    mr="15px"
                    mb="15px"
                  />
                  <Image
                    src={closeIcon}
                    w="15px"
                    h="15px"
                    pos="absolute"
                    top="3px"
                    right="18px"
                    cursor="pointer"
                    onClick={() => {
                      const list = JSON.parse(JSON.stringify(nftList));
                      let indNum = -1;
                      list.map((ite: NFTItemProp, ind: number) => {
                        if (ite.id === item.id) {
                          indNum = ind;
                        }
                      });
                      list.fill(
                        {
                          ...item,
                          isActive: !item.isActive,
                        },
                        indNum,
                        indNum + 1
                      );
                      setNftList(list);
                    }}
                  />
                </Box>
              ))}
            <Flex h="68px">
              <Text
                color="green.100"
                fontFamily="Nunito"
                fontWeight="600"
                textStyle="18"
                lineHeight="68px"
                mr="5px"
              >
                {nftList.filter((item: NFTItemProp) => item?.isActive).length}
                NFTs
              </Text>
              <Image
                src={closeIcon}
                w="20px"
                h="20px"
                my="auto"
                cursor="pointer"
                onClick={() => {
                  const list = JSON.parse(JSON.stringify(nftList)).map(
                    (item: NFTItemProp) => {
                      return { ...item, isActive: false };
                    }
                  );
                  setNftList(list);
                }}
              />
            </Flex>
          </Flex>
          <Flex
            w="30%"
            h="52px"
            my="auto"
            justifyContent="flex-end"
            alignItems="center"
            pb="15px"
          >
            {/* price */}
            <Flex
              fontFamily="Orbitron"
              fontWeight="400"
              color="green.100"
              mr="28px"
            >
              <Image src={messageIcon} w="26px" h="26px" mr="5px" />
              <Text textStyle="20" lineHeight="25px" mr="3px">
                {totalPrice}
              </Text>
              <Text fontWeight="700" textStyle="16" lineHeight="28px">
                GMF
              </Text>
            </Flex>
            <BaseButton
              fontFamily="Nunito"
              textStyle="16"
              w="118px"
              onClick={() => continueClick()}
            >
              Continue
            </BaseButton>
          </Flex>
        </Flex>
      )}
      {/* screenings */}
      <Flex
        className={styles.step2}
        flexWrap={{ base: "nowrap", lg: "wrap" }}
        w={{ base: "full", lg: "full" }}
        mb={{ base: px2vw(20), lg: "20px" }}
        overflow="auto"
      >
        {screeningList.map((item: screeningItem, index: number) => (
          <Box
            key={index}
            bgColor={
              screening && screening.id === item.id
                ? "green.100"
                : "transparent"
            }
            border="2px solid"
            borderColor="green.100"
            borderRadius="6px"
            p={{ base: `${px2vw(10)} ${px2vw(20)}`, lg: "10px 20px" }}
            mr={{ base: px2vw(15), lg: "15px" }}
            color={
              screening && screening.id === item.id ? "white.100" : "green.100"
            }
            opacity={screening && screening.id === item.id ? "1" : "0.65"}
            boxShadow={
              screening && screening.id === item.id
                ? "0px 2px 29px #5EC6B8"
                : "none"
            }
            fontFamily="Nunito"
            fontWeight="700"
            textStyle="16"
            cursor="pointer"
            _hover={{
              bgColor: "green.100",
              color: "white.100",
              opacity: "1",
            }}
            onClick={() => chooseScreening(item)}
          >
            {item.title}
          </Box>
        ))}
      </Flex>
      {/* NFTs */}
      <Flex flexWrap="wrap">
        {nftList.map((item: NFTItemProp, index: number) => {
          return (
            <NFTItem
              multiple
              key={index}
              index={index}
              mr={{
                base: index !== 0 && (index + 1) % 2 === 0 ? 0 : px2vw(10),
                lg: index !== 0 && (index + 1) % 4 === 0 ? 0 : "10px",
              }}
              item={item}
              w={{ base: px2vw(167), lg: "276px" }}
              h={{ base: px2vw(167), lg: "276px" }}
              itemClick={(obj: NFTItemProp) => {
                setChooseNft(obj);
                setIsShow.on();
              }}
              activeClick={(ind: number, obj: NFTItemProp) => {
                const list = JSON.parse(JSON.stringify(nftList));
                list.fill(
                  {
                    ...obj,
                    isActive: !obj.isActive,
                  },
                  ind,
                  ind + 1
                );
                setNftList(list);
              }}
            />
          );
        })}
      </Flex>
      <BaseModal
        isShow={isShow}
        withOutClose
        close={() => setIsShow.off()}
        w={{ base: `calc(100vw - ${px2vw(30)})`, lg: "700px" }}
        h={{ base: "600px", lg: "327px" }}
        p="0"
      >
        <Flex
          flexDir={{ base: "column", lg: "row" }}
          overflowY="auto"
          pos="relative"
        >
          <Image
            display={{ base: "block", lg: "none" }}
            src={closeIcon}
            pos="absolute"
            cursor="pointer"
            w={px2vw(36)}
            h={px2vw(36)}
            top={px2vw(20)}
            right={px2vw(20)}
            onClick={() => setIsShow.off()}
          />
          <Image
            src={chooseNft?.image}
            w={{ base: "full", lg: "327px" }}
            h={{ base: px2vw(345), lg: "327px" }}
          />
          <Flex
            flexDir="column"
            overflowY="auto"
            p={{ base: px2vw(20), lg: "20px" }}
            w={{ base: "full", lg: "373px" }}
            h={{ base: px2vw(327), lg: "327px" }}
          >
            <Text
              fontFamily="Orbitron"
              fontWeight="600"
              color="white.100"
              fontSize={{ base: px2vw(22), lg: "22px" }}
              lineHeight={{ base: px2vw(28), lg: "28px" }}
              mb={{ base: px2vw(18), lg: "18px" }}
            >
              {chooseNft?.name}
            </Text>
            <Flex mb={{ base: px2vw(30), lg: "30px" }}>
              {chooseNft?.unitIcon && (
                <Image
                  src={chooseNft?.unitIcon}
                  w={{ base: px2vw(20), lg: "20px" }}
                  h={{ base: px2vw(20), lg: "20px" }}
                  mr={{ base: px2vw(10), lg: "10px" }}
                />
              )}

              <Text
                fontFamily="Orbitron"
                fontWeight="700"
                color="green.100"
                fontSize={{ base: px2vw(16), lg: "16px" }}
                lineHeight={{ base: px2vw(20), lg: "20px" }}
              >
                {chooseNft?.price} {chooseNft?.unit || "GMF"}
              </Text>
            </Flex>
            <Text
              fontFamily="Nunito"
              fontWeight="400"
              color="white.500"
              fontSize={{ base: px2vw(16), lg: "16px" }}
              lineHeight={{ base: px2vw(22), lg: "22px" }}
            >
              {chooseNft?.content}
            </Text>
          </Flex>
        </Flex>
      </BaseModal>
    </Flex>
  );
}

export default React.memo(Index);
