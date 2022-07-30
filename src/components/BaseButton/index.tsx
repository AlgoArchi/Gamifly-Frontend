import React from "react";
import { Button, ButtonProps } from "@chakra-ui/react";
import px2vw from "@/utils/px2vw";

export interface IProps extends ButtonProps {
  buttonClick?: () => void;
}

function Index({ children, buttonClick, ...prop }: IProps) {
  return (
    <Button
      bgColor="blue.100"
      color="white.100"
      textStyle="16"
      w={{ base: px2vw(195), lg: "195px" }}
      h={{ base: px2vw(52), lg: "52px" }}
      borderRadius="6px"
      onClick={() => buttonClick && buttonClick()}
      _hover={{
        bgColor: "blue.100",
        color: "white.100",
        boxShadow: "0px 2px 50px #3d50ff",
      }}
      _active={{
        bgColor: "blue.100",
        color: "white.100",
        boxShadow: "0px 2px 26px #3d50ff",
      }}
      {...prop}
    >
      {children}
    </Button>
  );
}

export default React.memo(Index);
