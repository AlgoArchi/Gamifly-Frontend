import React, { useEffect, useState } from "react";
import { Flex, FlexProps, Text } from "@chakra-ui/react";
import px2vw from "@/utils/px2vw";
import numberBg from "@/assets/imgs/numberBg.png";
// import { unitNumberFormat } from "@/utils/math";

export interface IProps extends FlexProps {
  usdc: number;
  monthlyViews: number;
}
function Index({ usdc, monthlyViews, ...props }: IProps) {
  // const [monthlyViews, setMonthlyViews] = useState(100000);
  const [gameList] = useState([
    {
      name: "Cricket Game",
      // url: "https://app.gamifly.co/games/cricket/index.html",
      url: "https://play.google.com/store/apps/details?id=com.alabs.cricket.scifi.league",
    },
    {
      name: "Footbal",
      url: "https://app.gamifly.co/games/bouncy_ball/index.html",
    },
    {
      name: "Tank",
      url: "https://app.gamifly.co/games/tank/index.html",
    },
  ]);
  const [showRewards, setShowRewards] = useState("00000");
  const NumberItm = React.memo(({ str }: { str: string }) => {
    return (
      <Flex
        bgImage={numberBg}
        w="22px"
        h="32px"
        bgSize="100%"
        justifyContent="center"
        alignItems="center"
        mr="3px"
      >
        <Text
          fontFamily="Krungthep"
          fontSize="22px"
          fontWeight="400"
          color={usdc === 0 ? "RGB(255, 255, 255, 0.29)" : "yellow.300"}
        >
          {str}
        </Text>
      </Flex>
    );
  });

  useEffect(() => {
    if (usdc === 0) {
      setShowRewards(`000.00`);
    } else if (usdc < 10) {
      setShowRewards(`00${usdc.toFixed(2)}`);
    } else if (usdc < 100) {
      setShowRewards(`0${usdc.toFixed(2)}`);
    } else if (usdc > 999.99) {
      setShowRewards(`999.99`);
    } else {
      setShowRewards(`${usdc.toFixed(2)}`);
    }
  }, [usdc]);

  // useInterval(() => {
  //   setMonthlyViews(monthlyViews + 1);
  // }, 1000);

  return (
    <Flex
      w={{ base: "full", lg: "260px" }}
      h={{ base: px2vw(265), lg: "310px" }}
      pt={{ base: px2vw(13), lg: "13px" }}
      pr={{ base: px2vw(16), lg: "13px" }}
      pb={{ base: px2vw(15), lg: "10px" }}
      pl={{ base: px2vw(16), lg: "18px" }}
      flexDir="column"
      bgGradient="linear(to-r, blue.400, purple.100)"
      borderRadius="15px"
      boxSizing="border-box"
      {...props}
    >
      {/* title */}
      <Text
        fontFamily="SofiaPro"
        fontWeight="600"
        color="white.100"
        mb={{ base: px2vw(10), lg: "10px" }}
        fontSize={{ base: px2vw(18), lg: "18px" }}
        lineHeight={{ base: px2vw(22), lg: "22px" }}
      >
        Top Games
      </Text>
      {/* game list */}
      <Flex
        justifyContent="space-between"
        flexWrap="wrap"
        mb={{ base: px2vw(10), lg: "10px" }}
      >
        {gameList.map((item, index) => {
          return (
            <Flex
              key={index}
              w={{ base: px2vw(150), lg: "full" }}
              h={{ base: px2vw(40), lg: "40px" }}
              mb={{ base: px2vw(8), lg: "10px" }}
              px={{ base: px2vw(8), lg: "11px" }}
              justifyContent="space-between"
              alignItems="center"
              borderRadius="5px"
              bgColor="black.100"
              boxSizing="border-box"
              cursor="pointer"
              onClick={() => window.open(item?.url)}
            >
              <Flex
                fontFamily="Eurostile"
                fontWeight="400"
                color="green.1000"
                fontSize={{ base: px2vw(17), lg: "17px" }}
              >
                <Text mt="5px" mr={{ base: px2vw(5), lg: "10px" }}>
                  {index + 1}
                </Text>
                <Text mt="5px">{item?.name}</Text>
              </Flex>
              {/* <Image
                src={rightIcon}
                w={{ base: px2vw(17), lg: "17px" }}
                h={{ base: px2vw(18), lg: "18px" }}
              /> */}
            </Flex>
          );
        })}
      </Flex>
      {/* sub title */}
      <Text
        fontFamily="SofiaPro"
        fontWeight="600"
        color="white.100"
        mb={{ base: px2vw(10), lg: "15px" }}
        fontSize={{ base: px2vw(18), lg: "18px" }}
        lineHeight={{ base: px2vw(22), lg: "22px" }}
      >
        World’s Top Earning
      </Text>
      {/* USDC */}
      <Flex mb={{ base: px2vw(10), lg: "10px" }}>
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
          color="yellow.300"
          mx="5px"
        >
          <Text>.</Text>
        </Flex>
        <NumberItm str={showRewards[4]} />
        <NumberItm str={showRewards[5]} />
        <Text
          fontFamily="Krungthep"
          fontSize="13px"
          lineHeight="32px"
          fontWeight="400"
          color="yellow.300"
          ml="9px"
        >
          USDC
        </Text>
      </Flex>
      {/* MonthlyViews */}
      <Flex
        justifyContent="space-between"
        fontFamily="Eurostile"
        fontWeight="400"
        color="yellow.300"
        fontSize={{ base: px2vw(13), lg: "13px" }}
      >
        <Text>Visits:</Text>
        <Text>{monthlyViews}K</Text>
      </Flex>
    </Flex>
  );
}

export default React.memo(Index);
