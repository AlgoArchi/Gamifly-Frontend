import React from "react";
import { Flex, FlexProps, Image } from "@chakra-ui/react";
import px2vw from "@/utils/px2vw";
import closeIcon from "@/assets/imgs/close.png";
import baseModal from "@/assets/imgs/baseModal.png";
import baseModalMobile from "@/assets/imgs/baseModalMobile.png";

export interface IProps extends FlexProps {
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
      h="100vh"
      pos="fixed"
      top="0"
      left="0"
      flexDir="column"
      justifyContent={{ base: "flex-end", lg: "center" }}
      alignItems="center"
      zIndex={99}
      display={isShow ? "flex" : "none"}
      bgColor={withOutOverlay ? "transparent" : "black.500"}
      onClick={() => close?.()}
    >
      <Flex
        w={{ base: "full", lg: "532px" }}
        h={{ base: "643px", lg: "532px" }}
        p={{ base: px2vw(25), lg: "30px" }}
        bgImage={{ base: baseModalMobile, lg: baseModal }}
        bgSize="100%"
        flexDirection="column"
        pos="relative"
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
            top={{ base: px2vw(32), lg: "57px" }}
            right={{ base: px2vw(27), lg: "57px" }}
            opacity={{ base: 1, lg: 0 }}
            onClick={() => close?.()}
          />
        )}
        {children}
      </Flex>
    </Flex>
  );
}

export default React.memo(Index);
