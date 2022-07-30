import React from "react";
import { Text, Flex, Image } from "@chakra-ui/react";
import cryptoIc from "@/assets/imgs/cryptoIcon.png";
import faceBookSvg from "@/assets/imgs/facebook.svg";
import googleSvg from "@/assets/imgs/google.svg";
import metaMaskSvg from "@/assets/imgs/meta.svg";
import px2vw from "@/utils/px2vw";

function Index() {
  const LoginItem = React.memo(
    ({
      icon,
      name,
      withOutButton,
    }: {
      icon: string;
      name: string;
      withOutButton?: boolean;
    }) => (
      <Flex
        justifyContent="space-between"
        w="full"
        h={{ base: px2vw(80), lg: "80px" }}
        px={{ base: px2vw(20), lg: "20px" }}
        mb={{ base: px2vw(10), lg: "10px" }}
        bgColor="black.600"
      >
        <Flex>
          <Image
            src={icon}
            w={{ base: px2vw(35), lg: "35px" }}
            h={{ base: px2vw(35), lg: "35px" }}
            mr={{ base: px2vw(15), lg: "15px" }}
            my="auto"
          />
          <Text
            fontFamily="Nunito"
            textStyle={{ base: "16", lg: "18" }}
            lineHeight={{ base: px2vw(80), lg: "80px" }}
            fontWeight="600"
          >
            {name}
          </Text>
        </Flex>
        {!withOutButton && (
          <Flex
            justifyContent="center"
            fontFamily="Nunito"
            fontWeight="700"
            cursor="pointer"
            bgColor="green.300"
            color="green.100"
            my="auto"
            w={{ base: px2vw(153), lg: "153px" }}
            h={{ base: px2vw(40), lg: "40px" }}
            lineHeight={{ base: px2vw(40), lg: "40px" }}
          >
            Change
          </Flex>
        )}
      </Flex>
    )
  );

  return (
    <Flex
      direction="column"
      w={{ base: "100%", lg: "705px" }}
      p={{
        base: `${px2vw(30)} 0 ${px2vw(40)}`,
        lg: "30px 18px 40px",
      }}
    >
      <Text
        mb={{ base: px2vw(10), lg: "15px" }}
        textStyle={{ base: "16", lg: "18" }}
        lineHeight={{ base: px2vw(20), lg: "22px" }}
        fontWeight="600"
      >
        DeFi Wallet
      </Text>
      <LoginItem icon={cryptoIc} name="Gamifly Account" withOutButton />
      <Text
        mt={{ base: px2vw(25), lg: "25px" }}
        textStyle={{ base: "16", lg: "18" }}
        lineHeight={{ base: px2vw(20), lg: "22px" }}
        fontWeight="600"
      >
        Login method
      </Text>
      <LoginItem icon={faceBookSvg} name="Facebook" />
      <LoginItem icon={googleSvg} name="Google ID" />
      <LoginItem icon={metaMaskSvg} name="Meta Mask" />
    </Flex>
  );
}

export default React.memo(Index);
