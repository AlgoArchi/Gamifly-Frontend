import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Flex, Text, Image, Box, useBoolean } from "@chakra-ui/react";
import px2vw from "@/utils/px2vw";
import NFTItem, { NFTItemProp } from "@/components/NFTItem";
import BaseModal from "@/components/BaseModal";
import arrows from "@/assets/imgs/arrows.png";
import closeIcon from "@/assets/imgs/greenClose.webp";
import useSWR from "swr";
import { getMyNFTs } from "@/apis/userInfo";
import globalStore from "@/stores/global";

function Index() {
  const { userInfo } = globalStore();
  const router = useRouter();
  const [chooseNft, setChooseNft] = useState<null | NFTItemProp>(null);
  const [isShow, setIsShow] = useBoolean(false);
  const [nftList, setNftList] = useState<NFTItemProp[]>([]);
  // 获取我的NFT
  const { data: getMyNFTsData } = useSWR(
    userInfo && userInfo?.id ? [getMyNFTs.key] : null,
    (_) => getMyNFTs.fetcher(userInfo?.id),
    { revalidateOnFocus: false }
  );

  useEffect(() => {
    if (getMyNFTsData) {
      setNftList(getMyNFTsData);
    }
  }, [getMyNFTsData]);
  return (
    <Flex direction="column" w="full">
      <Flex
        display={{ base: "none", lg: "flex" }}
        mb={{ base: px2vw(30), lg: "30px" }}
        cursor="pointer"
        onClick={() => router.back()}
      >
        <Image
          src={arrows}
          w={{ base: px2vw(11.87), lg: "11.87px" }}
          h={{ base: px2vw(15.83), lg: "15.83px" }}
          mr={{ base: px2vw(10), lg: "10px" }}
          my="auto"
        />
        <Text
          fontFamily="Orbitron"
          fontWeight="700"
          color="green.100"
          fontSize={{ base: px2vw(18), lg: "18px" }}
          lineHeight={{ base: px2vw(23), lg: "23px" }}
        >
          Back
        </Text>
      </Flex>
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
          My NFT
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
      {nftList.length > 0 ? (
        <Flex
          justifyContent={{ base: "space-between", lg: "flex-start" }}
          flexWrap="wrap"
          w="full"
        >
          {nftList.map((item: NFTItemProp, index: number) => {
            return (
              <NFTItem
                key={index}
                index={index}
                mr={{
                  base: index !== 0 && (index + 1) % 2 === 0 ? 0 : px2vw(10),
                  lg: index !== 0 && (index + 1) % 6 === 0 ? 0 : "20px",
                }}
                w={{ base: px2vw(164), lg: "177px" }}
                h={{ base: px2vw(164), lg: "177px" }}
                item={item}
                itemClick={(obj: NFTItemProp) => {
                  setChooseNft(obj);
                  setIsShow.on();
                }}
              />
            );
          })}
        </Flex>
      ) : (
        <Box
          w="full"
          textAlign="center"
          fontFamily="Nunito"
          fontWeight="600"
          textStyle="14"
          color="green.100"
          opacity="0.55"
          bgColor="black.600"
          h={{ base: px2vw(100), lg: "100px" }}
          lineHeight={{ base: px2vw(100), lg: "100px" }}
        >
          No NFT yet
        </Box>
      )}
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
                {chooseNft?.total_amount}
                {chooseNft?.unit || ""}
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

export default Index;
