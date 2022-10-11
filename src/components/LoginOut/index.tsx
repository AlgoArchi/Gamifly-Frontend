import React from "react";
import { Flex, Text } from "@chakra-ui/react";
import px2vw from "@/utils/px2vw";
import BaseModal from "../BaseModal";
import BaseButton from "../BaseButton";
import { deleteStore } from "@/utils/storage";
import globalStore from "@/stores/global";

export interface IProps {
  logOut: boolean;
  setLogOut: (boo: boolean) => void;
  confirmLogOut?: () => void;
}

function Index({ logOut, setLogOut, confirmLogOut }: IProps) {
  return (
    <BaseModal
      isShow={logOut}
      close={() => setLogOut(false)}
      justifyContent="center"
      alignItems="center"
    >
      <Flex flexDir="column">
        <Text
          fontFamily="Orbitron"
          fontWeight="600"
          textAlign="center"
          color="white.100"
          fontSize={{ base: px2vw(22), lg: "22px" }}
          mb={{ base: px2vw(50), lg: "100px" }}
        >
          Log out?
        </Text>
        <Flex justifyContent="space-between">
          <BaseButton
            w={{ base: px2vw(130), lg: "130px" }}
            h={{ base: px2vw(52), lg: "52px" }}
            mr={{ base: px2vw(50), lg: "50px" }}
            fontFamily="Nunito"
            fontSize="16px"
            fontWeight="600"
            onClick={() => setLogOut(false)}
          >
            Cancel
          </BaseButton>
          <BaseButton
            w={{ base: px2vw(130), lg: "130px" }}
            h={{ base: px2vw(52), lg: "52px" }}
            fontFamily="Nunito"
            fontSize="16px"
            fontWeight="600"
            bgColor="transparent"
            border="2px solid"
            borderColor="blue.100"
            color="blue.100"
            onClick={async () => {
              window.walletConnectProvider?.disconnect();
              globalStore.setState({
                userInfo: null,
              });
              window.walletConnectProvider = null;
              setLogOut(false);
              deleteStore("userInfo");
              confirmLogOut?.();
              deleteStore("referralCode");
              deleteStore("friendCode");
            }}
          >
            Log out
          </BaseButton>
        </Flex>
      </Flex>
    </BaseModal>
  );
}

export default React.memo(Index);
