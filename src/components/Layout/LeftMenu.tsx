import React, { useMemo } from "react";
import { Flex, Image, Text, useToast } from "@chakra-ui/react";
import { useRouter } from "next/router";
import gamesIcon from "@/assets/imgs/games.webp";
import tournaments from "@/assets/imgs/tournaments.webp";
// import leaderboard from "@/assets/imgs/leaderboard.webp";
// import gamiflyInfo from "@/assets/imgs/gamiflyInfo.webp";
import purchase from "@/assets/imgs/purchase.webp";
// import transfer from "@/assets/imgs/transfer.webp";
import invite from "@/assets/imgs/invite.webp";
import px2vw from "@/utils/px2vw";
// import notificationIcon from "@/assets/imgs/notificationIcon.webp";
import leftLogo from "@/assets/imgs/leftLogo.png";
import styles from "./style.module.scss";
// import InviteFriend from "../InviteFriend";
import { getStore } from "@/utils/storage";
// import FriendCode from "../FriendCode";
import globalStore from "@/stores/global";
import copyFunction from "copy-to-clipboard";

export interface pageItem {
  name: string;
  icon: string;
  path: string;
}

export interface buttonItem {
  name: string;
  icon: string;
  click?: () => void;
}

// 页面数组
export const pageList: pageItem[] = [
  {
    name: "GAMES",
    path: "/games",
    icon: gamesIcon,
  },
  {
    name: "NFT",
    path: "/purchase",
    icon: purchase,
  },
  {
    name: "TOURNAMENTS",
    path: "/tournaments",
    icon: tournaments,
  },
  {
    name: "ABOUT US",
    path: "/aboutUs",
    icon: tournaments,
  },
  // {
  //   name: "Leader boards",
  //   path: "/leaderBoards",
  //   icon: leaderboard,
  // },
  // {
  //   name: "Notifications",
  //   path: "/notifications",
  //   icon: notificationIcon,
  // },
  // {
  //   name: "Gamifly info",
  //   path: "/gamiflyInfo",
  //   icon: gamiflyInfo,
  // },
  // {
  //   name: "Top up and Withdraw",
  //   path: "/transfer",
  //   icon: transfer,
  // },
];

// 页面列表
export const PageArr = React.memo(
  ({ router, click }: { router: any; click?: () => void }) => (
    <Flex flexDir="column">
      {pageList.map((item: pageItem, index: number) => {
        return (
          <Flex
            key={index}
            display={{
              base: "flex",
              lg: item.path !== "/notifications" ? "flex" : "none",
            }}
            justifyContent="flex-start"
            w="full"
            h={{ base: px2vw(63), lg: "73px" }}
            pl="15px"
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
            onClick={() => {
              router.push(item?.path);
              click?.();
            }}
          >
            {/* 图标 */}
            <Flex justifyContent="center" w="27px" h="27px" mr="15px" my="auto">
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
  )
);

// 按钮列表
export const ButtonArr = React.memo(
  ({ click, buttonList }: { click?: () => void; buttonList: buttonItem[] }) => (
    <Flex flexDir="column">
      {buttonList.map((item: buttonItem, index: number) => {
        return (
          <Flex
            key={index}
            className={styles.leftMenuButton}
            justifyContent="center"
            w="213px"
            h={{ base: px2vw(62), lg: "62px" }}
            bgColor="green.300"
            color="green.100"
            mx="auto"
            cursor="pointer"
            onClick={() => {
              item?.click?.();
              click?.();
            }}
          >
            {/* icon */}
            <Flex justifyContent="center" w="27px" h="27px" mr="10px" my="auto">
              <Image src={item.icon} />
            </Flex>
            <Flex flexDir="column" my="auto">
              {/* name */}
              <Text
                fontSize="14px"
                lineHeight="24px"
                fontFamily="Orbitron"
                fontWeight="600"
                textAlign="center"
              >
                {item.name}
              </Text>
              <Text
                fontSize="12px"
                lineHeight="12px"
                fontFamily="Orbitron"
                fontWeight="600"
                textAlign="center"
              >
                Copy Link
              </Text>
            </Flex>
          </Flex>
        );
      })}
    </Flex>
  )
);

function Index() {
  const router = useRouter();
  const toast = useToast();
  const { userInfo } = globalStore();
  // const [inviteCode] = useState(router.query.inviteCode);
  // const [inviteShow, setInviteShow] = useBoolean(false);
  // const [friendShow, setFriendShow] = useBoolean(false);

  // useEffect(() => {
  //   if (inviteCode) {
  //     if (
  //       (userInfo && userInfo?.id && !userInfo?.referral_id) ||
  //       !userInfo?.id
  //     ) {
  //       setFriendShow.on();
  //     }
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [inviteCode]);
  // 按钮数组
  const buttonList: buttonItem[] = [
    {
      name: "Invite friend",
      icon: invite,
      click: () => {
        copyFunction(
          `https://www.gamifly.co?inviteCode=${getStore("referralCode")}`
        );
        toast({
          title: "success",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      },
    },
  ];

  const avatar = useMemo(
    () => (
      <Flex flexDir="column">
        {/* Avatar */}
        <Flex
          justifyContent="flex-start"
          w="full"
          h="92px"
          py="25px"
          pl="30px"
          cursor="pointer"
        >
          <Image src={leftLogo} onClick={() => router.push("/")} />
        </Flex>
        {/* pages */}
        <PageArr router={router} />
      </Flex>
    ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [userInfo, router]
  );
  return (
    <Flex
      flexDirection="column"
      justifyContent="space-between"
      display={{ base: "none", lg: "flex" }}
      w="237px"
      minH="100vh"
      bgColor="black.300"
      pb="50px"
      pos="fixed"
      top="0"
      left="0"
      zIndex={8}
    >
      {avatar}
      {/* button */}
      {userInfo && userInfo?.id && <ButtonArr buttonList={buttonList} />}
      {/* <InviteFriend
        isShow={inviteShow || showInviteFriend}
        setIsShow={() => {
          setInviteShow.off();
          globalStore.setState({ showInviteFriend: false });
        }}
      /> */}
      {/* <FriendCode
        isShow={friendShow}
        code={inviteCode}
        setIsShow={() => setFriendShow.off()}
      /> */}
    </Flex>
  );
}

export default React.memo(Index);
