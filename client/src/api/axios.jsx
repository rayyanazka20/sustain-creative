import axios from "axios";
import { store } from "../app/store.jsx";
import { logout } from "../app/slice/authSlice.jsx";

const axiosInstance = axios.create({
    baseURL: "http://localhost:8081/api",
    withCredentials: true,
});

axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
});

// Tangani token expired
axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && (error.response.status === 401 || error.response.status === 403)) {
            store.dispatch(logout());
            window.location.href = "/admin/login";
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
