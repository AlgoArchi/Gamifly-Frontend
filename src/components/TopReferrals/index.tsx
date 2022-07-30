import React from "react";
import { Flex, Text, Image, FlexProps } from "@chakra-ui/react";
import px2vw from "@/utils/px2vw";
import userProfile from "@/assets/imgs/userProfile.png";

export interface TopReferralsProp {
  place: number | string;
  name: string;
  referral_count: number | string;
  avatar?: string;
}

export interface IProps extends FlexProps {
  list: TopReferralsProp[];
}

function Index({ list, ...prop }: IProps) {
  return (
    <Flex
      flexDir="column"
      w="full"
      borderRadius="6px"
      overflow="hidden"
      {...prop}
    >
      <Flex
        h={{ base: px2vw(20), lg: "20px" }}
        px={{ base: px2vw(20), lg: "20px" }}
        w="full"
        alignItems="center"
        boxSizing="border-box"
        fontFamily="Orbitron"
        fontWeight="700"
        textStyle="14"
        bgColor="blue.100"
      >
        <Text>TOP REFERRALS</Text>
      </Flex>
      <Flex
        w="full"
        overflowX="auto"
        flexDir="column"
        display={list.length > 0 ? "flex" : "none"}
      >
        {/* header */}
        <Flex
          w={{ base: "max-content", lg: "full" }}
          alignItems="center"
          fontFamily="Nunito"
          fontWeight="700"
          textStyle="14"
          color="white.300"
          h={{ base: px2vw(50), lg: "50px" }}
        >
          <Flex
            w={{ base: px2vw(80), lg: "105px" }}
            h={{ base: px2vw(50), lg: "50px" }}
            px={{ base: px2vw(20), lg: "20px" }}
            alignItems="center"
            boxSizing="border-box"
            bgColor="black.700"
          >
            Place
          </Flex>
          <Flex
            w={{ base: px2vw(160), lg: "212px" }}
            h={{ base: px2vw(50), lg: "50px" }}
            px={{ base: px2vw(20), lg: "20px" }}
            alignItems="center"
            boxSizing="border-box"
            bgColor="black.700"
          >
            User Name
          </Flex>
          <Flex
            w={{ base: px2vw(103), lg: "calc(100% - 317px)" }}
            h={{ base: px2vw(50), lg: "50px" }}
            pr={{ base: px2vw(20), lg: "20px" }}
            justifyContent="flex-end"
            alignItems="center"
            boxSizing="border-box"
            bgColor="black.800"
            color="blue.100"
          >
            <Text w={{ base: px2vw(50), lg: "auto" }}>Invited friends</Text>
          </Flex>
        </Flex>
        {/* list */}
        <Flex w={{ base: "max-content", lg: "full" }} flexDir="column">
          {list.map((item: TopReferralsProp, index: number) => (
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
                w={{ base: px2vw(80), lg: "105px" }}
                h={{ base: px2vw(50), lg: "50px" }}
                px={{ base: px2vw(20), lg: "20px" }}
                alignItems="center"
                boxSizing="border-box"
                bgColor={index % 2 === 0 ? "black.1500" : "black.600"}
              >
                {item.place}
              </Flex>
              <Flex
                w={{ base: px2vw(160), lg: "212px" }}
                h={{ base: px2vw(50), lg: "50px" }}
                px={{ base: px2vw(20), lg: "20px" }}
                alignItems="center"
                boxSizing="border-box"
                bgColor={index % 2 === 0 ? "black.1500" : "black.600"}
              >
                <Image
                  borderRadius="50%"
                  src={
                    item.avatar
                      ? `${window.imgUrl.imageUrl}${item.avatar}`
                      : userProfile
                  }
                  w={{ base: px2vw(30), lg: "30px" }}
                  h={{ base: px2vw(30), lg: "30px" }}
                  mr={{ base: px2vw(10), lg: "10px" }}
                />
                {item.name}
              </Flex>
              <Flex
                w={{ base: px2vw(103), lg: "calc(100% - 317px)" }}
                h={{ base: px2vw(50), lg: "50px" }}
                px={{ base: px2vw(20), lg: "20px" }}
                justifyContent="flex-end"
                alignItems="center"
                boxSizing="border-box"
                color="blue.100"
                bgColor={index % 2 === 0 ? "black.700" : "black.1200"}
              >
                {item.referral_count}
              </Flex>
            </Flex>
          ))}
        </Flex>
      </Flex>
      {/* No information yet */}
      <Flex
        display={list.length > 0 ? "none" : "flex"}
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
  );
}

export default React.memo(Index);
