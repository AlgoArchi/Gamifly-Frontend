import React from "react";
import { Flex, Text, Image, FlexProps } from "@chakra-ui/react";
import px2vw from "@/utils/px2vw";
import userProfile from "@/assets/imgs/userProfile.png";

export interface VipProp {
  place: number;
  amount: number | string;
  name: string;
  nft_count: number | string;
  avatar?: string;
}

export interface IProps extends FlexProps {
  list: VipProp[];
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
        bgColor="yellow.100"
      >
        <Text>VIP</Text>
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
            w={{ base: px2vw(130), lg: "130px" }}
            h={{ base: px2vw(50), lg: "50px" }}
            px={{ base: px2vw(20), lg: "20px" }}
            alignItems="center"
            boxSizing="border-box"
            bgColor="black.700"
          >
            Place
          </Flex>
          <Flex
            w={{ base: px2vw(262), lg: "262px" }}
            h={{ base: px2vw(50), lg: "50px" }}
            px={{ base: px2vw(20), lg: "20px" }}
            alignItems="center"
            boxSizing="border-box"
            bgColor="black.700"
          >
            User Name
          </Flex>
          <Flex
            w={{ base: px2vw(176), lg: "176px" }}
            h={{ base: px2vw(50), lg: "50px" }}
            justifyContent="center"
            alignItems="center"
            color="yellow.100"
            bgColor="black.500"
          >
            gamilfy tokens
          </Flex>
          <Flex
            w={{ base: px2vw(130), lg: "calc(100% - 568px)" }}
            h={{ base: px2vw(50), lg: "50px" }}
            px={{ base: px2vw(20), lg: "20px" }}
            justifyContent="flex-end"
            alignItems="center"
            boxSizing="border-box"
            bgColor="black.700"
          >
            NFT
          </Flex>
        </Flex>
        {/* list */}
        <Flex w={{ base: "max-content", lg: "full" }} flexDir="column">
          {list.map((item: VipProp, index: number) => (
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
                w={{ base: px2vw(130), lg: "130px" }}
                h={{ base: px2vw(50), lg: "50px" }}
                px={{ base: px2vw(20), lg: "20px" }}
                alignItems="center"
                boxSizing="border-box"
                bgColor={index % 2 === 0 ? "black.1500" : "black.600"}
              >
                {item.place}
              </Flex>
              <Flex
                w={{ base: px2vw(262), lg: "262px" }}
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
                w={{ base: px2vw(176), lg: "176px" }}
                h={{ base: px2vw(50), lg: "50px" }}
                justifyContent="center"
                alignItems="center"
                color="yellow.100"
                bgColor={index % 2 === 0 ? "black.1300" : "black.1400"}
              >
                {item.amount}
              </Flex>
              <Flex
                w={{ base: px2vw(130), lg: "calc(100% - 568px)" }}
                h={{ base: px2vw(50), lg: "50px" }}
                px={{ base: px2vw(20), lg: "20px" }}
                justifyContent="flex-end"
                alignItems="center"
                boxSizing="border-box"
                bgColor={index % 2 === 0 ? "black.1500" : "black.600"}
              >
                {item.nft_count}
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
