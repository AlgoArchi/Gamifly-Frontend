import React from "react";
import { Flex, Box, Text, Image } from "@chakra-ui/react";
import px2vw from "@/utils/px2vw";
import closeIcon from "@/assets/imgs/greenClose.webp";
import messageIcon from "@/assets/imgs/messageIcon.png";
import NFTItem, { NFTItemProp } from "../NFTItem";
import PaymentMethod from "../PaymentMethod";
import GamiflyWallet from "../GamiflyWallet";
import CryptoWallet from "../CryptoWallet";
import BaseButton from "../BaseButton";

export interface IProps {
  nftList: NFTItemProp[];
  paymentMethod: number;
  totalPrice: number;
  setNftList: (list: NFTItemProp[]) => void;
  setPaymentMethod: (type: number) => void;
  success: () => void;
}

function Index({
  nftList,
  totalPrice,
  paymentMethod,
  setNftList,
  setPaymentMethod,
  success,
}: IProps) {
  return (
    <Flex
      flexDir={{ base: "column", lg: "row" }}
      bgColor={{ base: "transparent", lg: "black.300" }}
      pb={{ base: px2vw(148), lg: 0 }}
      overflow={"hidden"}
    >
      {/* left */}
      <Flex
        pos="relative"
        flexDir="column"
        w={{ base: "full", lg: "70%" }}
        p={{
          base: 0,
          lg: "20px 15px 20px 5px",
        }}
      >
        {/* NFTs */}
        <Flex w="full" mb={{ base: px2vw(15), lg: "15px" }} overflowX="auto">
          {nftList
            .filter((item) => item.isActive)
            .map((item: NFTItemProp, index: number) => {
              return (
                <Box pos="relative" key={index}>
                  <NFTItem
                    isSimple
                    index={index}
                    item={item}
                    w={{ base: px2vw(167), lg: "177px" }}
                    h={{ base: px2vw(167), lg: "177px" }}
                    ml={{
                      base: index === 0 ? 0 : px2vw(10),
                      lg: "20px",
                    }}
                    mt="0"
                    mb={{ base: px2vw(10), lg: "20px" }}
                  />
                  <Image
                    src={closeIcon}
                    w={{ base: px2vw(20), lg: "20px" }}
                    h={{ base: px2vw(20), lg: "20px" }}
                    pos="absolute"
                    top={{ base: px2vw(12), lg: "12px" }}
                    right={{ base: px2vw(12), lg: "12px" }}
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
              );
            })}
        </Flex>
        {/* Payment method */}
        <Box pl={{ base: 0, lg: "15px" }}>
          <PaymentMethod
            paymentMethod={paymentMethod}
            setPaymentMethod={(type: number) => setPaymentMethod(type)}
          />
        </Box>
        <Box
          display={{ base: "none", lg: "block" }}
          w="full"
          h="2px"
          bg="linear-gradient(270deg, #5EC6B8 50%, rgba(94, 198, 184, 0) 73.46%)"
          transform="matrix(0, -1, -1, 0, 408, 350)"
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
          <GamiflyWallet price={7.7} unit="GMF" buyClick={() => success()} />
        ) : (
          <CryptoWallet
            nativePrice={7.7}
            nativeUnit="GMF"
            otherPrice={21.3}
            otherUnit="TRX"
            buyClick={() => success()}
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
          onClick={() => success()}
        >
          Continue
        </BaseButton>
      </Flex>
    </Flex>
  );
}

export default React.memo(Index);
