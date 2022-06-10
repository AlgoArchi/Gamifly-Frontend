import React, { useState } from "react";
import { Flex, Text, Image, Input } from "@chakra-ui/react";
import nullGreen from "@/assets/imgs/nullGreen.png";
import BaseButton from "@/components/BaseButton";
import px2vw from "@/utils/px2vw";
import avatar from "@/assets/imgs/avatar.png";
import changePhoto from "@/assets/imgs/changePhoto.png";

export interface IProps {
  isSetMode: boolean;
  saveClick: () => void;
}

function Index({ isSetMode, saveClick }: IProps) {
  const [refferal] = useState<any>("--");
  const [tournaments] = useState<any>("--");
  const [games] = useState<any>("--");
  return (
    <Flex
      w={{ base: "full", lg: "456px" }}
      position="relative"
      direction="column"
      boxSizing="border-box"
      borderBottom="none"
    >
      <Flex w="full" position="relative">
        <Image w="full" src={avatar} fallbackSrc={avatar} />
        {isSetMode ? (
          // change Photo
          <Flex
            m="auto"
            position="absolute"
            left="0"
            right="0"
            bgColor="green.300"
            justifyContent="center"
            cursor="pointer"
            bottom={{ base: px2vw(25), lg: "25px" }}
            w={{ base: px2vw(253), lg: "253px" }}
            h={{ base: px2vw(45), lg: "45px" }}
          >
            <Image
              src={changePhoto}
              w={{ base: px2vw(16.67), lg: "16.67px" }}
              h={{ base: px2vw(15), lg: "15px" }}
              mr={{ base: px2vw(11.67), lg: "11.67px" }}
              my="auto"
            />
            <Text
              color="green.100"
              fontFamily="Nunito"
              fontWeight="700"
              fontSize={{ base: px2vw(14), lg: "14px" }}
              lineHeight={{ base: px2vw(45), lg: "45px" }}
            >
              Change Photo
            </Text>
          </Flex>
        ) : (
          // user name
          <Text
            position="absolute"
            left={{ base: px2vw(17), lg: "17px" }}
            bottom={{ base: px2vw(20), lg: "20px" }}
            color="white.100"
            fontWeight="600"
            fontSize={{ base: px2vw(18), lg: "22px" }}
            lineHeight={{ base: px2vw(28), lg: "28px" }}
          >
            User Name
          </Text>
        )}
      </Flex>
      <Flex
        w="full"
        direction="column"
        pt={{ base: px2vw(5), lg: "18px" }}
        pb={{ base: 0, lg: "18px" }}
        px={{ base: 0, lg: "18px" }}
      >
        {isSetMode ? (
          // setting user name
          <Flex>
            <Input
              w="full"
              bgColor="black.600"
              outline="none"
              border="none"
              borderRadius="0"
              placeholder="User Name"
              h={{ base: px2vw(70), lg: "70px" }}
              _placeholder={{
                fontFamily: "Nunito",
                fontSize: { base: px2vw(18), lg: "18px" },
                fontWeight: 600,
                color: "white.100",
              }}
            />
          </Flex>
        ) : (
          // data
          <Flex w="full" justifyContent="center">
            <Flex
              direction="column"
              alignItems="center"
              justifyContent="center"
              w={{ base: px2vw(134), lg: "134px" }}
              h={{ base: px2vw(76), lg: "76px" }}
              mr={{ base: px2vw(10), lg: "10px" }}
              color="green.100"
              bgColor="green.500"
            >
              {refferal === "--" ? (
                <Image
                  src={nullGreen}
                  w={{ base: px2vw(20), lg: "20px" }}
                  h={{ base: px2vw(20), lg: "20px" }}
                />
              ) : (
                <Text
                  textStyle="26"
                  fontWeight="700"
                  lineHeight={{ base: px2vw(32), lg: "32px" }}
                >
                  {refferal}
                </Text>
              )}

              <Text
                mt={{ base: px2vw(5), lg: "5px" }}
                textStyle="12"
                fontWeight="500"
                lineHeight={{ base: px2vw(16), lg: "16px" }}
              >
                Refferal
              </Text>
            </Flex>
            <Flex
              direction="column"
              alignItems="center"
              justifyContent="center"
              w={{ base: px2vw(134), lg: "134px" }}
              h={{ base: px2vw(76), lg: "76px" }}
              mr={{ base: px2vw(10), lg: "10px" }}
              color="green.100"
              bgColor="green.500"
            >
              {tournaments === "--" ? (
                <Image
                  src={nullGreen}
                  w={{ base: px2vw(20), lg: "20px" }}
                  h={{ base: px2vw(20), lg: "20px" }}
                />
              ) : (
                <Text
                  textStyle="26"
                  fontWeight="700"
                  lineHeight={{ base: px2vw(32), lg: "32px" }}
                >
                  {tournaments}
                </Text>
              )}
              <Text
                mt={{ base: px2vw(5), lg: "5px" }}
                textStyle="12"
                fontWeight="500"
                lineHeight={{ base: px2vw(16), lg: "16px" }}
              >
                Tournaments
              </Text>
            </Flex>
            <Flex
              direction="column"
              alignItems="center"
              justifyContent="center"
              w={{ base: px2vw(134), lg: "134px" }}
              h={{ base: px2vw(76), lg: "76px" }}
              color="green.100"
              bgColor="green.500"
            >
              {games === "--" ? (
                <Image
                  src={nullGreen}
                  w={{ base: px2vw(20), lg: "20px" }}
                  h={{ base: px2vw(20), lg: "20px" }}
                />
              ) : (
                <Text
                  textStyle="26"
                  fontWeight="700"
                  lineHeight={{ base: px2vw(32), lg: "32px" }}
                >
                  {games}
                </Text>
              )}
              <Text
                mt={{ base: px2vw(5), lg: "5px" }}
                textStyle="12"
                fontWeight="500"
                lineHeight={{ base: px2vw(16), lg: "16px" }}
              >
                Games
              </Text>
            </Flex>
          </Flex>
        )}
        {isSetMode ? (
          <BaseButton
            w="full"
            mt={{ base: px2vw(15), lg: "15px" }}
            h={{ base: px2vw(52), lg: "52px" }}
            onClick={() => saveClick()}
          >
            Save changes
          </BaseButton>
        ) : (
          <BaseButton
            w="full"
            mt={{ base: px2vw(15), lg: "15px" }}
            h={{ base: px2vw(52), lg: "52px" }}
            onClick={() => saveClick()}
          >
            Edit profile
          </BaseButton>
        )}
      </Flex>
    </Flex>
  );
}

export default Index;
