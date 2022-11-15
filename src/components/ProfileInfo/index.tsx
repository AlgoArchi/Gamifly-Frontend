import React, { useEffect, useRef, useState } from "react";
import {
  Flex,
  Text,
  Image,
  Input,
  useBoolean,
  useToast,
} from "@chakra-ui/react";
import px2vw from "@/utils/px2vw";
import avatar from "@/assets/imgs/avatar.png";
import editIcon from "@/assets/imgs/edit.png";
import camera from "@/assets/imgs/camera.png";
import globalStore from "@/stores/global";
import { getUserInfo, getReferralCount } from "@/apis/userInfo";
import useSWR from "swr";
import axios from "axios";
import { getStore, setStore } from "@/utils/storage";
import copyFunction from "copy-to-clipboard";
import LoginOut from "../LoginOut";

export interface IProps {
  isSetMode: boolean;
  saveClick: () => void;
}

function Index({ isSetMode = false, saveClick }: IProps) {
  const toast = useToast();
  const { userInfo, dataRadom } = globalStore();
  const [inputValue, setInputValue] = useState("");
  const [updateClick, setUpdateClick] = useBoolean(false);
  const [imgsSrc, setImgsSrc] = useState<any>();
  const [imgsSrcForUp, setImgsSrcForUp] = useState<any>();
  const [refferal, setRefferal] = useState<any>("--");
  const [logOut, setLogOut] = useBoolean(false); // 登出弹窗
  const [isLogin, setIsLogin] = useBoolean(userInfo?.id);

  const refs = useRef(null);
  // 获取用户信息
  const { data: getUserInfoData } = useSWR(
    userInfo && userInfo?.id ? [getUserInfo.key, dataRadom] : null,
    (_) => getUserInfo.fetcher(userInfo?.id),
    { revalidateOnFocus: false }
  );
  // 获取邀请数据
  const { data: getReferralCountData } = useSWR(
    userInfo && userInfo?.id ? [getReferralCount.key, dataRadom] : null,
    (_) => getReferralCount.fetcher(userInfo?.id),
    { revalidateOnFocus: false }
  );

  useEffect(() => {
    if (userInfo && userInfo?.id) {
      setIsLogin.on();
    } else {
      setIsLogin.off();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userInfo]);

  // 获取用户信息回调
  useEffect(() => {
    if (getUserInfoData) {
      setStore("userInfo", getUserInfoData);
      globalStore.setState({
        userInfo: getUserInfoData,
      });
      setUpdateClick.off();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getUserInfoData]);

  // 修改用户信息
  useEffect(() => {
    if (
      updateClick &&
      userInfo &&
      userInfo?.id &&
      (imgsSrcForUp || inputValue)
    ) {
      const formData = new FormData();
      formData.append("id", userInfo?.id);
      formData.append("name", inputValue || userInfo?.name);
      formData.append("avatar", imgsSrcForUp || userInfo?.avatar);
      formData.append("accessToken", userInfo?.access_token);
      axios({
        headers: {
          "Content-Type": "application/json",
        },
        method: "post",
        url: "https://app.gamifly.co:3001/api/updateUserInfo",
        data: formData,
      }).then((res) => {
        if (res) {
          globalStore.setState({
            dataRadom: Math.random(),
          });
          setUpdateClick.off();
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updateClick]);

  useEffect(() => {
    if (getReferralCountData && getReferralCountData?.value) {
      setRefferal(getReferralCountData?.value);
    } else {
      setRefferal("--");
    }
  }, [getReferralCountData]);

  useEffect(() => {
    if (imgsSrc === "" || imgsSrc === undefined) return;
    setUpdateClick.on();
    saveClick();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imgsSrc]);

  // 选图头像
  const onChange = (changeEvent: any) => {
    for (const file of changeEvent.target.files) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setImgsSrcForUp(file);
        setImgsSrc(reader.result);
      };
      reader.onerror = () => {
        console.log(reader.error);
      };
    }
  };

  const confirmUpdate = () => {
    saveClick();
    setUpdateClick.on();
  };

  return (
    <Flex
      w={{ base: "full", lg: "190px" }}
      position="relative"
      direction="column"
      boxSizing="border-box"
      borderBottom="none"
    >
      {/* 头像 */}
      <Flex flexDir={{ base: "row", lg: "column" }}>
        <Flex
          position="relative"
          w={{ base: px2vw(76), lg: "full" }}
          mr={{ base: px2vw(15), lg: "0" }}
        >
          <Flex
            pos="relative"
            w={{ base: px2vw(76), lg: "118px" }}
            h={{ base: px2vw(76), lg: "118px" }}
            mb={{ base: px2vw(13), lg: "13px" }}
            mx={{ base: "0", lg: "auto" }}
            bgColor="black.100"
            justifyContent="center"
            alignItems="center"
            borderRadius="50%"
          >
            <Image
              w={{ base: px2vw(62), lg: "118px" }}
              h={{ base: px2vw(62), lg: "118px" }}
              borderRadius="50%"
              src={
                imgsSrc ||
                (userInfo?.avatar
                  ? `${window.imgUrl.imageUrl}${userInfo?.avatar}`
                  : avatar)
              }
            />
            <Flex
              justifyContent="center"
              alignItems="center"
              pos="absolute"
              borderRadius="50%"
              boxShadow="0px 2px 4px rgba(0,0,0,0.5)"
              cursor="pointer"
              w={{ base: px2vw(18), lg: "25px" }}
              h={{ base: px2vw(18), lg: "25px" }}
              right={{ base: px2vw(10), lg: "10px" }}
              bottom={{ base: px2vw(5), lg: "0" }}
              onClick={() => {
                // if (isSetMode) {
                const obj: any = refs?.current;
                obj?.click();
                // }
              }}
            >
              <Image
                w={{ base: px2vw(18), lg: "25px" }}
                h={{ base: px2vw(18), lg: "25px" }}
                src={camera}
              />
            </Flex>
          </Flex>
        </Flex>
        {isSetMode ? (
          // setting user name
          <>
            <Flex my="auto">
              <Input
                h={{ base: px2vw(30), lg: "30px" }}
                mb={{ base: px2vw(4), lg: "4px" }}
                w="full"
                bgColor="transparent"
                outline="none"
                border={0}
                color="white.100"
                fontWeight="600"
                fontSize={{ base: px2vw(18), lg: "18px" }}
                lineHeight={{ base: px2vw(18), lg: "18px" }}
                placeholder={userInfo?.name || "User Name"}
                _placeholder={{
                  fontFamily: "Nunito",
                  fontSize: {
                    base: px2vw(18),
                    md: "18px",
                    lg: "18px",
                    xl: "18px",
                  },
                  fontWeight: 600,
                  color: "white.1000",
                }}
                _focusVisible={{
                  border: 0,
                }}
                value={inputValue || userInfo?.name}
                onChange={(e) => setInputValue(e.target.value)}
                // onBlur={() => {
                //   setUpdateClick.on();
                //   saveClick();
                // }}
              />
            </Flex>
            <Flex
              w="full"
              h="1px"
              bgColor="black.1800"
              display={{ base: "none", lg: "flex" }}
              mb={{ base: px2vw(15), lg: "20px" }}
            />
            <Flex mb={{ base: px2vw(30), lg: "30px" }}>
              <Flex
                fontSize={{ base: px2vw(14), lg: "14px" }}
                h={{ base: px2vw(30), lg: "30px" }}
                mr={{ base: px2vw(5), lg: "5px" }}
                lineHeight={{ base: px2vw(30), lg: "30px" }}
                w="full"
                fontFamily="Eurostile"
                fontWeight="400"
                alignItems="center"
                justifyContent="center"
                border="1px solid"
                borderColor="white.100"
                borderRadius="5px"
                color="white.100"
                cursor="pointer"
                onClick={() => saveClick()}
              >
                <Text>CANCEL</Text>
              </Flex>

              <Flex
                fontSize={{ base: px2vw(14), lg: "14px" }}
                h={{ base: px2vw(30), lg: "30px" }}
                ml={{ base: px2vw(5), lg: "5px" }}
                lineHeight={{ base: px2vw(30), lg: "30px" }}
                w="full"
                fontFamily="Eurostile"
                fontWeight="400"
                alignItems="center"
                justifyContent="center"
                border="1px solid"
                borderColor="purple.100"
                bgColor="purple.100"
                borderRadius="5px"
                color="white.100"
                cursor="pointer"
                onClick={() => confirmUpdate()}
              >
                <Text>OK</Text>
              </Flex>
            </Flex>
          </>
        ) : (
          <Flex
            mb={{ base: px2vw(30), lg: "30px" }}
            justifyContent="center"
            my="auto"
            cursor="pointer"
            onClick={() => saveClick()}
          >
            <Text
              textAlign="center"
              color="white.100"
              fontWeight="600"
              fontSize={{ base: px2vw(18), lg: "18px" }}
              lineHeight={{ base: px2vw(18), lg: "18px" }}
            >
              {userInfo?.name || "User Name"}
            </Text>
            <Image
              my="auto"
              w={{ base: px2vw(12), lg: "12px" }}
              h={{ base: px2vw(12), lg: "12px" }}
              ml={{ base: px2vw(7), lg: "7px" }}
              src={editIcon}
            />
          </Flex>
        )}
      </Flex>
      <Flex w="full" direction="column">
        {/* invitation */}
        <Flex
          flexDir="column"
          w="full"
          mb={{ base: px2vw(35), lg: "35px" }}
          display={{ base: "none", lg: "flex" }}
        >
          <Text
            textStyle="14"
            color="white.100"
            textAlign="center"
            fontWeight="bold"
            mb={{ base: px2vw(10), lg: "10px" }}
          >
            MY INVITATION
          </Text>
          <Flex
            h={{ base: px2vw(70), lg: "70px" }}
            w="full"
            justifyContent="center"
            alignItems="center"
          >
            <Text
              textStyle="24"
              fontFamily="Eurostile"
              color="green.900"
              mt={{ base: px2vw(5), lg: "5px" }}
              mr={{ base: px2vw(17), lg: "17px" }}
            >
              {refferal === "--" ? "0" : refferal}
            </Text>
            <Flex
              flexDir="column"
              fontFamily="Eurostile"
              textStyle="12"
              fontWeight="400"
              color="gray.500"
            >
              <Text>FRIENDS</Text>
              <Text>INVITED</Text>
            </Flex>
          </Flex>
        </Flex>
        {/* Invite Mobile */}
        <Flex
          display={{ base: "flex", lg: "none" }}
          fontSize={{ base: px2vw(17), lg: "17px" }}
          h={{ base: px2vw(50), lg: "50px" }}
          lineHeight={{ base: px2vw(50), lg: "50px" }}
          w="full"
          fontFamily="Eurostile"
          fontWeight="400"
          alignItems="center"
          justifyContent="space-between"
          bgColor="green.1000"
          border="1px solid"
          borderColor="green.1000"
          borderRadius="5px"
          color="black.1600"
          cursor="pointer"
          onClick={() => {
            copyFunction(
              `https://www.gamifly.co?inviteCode=${getStore("referralCode")}`
            );
            toast({
              title: "success",
              status: "success",
              duration: 3000,
              isClosable: true,
            });
          }}
        >
          <Flex h={px2vw(70)} ml={px2vw(10)} alignItems="center">
            <Text
              textStyle="20"
              fontFamily="Eurostile"
              color="black.100"
              mt={{ base: px2vw(5), lg: "5px" }}
              mr={{ base: px2vw(5), lg: "17px" }}
            >
              {refferal === "--" ? "0" : refferal}
            </Text>
            <Flex
              flexDir="column"
              fontFamily="Eurostile"
              textStyle="12"
              fontWeight="400"
              color="gray.500"
            >
              <Text>FRIENDS</Text>
              <Text>INVITED</Text>
            </Flex>
          </Flex>
          <Text mt={px2vw(5)} mr={px2vw(28)}>
            SPEED UP EARNING
          </Text>
        </Flex>

        {/* Invite */}
        <Flex
          display={{ base: "none", lg: "flex" }}
          fontSize={{ base: px2vw(17), lg: "17px" }}
          h={{ base: px2vw(50), lg: "50px" }}
          lineHeight={{ base: px2vw(50), lg: "50px" }}
          w="full"
          fontFamily="Eurostile"
          fontWeight="400"
          alignItems="center"
          justifyContent="center"
          bgColor="green.1000"
          border="1px solid"
          borderColor="green.1000"
          borderRadius="5px"
          color="black.1600"
          cursor="pointer"
          onClick={() => {
            copyFunction(
              `https://www.gamifly.co?inviteCode=${getStore("referralCode")}`
            );
            toast({
              title: "success",
              status: "success",
              duration: 3000,
              isClosable: true,
            });
          }}
        >
          <Text mt={{ base: px2vw(5), lg: "5px" }}>INVITE FRIENDS</Text>
        </Flex>

        {/* log out */}
        {isLogin && (
          <Flex
            display={{ base: "none", lg: "flex" }}
            fontSize={{ base: px2vw(17), lg: "17px" }}
            h={{ base: px2vw(50), lg: "50px" }}
            lineHeight={{ base: px2vw(50), lg: "50px" }}
            mt={{ base: px2vw(15), lg: "15px" }}
            w="full"
            fontFamily="Eurostile"
            fontWeight="400"
            alignItems="center"
            justifyContent="center"
            border="1px solid"
            borderColor="white.100"
            borderRadius="5px"
            color="white.100"
            cursor="pointer"
            onClick={() => setLogOut.on()}
          >
            <Text mt={{ base: px2vw(5), lg: "5px" }}>LOG OUT</Text>
          </Flex>
        )}

        <Flex
          w="full"
          h="1px"
          bgColor="black.1800"
          display={{ base: "flex", lg: "none" }}
          mt={px2vw(20)}
        />
      </Flex>
      {/* 上传头像 */}
      <Input
        w={0}
        h={0}
        border="none"
        ref={refs}
        onChange={onChange}
        type="file"
        name="file"
        accept="image/*"
        opacity={0}
      />
      {/* log out */}
      <LoginOut
        logOut={logOut}
        setLogOut={(boo: boolean) => (boo ? setLogOut.on() : setLogOut.off())}
      />
    </Flex>
  );
}

export default Index;
