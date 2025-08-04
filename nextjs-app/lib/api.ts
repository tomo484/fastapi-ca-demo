import axios, { AxiosInstance, AxiosResponse } from "axios";

const apiClient: AxiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000",
    timeout: 1000,
    headers: {
        "Content-Type": "application/json",
    },
});

apiClient.interceptors.request.use(
    (response) => response,
    (error) => {
        console.error("API Error:", error.response?.data || error.message);
        return Promise.reject(error);
    }
);

export default apiClient;