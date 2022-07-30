import Ajax from "@/utils/request";
// const baseUrl = "https://gamifly.co:3001";
const baseUrl = "https://app.gamifly.co:3001";
const ajax = new Ajax(baseUrl);

// 获取游戏列表
export const getGameList = {
  fetcher: (type: any) => ajax.get(`/api/getGameList/${type}`),
  key: "/api/getGameList",
};

// 获取游戏类型
export const getGameTypes = {
  fetcher: () => ajax.get("/api/getGameTypes"),
  key: "/api/getGameTypes",
};
