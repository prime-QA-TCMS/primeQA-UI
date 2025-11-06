import React, { createContext, useContext, ReactNode } from "react";
import axios, { AxiosInstance, AxiosError } from "axios";
import { AxiosHelper } from "../utils/axiosHelper";
import { API_BASE_URLS } from "../config/apiConfig";

// ✅ Define microservice APIs
interface AxiosHelpers {
  userApi: AxiosHelper;
  projectApi: AxiosHelper;
  testcaseApi: AxiosHelper;
  configurationApi: AxiosHelper;
  resultsApi: AxiosHelper;
}

const AxiosContext = createContext<AxiosHelpers | undefined>(undefined);

// ✅ Hook to access axios context
export const useAxios = (): AxiosHelpers => {
  const context = useContext(AxiosContext);
  if (!context) throw new Error("useAxios must be used within an AxiosProvider");
  return context;
};

// ✅ Helper to create axios instances with refresh token support
const createAxiosInstance = (baseURL: string, withAuth = true): AxiosHelper => {
  const token = localStorage.getItem("token");
  const instance: AxiosInstance = axios.create({
    baseURL,
    timeout: 10000,
    headers: { "Content-Type": "application/json" },
  });
  
  // 🔹 Attach access token to all requests
  instance.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("accessToken");
      if (token && withAuth) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );


  return new AxiosHelper(instance);
};

// ✅ Axios Provider: registers all microservice instances
export const AxiosProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const axiosHelpers: AxiosHelpers = {
    // userApi: no auth for login/register/refresh
    userApi: createAxiosInstance(API_BASE_URLS.user || "http://localhost:5001", false),
    projectApi: createAxiosInstance(API_BASE_URLS.project || "http://localhost:5002", true),
    testcaseApi: createAxiosInstance(API_BASE_URLS.testcase || "http://localhost:5003", true),
    configurationApi: createAxiosInstance(API_BASE_URLS.configuration || "http://localhost:5004", true),
    resultsApi: createAxiosInstance(API_BASE_URLS.results || "http://localhost:8084", true),
  };

  return <AxiosContext.Provider value={axiosHelpers}>{children}</AxiosContext.Provider>;
};
