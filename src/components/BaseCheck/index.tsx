import React from "react";
import { Box, FlexProps } from "@chakra-ui/react";
import { CheckIcon } from "@chakra-ui/icons";
import px2vw from "@/utils/px2vw";

export interface IProps extends FlexProps {
  isActive: boolean;
  active?: () => void;
}

function Index({ isActive, ...prop }: IProps) {
  return (
    <Box
      w={{ base: px2vw(26), lg: "26px" }}
      h={{ base: px2vw(26), lg: "26px" }}
      mr={{ base: px2vw(20), lg: "20px" }}
      bgColor={isActive ? "green.100" : "transparent"}
      border="1px solid"
      borderColor="green.100"
      pos="relative"
      {...prop}
    >
      <CheckIcon
        display={isActive ? "block" : "none"}
        fontSize={{ base: px2vw(18), lg: "18px" }}
        color="white.100"
        m="auto"
        pos="absolute"
        top={0}
        right={0}
        bottom={0}
        left={0}
      />
    </Box>
  );
}

export default React.memo(Index);
