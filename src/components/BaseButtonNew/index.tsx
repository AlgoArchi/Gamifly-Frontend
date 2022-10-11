import React from "react";
import { Button, ButtonProps, Flex } from "@chakra-ui/react";
import px2vw from "@/utils/px2vw";
import buttonBg from "@/assets/imgs/buttonBg.png";

export interface IProps extends ButtonProps {
  buttonClick?: () => void;
}

function Index({ children, buttonClick, ...prop }: IProps) {
  return (
    <Button
      w={{ base: px2vw(163), lg: "216px" }}
      h={{ base: px2vw(50), lg: "50px" }}
      bgColor="transparent"
      color="black.1700"
      fontSize="17px"
      fontWeight="bold"
      justifyContent="center"
      alignItems="center"
      bgSize="100%"
      boxShadow="none"
      bgImage={buttonBg}
      onClick={() => buttonClick && buttonClick()}
      _hover={{
        bgColor: "transparent",
        boxShadow: "none",
      }}
      _active={{
        bgColor: "transparent",
        boxShadow: "none",
      }}
      {...prop}
    >
      <Flex>{children}</Flex>
    </Button>
  );
}

export default React.memo(Index);
