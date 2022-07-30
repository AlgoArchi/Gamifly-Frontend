import Ajax from "@/utils/request";
// const baseUrl = "https://gamifly.co:3001";
const baseUrl = "https://app.gamifly.co:3001";
const ajax = new Ajax(baseUrl);

// 获取NFT列表
export const getNFTList = {
  fetcher: (params: string) => ajax.get(`/api/getNFTList/${params}`),
  key: "/api/getNFTList",
};

// 获取NFT类型
export const getNFTTypes = {
  fetcher: () => ajax.get("/api/getNFTTypes"),
  key: "/api/getNFTTypes",
};

// 购买NFT
export const buyNFT = {
  fetcher: (params: Record<string, any>) => ajax.post("/api/buyNFT", params),
  key: "/api/buyNFT",
};

// 购买credit
export const buyCredit = {
  fetcher: (params: Record<string, any>) => ajax.post("/api/buyCredit", params),
  key: "/api/buyCredit",
};
