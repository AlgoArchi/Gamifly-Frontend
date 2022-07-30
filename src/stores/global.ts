import create from "zustand";

type State = {
  // 用户信息
  userInfo: any;
  // 全局数据刷新
  dataRadom: number;
  // 用户钱包地址
  globalAccount: string;
  // 展示邀请好友弹窗
  showInviteFriend: boolean;
};

const globalStore = create<State>(() => ({
  userInfo: {},
  dataRadom: 0,
  globalAccount: "",
  showInviteFriend: false,
}));

export default globalStore;
