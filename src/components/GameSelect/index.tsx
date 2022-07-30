import React from "react";
import { Flex, Image, Text, FlexProps, useBoolean } from "@chakra-ui/react";
import px2vw from "@/utils/px2vw";
import { gameItem } from "@/pages/purchase";
import arrows from "@/assets/imgs/arrows.png";

export interface IProps extends FlexProps {
  activeOption: gameItem;
  options: gameItem[];
  setActiveOption: (obj: gameItem) => void;
}

function Index({ activeOption, options, setActiveOption, ...prop }: IProps) {
  const [showOption, setShowOption] = useBoolean(false);

  const SelectItem = React.memo(
    ({ item, isOption }: { item: gameItem; isOption?: boolean }) => (
      <Flex
        textStyle={{ base: "16", lg: "18" }}
        h={{ base: px2vw(75), lg: "75px" }}
        lineHeight={{ base: px2vw(75), lg: "75px" }}
        w="full"
        justify="space-between"
        alignItems="center"
        bgColor={isOption ? "black.100" : "black.600"}
        color="white.100"
        fontFamily="Nunito"
        fontWeight="600"
        cursor="pointer"
        onClick={() => {
          if (isOption) {
            setActiveOption(item);
            setShowOption.off();
          } else {
            setShowOption.toggle();
          }
        }}
        _hover={{
          bgColor: isOption && "green.100",
        }}
        {...prop}
      >
        <Flex>
          <Image
            src={`${window.imgUrl.gameUrl}${item.image}`}
            w={{ base: px2vw(115), lg: "115px" }}
            h={{ base: px2vw(75), lg: "75px" }}
            mr={{ base: px2vw(22), lg: "22px" }}
            my="auto"
          />
          <Text>{item.title}</Text>
        </Flex>
        {!isOption && (
          <Image
            src={arrows}
            w={{ base: px2vw(12.5), lg: "12.5px" }}
            h={{ base: px2vw(16.67), lg: "16.67px" }}
            mr={{ base: px2vw(20), lg: "20px" }}
            my="auto"
            transform="rotate(-90deg)"
          />
        )}
      </Flex>
    )
  );

  return (
    <Flex flexDir="column" pos="relative" borderRadius="6px">
      {/* active option */}
      <SelectItem item={activeOption} />
      {/* option */}
      <Flex
        flexDir="column"
        w="full"
        pos="absolute"
        overflow="auto"
        bgColor="black.100"
        h={showOption ? { base: px2vw(230), lg: "230px" } : "0"}
        top={{ base: px2vw(70), lg: "70px" }}
        zIndex={1}
      >
        {options
          .filter((item) => item.id !== activeOption.id)
          .map((item: gameItem, index: number) => (
            <SelectItem key={index} item={item} isOption />
          ))}
      </Flex>
    </Flex>
  );
}

export default React.memo(Index);
