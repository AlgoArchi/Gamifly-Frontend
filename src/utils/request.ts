import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";

// const baseURLMap = new Map() //不同baseUrl的映射

export default class Ajax {
  constructor(baseUrl = "") {
    this.baseUrl = baseUrl;
  }
  public static setHeader(headerName: string, value: string) {
    if (!headerName) {
      console.error("setHeader", "参数不合法");
      return;
    }
    axios.interceptors.request.use(
      (config: any) => {
        config.headers[headerName] = value;
        return config;
      },
      (err: any) => {
        return Promise.reject(err);
      }
    );
  }

  private baseUrl = ""; //TODO:添加baseUrl

  public request(params: AxiosRequestConfig): Promise<any> {
    const newParams = {
      ...params,
      // TODO:其他默认的值
    };
    return new Promise((resolve) => {
      axios({ ...newParams, url: `${this.baseUrl}${params.url}` })
        .then((res: AxiosResponse) => {
          if (res.status === 200) {
            switch (res?.data?.code) {
              case 0:
                resolve(res?.data);
                break;
              case 401:
                // TODO:鉴权
                break;
              default:
                resolve(res?.data);
                break;
            }
          }
        })
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        .catch((err: AxiosError) => {
          resolve(err?.response?.data);
        });
    });
  }
  private queryString(url: string, query?: Record<string, string>): string {
    const str = [];
    for (const key in query) {
      str.push(key + "=" + query[key]);
    }
    const paramStr = str.join("&");
    return paramStr ? `${url}?${paramStr}` : url;
  }

  public get(url = "", params: Record<string, string> = {}): Promise<any> {
    return this.request({
      method: "get",
      url: this.queryString(`${url}`, params),
    });
  }

  public setBaseUrl = (url: string) => {
    this.baseUrl = url;
  };

  public post(url: string, params?: Record<string, any>): Promise<any> {
    return this.request({
      method: "post",
      url: `${url}`,
      data: params,
    });
  }
}

// TODO:错误处理
// export const errorHandle = () => {}
