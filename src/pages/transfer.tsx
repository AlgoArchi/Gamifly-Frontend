import React, { useMemo, useState } from "react";
import { Flex, Text, Image, Box, useBoolean } from "@chakra-ui/react";
import { getI18nSSRProps, GetI18nServerSideProps } from "@/utils/i18n";
import px2vw from "@/utils/px2vw";
import arrows from "@/assets/imgs/arrows.png";
import Step1 from "@/components/Transfer/Step1";
import Withdraw from "@/components/Transfer/Withdraw";
import Deposit from "@/components/Transfer/Deposit";
import BaseButton from "@/components/BaseButton";
import buySuccess from "@/assets/imgs/buySuccess.png";
import BaseModal from "@/components/BaseModal";
import { useRouter } from "next/router";

function App() {
  const router = useRouter();
  const [step, setStep] = useState(1); // 步骤
  const [chooseType, setChooseType] = useState("Deposit"); // Deposit / Withdraw
  const [paymentMethod, setPaymentMethod] = useState(2); // 支付类型
  const [totalPrice] = useState(21.3); // 总价格
  const [priceUnit] = useState("TRX"); // 总价格
  const [showSuccess, setShowSuccess] = useBoolean(false);

  const contentDeposit = useMemo(() => {
    if (step === 1) {
      return (
        <Step1
          chooseType={chooseType}
          setChooseType={(type: string) => setChooseType(type)}
          continueClick={() => setStep(2)}
        />
      );
    } else {
      return (
        <Deposit
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
  }, [step, chooseType, paymentMethod, totalPrice]);

  const contentWithdraw = useMemo(() => {
    if (step === 1) {
      return (
        <Step1
          chooseType={chooseType}
          setChooseType={(type: string) => setChooseType(type)}
          continueClick={() => setStep(2)}
        />
      );
    } else {
      return (
        <Withdraw
          totalPrice={totalPrice}
          priceUnit={priceUnit}
          success={() => {
            setShowSuccess.on();
          }}
        />
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step, chooseType, paymentMethod, totalPrice]);

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
            <Text>2. Payment</Text>
          </Flex>
          {/* Progress */}
          <Box
            w="full"
            bgColor="green.600"
            pos="relative"
            h={{ base: px2vw(4), lg: "4px" }}
            _after={{
              content: "''",
              w: step === 1 ? "50%" : "100%",
              h: { base: px2vw(4), lg: "4px" },
              bgColor: "green.100",
              pos: "absolute",
              top: 0,
              left: 0,
            }}
          />
        </Flex>
        {chooseType === "Deposit" ? contentDeposit : contentWithdraw}
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
            <Text color="green.100" display="inline-block" mx="5px">
              1,2 Gemifly token (12 TRX)
            </Text>
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
