import React from "react";
import { Flex, Image, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import userProfile from "@/assets/imgs/userProfile.png";
import gamesIcon from "@/assets/imgs/games.webp";
import tournaments from "@/assets/imgs/tournaments.webp";
import leaderboard from "@/assets/imgs/leaderboard.webp";
import gamiflyInfo from "@/assets/imgs/gamiflyInfo.webp";
import purchase from "@/assets/imgs/purchase.webp";
import transfer from "@/assets/imgs/transfer.webp";
import invite from "@/assets/imgs/invite.webp";
import styles from "./style.module.scss";

interface pageItem {
  name: string;
  icon: string;
  path: string;
}

interface buttonItem {
  name: string;
  icon: string;
  click?: () => void;
}

function Index() {
  const router = useRouter();
  // 页面数组
  const pageList: pageItem[] = [
    {
      name: "Games",
      path: "/games",
      icon: gamesIcon,
    },
    {
      name: "Tournaments",
      path: "/tournaments",
      icon: tournaments,
    },
    {
      name: "Leader boards",
      path: "/leaderBoards",
      icon: leaderboard,
    },
    {
      name: "Gamifly info",
      path: "/gamiflyInfo",
      icon: gamiflyInfo,
    },
    {
      name: "Make a Purchase",
      path: "/purchase",
      icon: purchase,
    },
    {
      name: "Make a Transfer",
      path: "/transfer",
      icon: transfer,
    },
  ];
  // 按钮数组
  const buttonList: buttonItem[] = [
    {
      name: "Invite friend",
      icon: invite,
      click: () => alert("Invite"),
    },
  ];
  return (
    <Flex
      flexDirection="column"
      justifyContent="space-between"
      display={{ base: "none", lg: "flex" }}
      w="237px"
      h="inherit"
      bgColor="black.300"
      pb="50px"
      zIndex={1}
    >
      <Flex flexDir="column">
        {/* Avatar */}
        <Flex justifyContent="flex-start" w="full" h="92px" py="25px" pl="30px">
          <Image
            src={userProfile}
            w="42px"
            h="42px"
            mr="15px"
            borderRadius="50%"
          />
          <Text
            textStyle="14"
            lineHeight="42px"
            fontFamily="Orbitron"
            color="white.100"
          >
            User Name
          </Text>
        </Flex>
        {/* pages */}
        <Flex flexDir="column">
          {pageList.map((item: pageItem, index: number) => {
            return (
              <Flex
                key={index}
                justifyContent="flex-start"
                w="full"
                h="73px"
                pl="30px"
                color="green.100"
                cursor="pointer"
                pos="relative"
                bgColor={
                  router.pathname === item.path ? "green.400" : "transparent"
                }
                opacity={router.pathname === item.path ? "1" : "0.5"}
                _hover={{
                  bgColor: "green.400",
                  color: "green.100",
                  opacity: "1",
                }}
                _after={{
                  display: router.pathname === item.path ? "block" : "none",
                  content: "''",
                  pos: "absolute",
                  right: 0,
                  top: 0,
                  w: "3px",
                  h: "full",
                  bgColor: "green.100",
                  borderRadius: "5px",
                  boxShadow: "-2px 0px 12px #5ec6b8",
                }}
                onClick={() => router.push(item?.path)}
              >
                {/* 图标 */}
                <Flex
                  justifyContent="center"
                  w="27px"
                  h="27px"
                  mr="15px"
                  my="auto"
                >
                  <Image src={item.icon} />
                </Flex>
                {/* 名称 */}
                <Text
                  fontSize="14px"
                  lineHeight="27px"
                  fontFamily="Orbitron"
                  fontWeight="600"
                  my="auto"
                >
                  {item.name}
                </Text>
              </Flex>
            );
          })}
        </Flex>
      </Flex>
      {/* button */}
      <Flex flexDir="column">
        {buttonList.map((item: buttonItem, index: number) => {
          return (
            <Flex
              key={index}
              className={styles.leftMenuButton}
              justifyContent="center"
              w="213px"
              h="62px"
              bgColor="green.300"
              color="green.100"
              mx="auto"
              cursor="pointer"
              onClick={() => item?.click?.()}
            >
              {/* icon */}
              <Flex
                justifyContent="center"
                w="27px"
                h="27px"
                mr="10px"
                my="auto"
              >
                <Image src={item.icon} />
              </Flex>
              {/* name */}
              <Text
                fontSize="14px"
                lineHeight="27px"
                fontFamily="Orbitron"
                fontWeight="600"
                my="auto"
              >
                {item.name}
              </Text>
            </Flex>
          );
        })}
      </Flex>
    </Flex>
  );
}

export default React.memo(Index);
