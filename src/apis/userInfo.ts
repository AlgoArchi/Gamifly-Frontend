import Ajax from "@/utils/request";
// const baseUrl = "https://gamifly.co:3001";
const baseUrl = "https://app.gamifly.co:3001";
const ajax = new Ajax(baseUrl);

// 获取用户详情
export const getUserInfo = {
  fetcher: (params: string) => ajax.get(`/api/getUserInfo/${params}`),
  key: "/api/getUserInfo",
};

// 获取钱包余额
export const getGamiflyWalletBalance = {
  fetcher: (params: string) =>
    ajax.get(`/api/getGamiflyWalletBalance/${params}`),
  key: "/api/getGamiflyWalletBalance",
};

// 获取我的转账记录
export const getGamiflyWalletTransactions = {
  fetcher: (params: string) =>
    ajax.get(`/api/getGamiflyWalletTransactions/${params}`),
  key: "/api/getGamiflyWalletTransactions",
};
// 获取我的NFTs
export const getMyNFTs = {
  fetcher: (params: string) => ajax.get(`/api/getMyNFTs/${params}`),
  key: "/api/getMyNFTs",
};

// 获取邀请码
export const getReferralCode = {
  fetcher: (params: string) => ajax.get(`/api/getReferralCode/${params}`),
  key: "/api/getReferralCode",
};

// 设置邀请码
export const setReferral = {
  fetcher: (params: Record<string, any>) =>
    ajax.post("/api/setReferral", params),
  key: "/api/getReferralCode",
};

// 获取邀请记录
export const getReferralCount = {
  fetcher: (params: string) => ajax.get(`/api/getReferralCount/${params}`),
  key: "/api/getReferralCount",
};

// 获取奖励余额
export const getRewardAmount = {
  fetcher: (params: string) => ajax.get(`/api/getRewardAmount/${params}`),
  key: "/api/getRewardAmount",
};

export const getWithdrawableAmount = {
  fetcher: (params: string) => ajax.get(`/api/getWithdrawableAmount/${params}`),
  key: "/api/getWithdrawableAmount",
};
