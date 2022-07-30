import { hexValue } from "ethers/lib/utils";
import { TransactionResponse } from "@ethersproject/providers";
import { networkConfigMap } from "./netWork";
import { ethers } from "ethers";
import { ERC20Abi } from "@/abi/ERC20Abi";

export enum WalletEnum {
  metamask = "MetaMask",
  walletconnect = "WalletConnect",
}

export interface Wallet {
  logo: string;
  name: WalletEnum;
  url?: string;
}

// switch network to ethereum
export const switchNetwork = async (chainId: number) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  // const toast = useToast();
  try {
    if (window?.ethereum) {
      await window?.ethereum?.request?.({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: hexValue(chainId) }],
      });
    } else {
      return "no metamask";
    }
  } catch (error: any) {
    // console.log(window.ethereum);
    if (error.code === 4902 || error.code === -32603) {
      try {
        await window.ethereum.request({
          method: "wallet_addEthereumChain",
          params: [networkConfigMap[chainId]],
        });
        return true;
      } catch (addError) {
        return false;
      }
    }
    return false;
  }
  return true;
};

export const executeAndShowTx = async (
  promise: Promise<any>,
  { throwError } = {
    throwError: false,
  }
) => {
  let tx;
  try {
    tx = (await promise) as TransactionResponse;
    // txPending(tx.chainId, tx.hash);

    await tx.wait();
    // txSuccess(tx.chainId, tx.hash);
    return tx.hash;
  } catch (err) {
    if (tx) {
      console.log("err:", tx.hash);
    }
    if (throwError) {
      console.log(err);
    } else {
      console.error("transaction fail: ", err);
    }
    return err;
  }
};

export const recharge = async (
  library: any,
  account: string,
  token: string,
  userInfo: any,
  val: string,
  success: (res: string) => void,
  fail?: () => void
) => {
  try {
    const signer = library.getSigner(account);
    const contract = new ethers.Contract(token, ERC20Abi, signer);
    const decimals = await contract.decimals();
    const tran = contract.transfer(
      userInfo?.platform_wallet,
      ethers.utils.parseUnits(val, decimals)
    );
    const res = await executeAndShowTx(tran);
    if (res && typeof res === "string") {
      success(res as string);
    } else {
      fail?.();
    }
  } catch (err) {
    fail?.();
  }
};
