import Ajax from "@/utils/request";
// const baseUrl = "https://gamifly.co:3001";
const baseUrl = "https://app.gamifly.co:3001";
const ajax = new Ajax(baseUrl);

// 存款
export const deposit = {
  fetcher: (params: Record<string, any>) => ajax.post("/api/deposit", params),
  key: "/api/deposit",
};

// 获取GMF价格
export const getGMFPrice = {
  fetcher: (params: string) => ajax.get(`/api/getGMFPrice/${params}`),
  key: "/api/getGMFPrice",
};
