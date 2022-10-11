import React from "react";
import { Flex, Image, FlexProps } from "@chakra-ui/react";
import px2vw from "@/utils/px2vw";
import topSeller from "@/assets/imgs/topSeller.png";

export interface IProps extends FlexProps {
  img?: string;
}

function Index({ img, children, ...prop }: IProps) {
  return (
    <Flex
      flexDir={{ base: "column", lg: "row" }}
      w={{ base: "full", lg: "800px" }}
      h={{ base: "max-content", lg: "310px" }}
      pt={{ base: 0, lg: "6px" }}
      px={{ base: 0, lg: "6px" }}
      pb={{ base: px2vw(20), lg: "6px" }}
      borderRadius={{ base: px2vw(15), lg: "15px" }}
      boxSizing="border-box"
      bgColor="green.1000"
      {...prop}
    >
      <Image
        src={img || topSeller}
        w={{ base: "full", lg: "66.66%" }}
        h={{ base: px2vw(225), lg: "calc(100% - 10px)" }}
        mr={{ base: 0, lg: "27px" }}
        mb={{ base: px2vw(16), lg: 0 }}
        mt={{ base: px2vw(-1), lg: 0 }}
      />
      {children}
    </Flex>
  );
}

export default React.memo(Index);
