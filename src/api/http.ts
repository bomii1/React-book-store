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

    axiosInstance.interceptors.response.use((response) => {
        return response;
        }, 
        (error) => {
            // 로그인 만료처리
            if (error.response.status === 401) {
                console.log('in');
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

