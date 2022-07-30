import Ajax from "@/utils/request";
// const baseUrl = "https://gamifly.co:3001";
const baseUrl = "https://app.gamifly.co:3001";
const ajax = new Ajax(baseUrl);

export const getTopPlayers = {
  fetcher: () => ajax.get("/api/getTopPlayers"),
  key: "/api/getTopPlayers",
};

export const getTopReferrals = {
  fetcher: () => ajax.get("/api/getTopReferrals"),
  key: "/api/getTopReferrals",
};
