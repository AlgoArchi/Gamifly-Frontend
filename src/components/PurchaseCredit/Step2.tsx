import React, { useEffect, useState } from "react";
import { Flex, Box, Text, Image, useToast, useBoolean } from "@chakra-ui/react";
import px2vw from "@/utils/px2vw";
import messageIcon from "@/assets/imgs/messageIcon.png";
import { gameItem } from "@/pages/purchase";
import transferLine from "@/assets/imgs/transferLine.png";
import { buyCredit } from "@/apis/NFTs";
import useSWR from "swr";
import PaymentMethod from "../PaymentMethod";
import GamiflyWallet from "../GamiflyWallet";
import CryptoWallet from "../CryptoWallet";
import BaseButton from "../BaseButton";
import GameSelect from "../GameSelect";
import globalStore from "@/stores/global";
import { useWeb3React } from "@web3-react/core";
import { recharge } from "@/connect/wallet";
import { deposit } from "@/apis/deposit";

export interface IProps {
  gameList: gameItem[];
  activeGame: gameItem;
  paymentMethod: number;
  totalPrice: number;
  setActiveGame: (obj: gameItem) => void;
  setPaymentMethod: (type: number) => void;
  success: () => void;
}

function Index({
  gameList,
  activeGame,
  totalPrice,
  paymentMethod,
  setPaymentMethod,
  setActiveGame,
  success,
}: IProps) {
  const toast = useToast();
  const { userInfo, globalAccount } = globalStore();
  const { library, account } = useWeb3React();
  const [hash, setHash] = useState("");
  const [isDeposit, setIsDeposit] = useBoolean(false);
  const [loading, setLoading] = useBoolean(false);
  const [buyPar, setBuyPar] = useState<any>(null);
  const { data: depositData } = useSWR(
    userInfo && userInfo?.platform_wallet && hash && isDeposit && deposit.key,
    () =>
      deposit.fetcher({
        hash: hash,
        wallet_address: userInfo?.platform_wallet,
      }),
    {
      revalidateOnFocus: false,
    }
  );
  const { data: buyCreditData } = useSWR(
    buyPar && buyPar.game_id ? [buyCredit.key, buyPar] : null,
    () => buyCredit.fetcher(buyPar),
    {
      revalidateOnFocus: false,
    }
  );

  useEffect(() => {
    if (!buyCreditData) return;
    if (buyCreditData.result) {
      setLoading.off();
      success();
    } else {
      toast({
        title: "error",
        description: buyCreditData.result,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [buyCreditData]);

  useEffect(() => {
    if (hash) {
      setIsDeposit.on();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hash]);

  useEffect(() => {
    if (depositData) {
      setBuyPar({
        user_id: userInfo?.id,
        game_id: activeGame?.id,
        amount: 1,
        accessToken: userInfo?.access_token,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [depositData]);

  return (
    <Flex
      flexDir={{ base: "column", lg: "row" }}
      bgColor={{ base: "transparent", lg: "black.300" }}
      pb={{ base: px2vw(148), lg: 0 }}
      borderRadius="6px"
      overflow={"hidden"}
    >
      {/* left */}
      <Flex
        pos="relative"
        flexDir="column"
        mr="2px"
        w={{ base: "full", lg: "70%" }}
        p={{
          base: 0,
          lg: "20px 15px",
        }}
      >
        {/* Choose the game */}
        <Flex flexDir="column" mb={{ base: px2vw(35), lg: "35" }}>
          <Text
            mb={{ base: px2vw(15), lg: "15px" }}
            fontFamily="Orbitron"
            fontWeight="600"
            textStyle={{ base: "16", lg: "18" }}
            color="white.100"
          >
            Choose the game
          </Text>
          <GameSelect
            activeOption={activeGame}
            options={gameList}
            setActiveOption={(obj: gameItem) => setActiveGame(obj)}
          />
        </Flex>
        {/* Payment method */}
        <Box>
          <PaymentMethod
            paymentMethod={paymentMethod}
            setPaymentMethod={(type: number) => setPaymentMethod(type)}
          />
        </Box>
        <Image
          display={{ base: "none", lg: "block" }}
          src={transferLine}
          h="100%"
          pos="absolute"
          right="0"
          top="0"
        />
      </Flex>
      {/* right */}
      <Flex
        w={{ base: "full", lg: "30%" }}
        flexDir="column"
        p={{ base: 0, lg: "20px" }}
        mt={{ base: px2vw(20), lg: 0 }}
      >
        <Text
          fontFamily="Orbitron"
          color="white.100"
          textStyle="18"
          fontWeight="600"
          mb={{ base: px2vw(20), lg: "20px" }}
          lineHeight={{ base: px2vw(23), lg: "23px" }}
        >
          Total amount
        </Text>
        {paymentMethod === 1 || paymentMethod === 2 ? (
          <GamiflyWallet
            price={activeGame?.credit_price}
            unit="GMF"
            buttonLoading={loading}
            loadingText="Buy"
            buyClick={() => {
              setLoading.on();
              setBuyPar({
                user_id: userInfo?.id,
                game_id: activeGame?.id,
                amount: 1,
              });
            }}
          />
        ) : (
          <CryptoWallet
            buttonLoading={loading}
            loadingText="Recharge"
            buttonText="Recharge"
            nativePrice={activeGame?.credit_price}
            nativeUnit="USDC"
            buyClick={() => {
              setLoading.on();
              recharge(
                library,
                String(account || globalAccount),
                "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174",
                userInfo,
                totalPrice.toString(),
                (res: string) => setHash(res),
                () => setLoading.off()
              );
            }}
          />
        )}
      </Flex>
      {/* mobile buy */}
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
              {activeGame?.credit_price}
            </Text>
          </Flex>
        </Flex>
        <BaseButton
          fontFamily="Nunito"
          textStyle="16"
          w="full"
          isLoading={loading}
          loadingText={
            paymentMethod === 1 || paymentMethod === 2 ? "Buy" : "Recharge"
          }
          onClick={() => {
            if (paymentMethod === 1 || paymentMethod === 2) {
              setLoading.on();
              setBuyPar({
                user_id: userInfo?.id,
                game_id: activeGame?.id,
                amount: 1,
              });
            } else {
              setLoading.on();
              recharge(
                library,
                String(account || globalAccount),
                "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174",
                userInfo,
                totalPrice.toString(),
                (res: string) => setHash(res),
                () => setLoading.off()
              );
            }
          }}
        >
          {paymentMethod === 1 || paymentMethod === 2 ? "Buy" : "Recharge"}
        </BaseButton>
      </Flex>
    </Flex>
  );
}

export default React.memo(Index);
