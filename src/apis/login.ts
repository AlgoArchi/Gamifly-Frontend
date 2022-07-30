import Ajax from "@/utils/request";
// const baseUrl = "https://gamifly.co:3001";
const baseUrl = "https://app.gamifly.co:3001";
const ajax = new Ajax(baseUrl);

// 使用钱包登陆
export const walletLogin = {
  fetcher: (params: Record<string, any>) =>
    ajax.post("/auth/walletLogin", params),
  key: "/auth/walletLogin",
};

// 第三方登录后调用自家登陆
export const login = {
  fetcher: (params: Record<string, any>) => ajax.post("/auth/login", params),
  key: "/auth/login",
};

// 用户登录后，每十分钟调用一次
export const requestReward = {
  fetcher: (params: Record<string, any>) =>
    ajax.post("/api/requestReward", params),
  key: "/api/requestReward",
};

// 记录用户在项目中的停留时间
export const setTrackInfo = {
  fetcher: (params: Record<string, any>) =>
    ajax.post("/api/setTrackInfo", params),
  key: "/api/setTrackInfo",
};
