import React from "react";
import { Button, ButtonProps } from "@chakra-ui/react";

export interface IProps extends ButtonProps {
  children: any;
  buttonClick?: () => void;
}

function Index({ children, buttonClick, ...prop }: IProps) {
  return (
    <Button
      bgColor="blue.100"
      color="white.100"
      textStyle="16"
      w={{ base: "", lg: "195px" }}
      h={{ base: "", lg: "52px" }}
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
