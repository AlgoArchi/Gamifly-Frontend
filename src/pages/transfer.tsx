import React, { useMemo, useState, useEffect } from "react";
import { Flex, Text, Image, useBoolean, useToast } from "@chakra-ui/react";
import { getI18nSSRProps, GetI18nServerSideProps } from "@/utils/i18n";
import px2vw from "@/utils/px2vw";
// import arrows from "@/assets/imgs/arrows.png";
import featuresIcon from "@/assets/imgs/featuresIcon.png";
import depositBackground from "@/assets/imgs/deposit.png";
import withdrawBackground from "@/assets/imgs/withdraw.png";
import withdrawButton from "@/assets/imgs/withdrawButton.png";
import depositButton from "@/assets/imgs/depositButton.png";
// import Step1 from "@/components/Transfer/Step1";
import Withdraw from "@/components/Transfer/Withdraw";
import Withdraw2 from "@/components/Transfer/Withdraw2";
import Deposit from "@/components/Transfer/Deposit";
import Deposit2 from "@/components/Transfer/Deposit2";
import BaseButton from "@/components/BaseButton";
import buySuccess from "@/assets/imgs/buySuccess.png";
import BaseModal from "@/components/BaseModal";
import TransferStep3 from "@/components/Transfer/TransferStep3";
import TransferStep4 from "@/components/Transfer/TransferStep4";
import globalStore from "@/stores/global";
import { useRouter } from "next/router";

function App() {
  const router = useRouter();
  const toast = useToast();
  const { userInfo } = globalStore();
  const [step, setStep] = useState(0); // 步骤
  const [chooseType, setChooseType] = useState(""); // Deposit / Withdraw
  const [paymentMethod] = useState(3); // 支付类型
  const [totalPrice] = useState(0); // 总价格
  // const [priceUnit] = useState("GMF"); // 总价格
  const [transferVal, setTransferVal] = useState("0");
  const [hash, setHash] = useState("");
  const [showSuccess, setShowSuccess] = useBoolean(false);
  const [step1Val, setStep1Val] = useState("");
  const [step2Val, setStep2Val] = useState("");
  const [gmfVal, setGmfVal] = useState("");

  useEffect(() => {
    if (userInfo.access_token == "" || userInfo.access_token == null) {
      router.push("/");
      toast({
        position: "top-right",
        title: "Please login first",
        status: "success",
        isClosable: true,
      });
    }
    // eslint-disable-next-line
  }, [userInfo?.access_token]);

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
        backClick={() => setStep(0)}
        confirmClick={(connectedAddress: string) => {
          setStep1Val(connectedAddress);
          setStep(2);
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

        backClick={() => setStep(0)}
        confirmClick={(val: string) => {
          setStep1Val(val);
          setStep(2);
        }}
      />
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paymentMethod, totalPrice]);

  const setType = (type: string) => {
    setChooseType(type);
    setStep(1);
  };

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
          textTransform="uppercase"
        >
          {step == 0 ? "TOP UP & WITHDRAW" : chooseType}
        </Text>
        <Image
          src={featuresIcon}
          w={{ base: px2vw(30), lg: "30px" }}
          h={{ base: px2vw(23), lg: "23px" }}
          ml={{ base: px2vw(5), lg: "5px" }}
          mt={{ base: px2vw(5), lg: "5px" }}
        />
      </Flex>

      <Flex w="full" alignItems="center" justifyContent="center">
        {/* Opetion choose */}
        <Flex
          display={step === 0 ? "flex" : "none"}
          w="full"
          flexDir={{ base: "column", lg: "row" }}
          alignItems="center"
          justifyContent="center"
          mt={{ base: px2vw(30), lg: "30px" }}
        >
          {/* Withdraw option */}
          <Flex
            h={{ base: "319px", lg: "319px" }}
            w={{ base: "437px", lg: "437px" }}
            mb={{ base: px2vw(20), lg: 0 }}
            mr={{ base: 0, lg: "25px" }}
            px={{ base: "15px", lg: "15px" }}
            py={{ base: "10px", lg: "10px" }}
            justifyContent="center"
            flexDir="column"
            alignItems="center"
            bgImage={withdrawBackground}
            bgSize="full"
            textAlign="center"
          >
            <Text
              fontFamily="Eurostile"
              fontWeight="900"
              fontSize={{ base: "35px", lg: "35px" }}
              lineHeight={{ base: "25px", lg: "25px" }}
              mb={{ base: "40px", lg: "40px" }}
              mt={{ base: "35px", lg: "35px" }}
              pr={{ base: "5px", lg: "5px" }}
              textAlign="center"
              bgGradient="linear(to-l, #7928CA, #FF0080)"
              bgClip="text"
              fontStyle="italic"
            >
              NO LIMIT
            </Text>
            <Text
              fontFamily="Eurostile"
              fontWeight="900"
              fontSize={{ base: "35px", lg: "35px" }}
              lineHeight={{ base: "25px", lg: "25px" }}
              mb={{ base: "50px", lg: "50px" }}
              pr={{ base: "5px", lg: "5px" }}
              bgGradient="linear(to-l, #7928CA, #FF0080)"
              bgClip="text"
              fontStyle="italic"
            >
              NO HIDDEN FEE
            </Text>
            <Text
              fontFamily="SofiaPro"
              fontWeight="600"
              color="white.100"
              h={{ base: "35px", lg: "35px" }}
              w={{ base: "150px", lg: "150px" }}
              px={{ base: "15px", lg: "15px" }}
              pt={{ base: "7px", lg: "7px" }}
              fontSize={{ base: "14px", lg: "14px" }}
              lineHeight={{ base: "30px", lg: "30px" }}
              bgImage={withdrawButton}
              bgSize={{ base: "150px", lg: "150px" }}
              cursor="pointer"
              onClick={() => setType("Withdraw")}
            >
              WITHDRAW NOW
            </Text>
          </Flex>

          {/* Deposit option */}
          <Flex
            h={{ base: "319px", lg: "319px", md: "319px", sm: "319px" }}
            w={{ base: "437px", lg: "437px", md: "437px", sm: "437px" }}
            mr={{ base: 0, lg: "25px" }}
            px={{ base: "15px", lg: "15px" }}
            py={{ base: "10px", lg: "10px" }}
            flexDir="column"
            alignItems="center"
            boxSizing="border-box"
            bgImage={depositBackground}
            justifyContent="space-around"
          >
            {/* Description */}
            <Flex mb={{ base: "-30px", lg: "-30px" }}>
              {/* Title description */}
              <Flex
                flexDir="column"
                px={{ base: "15px", lg: "15px" }}
                pt={{ base: "7px", lg: "7px" }}
                justifyContent="space-between"
              >
                <Text
                  fontFamily="SofiaPro"
                  fontWeight="600"
                  color="green.1000"
                  fontSize={{ base: "14px", lg: "14px" }}
                  lineHeight={{ base: "30px", lg: "30px" }}
                  py={{ base: "7px", lg: "7px" }}
                >
                  FIRST TIME DEPOSIT
                </Text>
                <Text
                  fontFamily="SofiaPro"
                  fontWeight="600"
                  color="green.1000"
                  fontSize={{ base: "14px", lg: "14px" }}
                  lineHeight={{ base: "30px", lg: "30px" }}
                  py={{ base: "7px", lg: "7px" }}
                >
                  $5 Deposit
                </Text>
                <Text
                  fontFamily="SofiaPro"
                  fontWeight="600"
                  color="green.1000"
                  fontSize={{ base: "14px", lg: "14px" }}
                  lineHeight={{ base: "30px", lg: "30px" }}
                  py={{ base: "7px", lg: "7px" }}
                >
                  $10 Deposit
                </Text>
              </Flex>

              {/* Explanation */}
              <Flex
                flexDir="column"
                px={{ base: "15px", lg: "15px" }}
                pt={{ base: "7px", lg: "7px" }}
                textAlign="right"
              >
                <Text
                  fontFamily="SofiaPro"
                  fontWeight="600"
                  color="white.100"
                  fontSize={{ base: "14px", lg: "14px" }}
                  lineHeight={{ base: "30px", lg: "30px" }}
                  py={{ base: "7px", lg: "7px" }}
                >
                  FIRST TIME DEPOSIT
                </Text>
                <Text
                  fontFamily="SofiaPro"
                  fontWeight="600"
                  color="white.100"
                  fontSize={{ base: "14px", lg: "14px" }}
                  lineHeight={{ base: "30px", lg: "30px" }}
                  py={{ base: "7px", lg: "7px" }}
                >
                  $5 Deposit
                </Text>
                <Text
                  fontFamily="SofiaPro"
                  fontWeight="600"
                  color="white.100"
                  fontSize={{ base: "14px", lg: "14px" }}
                  lineHeight={{ base: "30px", lg: "30px" }}
                  py={{ base: "7px", lg: "7px" }}
                >
                  $10 Deposit
                </Text>
              </Flex>
            </Flex>

            {/* Deposit button */}
            <Text
              fontFamily="SofiaPro"
              fontWeight="600"
              color="black.100"
              h={{ base: "35px", lg: "35px" }}
              w={{ base: "150px", lg: "150px" }}
              px={{ base: "15px", lg: "15px" }}
              pt={{ base: "7px", lg: "7px" }}
              fontSize={{ base: "14px", lg: "14px" }}
              lineHeight={{ base: "30px", lg: "30px" }}
              bgImage={depositButton}
              bgSize={{ base: "150px", lg: "150px" }}
              cursor="pointer"
              onClick={() => setType("Deposit")}
            >
              DEPOSIT NOW
            </Text>
          </Flex>
        </Flex>
        {chooseType === "Deposit" && step === 1 && contentDeposit}
        {chooseType === "Withdraw" && step === 1 && contentWithdraw}

        {step === 2 && chooseType === "Withdraw" && (
          <Withdraw2
            withdrawAddress={step1Val}
            backClick={() => setStep(1)}
            confirmClick={(val: string, gmfVal: string) => {
              setStep2Val(val);
              setGmfVal(gmfVal);
              setStep(3);
            }}
          />
        )}

        {step === 2 && chooseType === "Deposit" && (
          <Deposit2
            connectedAddress={step1Val}
            backClick={() => setStep(1)}
            confirmClick={(val: string, gmfVal: string) => {
              setStep2Val(val);
              setGmfVal(gmfVal);
              setStep(3);
            }}
          />
        )}

        {step === 3 && (
          <TransferStep3
            chooseType={chooseType}
            address={step1Val}
            inputVal={step2Val}
            gmfVal={gmfVal}
            backClick={(type: string) => {
              setChooseType(type);
              setStep(2);
            }}
            confirmClick={() => setStep(4)}
          />
        )}
        {step === 4 && (
          <TransferStep4
            address={step1Val}
            chooseType={chooseType}
            inputVal={step2Val}
            gmfVal={gmfVal}
            backClick={() => setStep(0)}
          />
        )}
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
                setStep(0);
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
                setStep(0);
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
