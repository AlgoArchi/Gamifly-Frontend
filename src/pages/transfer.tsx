import React, { useMemo, useState } from "react";
import { Flex, Text, Image, useBoolean } from "@chakra-ui/react";
import { getI18nSSRProps, GetI18nServerSideProps } from "@/utils/i18n";
import px2vw from "@/utils/px2vw";
// import arrows from "@/assets/imgs/arrows.png";
import featuresIcon from "@/assets/imgs/featuresIcon.png";
// import Step1 from "@/components/Transfer/Step1";
import Withdraw from "@/components/Transfer/Withdraw";
import Deposit from "@/components/Transfer/Deposit";
import BaseButton from "@/components/BaseButton";
import buySuccess from "@/assets/imgs/buySuccess.png";
import BaseModal from "@/components/BaseModal";
import TransferStep3 from "@/components/Transfer/TransferStep3";
import TransferStep4 from "@/components/Transfer/TransferStep4";

function App() {
  const [step, setStep] = useState(1); // 步骤
  const [chooseType, setChooseType] = useState("Deposit"); // Deposit / Withdraw
  const [paymentMethod] = useState(3); // 支付类型
  const [totalPrice] = useState(0); // 总价格
  // const [priceUnit] = useState("GMF"); // 总价格
  const [transferVal, setTransferVal] = useState("0");
  const [hash, setHash] = useState("");
  const [showSuccess, setShowSuccess] = useBoolean(false);
  const [step2Val, setStep2Val] = useState("");
  const [gmfVal, setGmfVal] = useState("");

  const contentDeposit = useMemo(() => {
    return (
      <Deposit
        // totalPrice={totalPrice}
        // paymentMethod={paymentMethod}
        // setPaymentMethod={(type: number) => setPaymentMethod(type)}
        // success={(val: string, hash: string) => {
        //   setTransferVal(val);
        //   setHash(hash);
        //   setShowSuccess.on();
        // }}
        backClick={() => setStep(1)}
        confirmClick={(val: string, gmfVal: string) => {
          setStep2Val(val);
          setGmfVal(gmfVal);
          setStep(3);
        }}
      />
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paymentMethod, totalPrice]);

  const contentWithdraw = useMemo(() => {
    return (
      <Withdraw
        // totalPrice={totalPrice}
        // priceUnit={priceUnit}
        // success={(hash: string, val: string) => {
        //   setTransferVal(val);
        //   setHash(hash);
        //   setShowSuccess.on();
        // }}

        backClick={() => setStep(1)}
        confirmClick={(val: string) => {
          setStep2Val(val);
          setStep(3);
        }}
      />
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paymentMethod, totalPrice]);

  return (
    <Flex
      w="full"
      flexDir="column"
      minH="100vh"
      pt={{ base: px2vw(110), lg: "200px" }}
    >
      {/* Title */}
      <Flex justifyContent="center" mb={{ base: px2vw(30), lg: "30px" }}>
        <Text
          fontSize={{ base: px2vw(23), lg: "35px" }}
          lineHeight={{ base: px2vw(23), lg: "35px" }}
          mt={{ base: px2vw(5), lg: "5px" }}
          fontFamily="Eurostile"
          fontWeight="700"
          color="white.100"
        >
          TOP UP & WITHDRAW
        </Text>
        <Image
          src={featuresIcon}
          w={{ base: px2vw(30), lg: "30px" }}
          h={{ base: px2vw(23), lg: "23px" }}
          ml={{ base: px2vw(5), lg: "5px" }}
          mt={{ base: px2vw(5), lg: "5px" }}
        />
      </Flex>
      <Flex flexDir="column" alignItems="center">
        {/* step1 */}
        <Flex
          display={step === 1 ? "flex" : "none"}
          w={{ base: "full", lg: "496px" }}
          h={{ base: "fit-content", lg: "480px" }}
          py={{ base: px2vw(25), lg: "30px" }}
          px={{ base: px2vw(25), lg: "60px" }}
          flexDir="column"
          alignItems="center"
          border="1px solid"
          borderColor="black.1800"
          borderRadius="40px"
          boxSizing="border-box"
        >
          <Text fontFamily="SofiaPro" textStyle="14" color="gray.500" mr="auto">
            Step 1/4
          </Text>
          <Text
            fontFamily="SofiaPro"
            fontWeight="600"
            color="white.100"
            mr="auto"
            fontSize={{ base: px2vw(21), lg: "21px" }}
            lineHeight={{ base: px2vw(40), lg: "40px" }}
            mb={{ base: px2vw(25), lg: "35px" }}
          >
            Select types of Transfer
          </Text>
          {/* Withdraw */}
          <Flex
            h={{ base: px2vw(60), lg: "80px" }}
            py={{ base: px2vw(0), lg: "12px" }}
            px={{ base: px2vw(15), lg: "25px" }}
            bgColor={chooseType === "Withdraw" ? "blue.300" : "gray.600"}
            color={chooseType === "Withdraw" ? "white.100" : "blue.300"}
            borderRadius={{ base: "15px", lg: "20px" }}
            w="full"
            boxSizing="border-box"
            justifyContent="space-between"
            fontFamily="SofiaPro"
            cursor="pointer"
            onClick={() => setChooseType("Withdraw")}
          >
            {/* text */}
            <Flex flexDir="column">
              <Text
                fontWeight="700"
                textStyle={{ base: "16", lg: "18" }}
                lineHeight={{ base: px2vw(30), lg: "30px" }}
              >
                Withdraw Cash
              </Text>
              <Text
                fontWeight="500"
                textStyle="12"
                lineHeight={{ base: px2vw(12), lg: "22px" }}
              >
                Cash that you win and can withdraw any time
              </Text>
            </Flex>
            {/* button */}
            <Flex
              w={{ base: px2vw(18), lg: "30px" }}
              h={{ base: px2vw(18), lg: "30px" }}
              bgColor={
                chooseType === "Withdraw"
                  ? "rgba(81, 81, 81, 0.3)"
                  : "rgba(81, 81, 81, 0.1)"
              }
              borderRadius="5px"
              my="auto"
            ></Flex>
          </Flex>
          {/* Deposit */}
          <Flex
            h={{ base: px2vw(60), lg: "80px" }}
            py={{ base: px2vw(0), lg: "12px" }}
            px={{ base: px2vw(15), lg: "25px" }}
            mt={{ base: px2vw(20), lg: "35px" }}
            mb={{ base: px2vw(60), lg: "60px" }}
            bgColor={chooseType === "Deposit" ? "blue.300" : "gray.600"}
            color={chooseType === "Deposit" ? "white.100" : "blue.300"}
            borderRadius={{ base: "15px", lg: "20px" }}
            w="full"
            boxSizing="border-box"
            justifyContent="space-between"
            fontFamily="SofiaPro"
            cursor="pointer"
            onClick={() => setChooseType("Deposit")}
          >
            {/* text */}
            <Flex flexDir="column">
              <Text
                fontWeight="700"
                textStyle={{ base: "16", lg: "18" }}
                lineHeight={{ base: px2vw(30), lg: "30px" }}
                mt={{ base: px2vw(5), lg: 0 }}
              >
                Deposit Cash
              </Text>
              <Text
                fontWeight="500"
                textStyle="12"
                lineHeight={{ base: px2vw(12), lg: "22px" }}
              >
                Cash that you add to your Gamifly wallet!
              </Text>
            </Flex>
            {/* button */}
            <Flex
              w={{ base: px2vw(18), lg: "30px" }}
              h={{ base: px2vw(18), lg: "30px" }}
              bgColor={
                chooseType === "Deposit"
                  ? "rgba(81, 81, 81, 0.3)"
                  : "rgba(81, 81, 81, 0.1)"
              }
              borderRadius="5px"
              my="auto"
            ></Flex>
          </Flex>
          {/* button */}
          <Flex
            w={{ base: px2vw(118), lg: "160px" }}
            h={{ base: px2vw(40), lg: "50px" }}
            fontSize={{ base: px2vw(14), lg: "17px" }}
            borderRadius="5px"
            justifyContent="center"
            alignItems="center"
            fontFamily="Eurostile"
            fontWeight="bold"
            color="black.1600"
            bgColor="green.1000"
            ml="auto"
            cursor="pointer"
            onClick={() => setStep(2)}
          >
            <Text mt={{ base: px2vw(5), lg: "5px" }}>CONTINUE</Text>
          </Flex>
        </Flex>
        {chooseType === "Deposit" && step === 2 && contentDeposit}
        {chooseType === "Withdraw" && step === 2 && contentWithdraw}
        {step === 3 && (
          <TransferStep3
            chooseType={chooseType}
            inputVal={step2Val}
            gmfVal={gmfVal}
            backClick={(type: string) => {
              setChooseType(type);
              setStep(2);
            }}
            confirmClick={() => setStep(4)}
          />
        )}
        {step === 4 && <TransferStep4 inputVal={step2Val} gmfVal={gmfVal} />}
      </Flex>
      {/* success */}
      <BaseModal
        justifyContent="center"
        px={{ base: px2vw(44), lg: "70px" }}
        isShow={showSuccess}
        close={() => {
          setShowSuccess.off();
          setStep(1);
        }}
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
          <Flex
            w="full"
            flexWrap="wrap"
            justifyContent="center"
            fontFamily="Nunito"
            fontWeight="400"
            color="white.500"
            textStyle="16"
            textAlign="center"
            lineHeight={{ base: px2vw(22), lg: "22px" }}
            mb={{ base: px2vw(25), lg: "30px" }}
          >
            <Text display="inline-block">Your sent</Text>
            {chooseType === "Deposit" ? (
              <Text color="green.100" display="inline-block" mx="5px">
                {transferVal} gamilfy token ({transferVal} GMF)
              </Text>
            ) : (
              <Text color="green.100" display="inline-block" mx="5px">
                {transferVal} USDC
              </Text>
            )}
            <Text display={chooseType === "Deposit" ? "inline-block" : "none"}>
              to the Gamifly Account.
            </Text>
          </Flex>
          <Flex w="full" justifyContent="space-between">
            <BaseButton
              w={{ base: px2vw(140), lg: "190px" }}
              border="1px solid"
              borderColor="blue.100"
              bgColor="transparent"
              boxShadow="none"
              onClick={() => {
                setShowSuccess.off();
                setStep(1);
                setChooseType("Deposit");
                setHash("");
                setTransferVal("0");
              }}
            >
              Cancel
            </BaseButton>
            <BaseButton
              w={{ base: px2vw(140), lg: "190px" }}
              onClick={() => {
                setShowSuccess.off();
                setStep(1);
                setChooseType("Deposit");
                setHash("");
                setTransferVal("0");
                window.open(`https://polygonscan.com/tx/${hash}`);
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
