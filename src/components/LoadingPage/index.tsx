import React from "react";
import { Flex, Text, Box, FlexProps } from "@chakra-ui/react";
import px2vw from "@/utils/px2vw";
import loadingPage from "@/assets/imgs/loadingPage.png";
import BaseModal from "../BaseModal";

export interface IProps extends FlexProps {
  isShow: boolean;
  progress: number;
  setIsShow: () => void;
}

function Index({ isShow, progress, setIsShow, ...prop }: IProps) {
  return (
    <BaseModal
      isShow={isShow}
      close={() => setIsShow()}
      w={{ base: `calc(100% - ${px2vw(30)})`, lg: "690px" }}
      h={{ base: px2vw(273), lg: "533px" }}
      bgImage={loadingPage}
      bgSize="100% 100%"
      withOutClose
      {...prop}
    >
      <Flex
        h="full"
        flexDir="column"
        justifyContent="center"
        alignItems="center"
      >
        <Flex
          flexDir="column"
          alignItems="center"
          mt={{ base: "70%", lg: "30%" }}
        >
          <Box
            w={{ base: px2vw(130), lg: "200px" }}
            h={{ base: px2vw(4), lg: "4px" }}
            mb={{ base: px2vw(10), lg: "10px" }}
            pos="relative"
            bgColor="green.700"
            _after={{
              content: "''",
              pos: "absolute",
              top: 0,
              left: 0,
              bgColor: "green.100",
              w: `${progress}%`,
              h: { base: px2vw(4), lg: "4px" },
            }}
          />
          <Text
            fontFamily="Orbitron"
            fontWeight="600"
            textStyle="14"
            color="green.100"
          >
            Loading {progress}%
          </Text>
        </Flex>
      </Flex>
    </BaseModal>
  );
}

export default React.memo(Index);
