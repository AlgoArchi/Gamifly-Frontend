import Ajax from "@/utils/request";
// const baseUrl = "https://gamifly.co:3001";
const baseUrl = "https://app.gamifly.co:3001";
const ajax = new Ajax(baseUrl);

// 存款
export const withdraw = {
  fetcher: (params: Record<string, any>) => ajax.post("/api/withdraw", params),
  key: "/api/withdraw",
};
