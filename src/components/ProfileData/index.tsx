import React, { useState } from "react";
import { Flex, Text, Image, Box } from "@chakra-ui/react";
import { useRouter } from "next/router";
import px2vw from "@/utils/px2vw";
import tokenIc from "@/assets/imgs/tokenIcon.png";
import cryptoIc from "@/assets/imgs/cryptoIcon.png";
import NFTIcon from "@/assets/imgs/NFT.png";
import messageIcon from "@/assets/imgs/messageIcon.png";
import nullGreen from "@/assets/imgs/nullGreen.png";
import nullBlue from "@/assets/imgs/nullBlue.png";
import meta from "@/assets/imgs/meta.svg";
import TransactionItem, { transactionItem } from "../TransactionItem";
import NFTItem, { NFTItemProp } from "../NFTItem";
import styles from "./style.module.scss";

export const transactionsList: transactionItem[] = [
  {
    time: "21-12-2021 18:02",
    type: "Deposit",
    asset: "GMF",
    amount: "0,012325",
    destination: "1D3pb46546785123dafadje83g",
    txID: "3684ab5646123ddafdfsa11167w",
    status: "Success",
  },
  {
    time: "21-12-2021 18:02",
    type: "Deposit",
    asset: "GMF",
    amount: "0,012325",
    destination: "1D3pb46546785123dafadje83g",
    txID: "3684ab5646123ddafdfsa11167w",
    status: "In progress",
  },
  {
    time: "21-12-2021 18:02",
    type: "Deposit",
    asset: "GMF",
    amount: "0,012325",
    destination: "1D3pb46546785123dafadje83g",
    txID: "3684ab5646123ddafdfsa11167w",
    status: "Failed",
  },
  {
    time: "21-12-2021 18:02",
    type: "Deposit",
    asset: "GMF",
    amount: "0,012325",
    destination: "1D3pb46546785123dafadje83g",
    txID: "3684ab5646123ddafdfsa11167w",
    status: "Success",
  },
  {
    time: "21-12-2021 18:02",
    type: "Deposit",
    asset: "GMF",
    amount: "0,012325",
    destination: "1D3pb46546785123dafadje83g",
    txID: "3684ab5646123ddafdfsa11167w",
    status: "Success",
  },
  {
    time: "21-12-2021 18:02",
    type: "Deposit",
    asset: "GMF",
    amount: "0,012325",
    destination: "1D3pb46546785123dafadje83g",
    txID: "3684ab5646123ddafdfsa11167w",
    status: "Success",
  },
  {
    time: "21-12-2021 18:02",
    type: "Deposit",
    asset: "GMF",
    amount: "0,012325",
    destination: "1D3pb46546785123dafadje83g",
    txID: "3684ab5646123ddafdfsa11167w",
    status: "Success",
  },
  {
    time: "21-12-2021 18:02",
    type: "Deposit",
    asset: "GMF",
    amount: "0,012325",
    destination: "1D3pb46546785123dafadje83g",
    txID: "3684ab5646123ddafdfsa11167w",
    status: "Success",
  },
];

export const nftList: NFTItemProp[] = [
  {
    img: NFTIcon,
    name: "Snow forest",
    unit: "GT",
    unitIcon: messageIcon,
    price: "1.5",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ",
  },
  {
    img: NFTIcon,
    name: "Snow forest",
    unit: "GT",
    unitIcon: messageIcon,
    price: "1.5",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ",
  },
  {
    img: NFTIcon,
    name: "Snow forest",
    unit: "GT",
    unitIcon: messageIcon,
    price: "1.5",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ",
  },
  {
    img: NFTIcon,
    name: "Snow forest",
    unit: "GT",
    unitIcon: messageIcon,
    price: "1.5",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ",
  },
  {
    img: NFTIcon,
    name: "Snow forest",
    unit: "GT",
    unitIcon: messageIcon,
    price: "1.5",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ",
  },
  {
    img: NFTIcon,
    name: "Snow forest",
    unit: "GT",
    unitIcon: messageIcon,
    price: "1.5",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ",
  },
  {
    img: NFTIcon,
    name: "Snow forest",
    unit: "GT",
    unitIcon: messageIcon,
    price: "1.5",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ",
  },
  {
    img: NFTIcon,
    name: "Snow forest",
    unit: "GT",
    unitIcon: messageIcon,
    price: "1.5",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ",
  },
  {
    img: NFTIcon,
    name: "Snow forest",
    unit: "GT",
    unitIcon: messageIcon,
    price: "1.5",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ",
  },
];

function Index() {
  const router = useRouter();
  const [gamiflyWallet] = useState<any>("--");
  const [privateCryptoWallet] = useState<any>("--");
  return (
    <Flex
      direction="column"
      w={{ base: "100%", lg: "705px" }}
      p={{
        base: `${px2vw(30)} 0 ${px2vw(40)}`,
        lg: "30px 18px 40px",
      }}
    >
      <Flex
        flexDir={{ base: "column", lg: "row" }}
        alignItems="center"
        justifyContent="space-between"
      >
        {/* Gamifly Wallet */}
        <Flex w="full" direction="column">
          <Text
            mb={{ base: px2vw(10), lg: "15px" }}
            textStyle={{ base: "16", lg: "18" }}
            lineHeight={{ base: px2vw(20), lg: "22px" }}
            fontWeight="600"
          >
            Gamifly Wallet
          </Text>
          <Flex
            alignItems="center"
            w={{ base: "100%", lg: "330px" }}
            h={{ base: px2vw(70), lg: "75px" }}
            color="green.100"
            bgColor="black.600"
          >
            <Image
              src={tokenIc}
              w={{ base: px2vw(35), lg: "35px" }}
              h={{ base: px2vw(35), lg: "35px" }}
              mr={{ base: px2vw(10), lg: "15px" }}
              ml={{ base: px2vw(15), lg: "20px" }}
              ignoreFallback
            />
            <Flex alignItems="baseline">
              {gamiflyWallet === "--" ? (
                <Image
                  src={nullGreen}
                  w={{ base: px2vw(20), lg: "30px" }}
                  h={{ base: px2vw(20), lg: "30px" }}
                />
              ) : (
                <Text
                  textStyle={{ base: "24", lg: "36" }}
                  lineHeight={{ base: px2vw(45), lg: "45px" }}
                >
                  {gamiflyWallet}
                </Text>
              )}

              <Text
                ml={{ base: px2vw(4), lg: "8px" }}
                textStyle="16"
                lineHeight={{ base: px2vw(20), lg: "20px" }}
                fontWeight="700"
              >
                tokens
              </Text>
            </Flex>
          </Flex>
        </Flex>
        {/* Private Crypto Wallet */}
        <Flex direction="column" w="full" mt={{ base: px2vw(25), lg: 0 }}>
          <Text
            mb={{ base: px2vw(10), lg: "15px" }}
            textStyle={{ base: "16", lg: "18" }}
            lineHeight={{ base: px2vw(20), lg: "22px" }}
            fontWeight="600"
          >
            Private Crypto Wallet
          </Text>
          <Flex
            alignItems="center"
            w={{ base: "full", lg: "330px" }}
            h={{ base: px2vw(75), lg: "75px" }}
            color="blue.100"
            bgColor="black.600"
          >
            <Image
              src={cryptoIc}
              w={{ base: px2vw(35), lg: "35px" }}
              h={{ base: px2vw(35), lg: "35px" }}
              mr={{ base: px2vw(10), lg: "15px" }}
              ml={{ base: px2vw(15), lg: "20px" }}
              ignoreFallback
            />
            <Flex alignItems="baseline">
              {privateCryptoWallet === "--" ? (
                <Image
                  src={nullBlue}
                  w={{ base: px2vw(20), lg: "30px" }}
                  h={{ base: px2vw(20), lg: "30px" }}
                />
              ) : (
                <Text
                  textStyle={{ base: "24", lg: "36" }}
                  lineHeight={{ base: px2vw(45), lg: "45px" }}
                >
                  {privateCryptoWallet}
                </Text>
              )}
              <Text
                ml={{ base: px2vw(8), lg: "8px" }}
                textStyle="16"
                lineHeight={{ base: px2vw(20), lg: "20px" }}
                fontWeight="700"
              >
                tokens
              </Text>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
      {/* Gamifly Wallet transactions */}
      <Flex direction="column" mt={{ base: px2vw(25), lg: "35px" }}>
        <Text
          mb={{ base: px2vw(10), lg: "15px" }}
          textStyle={{ base: "16", lg: "18" }}
          lineHeight={{ base: px2vw(20), lg: "22px" }}
          fontWeight="600"
        >
          Gamifly Wallet transactions
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
            <Flex w={{ base: px2vw(110), lg: "110px" }}>
              <Text>Type</Text>
            </Flex>
            <Flex w={{ base: px2vw(107), lg: "107px" }}>
              <Text>Asset</Text>
            </Flex>
            <Flex w={{ base: px2vw(109), lg: "109px" }}>
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
      <Flex flexDir="column" mt={{ base: px2vw(32), lg: "32px" }}>
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
                    isSimple
                    key={index}
                    index={index}
                    mr={{
                      base:
                        index !== 0 && (index + 1) % 2 === 0 ? 0 : px2vw(10),
                      lg: index !== 0 && (index + 1) % 4 === 0 ? 0 : "10px",
                    }}
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

      {/* Login method */}
      <Flex flexDir="column" mt={{ base: px2vw(35), lg: "35px" }}>
        <Text
          mb={{ base: px2vw(10), lg: "15px" }}
          textStyle={{ base: "16", lg: "18" }}
          lineHeight={{ base: px2vw(20), lg: "22px" }}
          fontWeight="600"
        >
          Login method
        </Text>
        <Flex
          w="full"
          bgColor="black.600"
          h={{ base: px2vw(80), lg: "80px" }}
          px={{ base: px2vw(20), lg: "20px" }}
        >
          <Image
            src={meta}
            w={{ base: px2vw(50), lg: "50px" }}
            h={{ base: px2vw(50), lg: "50px" }}
            mr={{ base: px2vw(10), lg: "10px" }}
            my="auto"
          />

          <Text
            fontFamily="Nunito"
            textStyle="18"
            fontWeight="700"
            lineHeight={{ base: px2vw(80), lg: "80px" }}
          >
            Meta Mask
          </Text>
        </Flex>
      </Flex>
    </Flex>
  );
}

export default Index;
