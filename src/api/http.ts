import axios, { AxiosRequestConfig } from "axios";
import { getToken, removeToken } from "../store/authStore";

const BASE_URL = 'http://localhost:9999';
const DEFAULT_TIMEOUT = 30000;

export const createClient = (config?: AxiosRequestConfig) => {
    const axiosInstance = axios.create({
        baseURL: BASE_URL,
        timeout: DEFAULT_TIMEOUT,
        headers: {
            'content-type': 'application/json',
            Authorization: getToken() ? getToken() : "",
        },
        withCredentials: true,
        ...config,
    });

    // 각 요청에 대해 동적으로 헤더의 Authorization 필드에 토큰 넣어줌
    axiosInstance.interceptors.request.use((config) => {
        const token = getToken();
        if (token) {
            config.headers.Authorization = token;
        }
        return config;
    });

    axiosInstance.interceptors.response.use((response) => {
        return response;
        }, 
        (error) => {
            // 로그인 만료처리
            if (error.response.status === 401) {
                removeToken();
                window.location.href = '/login'; // 네비게이트를 바로 쓸 수 없기 때문에 얼리리턴됨
                return;
            }
            return Promise.reject(error);
        }
    );

    return axiosInstance;
};

export const httpClient = createClient();

// 공통 요청 부분 (추가)
type requestMethod = "get" | "post" | "put" | "delete";

export const requestHandler = async <T>(method: requestMethod, url: string, payload?: T) => {
    let response;

    switch(method) {
        case "post":
            response = await httpClient.post(url, payload);
            break;
        case "get":
            response = await httpClient.get(url);
            break;
        case "put":
            response = await httpClient.put(url, payload);
            break;
        case "delete":
            response = await httpClient.delete(url);
            break;
    }
    return response.data;
}

