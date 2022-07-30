import React, { useEffect, useState } from "react";
import { Flex, Text, Image, Box } from "@chakra-ui/react";
import { useRouter } from "next/router";
import px2vw from "@/utils/px2vw";
import eth from "@/assets/imgs/eth.png";
import wallet from "@/assets/imgs/wallet.png";
import coin from "@/assets/imgs/coin.png";
import usdc from "@/assets/imgs/usdc.png";
import globalStore from "@/stores/global";
import useSWR from "swr";
import {
  getGamiflyWalletBalance,
  getGamiflyWalletTransactions,
  getMyNFTs,
  getRewardAmount,
} from "@/apis/userInfo";
import TransactionItem, { transactionItem } from "../TransactionItem";
import NFTItem, { NFTItemProp } from "../NFTItem";
import styles from "./style.module.scss";

function Index() {
  const { userInfo } = globalStore();
  const router = useRouter();
  const [transactionsList, setTransactionsList] = useState<any>([]);
  const [nftList, setNftList] = useState<any>([]);
  const [gamiflyWallet, setGamiflyWallet] = useState<any>("--");
  const [rewards, setRewards] = useState<any>("--");

  // 获取钱包余额
  const { data: getGamiflyWalletBalanceData } = useSWR(
    userInfo && userInfo?.id ? [getGamiflyWalletBalance.key] : null,
    (_) => getGamiflyWalletBalance.fetcher(userInfo?.id),
    { revalidateOnFocus: false }
  );

  // 获取我的转账记录
  const { data: getGamiflyWalletTransactionsData } = useSWR(
    userInfo && userInfo?.id ? [getGamiflyWalletTransactions.key] : null,
    (_) => getGamiflyWalletTransactions.fetcher(userInfo?.id),
    { revalidateOnFocus: false }
  );

  // 获取我的NFT
  const { data: getMyNFTsData } = useSWR(
    userInfo && userInfo?.id ? [getMyNFTs.key] : null,
    (_) => getMyNFTs.fetcher(userInfo?.id),
    { revalidateOnFocus: false }
  );

  // 获取我的NFT
  const { data: getRewardAmountData } = useSWR(
    userInfo && userInfo?.id ? [getRewardAmount.key] : null,
    (_) => getRewardAmount.fetcher(userInfo?.id),
    { revalidateOnFocus: false }
  );

  // 钱包余额获取回调
  useEffect(() => {
    if (getGamiflyWalletBalanceData && getGamiflyWalletBalanceData?.value) {
      setGamiflyWallet(getGamiflyWalletBalanceData?.value);
    } else {
      setGamiflyWallet("--");
    }
  }, [getGamiflyWalletBalanceData]);

  // 获取我的转账记录回调
  useEffect(() => {
    if (getGamiflyWalletTransactionsData) {
      setTransactionsList(getGamiflyWalletTransactionsData);
    }
  }, [getGamiflyWalletTransactionsData]);

  // 获取我的NFT回调
  useEffect(() => {
    if (getMyNFTsData) {
      setNftList(getMyNFTsData);
    }
  }, [getMyNFTsData]);

  useEffect(() => {
    if (getRewardAmountData) {
      getRewardAmountData?.value === 0
        ? setRewards("--")
        : setRewards(getRewardAmountData?.value);
    }
  }, [getRewardAmountData]);

  return (
    <Flex
      direction="column"
      w={{ base: "100%", lg: "705px" }}
      ml={{ base: 0, lg: "55px" }}
      mt={{ base: px2vw(20), lg: 0 }}
    >
      {/* info */}
      <Flex flexDir={{ base: "column", lg: "row" }} alignItems="center">
        {/* Gamifly Account */}
        <Flex
          w={{ base: "full", lg: "275px" }}
          h={{ base: px2vw(170), lg: "170px" }}
          borderRadius={{ base: px2vw(10), lg: "10px" }}
          px={{ base: px2vw(17), lg: "17px" }}
          py={{ base: px2vw(15), lg: "15px" }}
          mr={{ base: 0, lg: "30px" }}
          mb={{ base: px2vw(20), lg: 0 }}
          direction="column"
          justifyContent="space-between"
          boxSizing="border-box"
          bgColor="black.100"
          bgImage={wallet}
          bgSize="100% 100%"
          boxShadow="0px 10px 15px #0F0F0F"
        >
          <Text textStyle={{ base: "16", lg: "18" }} fontWeight="700">
            Gamifly Account
          </Text>
          <Flex flexDir="column">
            <Text
              fontSize={{ base: px2vw(36), lg: "43px" }}
              lineHeight={{ base: px2vw(50), lg: "60px" }}
              color="blue.100"
            >
              {gamiflyWallet === "--" ? "0" : Number(gamiflyWallet).toFixed(2)}
            </Text>
            <Flex>
              <Image
                src={eth}
                w={{ base: px2vw(20), lg: "20px" }}
                h={{ base: px2vw(20), lg: "20px" }}
                mr={{ base: px2vw(7), lg: "7px" }}
                ignoreFallback
              />
              <Text
                textStyle="14"
                lineHeight={{ base: px2vw(20), lg: "20px" }}
                fontWeight="400"
                color="white.100"
              >
                TOKENS
              </Text>
            </Flex>
          </Flex>
        </Flex>
        {/* Gamifly Rewards */}
        <Flex
          w={{ base: "full", lg: "275px" }}
          h={{ base: px2vw(170), lg: "170px" }}
          borderRadius={{ base: px2vw(10), lg: "10px" }}
          px={{ base: px2vw(17), lg: "17px" }}
          py={{ base: px2vw(15), lg: "15px" }}
          direction="column"
          justifyContent="space-between"
          boxSizing="border-box"
          bgColor="black.100"
          bgImage={coin}
          bgSize="100% 100%"
          boxShadow="0px 10px 15px #0F0F0F"
        >
          <Text textStyle={{ base: "16", lg: "18" }} fontWeight="700">
            Rewards
          </Text>
          <Flex flexDir="column">
            <Text
              fontSize={{ base: px2vw(36), lg: "43px" }}
              lineHeight={{ base: px2vw(50), lg: "60px" }}
              color="yellow.100"
            >
              {rewards === "--" ? "0" : Number(rewards).toFixed(2)}
            </Text>
            <Flex>
              <Image
                src={usdc}
                w={{ base: px2vw(20), lg: "20px" }}
                h={{ base: px2vw(20), lg: "20px" }}
                mr={{ base: px2vw(7), lg: "7px" }}
                ignoreFallback
              />
              <Text
                textStyle="14"
                lineHeight={{ base: px2vw(20), lg: "20px" }}
                fontWeight="400"
                color="white.100"
              >
                USDC
              </Text>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
      {/* Gamifly Account transactions */}
      <Flex
        w={{ base: "full", lg: "580px" }}
        my={{ base: px2vw(20), lg: "30px" }}
        py={{ base: px2vw(10), lg: "10px" }}
        px={{ base: px2vw(15), lg: "15px" }}
        borderRadius="10px"
        direction="column"
        bgColor="black.100"
        boxSizing="border-box"
        boxShadow="0px 10px 15px #0F0F0F"
      >
        <Text
          mb={{ base: px2vw(10), lg: "15px" }}
          textStyle={{ base: "16", lg: "18" }}
          lineHeight={{ base: px2vw(20), lg: "22px" }}
          fontWeight="700"
        >
          Gamifly Account transactions
        </Text>
        {/* table */}
        <Flex
          w="auto"
          flexDir="column"
          overflowX={transactionsList.length > 0 ? "auto" : "hidden"}
          pos="relative"
          className={styles.table}
        >
          {/* header */}
          <Flex
            w={{ base: "max-content", lg: "100%" }}
            h={{ base: px2vw(50), lg: "50px" }}
            lineHeight={{ base: px2vw(50), lg: "50px" }}
            px={{ base: px2vw(20), lg: "20px" }}
            boxSizing="border-box"
            fontFamily="Nunito"
            color="white.300"
            textStyle="14"
            fontWeight="700"
            bgColor="black.400"
          >
            <Flex w={{ base: px2vw(163), lg: "163px" }}>
              <Text>Time</Text>
            </Flex>
            <Flex w={{ base: px2vw(110), lg: "140px" }}>
              <Text>Type</Text>
            </Flex>
            {/* <Flex w={{ base: px2vw(107), lg: "107px" }}>
              <Text>Asset</Text>
            </Flex> */}
            <Flex w={{ base: px2vw(109), lg: "79px" }}>
              <Text>Amount</Text>
            </Flex>
            <Flex
              justifyContent="flex-end"
              w={{ base: px2vw(140), lg: "140px" }}
            >
              <Text>Status</Text>
            </Flex>
          </Flex>
          {/* line */}
          <Box
            display={{ base: "none", lg: "block" }}
            w="full"
            h="2px"
            bg="linear-gradient(270deg, #5EC6B8 50%, rgba(94, 198, 184, 0) 73.46%)"
            transform="matrix(-1, 0, 0, 1, 0, 0)"
            pos="absolute"
            top="50px"
            left="0"
          />
          {/* table content */}
          {transactionsList.length > 0 ? (
            <Box>
              {transactionsList.map((item: transactionItem, index: number) => {
                if (index < 3) {
                  return (
                    <TransactionItem
                      key={index}
                      index={index}
                      item={item}
                      isSimple
                    />
                  );
                }
              })}
            </Box>
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
              No transactions yet
            </Box>
          )}
          {transactionsList.length > 0 && (
            <Flex
              display={{ base: "none", lg: "flex" }}
              justifyContent="center"
              w="100%"
              h="50px"
              lineHeight="50px"
              boxSizing="border-box"
              fontFamily="Nunito"
              color="green.100"
              textStyle="14"
              fontWeight="600"
              bgColor="black.300"
              cursor="pointer"
              onClick={() => router.push("/transactions")}
            >
              View full version
            </Flex>
          )}
        </Flex>
        {transactionsList.length > 0 && (
          <Flex
            display={{ base: "flex", lg: "none" }}
            justifyContent="center"
            w="100%"
            h={px2vw(50)}
            lineHeight={px2vw(50)}
            boxSizing="border-box"
            fontFamily="Nunito"
            color="green.100"
            textStyle="14"
            fontWeight="600"
            bgColor="black.300"
            cursor="pointer"
            onClick={() => router.push("/transactions")}
          >
            View full version
          </Flex>
        )}
      </Flex>

      {/* My NFT */}
      <Flex
        py={{ base: px2vw(10), lg: "10px" }}
        px={{ base: px2vw(5), lg: "15px" }}
        w={{ base: "full", lg: "580px" }}
        flexDir="column"
        borderRadius="10px"
        bgColor="black.100"
        boxSizing="border-box"
        boxShadow="0px 10px 15px #0F0F0F"
      >
        <Text
          mb={{ base: px2vw(10), lg: "15px" }}
          textStyle={{ base: "16", lg: "18" }}
          lineHeight={{ base: px2vw(20), lg: "22px" }}
          fontWeight="600"
        >
          My NFT
        </Text>
        {nftList.length > 0 ? (
          <Flex
            justifyContent={{ base: "space-between", lg: "flex-start" }}
            flexWrap="wrap"
            w="full"
          >
            {nftList.map((item: NFTItemProp, index: number) => {
              if (index < 8) {
                return (
                  <NFTItem
                    listLength={nftList.length}
                    isSimple
                    key={index}
                    index={index}
                    mr={{
                      base: index !== 0 && (index + 1) % 2 === 0 ? 0 : px2vw(5),
                      lg: index !== 0 && (index + 1) % 3 === 0 ? 0 : "38px",
                    }}
                    mb={{ base: 0, lg: "10px" }}
                    item={item}
                    w={{ base: px2vw(164), lg: "158px" }}
                    h={{ base: px2vw(164), lg: "158px" }}
                  />
                );
              }
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
      </Flex>
    </Flex>
  );
}

export default Index;
