import axios from "axios";

const apiClient = axios.create({
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  // Debug logging for register endpoint
  if (config.url?.includes('/register')) {
    console.log('Axios interceptor - Request config:', {
      url: config.url,
      method: config.method,
      data: config.data,
      headers: config.headers
    });
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && error.response.data?.message === "Invalid or expired token" && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshToken = localStorage.getItem("refreshToken");
        const { data } = await axios.post(
          "http://localhost:8081/api/auth/refresh",
          { token: refreshToken }
        );
        localStorage.setItem("accessToken", data.accessToken);
        apiClient.defaults.headers.common.Authorization = `Bearer ${data.accessToken}`;
        return apiClient(originalRequest);
      } catch (err) {
        console.error("Token refresh failed:", err);
        localStorage.removeItem("accessToken");
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

export default apiClient;
