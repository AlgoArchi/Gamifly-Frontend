import React, { useEffect, useMemo, useState } from "react";
import { Box, Flex, Text, Image, useBoolean } from "@chakra-ui/react";
import { getI18nSSRProps, GetI18nServerSideProps } from "@/utils/i18n";
import px2vw from "@/utils/px2vw";
import Step1 from "@/components/Purchase/Step1";
import Step2, { screeningItem } from "@/components/Purchase/Step2";
import CreditStep2 from "@/components/PurchaseCredit/Step2";
import { NFTItemProp } from "@/components/NFTItem";
import image6 from "@/assets/imgs/image6.webp";
import image8 from "@/assets/imgs/image8.webp";
import arrows from "@/assets/imgs/arrows.png";
import NFTIcon from "@/assets/imgs/NFT.png";
import messageIcon from "@/assets/imgs/messageIcon.png";
import Step3 from "@/components/Purchase/Step3";
import buySuccess from "@/assets/imgs/buySuccess.png";
import BaseModal from "@/components/BaseModal";
import BaseButton from "@/components/BaseButton";
import { useRouter } from "next/router";

export interface gameItem {
  id: number | string;
  img: string;
  name: string;
  price: number | string;
}

function App() {
  const router = useRouter();
  const [showSuccess, setShowSuccess] = useBoolean(false);
  const [step, setStep] = useState(1); // 步骤
  const [chooseType, setChooseType] = useState("Credit"); // Credit / NFT
  const [paymentMethod, setPaymentMethod] = useState(1); // 支付类型
  const [totalPrice, setTotalPrice] = useState(0); // 总价格
  // NFT筛选列表
  const [screening, setScreening] = useState<screeningItem | null>({
    id: "all",
    text: "All",
  });
  // NFT列表
  const [nftList, setNftList] = useState<NFTItemProp[]>([
    {
      id: 1,
      img: NFTIcon,
      name: "Snow forest",
      unit: "GT",
      unitIcon: messageIcon,
      price: "1.5",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ",
    },
    {
      id: 2,
      img: NFTIcon,
      name: "Snow forest",
      unit: "GT",
      unitIcon: messageIcon,
      price: "1.5",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ",
    },
    {
      id: 3,
      img: NFTIcon,
      name: "Snow forest",
      unit: "GT",
      unitIcon: messageIcon,
      price: "1.5",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ",
    },
    {
      id: 4,
      img: NFTIcon,
      name: "Snow forest",
      unit: "GT",
      unitIcon: messageIcon,
      price: "1.5",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ",
    },
    {
      id: 5,
      img: NFTIcon,
      name: "Snow forest",
      unit: "GT",
      unitIcon: messageIcon,
      price: "1.5",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ",
    },
    {
      id: 6,
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
      id: 7,
      img: NFTIcon,
      name: "Snow forest",
      unit: "GT",
      unitIcon: messageIcon,
      price: "1.5",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ",
    },
    {
      id: 8,
      img: NFTIcon,
      name: "Snow forest",
      unit: "GT",
      unitIcon: messageIcon,
      price: "1.5",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ",
    },
  ]);
  // game列表
  const [gameList] = useState<gameItem[]>([
    { id: 1, img: image6, name: "Fishing Expert1", price: 200 },
    { id: 2, img: image8, name: "Fishing Expert2", price: 300 },
    { id: 3, img: image6, name: "Fishing Expert3", price: 200 },
    { id: 4, img: image8, name: "Fishing Expert4", price: 300 },
  ]);
  const [activeGame, setActiveGame] = useState<gameItem>(gameList[0]);

  useEffect(() => {
    const list = nftList.filter((item: NFTItemProp) => item?.isActive);
    if (list.length > 0) {
      let price = 0;
      list.map((item) => {
        price += Number(item.price);
      });
      setTotalPrice(price);
    }
  }, [nftList]);

  const contentNFT = useMemo(() => {
    if (step === 1) {
      return (
        <Step1
          chooseType={chooseType}
          setChooseType={(type: string) => setChooseType(type)}
          continueClick={() => setStep(2)}
        />
      );
    } else if (step === 2) {
      return (
        <Step2
          nftList={nftList}
          setNftList={(list) => setNftList(list)}
          totalPrice={totalPrice}
          screening={screening}
          chooseScreening={(item: screeningItem) => setScreening(item)}
          continueClick={() => setStep(3)}
        />
      );
    } else {
      return (
        <Step3
          nftList={nftList}
          totalPrice={totalPrice}
          setNftList={(list) => setNftList(list)}
          paymentMethod={paymentMethod}
          setPaymentMethod={(type: number) => setPaymentMethod(type)}
          success={() => {
            setShowSuccess.on();
          }}
        />
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step, chooseType, screening, nftList, paymentMethod, totalPrice]);

  const contentCredit = useMemo(() => {
    if (step === 1) {
      return (
        <Step1
          chooseType={chooseType}
          setChooseType={(type: string) => setChooseType(type)}
          continueClick={() => setStep(2)}
        />
      );
    } else if (step === 2) {
      return (
        <CreditStep2
          gameList={gameList}
          activeGame={activeGame}
          setActiveGame={(obj: gameItem) => setActiveGame(obj)}
          totalPrice={totalPrice}
          paymentMethod={paymentMethod}
          setPaymentMethod={(type: number) => setPaymentMethod(type)}
          success={() => {
            setShowSuccess.on();
          }}
        />
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step, chooseType, activeGame, paymentMethod, totalPrice]);

  return (
    <Flex w="full" flexDir="column">
      {/* Title */}
      <Text
        display={{ base: "none", lg: "block" }}
        mb={{ base: px2vw(35), lg: "35px" }}
        fontFamily="Orbitron"
        fontWeight="700"
        fontSize="36px"
        color="white.100"
      >
        Make a Purchase
      </Text>
      <Flex flexDir="column">
        {/* Purchase type */}
        <Flex flexDir="column" mb={{ base: px2vw(30), lg: "30px" }}>
          {/* Text */}
          <Flex
            fontFamily="Orbitron"
            fontWeight="600"
            textStyle="16"
            color="white.100"
            mb={{ base: px2vw(15), lg: "15px" }}
            lineHeight={{ base: px2vw(20), lg: "20px" }}
          >
            {step > 1 && (
              <Image
                src={arrows}
                w={{ base: px2vw(11.87), lg: "11.87px" }}
                h={{ base: px2vw(15.83), lg: "15.83px" }}
                mr={{ base: px2vw(10), lg: "10px" }}
                my="auto"
                cursor="pointer"
                onClick={() => {
                  setStep(step - 1);
                }}
              />
            )}

            <Text color="green.100">{step}</Text>
            <Text mx="5px">/</Text>
            <Text>
              {chooseType === "NFT" ? 3 : 2}.{" "}
              {chooseType === "NFT"
                ? step === 2
                  ? "Choose NFT"
                  : "Payment"
                : "Payment"}
            </Text>
          </Flex>
          {/* Progress */}
          <Box
            w="full"
            bgColor="green.600"
            pos="relative"
            h={{ base: px2vw(4), lg: "4px" }}
            _after={{
              content: "''",
              w:
                chooseType === "NFT"
                  ? step === 1
                    ? "33.33%"
                    : step === 2
                    ? "66.66%"
                    : "100%"
                  : step === 1
                  ? "50%"
                  : "100%",
              h: { base: px2vw(4), lg: "4px" },
              bgColor: "green.100",
              pos: "absolute",
              top: 0,
              left: 0,
            }}
          />
        </Flex>
        {chooseType === "NFT" ? contentNFT : contentCredit}
      </Flex>
      {/* success */}
      <BaseModal
        isShow={showSuccess}
        close={() => {
          setShowSuccess.off();
          router.push("/games");
        }}
        w={{ base: `calc(100% - ${px2vw(30)})`, lg: "454px" }}
        h={{ base: "400px", lg: "430px" }}
      >
        <Flex flexDir="column" alignItems="center" boxSizing="border-box">
          <Image
            src={buySuccess}
            w={{ base: px2vw(187), lg: "210px" }}
            h={{ base: px2vw(139), lg: "156px" }}
            mb={{ base: px2vw(25), lg: "30px" }}
          />
          <Text
            fontFamily="Orbitron"
            fontWeight="600"
            color="white.100"
            textAlign="center"
            textStyle={{ base: "18", lg: "22" }}
            lineHeight={{ base: px2vw(23), lg: "28px" }}
            mb={{ base: px2vw(15), lg: "20px" }}
          >
            Your transaction is on the way!
          </Text>
          <Text
            fontFamily="Nunito"
            fontWeight="400"
            color="white.500"
            textStyle="16"
            textAlign="center"
            lineHeight={{ base: px2vw(22), lg: "22px" }}
            mb={{ base: px2vw(25), lg: "30px" }}
          >
            Your sent
            <Box color="green.100" display="inline-block" mx="5px">
              1,2 Gemifly token (12 TRX)
            </Box>
            to the Gamifly Wallet.
          </Text>
          <Flex w="full" justifyContent="space-between">
            <BaseButton
              w={{ base: px2vw(140), lg: "190px" }}
              border="1px solid"
              borderColor="blue.100"
              bgColor="transparent"
              boxShadow="none"
              onClick={() => {
                setShowSuccess.off();
                router.push("/games");
              }}
            >
              Cancel
            </BaseButton>
            <BaseButton
              w={{ base: px2vw(140), lg: "190px" }}
              onClick={() => {
                setShowSuccess.off();
                router.push("/games");
              }}
            >
              View details
            </BaseButton>
          </Flex>
        </Flex>
      </BaseModal>
    </Flex>
  );
}

export const getServerSideProps = async (ctx: GetI18nServerSideProps) => {
  return {
    props: { ...(await getI18nSSRProps(ctx, ["home"])) },
  };
};
export default App;
