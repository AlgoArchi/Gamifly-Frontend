import React from "react";
import { Flex, FlexProps, Image } from "@chakra-ui/react";
import px2vw from "@/utils/px2vw";
import closeIcon from "@/assets/imgs/close.png";

export interface IProps extends FlexProps {
  children: any;
  isShow: boolean;
  withOutClose?: boolean;
  withOutOverlay?: boolean;
  close: () => void;
}

function Index({
  children,
  isShow,
  withOutClose,
  withOutOverlay,
  close,
  ...prop
}: IProps) {
  return (
    <Flex
      w="full"
      h="full"
      pos="fixed"
      top="0"
      left="0"
      justifyContent="center"
      zIndex={2}
      display={isShow ? "flex" : "none"}
      bgColor={withOutOverlay ? "transparent" : "black.500"}
      onClick={() => close?.()}
    >
      <Flex
        w={{ base: `calc(100% - ${px2vw(30)})`, lg: "454px" }}
        h={{ base: "456px", lg: "524px" }}
        p={{ base: px2vw(25), lg: "30px" }}
        flexDirection="column"
        pos="relative"
        m="auto"
        bgColor="black.100"
        boxShadow="0px 2px 26px #3D50FF"
        overflow="auto"
        onClick={(e) => e.stopPropagation()}
        {...prop}
      >
        {!withOutClose && (
          <Image
            src={closeIcon}
            pos="absolute"
            cursor="pointer"
            w={{ base: px2vw(18), lg: "18px" }}
            h={{ base: px2vw(18), lg: "18px" }}
            top={{ base: px2vw(20), lg: "20px" }}
            right={{ base: px2vw(20), lg: "20px" }}
            onClick={() => close?.()}
          />
        )}
        {children}
      </Flex>
    </Flex>
  );
}

export default React.memo(Index);
