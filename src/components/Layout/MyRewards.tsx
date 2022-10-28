import React, { useEffect, useState } from "react";
import { Text, Flex, Image, FlexProps, useToast } from "@chakra-ui/react";
import help from "@/assets/imgs/help.png";
import numberBg from "@/assets/imgs/numberBg.png";
import rewardLine from "@/assets/imgs/rewardLine.png";
import copyFunction from "copy-to-clipboard";
import { getStore } from "@/utils/storage";
import { getRewardAmount } from "@/apis/userInfo";
import useSWR from "swr";
import globalStore from "@/stores/global";

export interface IProps extends FlexProps {
  helpClick?: () => void;
}

function Index({ helpClick }: IProps) {
  const { userInfo } = globalStore();
  const [rewards, setRewards] = useState(0.0);
  const toast = useToast();
  const [showRewards, setShowRewards] = useState("00000");

  // 获取我的积分
  const { data: getRewardAmountData } = useSWR(
    userInfo && userInfo?.id ? [getRewardAmount.key] : null,
    (_) => getRewardAmount.fetcher(userInfo?.id),
    { revalidateOnFocus: false }
  );

  const NumberItm = React.memo(({ str }: { str: string }) => {
    return (
      <Flex
        bgImage={numberBg}
        w="27px"
        h="40px"
        bgSize="100%"
        justifyContent="center"
        alignItems="center"
        mr="3px"
      >
        <Text
          fontFamily="Krungthep"
          fontSize="27px"
          fontWeight="400"
          color={rewards === 0 ? "RGB(255, 255, 255, 0.29)" : "green.1000"}
        >
          {str}
        </Text>
      </Flex>
    );
  });

  useEffect(() => {
    if (rewards === 0) {
      setShowRewards(`000.00`);
    } else if (rewards < 10) {
      setShowRewards(`00${rewards.toFixed(2)}`);
    } else if (rewards < 100) {
      setShowRewards(`0${rewards.toFixed(2)}`);
    } else if (rewards > 999.99) {
      setShowRewards(`999.99`);
    } else {
      setShowRewards(`${rewards.toFixed(2)}`);
    }
  }, [rewards]);

  useEffect(() => {
    if (getRewardAmountData) {
      getRewardAmountData?.value === 0
        ? setRewards(0)
        : setRewards(getRewardAmountData?.value);
    }
  }, [getRewardAmountData]);

  return (
    <Flex
      display={{ base: "none", lg: "flex" }}
      w="286px"
      h="148px"
      pos="fixed"
      bottom="113px"
      right="0"
      bgColor="black.1900"
      border="1px solid"
      borderColor="green.1000"
      borderRadius="15px"
      borderRight="none"
      borderTopRightRadius="0"
      borderBottomRightRadius="0"
      flexDir="column"
      zIndex="99"
    >
      {/* rewards */}
      <Flex
        flexDir="column"
        alignItems="center"
        justifyContent="center"
        pt="8px"
        boxSizing="border-box"
      >
        {/* title */}
        <Flex
          w="full"
          justifyContent="space-between"
          px="15px"
          boxSizing="border-box"
          mb="17px"
        >
          <Image src={help} w="14px" h="14px" opacity="0" />
          <Text
            fontFamily="SofiaPro"
            fontSize="18px"
            fontWeight="600"
            lineHeight="22px"
            color="white.100"
          >
            My Rewards Earned
          </Text>
          <Image
            src={help}
            w="14px"
            h="14px"
            my="auto"
            cursor="pointer"
            onClick={() => helpClick?.()}
          />
        </Flex>
        {/* value */}
        <Flex mb="16px">
          <NumberItm str={showRewards[0]} />
          <NumberItm str={showRewards[1]} />
          <NumberItm str={showRewards[2]} />
          <Flex
            flexDir="column"
            justifyContent="flex-end"
            fontFamily="Krungthep"
            fontSize="27px"
            lineHeight="27px"
            fontWeight="400"
            color="green.1000"
            mx="5px"
          >
            <Text>.</Text>
          </Flex>
          <NumberItm str={showRewards[4]} />
          <NumberItm str={showRewards[5]} />
          <Text
            fontFamily="Krungthep"
            fontSize="13px"
            lineHeight="40px"
            fontWeight="400"
            color="green.1000"
            ml="9px"
          >
            USDC
          </Text>
        </Flex>
        {/* line */}
        <Image src={rewardLine} w="252px" h="1px" mx="auto" />
        {/* INVITE FRIENDS */}
        <Flex
          w="full"
          h="40px"
          justifyContent="center"
          alignItems="center"
          fontSize="17px"
          fontFamily="Eurostile"
          fontWeight="600"
          color="green.1000"
          cursor="pointer"
          onClick={() => {
            copyFunction(
              `https://www.gamifly.co?inviteCode=${getStore("referralCode")}`
            );
            toast({
              title: "referral link copy success",
              status: "success",
              duration: 3000,
              isClosable: true,
            });
          }}
        >
          <Text mt="5px">INVITE FRIENDS</Text>
        </Flex>
      </Flex>
    </Flex>
  );
}

export default React.memo(Index);
