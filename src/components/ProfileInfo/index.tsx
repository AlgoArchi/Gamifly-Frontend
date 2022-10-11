import React, { useEffect, useRef, useState } from "react";
import { Flex, Text, Image, Input, useBoolean } from "@chakra-ui/react";
import BaseButton from "@/components/BaseButton";
import px2vw from "@/utils/px2vw";
import avatar from "@/assets/imgs/avatar.png";
import editIcon from "@/assets/imgs/editIcon.png";
import camera from "@/assets/imgs/camera.png";
import globalStore from "@/stores/global";
import { getUserInfo, getReferralCount } from "@/apis/userInfo";
import useSWR from "swr";
import axios from "axios";
import { setStore } from "@/utils/storage";
import LoginOut from "../LoginOut";

export interface IProps {
  isSetMode: boolean;
  saveClick: () => void;
}

function Index({ isSetMode, saveClick }: IProps) {
  const { userInfo, dataRadom } = globalStore();
  const [inputValue, setInputValue] = useState("");
  const [updateClick, setUpdateClick] = useBoolean(false);
  const [imgsSrc, setImgsSrc] = useState<any>();
  const [imgsSrcForUp, setImgsSrcForUp] = useState<any>();
  const [refferal, setRefferal] = useState<any>("--");
  const [logOut, setLogOut] = useBoolean(false); // 登出弹窗

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
      console.log(imgsSrcForUp, 123);
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
          saveClick();
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updateClick]);

  useEffect(() => {
    if (getReferralCountData) {
      getReferralCountData?.value === 0
        ? setRefferal("--")
        : setRefferal(getReferralCountData?.value);
    }
  }, [getReferralCountData]);

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

  return (
    <Flex
      w={{ base: "full", lg: "190px" }}
      position="relative"
      direction="column"
      boxSizing="border-box"
      borderBottom="none"
    >
      <Flex w="full" position="relative">
        <Flex
          pos="relative"
          w={{ base: px2vw(190), lg: "190px" }}
          h={{ base: px2vw(190), lg: "190px" }}
          mx="auto"
          mb={{ base: px2vw(30), lg: "30px" }}
          cursor={!isSetMode ? "default" : "pointer"}
          onClick={() => {
            if (isSetMode) {
              const obj: any = refs?.current;
              obj?.click();
            }
          }}
        >
          <Image
            w="full"
            borderRadius="50%"
            src={
              imgsSrc ||
              (userInfo?.avatar
                ? `${window.imgUrl.imageUrl}${userInfo?.avatar}`
                : avatar)
            }
          />
          <Flex
            display={!isSetMode ? "none" : "flex"}
            justifyContent="center"
            alignItems="center"
            pos="absolute"
            bottom="0"
            bgColor="black.100"
            borderRadius="50%"
            w={{ base: px2vw(42), lg: "42px" }}
            h={{ base: px2vw(42), lg: "42px" }}
            right={{ base: px2vw(10), lg: "10px" }}
          >
            <Image
              w={{ base: px2vw(25), lg: "25px" }}
              h={{ base: px2vw(25), lg: "25px" }}
              src={camera}
            />
          </Flex>
        </Flex>
      </Flex>
      <Flex w="full" direction="column">
        {isSetMode ? (
          // setting user name
          <Flex>
            <Input
              h={{ base: px2vw(30), lg: "30px" }}
              mb={{ base: px2vw(16), lg: "16px" }}
              w="full"
              bgColor="transparent"
              outline="none"
              border="1px solid"
              borderRadius="0"
              borderColor="blue.100"
              placeholder={userInfo?.name || "User Name"}
              _placeholder={{
                fontFamily: "Nunito",
                fontSize: { base: px2vw(16), lg: "16px" },
                fontWeight: 600,
                color: "blue.100",
              }}
              _focusVisible={{
                borderColor: "blue.100",
              }}
              _hover={{
                color: "blue.100",
                borderColor: "blue.100",
              }}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
          </Flex>
        ) : (
          <Text
            color="white.100"
            fontWeight="600"
            fontSize={{ base: px2vw(16), lg: "18px" }}
            lineHeight={{ base: px2vw(18), lg: "18px" }}
            mb={{ base: px2vw(16), lg: "16px" }}
          >
            {userInfo?.name || "User Name"}
          </Text>
        )}
        {/* 修改按钮 */}
        {isSetMode ? (
          <BaseButton
            w="full"
            bgColor="transparent"
            border="1px solid"
            borderColor="blue.100"
            color="blue.100"
            boxShadow="none"
            fontWeight="400"
            fontSize={{ base: px2vw(14), lg: "14px" }}
            _hover={{
              bgColor: "transparent",
              borderColor: "blue.100",
              color: "blue.100",
              boxShadow: "none",
            }}
            isLoading={updateClick}
            mb={{ base: px2vw(15), lg: "15px" }}
            h={{ base: px2vw(52), lg: "52px" }}
            onClick={() => {
              if (inputValue !== "" || imgsSrc) {
                setUpdateClick.on();
              } else {
                saveClick();
              }
            }}
          >
            <Image
              w={{ base: px2vw(16), lg: "16px" }}
              h={{ base: px2vw(16), lg: "16px" }}
              mr={{ base: px2vw(10), lg: "10px" }}
              src={editIcon}
              my="auto"
            />
            Save changes
          </BaseButton>
        ) : (
          userInfo?.id && (
            <BaseButton
              w="full"
              bgColor="transparent"
              border="1px solid"
              borderColor="blue.100"
              color="blue.100"
              boxShadow="none"
              fontWeight="400"
              fontSize={{ base: px2vw(14), lg: "14px" }}
              _hover={{
                bgColor: "transparent",
                borderColor: "blue.100",
                color: "blue.100",
                boxShadow: "none",
              }}
              mb={{ base: px2vw(15), lg: "15px" }}
              h={{ base: px2vw(52), lg: "52px" }}
              onClick={() => saveClick()}
            >
              <Image
                w={{ base: px2vw(16), lg: "16px" }}
                h={{ base: px2vw(16), lg: "16px" }}
                mr={{ base: px2vw(10), lg: "10px" }}
                src={editIcon}
                my="auto"
              />
              Edit profile
            </BaseButton>
          )
        )}
        {/* invitation */}
        <Flex
          flexDir="column"
          w="full"
          border="1px solid"
          borderColor="blue.100"
          borderRadius="5px"
        >
          <Flex
            py={{ base: px2vw(12), lg: "12px" }}
            justifyContent="center"
            alignItems="center"
            color={refferal === "--" ? "gray.200" : "white.100"}
            textStyle="14"
            textAlign="center"
          >
            {refferal !== "--"
              ? `${refferal} Invitation done!`
              : "You haven't invited friends yet"}
          </Flex>
          {userInfo?.id && (
            <Flex
              py={{ base: px2vw(12), lg: "12px" }}
              justifyContent="center"
              alignItems="center"
              textStyle="14"
              textAlign="center"
              color="white.100"
              bgColor="blue.100"
              cursor="pointer"
              onClick={() => globalStore.setState({ showInviteFriend: true })}
            >
              {refferal !== "--" ? "Invite more" : "Invite to get rewards"}
            </Flex>
          )}
        </Flex>
        {/* log out */}
        <Flex
          fontSize={{ base: px2vw(17), lg: "17px" }}
          h={{ base: px2vw(50), lg: "50px" }}
          lineHeight={{ base: px2vw(50), lg: "50px" }}
          mt={{ base: px2vw(20), lg: "20px" }}
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
