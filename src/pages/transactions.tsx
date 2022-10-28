import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Flex, Text, Image, Box } from "@chakra-ui/react";
import px2vw from "@/utils/px2vw";
import arrows from "@/assets/imgs/arrows.png";
import TransactionItem, { transactionItem } from "@/components/TransactionItem";
import styles from "@/components/ProfileData/style.module.scss";
import { getGamiflyWalletTransactions } from "@/apis/userInfo";
import useSWR from "swr";
import globalStore from "@/stores/global";

function Index() {
  const router = useRouter();
  const { userInfo } = globalStore();
  const [transactionsList, setTransactionsList] = useState<transactionItem[]>(
    []
  );

  // 获取我的转账记录
  const { data: getGamiflyWalletTransactionsData } = useSWR(
    userInfo && userInfo?.id ? [getGamiflyWalletTransactions.key] : null,
    (_) => getGamiflyWalletTransactions.fetcher(userInfo?.id),
    { revalidateOnFocus: false }
  );

  // 获取我的转账记录回调
  useEffect(() => {
    if (getGamiflyWalletTransactionsData) {
      setTransactionsList(getGamiflyWalletTransactionsData);
    }
  }, [getGamiflyWalletTransactionsData]);

  return (
    <Flex direction="column" w="full" pt={{ base: 0, lg: "150px" }}>
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
        h={{ base: px2vw(46), lg: "auto" }}
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
          mb="25px"
        >
          Gamifly Account transactions
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
      <Flex flexDir="column" overflowX="auto" className={styles.table}>
        {/* header */}
        <Flex
          w={{ base: "max-content", lg: "100%" }}
          h={{ base: px2vw(50), lg: "50px" }}
          lineHeight={{ base: px2vw(50), lg: "50px" }}
          px={{ base: px2vw(20), lg: "20px" }}
          justifyContent="space-between"
          boxSizing="border-box"
          fontFamily="Nunito"
          color="white.300"
          textStyle="14"
          fontWeight="700"
          bgColor="black.400"
        >
          <Flex w={{ base: px2vw(163), lg: "200px" }}>
            <Text>Time</Text>
          </Flex>
          <Flex w={{ base: px2vw(110), lg: "180px" }}>
            <Text>Type</Text>
          </Flex>
          <Flex w={{ base: px2vw(107), lg: "107px" }}>
            <Text>Asset</Text>
          </Flex>
          <Flex w={{ base: px2vw(109), lg: "150px" }}>
            <Text>Amount</Text>
          </Flex>
          <Flex w={{ base: px2vw(217), lg: "217px" }}>
            <Text>Destination</Text>
          </Flex>
          <Flex w={{ base: px2vw(109), lg: "109px" }}>
            <Text>TxID</Text>
          </Flex>
          <Flex justifyContent="flex-end" w={{ base: px2vw(140), lg: "140px" }}>
            <Text>Status</Text>
          </Flex>
        </Flex>
        {transactionsList.length > 0 ? (
          <Box>
            {transactionsList.map((item: transactionItem, index: number) => {
              return <TransactionItem key={index} index={index} item={item} />;
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
      </Flex>
    </Flex>
  );
}

export default Index;
