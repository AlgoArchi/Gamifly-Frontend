import React, { useEffect, useState } from "react";
import { Flex, Text, Image, Box, useBoolean } from "@chakra-ui/react";
import { useRouter } from "next/router";
import px2vw from "@/utils/px2vw";
import gamiflyToken from "@/assets/imgs/gamiflyToken.png";
// import wallet from "@/assets/imgs/wallet.png";
// import coin from "@/assets/imgs/coin.png";
import usdc from "@/assets/imgs/usdc.png";
import withdrawIcon from "@/assets/imgs/withdrawIcon.png";
import copy from "@/assets/imgs/copy2.png";
import copySuccessIcon from "@/assets/imgs/copySuccess.png";
import globalStore from "@/stores/global";
import useSWR from "swr";
import {
  getGamiflyWalletBalance,
  getGamiflyWalletTransactions,
  getMyNFTs,
  getRewardAmount,
} from "@/apis/userInfo";
import TransactionItem, { transactionItem } from "../TransactionItem";
// import NFTItem, { NFTItemProp } from "../NFTItem";
import styles from "./style.module.scss";
import copyFunction from "copy-to-clipboard";

function Index() {
  const { userInfo } = globalStore();
  const router = useRouter();
  const [transactionsList, setTransactionsList] = useState<any>([]);
  const [_nftList, setNftList] = useState<any>([]);
  const [gamiflyWallet, setGamiflyWallet] = useState<any>("--");
  const [rewards, setRewards] = useState<any>("--");
  const [copySuccess, setCopySuccess] = useBoolean(false);

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

  // 获取我的积分
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
    } else {
      setTransactionsList([]);
    }
  }, [getGamiflyWalletTransactionsData]);

  // 获取我的NFT回调
  useEffect(() => {
    if (getMyNFTsData) {
      setNftList(getMyNFTsData);
    }
  }, [getMyNFTsData]);

  useEffect(() => {
    if (getRewardAmountData && getRewardAmountData?.value) {
      setRewards(getRewardAmountData?.value);
    } else {
      setRewards("--");
    }
  }, [getRewardAmountData]);

  return (
    <Flex
      direction="column"
      w={{ base: "full", lg: "850px" }}
      ml={{ base: 0, lg: "55px" }}
      mt={{ base: px2vw(20), lg: 0 }}
    >
      {/* info */}
      <Flex
        px={{ base: 0, lg: "30px" }}
        py={{ base: 0, lg: "20px" }}
        flexDir="column"
        boxSizing="border-box"
        bgColor="black.100"
        borderRadius="15px"
      >
        {/* title */}
        <Text
          textStyle="16"
          fontFamily="Eurostile"
          fontWeight="bold"
          color="white.100"
          mb={{ base: px2vw(20), lg: "20px" }}
        >
          MY GAMIFLY WALLET
        </Text>
        {/* content */}
        <Flex
          w="full"
          flexDir={{ base: "column", lg: "row" }}
          alignItems="center"
        >
          {/* Gamifly Account */}
          <Flex
            w={{ base: "full", lg: "350px" }}
            mb={{ base: px2vw(20), lg: 0 }}
            mr={{ base: 0, lg: "25px" }}
            px={{ base: px2vw(15), lg: "15px" }}
            py={{ base: px2vw(10), lg: "10px" }}
            justifyContent="space-between"
            boxSizing="border-box"
            bgColor="black.1600"
            borderRadius="10px"
          >
            <Flex flexDir="column" justifyContent="space-between">
              <Text
                textStyle="16"
                fontWeight="400"
                mb={{ base: px2vw(20), lg: "20px" }}
              >
                Token Balance
              </Text>
              <Flex flexDir="column">
                <Text
                  fontSize={{ base: px2vw(54), lg: "54px" }}
                  lineHeight={{ base: px2vw(54), lg: "54px" }}
                  mb={{ base: px2vw(15), lg: "15px" }}
                  color="white.100"
                  fontFamily="SofiaPro"
                >
                  {gamiflyWallet === "--"
                    ? "0"
                    : Number(gamiflyWallet).toFixed(2)}
                </Text>
                <Flex>
                  <Image
                    src={gamiflyToken}
                    w={{ base: px2vw(25), lg: "25px" }}
                    h={{ base: px2vw(25), lg: "25px" }}
                    mr={{ base: px2vw(7), lg: "7px" }}
                    ignoreFallback
                  />
                  <Text
                    textStyle="14"
                    lineHeight={{ base: px2vw(25), lg: "25px" }}
                    fontWeight="400"
                    color="white.100"
                  >
                    Gamifly token
                  </Text>
                </Flex>
              </Flex>
            </Flex>
            <Flex
              w={{ base: px2vw(107), lg: "107px" }}
              h={{ base: px2vw(35), lg: "35px" }}
              borderRadius="20px"
              bgColor="green.1000"
              justifyContent="center"
              alignItems="center"
              color="black.1700"
              fontFamily="Eurostile"
              textStyle="13"
              fontWeight="400"
              mt="auto"
              cursor="pointer"
              onClick={() => router.push("/transfer")}
            >
              <Text mt={{ base: px2vw(5), lg: "5px" }}>BUY MORE</Text>
            </Flex>
          </Flex>
          {/* Gamifly Rewards */}
          <Flex
            w={{ base: "full", lg: "380px" }}
            px={{ base: px2vw(15), lg: "15px" }}
            py={{ base: px2vw(10), lg: "10px" }}
            justifyContent="space-between"
            boxSizing="border-box"
            bgColor="black.1600"
            borderRadius="10px"
          >
            <Flex flexDir="column" justifyContent="space-between">
              <Text
                textStyle="16"
                fontWeight="400"
                mb={{ base: px2vw(20), lg: "20px" }}
              >
                Rewards
              </Text>
              <Flex flexDir="column">
                <Text
                  fontSize={{ base: px2vw(54), lg: "54px" }}
                  lineHeight={{ base: px2vw(54), lg: "54px" }}
                  mb={{ base: px2vw(15), lg: "15px" }}
                  color="yellow.100"
                  fontFamily="SofiaPro"
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
            <Image
              w={{ base: px2vw(107), lg: "107px" }}
              h={{ base: px2vw(35), lg: "35px" }}
              src={withdrawIcon}
              mt="auto"
              cursor="pointer"
              onClick={() => router.push("/transfer")}
            />
          </Flex>
        </Flex>
        {/* My Gamifly Wallet Address */}
        <Flex
          px={{ base: px2vw(15), lg: "15px" }}
          pt={{ base: px2vw(10), lg: "10px" }}
          pb={{ base: px2vw(20), lg: "20px" }}
          mt={{ base: px2vw(40), lg: "40px" }}
          flexDir="column"
          bgColor="black.1600"
          borderRadius="10px"
          boxSizing="border-box"
        >
          <Text
            textStyle="16"
            color="white.100"
            fontFamily="SofiaPro"
            fontWeight="400"
          >
            My Gamifly Wallet Address
          </Text>
          <Flex
            fontFamily="SofiaPro"
            fontWeight="400"
            alignItems="center"
            mt={{ base: px2vw(25), lg: "25px" }}
          >
            <Text color="green.1000" textDecor="underline" mr="5px">
              {`${userInfo?.platform_wallet?.substring(
                0,
                5
              )}...${userInfo?.platform_wallet?.substring(
                userInfo?.platform_wallet.length - 4,
                userInfo?.platform_wallet.length
              )}`}
            </Text>
            <Image
              w={{ base: px2vw(19), lg: "19px" }}
              h={{ base: px2vw(19), lg: "19px" }}
              src={copy}
              cursor="pointer"
              onClick={() => {
                copyFunction(userInfo?.platform_wallet);
                setCopySuccess.on();
              }}
            />
            {copySuccess && (
              <Flex ml={{ base: px2vw(15), lg: "15px" }}>
                <Image
                  w={{ base: px2vw(13), lg: "13px" }}
                  h={{ base: px2vw(13), lg: "13px" }}
                  src={copySuccessIcon}
                />
                <Text
                  fontFamily="SofiaPro"
                  textStyle="13"
                  color="white.800"
                  ml={{ base: px2vw(5), lg: "5px" }}
                >
                  Your address has been copied to the click board
                </Text>
              </Flex>
            )}
          </Flex>
        </Flex>
      </Flex>
      {/* TRANSACTION HISTORY */}
      <Flex
        w={{ base: "full", lg: "850px" }}
        mt={{ base: px2vw(20), lg: "30px" }}
        mb={{ base: px2vw(80), lg: "140px" }}
        py={{ base: px2vw(30), lg: "30px" }}
        px={{ base: px2vw(25), lg: "25px" }}
        borderRadius="10px"
        direction="column"
        bgColor="black.1600"
        boxSizing="border-box"
        boxShadow="0px 0px 20px RGBA(188, 252, 71, 0.5)"
        border="1px solid"
        borderColor="green.1000"
      >
        <Text
          fontFamily="Eurostile"
          textStyle="16"
          fontWeight="bold"
          color="green.1000"
          mb={{ base: px2vw(20), lg: "20px" }}
        >
          TRANSACTION HISTORY
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
            color="white.100"
            textStyle="14"
            fontWeight="700"
            bgColor="black.1600"
          >
            <Flex w={{ base: px2vw(163), lg: "200px" }}>
              <Text>TIME</Text>
            </Flex>
            <Flex w={{ base: px2vw(110), lg: "250px" }}>
              <Text>TYPE</Text>
            </Flex>
            {/* <Flex w={{ base: px2vw(107), lg: "107px" }}>
              <Text>Asset</Text>
            </Flex> */}
            <Flex w={{ base: px2vw(109), lg: "200px" }}>
              <Text>AMOUNT</Text>
            </Flex>
            <Flex
              justifyContent="flex-end"
              w={{ base: px2vw(140), lg: "140px" }}
            >
              <Text>STATUS</Text>
            </Flex>
          </Flex>
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
              color="green.1000"
              textStyle="14"
              fontWeight="600"
              bgColor="black.1600"
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
            color="green.1000"
            textStyle="14"
            fontWeight="600"
            bgColor="black.1600"
            cursor="pointer"
            onClick={() => router.push("/transactions")}
          >
            View full version
          </Flex>
        )}
      </Flex>
      {/* My NFT */}
      {/* <Flex
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
      </Flex> */}
    </Flex>
  );
}

export default Index;
