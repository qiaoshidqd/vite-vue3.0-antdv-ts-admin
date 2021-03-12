import axios from "axios";
import { message } from "ant-design-vue"
import { getToken } from "./cookies";
axios.defaults.headers = {
  "Content-Type": "application/json;charset=utf8"
};

axios.defaults.baseURL = process.env.VUE_APP_BASE_API
  ? process.env.VUE_APP_BASE_API
  : "";

axios.interceptors.request.use(
  config => {
    let token = getToken()
    if (token) {
      config.headers["X-Access-Token"] = token;
    }
    return config;
  },
  error => {
    Promise.reject(error);
  }
);

axios.interceptors.response.use(
  response => {
    const res = response.data;
    if (res.code !== 200){
        message.error(res.message || "Error")
        return Promise.reject(new Error(res.message || "Error"));
    } else {
      return response;
    }
  },
  error => {
    message.error(error.message || "Error")
    return Promise.reject(error);
  }
);

export function formateURLOnlyGet(link: string, json: object) {
  let url = link;
  var data = Object.entries(json);
  if (data.length) {
    url += url.indexOf("?") == -1 ? "?" : "";
    url += Object.entries(data)
      .map(item => {
        return item[1].join("=");
      })
      .join("&");
  }
  return url;
}

/**
 * GET请求方法
 * @param {String} url 请求地址
 * @param {json} json 请求参数
 */
export function getData(url: string, json: object) {
  return axios
    .get(formateURLOnlyGet(url, json))
    .then(res => res.data)
    .catch(error => error.response);
}

export function postData(url: string, json?: object) {
  return axios
    .post(url, json)
    .then(res => res.data)
    .catch(error => error.response);
}