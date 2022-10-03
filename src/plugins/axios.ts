import Axios, {AxiosInstance, AxiosError, AxiosRequestConfig, AxiosResponse} from 'axios'
import { Dialog } from 'vant';
import router from "@/router";



interface Result {
  code: number;
  msg: string
}

interface ResultData<T = any> extends Result {
  result: never[];
  data?: T;
}
// 5717478650:AAGgkFI3XjC0EiKG84qgqiPLoSPVdo_hCQg
const URL: string = 'https://api.telegram.org'

enum RequestEnums {
  TIMEOUT = 5000,
  OVERDUE = 600, // 登录失效
  FAIL = 999, // 请求失败
  SUCCESS = 200, // 请求成功
}
const config = {
  // 默认地址
  baseURL: URL as string,
  // 设置超时时间
  timeout: RequestEnums.TIMEOUT as number,
  // 跨域时候允许携带凭证
  withCredentials: false,
  headers:{
    "Access-Control-Allow-Headers":"content-type"
  }
}


class RequestHttp {
  service: AxiosInstance
  public constructor(config: AxiosRequestConfig) {
    // 实例化
    this.service = Axios.create(config)
    // 请求拦截器
    this.service.interceptors.request.use(
      (config) =>{
        const token = localStorage.getItem("token") || ""
        return {
          ...config,
          headers: {
            "x-access-token": token
          }
        }
      },
      (error: AxiosError) =>{
        return Promise.reject(error+"1111111111111")
      }
    )

    // 响应拦截器
    this.service.interceptors.response.use(
      (response:AxiosResponse) => {
        const {data, config} = response
        if(data.code === RequestEnums.OVERDUE){
          // 登录失效
          localStorage.setItem("token","")
          return Promise.reject(data)
        }
        // 错误信息拦截(防止文件下载数据流)
        if(data.code && data.code !== RequestEnums.SUCCESS){
          return Promise.reject(data)
        }
        return data
      },
      (error:AxiosError) => {
        const {response} = error
        if(response){
          this.handleCode(response.status)
        }
        return Promise.reject(response?.status)
      }
    )
  }
  handleCode(code: number):void{
    switch (code) {
      case 401:
        Dialog({message:"请获取最新token地址!"})
        break;
      case 0:
        // Dialog({message:"请检查网络!"})
        break;
      case 409:
        // alert("123")
        break;
      default:
        Dialog({ message: "token失效, 点击重新登录" }).then(
          res=>{
            localStorage.removeItem("token")
            router.push({
              path:"/login"
            })
          }
        )
        break;
    }
  }

  // 常用请求封装
  get<T>(url: string,params?: object):Promise<ResultData>{
    return this.service.get(url, {params})
  }
  // post<T>(url: string,params?: object):Promise<ResultData>{
  //   return this.service.post(url, params)
  // }
  post<T>(url: string,params?: object){
    return this.service.post(url, params)
  }
  put<T>(url: string,params?: object):Promise<ResultData>{
    return this.service.put(url, {params})
  }
  delete<T>(url: string,params?: object):Promise<ResultData>{
    return this.service.delete(url, {params})
  }
}



export default new RequestHttp(config)