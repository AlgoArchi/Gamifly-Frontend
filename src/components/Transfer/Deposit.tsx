import React, { useEffect, useState } from "react";
import { Flex, Text, Image, useBoolean, useToast } from "@chakra-ui/react";
import px2vw from "@/utils/px2vw";
import copySuccessIcon from "@/assets/imgs/copySuccess.png";
import logoIcon from "@/assets/imgs/logoIcon.png";
import { switchNetwork } from "@/connect/wallet";
import { setStore } from "@/utils/storage";
import { connectorLocalStorageKey, injected } from "@/connect/connectors";
import globalStore from "@/stores/global";
import { useWeb3React } from "@web3-react/core";
import metamask from "@/assets/imgs/metamask.webp";

export interface IProps {
  // paymentMethod: number;
  // totalPrice?: number;
  // setPaymentMethod: (type: number) => void;
  // success: (val: string, hash: string) => void;
  backClick: () => void;
  confirmClick: (connectedAddress: string) => void;
}

function Index({ backClick, confirmClick }: IProps) {
  const toast = useToast();
  const { activate, chainId, account } = useWeb3React();
  const { userInfo } = globalStore();
  // const { library, account } = useWeb3React();
  const [connectedAddress, setConnectedAddress] = useState("");
  const [isConnected, setIsConnected] = useBoolean(false);

  const connectMetamask = async () => {
    // Connect wallet
    if (chainId !== 137) {
      const res = await switchNetwork(137);
      if (!res) {
        toast({
          title: `add network fail`,
          status: "error",
          isClosable: true,
        });
        return;
      } else if (res === "no metamask") {
        toast({
          title: `Please install the metamask wallet`,
          status: "error",
          isClosable: true,
        });
      }
    }
    // eslint-disable-next-line no-async-promise-executor
    new Promise<void>(async (resolve) => {
      try {
        await activate(injected, undefined, true);
        resolve();
      } catch (error) {
        console.log(error);
      }
    })
      .then(() => {
        setStore(connectorLocalStorageKey, "true");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    if (account) {
      setIsConnected.on();
    } else {
      setIsConnected.off();
    }
    // eslint-disable-next-line
  }, [account]);

  useEffect(() => {
    if (account) {
      setConnectedAddress(account);
    } // eslint-disable-next-line
  }, [account]);

  return (
    <Flex
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
        mb={{ base: "13px", lg: "13px" }}
      >
        {isConnected ? "You are connected" : "Connect with Metamask"}
      </Text>

      {/* Section 1 */}
      <Text
        fontFamily="SofiaPro"
        textStyle="14"
        color="gray.500"
        mr="auto"
        mb={{ base: "7px", lg: "7px" }}
      >
        Deposit from
      </Text>

      {/* address */}
      <Flex
        w={{ base: "full", lg: "full" }}
        px={{ base: "15px", lg: "15px" }}
        pb={{ base: "20px", lg: "20px" }}
        mb={{ base: "15px", lg: "15px" }}
        mr="auto"
        bgColor="black.100"
        borderRadius="8px"
        flexDir="column"
      >
        <Flex alignItems="center" mb={{ base: "10px", lg: "10px" }}>
          <Image
            src={metamask}
            w={{ base: "40px", lg: "40px" }}
            h={{ base: "40px", lg: "40px" }}
            mr={{ base: "3px", lg: "3px" }}
          />
          <Text
            fontFamily="SofiaPro"
            fontWeight="600"
            color="#BABABA"
            fontSize={{ base: px2vw(13), lg: "13px" }}
            lineHeight={{ base: px2vw(13), lg: "13px" }}
            mr={{ base: px2vw(10), lg: "10px" }}
          >
            {isConnected ? "Connected Metamask" : "Connect Metamask"}
          </Text>
        </Flex>
        {isConnected ? (
          <Flex
            px={{ base: "20px", lg: "20px" }}
            textAlign="center"
            justifyContent="space-between"
          >
            <Flex
              fontFamily="SofiaPro"
              fontWeight="600"
              color="#d9d9d9"
              fontSize={{ base: "15px", lg: "15px" }}
              lineHeight={{ base: "23px", lg: "23px" }}
              mr={{ base: px2vw(10), lg: "10px" }}
              flexDir="column"
            >
              <Text>Account Name</Text>
              <Text
                fontFamily="SofiaPro"
                color="#7ba52e"
                textDecor="underline"
                fontSize={{ base: "13px", lg: "13px" }}
                lineHeight={{ base: "13px", lg: "13px" }}
              >
                {`${connectedAddress?.substring(
                  0,
                  5
                )}...${connectedAddress?.substring(
                  connectedAddress.length - 4,
                  connectedAddress.length
                )}`}
              </Text>
            </Flex>
            <Flex
              fontFamily="SofiaPro"
              fontWeight="600"
              color="#d9d9d9"
              fontSize={{ base: "15px", lg: "15px" }}
              lineHeight={{ base: "23px", lg: "23px" }}
              mr={{ base: px2vw(10), lg: "10px" }}
              alignItems="center"
            >
              <Image
                src={copySuccessIcon}
                w={{ base: "13px", lg: "13px" }}
                h={{ base: "13px", lg: "13px" }}
                mr={{ base: "5px", lg: "5px" }}
              />
              <Text>Connected</Text>
            </Flex>
          </Flex>
        ) : (
          <Flex
            px={{ base: "20px", lg: "20px" }}
            mt={{ base: "25px", lg: "30px" }}
            mb={{ base: "25px", lg: "25px" }}
            textAlign="center"
            justifyContent="center"
          >
            <Text
              fontFamily="SofiaPro"
              fontWeight="600"
              color="#808080"
              fontSize={{ base: "15px", lg: "15px" }}
              lineHeight={{ base: "23px", lg: "23px" }}
              mr={{ base: px2vw(10), lg: "10px" }}
            >
              <Text>
                You haven&apos;t connected with Metamask yet. To deposit Gamifly
                Token and earn more, you need to connect with Metamask
              </Text>
            </Text>
          </Flex>
        )}
      </Flex>

      {/* Section 2 */}

      {isConnected && (
        <>
          <Text
            fontFamily="SofiaPro"
            textStyle="14"
            color="gray.500"
            mr="auto"
            mb={{ base: "7px", lg: "7px" }}
          >
            To
          </Text>
          <Flex
            w={{ base: "full", lg: "full" }}
            px={{ base: "15px", lg: "15px" }}
            pb={{ base: "20px", lg: "20px" }}
            mb={{ base: "15px", lg: "15px" }}
            mr="auto"
            bgColor="gray.800"
            borderRadius="8px"
            flexDir="column"
          >
            <Flex
              alignItems="center"
              mb={{ base: "10px", lg: "10px" }}
              mt={{ base: "10px", lg: "10px" }}
            >
              <Image
                src={logoIcon}
                w={{ base: "17px", lg: "17px" }}
                h={{ base: "17px", lg: "17px" }}
                mr={{ base: "10px", lg: "10px" }}
              />
              <Text
                fontFamily="SofiaPro"
                fontWeight="600"
                color="#BABABA"
                fontSize={{ base: px2vw(13), lg: "13px" }}
                lineHeight={{ base: px2vw(13), lg: "13px" }}
                mr={{ base: px2vw(10), lg: "10px" }}
              >
                My Gamifly Wallet
              </Text>
            </Flex>
            <Flex
              px={{ base: "20px", lg: "20px" }}
              textAlign="center"
              justifyContent="space-between"
              mt={{ base: "10px", lg: "10px" }}
            >
              <Flex
                fontFamily="SofiaPro"
                fontWeight="600"
                color="#d9d9d9"
                fontSize={{ base: "15px", lg: "15px" }}
                lineHeight={{ base: "23px", lg: "23px" }}
                mr={{ base: px2vw(10), lg: "10px" }}
                flexDir="column"
              >
                <Text>{userInfo?.name || "User Name"}</Text>
              </Flex>
              <Flex
                fontFamily="SofiaPro"
                fontWeight="600"
                color="#d9d9d9"
                fontSize={{ base: "15px", lg: "15px" }}
                lineHeight={{ base: "23px", lg: "23px" }}
                mr={{ base: px2vw(10), lg: "10px" }}
                alignItems="center"
              >
                <Text
                  fontFamily="SofiaPro"
                  color="#7ba52e"
                  textDecor="underline"
                  fontSize={{ base: "13px", lg: "13px" }}
                  lineHeight={{ base: "13px", lg: "13px" }}
                >
                  {`${userInfo?.platform_wallet?.substring(
                    0,
                    5
                  )}...${userInfo?.platform_wallet?.substring(
                    userInfo?.platform_wallet.length - 4,
                    userInfo?.platform_wallet.length
                  )}`}
                </Text>
              </Flex>
            </Flex>
          </Flex>
        </>
      )}

      {/* buttons */}
      <Flex w="full" justifyContent="space-between" mt="auto">
        {/* back */}
        <Flex
          w={{ base: "160px", lg: "160px" }}
          h={{ base: "50px", lg: "50px" }}
          border="1px solid"
          borderColor="green.1000"
          borderRadius="5px"
          justifyContent="center"
          alignItems="center"
          cursor="pointer"
          onClick={() => backClick()}
        >
          <Text
            fontSize={{ base: "17px", lg: "17px" }}
            fontFamily="Eurostile"
            fontWeight="bold"
            color="green.1000"
          >
            BACK
          </Text>
        </Flex>
        {/* confirm */}
        <Flex
          border="1px solid"
          borderRadius="5px"
          justifyContent="center"
          alignItems="center"
          cursor="pointer"
          w={{ base: "160px", lg: "160px" }}
          h={{ base: "50px", lg: "50px" }}
          bgColor="green.1000"
          borderColor="green.1000"
          onClick={() => {
            if (isConnected) {
              confirmClick(connectedAddress);
            } else {
              connectMetamask();
            }
          }}
        >
          <Text
            fontSize={
              isConnected
                ? { base: "15px", lg: "15px" }
                : { base: "13px", lg: "13px" }
            }
            fontFamily="Eurostile"
            textAlign="center"
            lineHeight="18px"
            fontWeight="bold"
            color="black.1600"
          >
            {isConnected ? "CONTINUE" : "CONNECT METAMASK"}
          </Text>
        </Flex>
      </Flex>
    </Flex>
  );
}

export default React.memo(Index);
