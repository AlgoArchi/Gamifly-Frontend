import Ajax from "@/utils/request";
// const baseUrl = "https://gamifly.co:3001";
const baseUrl = "https://app.gamifly.co:3001";
const ajax = new Ajax(baseUrl);

// 获取通知
export const getNotifications = {
  fetcher: (id: string) => ajax.get(`/api/getNotifications/${id}`),
  key: "/api/getNotifications",
};

// 修改通知状态
export const setReadNotification = {
  fetcher: (params: Record<any, any>) =>
    ajax.post("/api/setReadNotification", params),
  key: "/api/setReadNotification",
};
