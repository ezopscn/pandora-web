import axios from 'axios';
import { GetToken } from '@/utils/Token.jsx';

// 全局 Axios 配置实例
const instance = axios.create({
  timeout: 5000 // 请求超时时间
});

// 请求拦截器
instance.interceptors.request.use(
  function(config) {
    config.headers.Authorization = 'Bearer ' + GetToken(); // 在请求中添加 Token
    return config;
  },
  function(error) {
    return Promise.reject(error);
  }
);

// 响应拦截器
instance.interceptors.response.use(
  function(response) {
    return response;
  },
  function(error) {
    return Promise.reject(error);
  }
);

// GET 请求
export const GET = (url, params) => instance.get(url, params).then((res) => res.data);

// POST 请求
export const POST = (url, data) => instance.post(url, data).then((res) => res.data);

// PUT 请求
export const PUT = (url, data) => instance.put(url, data).then((res) => res.data);

// PATCH 请求
export const PATCH = (url, data) => instance.patch(url, data).then((res) => res.data);

// DELETE 请求
export const DELETE = (url) => instance.delete(url).then((res) => res.data);