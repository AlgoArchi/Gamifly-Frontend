import React from "react";
import { Flex, Image, Text, FlexProps } from "@chakra-ui/react";
import px2vw from "@/utils/px2vw";
import { touRakingItem, tournamentsItem } from "@/pages/tournaments";
import tournamentLine from "@/assets/imgs/tournamentLine.png";
import tournamentTime from "@/assets/imgs/tournamentTime.png";
import userProfile from "@/assets/imgs/userProfile.png";
import BaseButton from "../BaseButton";
import { useRouter } from "next/router";

export interface IProps extends FlexProps {
  item: tournamentsItem;
  isDetail?: boolean;
}

function Index({ item, isDetail, ...prop }: IProps) {
  const router = useRouter();
  return (
    <Flex
      w="full"
      h="max-content"
      bgColor="black.600"
      flexDir={{ base: "column", lg: "row" }}
      mb={{ base: px2vw(20), lg: "20px" }}
      borderRadius="6px"
      {...prop}
    >
      {/* TOURNAMENT */}
      <Flex flexDir="column" w={{ base: "full", lg: "75%" }}>
        {/* title */}
        <Flex
          px={{ base: px2vw(20), lg: "20px" }}
          h={{ base: px2vw(20), lg: "20px" }}
          w="full"
          alignItems="center"
          boxSizing="border-box"
          fontFamily="Orbitron"
          fontWeight="700"
          textStyle="14"
          bgColor="green.100"
          borderTopLeftRadius="6px"
        >
          TOURNAMENT
        </Flex>
        {/* content */}
        <Flex flexDir={{ base: "column", lg: "row" }}>
          {/* photo */}
          <Flex pos="relative">
            <Image
              src={`${window.imgUrl.gameUrl}${item.image}`}
              w={{ base: "full", lg: "240px" }}
              h={{ base: px2vw(190), lg: "310px" }}
              mr={{ base: 0, lg: "2px" }}
              borderBottomLeftRadius="6px"
            />
            <Image
              src={tournamentLine}
              w="2px"
              pos="absolute"
              left={{ base: "44.7%", lg: "240px" }}
              top={{ base: "18%", lg: "-1px" }}
              transform={{ base: "rotate(-90deg)", lg: "none" }}
              h={{ base: px2vw(310), lg: "310px" }}
            />
          </Flex>
          {/* info */}
          <Flex
            w={{ base: "full", lg: "calc(100% - 242px)" }}
            h={isDetail ? "max-content" : { base: px2vw(310), lg: "310px" }}
            p={{ base: `${px2vw(15)}`, lg: "20px 30px" }}
            flexDir="column"
            boxSizing="border-box"
          >
            <Text
              fontFamily="Orbitron"
              fontWeight="700"
              textStyle={{ base: "18", lg: "22" }}
              mb={{ base: px2vw(10), lg: "15px" }}
            >
              {item.title}
            </Text>
            {/* Time */}
            <Flex alignItems="flex-end" mb={{ base: px2vw(20), lg: "25px" }}>
              <Image
                src={tournamentTime}
                w={{ base: px2vw(12.36), lg: "12.36px" }}
                h={{ base: px2vw(19), lg: "19px" }}
                mr={{ base: px2vw(5), lg: "5px" }}
              />
              <Text
                fontFamily="Orbitron"
                fontWeight="700"
                textStyle={{ base: "14", lg: "16" }}
                color="green.100"
              >
                {item.time}
              </Text>
            </Flex>
            {/* description */}
            <Flex
              fontFamily="Nunito"
              fontWeight="400"
              textStyle="16"
              color="white.500"
              overflowY={isDetail ? "visible" : { base: "hidden", lg: "auto" }}
              lineHeight={{ base: px2vw(22), lg: "22px" }}
              mb={{ base: px2vw(20), lg: "40px" }}
              maxW={{ base: "full", lg: "542px" }}
              h={isDetail ? "max-content" : { base: px2vw(132), lg: "88px" }}
              dangerouslySetInnerHTML={{ __html: item.content }}
            />
            {/* buttons */}
            <Flex
              display={isDetail ? "none" : "flex"}
              justifyContent="space-between"
            >
              <BaseButton
                w={{ base: px2vw(150), lg: "195px" }}
                onClick={() => window.open(item?.link)}
              >
                Go
              </BaseButton>
              <BaseButton
                w={px2vw(150)}
                display={{ base: "block", lg: "none" }}
                border="1px solid"
                borderColor="blue.100"
                color="blue.100"
                bgColor="transparent"
                boxShadow="none"
                onClick={() => router.push(`/tournamentsDetail?id=${item.id}`)}
              >
                Detail
              </BaseButton>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
      {/* WINNERS */}
      <Flex
        display={isDetail ? "flex" : { base: "none", lg: "flex" }}
        flexDir="column"
        w={{ base: "full", lg: "25%" }}
      >
        {/* title */}
        <Flex
          px={{ base: px2vw(20), lg: "20px" }}
          h={{ base: px2vw(20), lg: "20px" }}
          w="full"
          alignItems="center"
          boxSizing="border-box"
          fontFamily="Orbitron"
          fontWeight="700"
          textStyle="14"
          bgColor="blue.100"
        >
          WINNERS
        </Flex>
        {/* info */}
        <Flex
          w="full"
          // h={{ base: "max-content", lg: "310px" }}
          overflowY={{ base: "visible", lg: "auto" }}
          flexDir="column"
          display={item.rank.length > 0 ? "flex" : "none"}
        >
          {/* header */}
          <Flex
            w="full"
            alignItems="center"
            fontFamily="Nunito"
            fontWeight="700"
            textStyle="14"
            color="white.300"
            h={{ base: px2vw(50), lg: "50px" }}
          >
            <Flex
              w={{ base: px2vw(234), lg: "190px" }}
              h={{ base: px2vw(50), lg: "50px" }}
              px={{ base: px2vw(20), lg: "20px" }}
              alignItems="center"
              boxSizing="border-box"
              bgColor="black.700"
            >
              User Name
            </Flex>
            <Flex
              w={{
                base: `calc(100% - ${px2vw(234)})`,
                lg: "calc(100% - 190px)",
              }}
              h={{ base: px2vw(50), lg: "50px" }}
              justifyContent="center"
              alignItems="center"
              boxSizing="border-box"
              bgColor="black.800"
              color="blue.100"
            >
              Score
            </Flex>
          </Flex>
          {/* list */}
          <Flex
            w="full"
            h={{ base: px2vw(260), lg: "260px" }}
            bgColor="black.600"
            flexDir="column"
          >
            {item.rank.map((item: touRakingItem, index: number) => (
              <Flex
                key={index}
                w="full"
                alignItems="center"
                fontFamily="Nunito"
                fontWeight="700"
                textStyle="14"
                color="white.100"
                h={{ base: px2vw(50), lg: "50px" }}
              >
                <Flex
                  w={{ base: px2vw(234), lg: "190px" }}
                  h={{ base: px2vw(50), lg: "50px" }}
                  px={{ base: px2vw(20), lg: "20px" }}
                  alignItems="center"
                  boxSizing="border-box"
                >
                  {item.rank}
                  <Image
                    src={item.avatar || userProfile}
                    w={{ base: px2vw(30), lg: "30px" }}
                    h={{ base: px2vw(30), lg: "30px" }}
                    mx={{ base: px2vw(10), lg: "10px" }}
                  />
                  {item.name}
                </Flex>
                <Flex
                  w={{
                    base: `calc(100% - ${px2vw(234)})`,
                    lg: "calc(100% - 190px)",
                  }}
                  h={{ base: px2vw(50), lg: "50px" }}
                  justifyContent="center"
                  alignItems="center"
                  boxSizing="border-box"
                  color="blue.100"
                  bgColor={index % 2 === 0 ? "black.700" : "black.1200"}
                >
                  {item.score}
                </Flex>
              </Flex>
            ))}
          </Flex>
        </Flex>
        {/* No information yet */}
        <Flex
          display={item.rank.length > 0 ? "none" : "flex"}
          justifyContent="center"
          alignItems="center"
          bgColor="black.600"
          fontFamily="Nunito"
          fontWeight="700"
          textStyle="14"
          color="white.300"
          w="full"
          h={{ base: px2vw(100), lg: "100px" }}
        >
          No information yet
        </Flex>
      </Flex>
    </Flex>
  );
}

export default React.memo(Index);
