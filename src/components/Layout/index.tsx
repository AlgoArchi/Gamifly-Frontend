import React from "react";
import { useRouter } from "next/router";
import { Container, Flex, HStack, Button } from "@chakra-ui/react";
import px2vw from "@/utils/px2vw";

export interface LayoutProps {
  children: any;
}

function Index({ children }: LayoutProps) {
  const router = useRouter();
  return (
    <Flex w="full" justifyContent="flex-start" bg="rgba(255, 255, 255, 0.07)">
      {router?.pathname !== "/" && router?.pathname !== "/login" && (
        <Flex
          flexDirection="column"
          justifyContent="space-between"
          display={{ base: "none", lg: "flex" }}
          w={{ base: 0, lg: "237px" }}
          h="100vh"
          bgColor="blackAlpha.300"
        >
          User Name
        </Flex>
      )}
      <Flex
        w={{ base: "full", lg: "calc(100% - 237px)" }}
        pl={{ base: px2vw(15), lg: "20px" }}
        pr={{ base: px2vw(15), lg: "40px" }}
        flexDirection="column"
        justifyContent="space-start"
      >
        {router?.pathname !== "/" && router?.pathname !== "/login" && (
          <Flex
            justifyContent="flex-end"
            w="full"
            h={{ base: px2vw(40), lg: "72px" }}
          >
            <HStack>
              <Button>Earn Rewards</Button>
              <Button>Log Out</Button>
            </HStack>
          </Flex>
        )}
        <Container pt={{ base: px2vw(18), lg: "20px" }}>{children}</Container>
      </Flex>
    </Flex>
  );
}

export default React.memo(Index);
