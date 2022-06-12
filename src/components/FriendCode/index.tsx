import React, { useState, useRef, useEffect } from "react";
import { Flex, Image, Text, FlexProps, Input } from "@chakra-ui/react";
import px2vw from "@/utils/px2vw";
import friendCode from "@/assets/imgs/friendCode.png";
import BaseModal from "../BaseModal";
import BaseButton from "../BaseButton";

export interface IProps extends FlexProps {
  isShow: boolean;
  setIsShow: () => void;
}

function Index({ isShow, setIsShow, ...prop }: IProps) {
  const [input1, setInput1] = useState("");
  const [input2, setInput2] = useState("");
  const [input3, setInput3] = useState("");
  const [input4, setInput4] = useState("");
  const [input5, setInput5] = useState("");
  const [input6, setInput6] = useState("");
  const inp1 = useRef(null);
  const inp2 = useRef(null);
  const inp3 = useRef(null);
  const inp4 = useRef(null);
  const inp5 = useRef(null);
  const inp6 = useRef(null);
  useEffect(() => {
    if (inp1.current) {
      // @ts-ignore
      inp1.current.focus();
    }
  }, [inp1.current]);

  return (
    <BaseModal
      isShow={isShow}
      close={() => setIsShow()}
      zIndex={3}
      w={{ base: `calc(100% - ${px2vw(30)})`, lg: "454px" }}
      h={{ base: "504px", lg: "504px" }}
      {...prop}
    >
      <Flex w="full" flexDir="column" alignItems="center" fontFamily="Orbitron">
        <Image
          mx="auto"
          src={friendCode}
          w={{ base: px2vw(177), lg: "177px" }}
          h={{ base: px2vw(172), lg: "172px" }}
          mb={{ base: px2vw(30), lg: "30px" }}
        />
        <Text
          fontWeight="600"
          textStyle="22"
          lineHeight={{ base: px2vw(28), lg: "28px" }}
          mb={{ base: px2vw(15), lg: "15px" }}
        >
          Enter a Friend’s code
        </Text>
        <Text
          fontFamily="Nunito"
          fontWeight="400"
          textStyle="16"
          color="white.500"
          lineHeight={{ base: px2vw(22), lg: "22px" }}
          mb={{ base: px2vw(25), lg: "25px" }}
        >
          Enter a friend’s code and get a reward.
        </Text>
        <Flex
          justifyContent="center"
          w="full"
          h={{ base: px2vw(45), lg: "60px" }}
          mb={{ base: px2vw(30), lg: "30px" }}
        >
          {/* 1 */}
          <Flex
            w={{ base: px2vw(45), lg: "60px" }}
            mr={{ base: px2vw(5), lg: "5px" }}
            bgColor="white.700"
            pos="relative"
          >
            <Input
              ref={inp1}
              h={{ base: px2vw(45), lg: "60px" }}
              fontSize={{ base: px2vw(22), lg: "26px" }}
              lineHeight={{ base: px2vw(45), lg: "60px" }}
              maxLength={1}
              w="full"
              fontFamily="Nunito"
              fontWeight="600"
              border="none"
              outline="none"
              borderRadius="0"
              boxSizing="border-box"
              p="0"
              textAlign="center"
              color="white.100"
              value={input1}
              onChange={(e) => {
                setInput1(e.target.value);
                if (e.target.value !== "") {
                  //  @ts-ignore
                  inp2.current.focus();
                }
              }}
              _focus={{
                border: "1px solid",
                borderColor: "blue.100",
              }}
              _active={{
                border: "1px solid",
                borderColor: "blue.100",
              }}
              _hover={{
                border: "1px solid",
                borderColor: "blue.100",
              }}
            />
          </Flex>
          {/* 2 */}
          <Flex
            w={{ base: px2vw(45), lg: "60px" }}
            mr={{ base: px2vw(5), lg: "5px" }}
            bgColor="white.700"
            pos="relative"
          >
            <Input
              ref={inp2}
              h={{ base: px2vw(45), lg: "60px" }}
              fontSize={{ base: px2vw(22), lg: "26px" }}
              lineHeight={{ base: px2vw(45), lg: "60px" }}
              maxLength={1}
              w="full"
              fontFamily="Nunito"
              fontWeight="600"
              border="none"
              outline="none"
              borderRadius="0"
              boxSizing="border-box"
              p="0"
              textAlign="center"
              color="white.100"
              value={input2}
              onChange={(e) => {
                setInput2(e.target.value);
                if (e.target.value !== "") {
                  //  @ts-ignore
                  inp3.current.focus();
                }
              }}
              _focus={{
                border: "1px solid",
                borderColor: "blue.100",
              }}
              _active={{
                border: "1px solid",
                borderColor: "blue.100",
              }}
              _hover={{
                border: "1px solid",
                borderColor: "blue.100",
              }}
            />
          </Flex>
          {/* 3 */}
          <Flex
            w={{ base: px2vw(45), lg: "60px" }}
            mr={{ base: px2vw(5), lg: "5px" }}
            bgColor="white.700"
            pos="relative"
          >
            <Input
              ref={inp3}
              h={{ base: px2vw(45), lg: "60px" }}
              fontSize={{ base: px2vw(22), lg: "26px" }}
              lineHeight={{ base: px2vw(45), lg: "60px" }}
              maxLength={1}
              w="full"
              fontFamily="Nunito"
              fontWeight="600"
              border="none"
              outline="none"
              borderRadius="0"
              boxSizing="border-box"
              p="0"
              textAlign="center"
              color="white.100"
              value={input3}
              onChange={(e) => {
                setInput3(e.target.value);
                if (e.target.value !== "") {
                  //  @ts-ignore
                  inp4.current.focus();
                }
              }}
              _focus={{
                border: "1px solid",
                borderColor: "blue.100",
              }}
              _active={{
                border: "1px solid",
                borderColor: "blue.100",
              }}
              _hover={{
                border: "1px solid",
                borderColor: "blue.100",
              }}
            />
          </Flex>
          {/* 4 */}
          <Flex
            w={{ base: px2vw(45), lg: "60px" }}
            mr={{ base: px2vw(5), lg: "5px" }}
            bgColor="white.700"
            pos="relative"
          >
            <Input
              ref={inp4}
              h={{ base: px2vw(45), lg: "60px" }}
              fontSize={{ base: px2vw(22), lg: "26px" }}
              lineHeight={{ base: px2vw(45), lg: "60px" }}
              maxLength={1}
              w="full"
              fontFamily="Nunito"
              fontWeight="600"
              border="none"
              outline="none"
              borderRadius="0"
              boxSizing="border-box"
              p="0"
              textAlign="center"
              color="white.100"
              value={input4}
              onChange={(e) => {
                setInput4(e.target.value);
                if (e.target.value !== "") {
                  //  @ts-ignore
                  inp5.current.focus();
                }
              }}
              _focus={{
                border: "1px solid",
                borderColor: "blue.100",
              }}
              _active={{
                border: "1px solid",
                borderColor: "blue.100",
              }}
              _hover={{
                border: "1px solid",
                borderColor: "blue.100",
              }}
            />
          </Flex>
          {/* 5 */}
          <Flex
            w={{ base: px2vw(45), lg: "60px" }}
            mr={{ base: px2vw(5), lg: "5px" }}
            bgColor="white.700"
            pos="relative"
          >
            <Input
              ref={inp5}
              h={{ base: px2vw(45), lg: "60px" }}
              fontSize={{ base: px2vw(22), lg: "26px" }}
              lineHeight={{ base: px2vw(45), lg: "60px" }}
              maxLength={1}
              w="full"
              fontFamily="Nunito"
              fontWeight="600"
              border="none"
              outline="none"
              borderRadius="0"
              boxSizing="border-box"
              p="0"
              textAlign="center"
              color="white.100"
              value={input5}
              onChange={(e) => {
                setInput5(e.target.value);
                if (e.target.value !== "") {
                  //  @ts-ignore
                  inp6.current.focus();
                }
              }}
              _focus={{
                border: "1px solid",
                borderColor: "blue.100",
              }}
              _active={{
                border: "1px solid",
                borderColor: "blue.100",
              }}
              _hover={{
                border: "1px solid",
                borderColor: "blue.100",
              }}
            />
          </Flex>
          {/* 6 */}
          <Flex
            w={{ base: px2vw(45), lg: "60px" }}
            bgColor="white.700"
            pos="relative"
          >
            <Input
              ref={inp6}
              h={{ base: px2vw(45), lg: "60px" }}
              fontSize={{ base: px2vw(22), lg: "26px" }}
              lineHeight={{ base: px2vw(45), lg: "60px" }}
              maxLength={1}
              w="full"
              fontFamily="Nunito"
              fontWeight="600"
              border="none"
              outline="none"
              borderRadius="0"
              boxSizing="border-box"
              p="0"
              textAlign="center"
              color="white.100"
              value={input6}
              onChange={(e) => {
                setInput6(e.target.value);
                if (e.target.value !== "") {
                  //  @ts-ignore
                  inp6.current.blur();
                }
              }}
              _focus={{
                border: "1px solid",
                borderColor: "blue.100",
              }}
              _active={{
                border: "1px solid",
                borderColor: "blue.100",
              }}
              _hover={{
                border: "1px solid",
                borderColor: "blue.100",
              }}
            />
          </Flex>
        </Flex>
        <BaseButton
          fontFamily="Nunito"
          fontWeight="600"
          textStyle="16"
          onClick={() => setIsShow()}
        >
          Apply
        </BaseButton>
      </Flex>
    </BaseModal>
  );
}

export default React.memo(Index);
