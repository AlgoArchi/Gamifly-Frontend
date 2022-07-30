import Ajax from "@/utils/request";
// const baseUrl = "https://gamifly.co:3001";
const baseUrl = "https://app.gamifly.co:3001";
const ajax = new Ajax(baseUrl);

// 获取活动列表
export const getTournaments = {
  fetcher: () => ajax.get(`/api/getTournaments`),
  key: "/api/getTournaments",
};
