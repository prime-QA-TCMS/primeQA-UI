// src/context/AxiosContext.tsx
import React, { createContext, useContext, ReactNode } from 'react';
import axios from 'axios';
import { AxiosHelper } from '../utils/axiosHelper';

// ✅ Define the type for multiple axios instances
interface AxiosHelpers {
    authApi: AxiosHelper;
    courseApi: AxiosHelper;
    progressApi: AxiosHelper;
    assessmentApi: AxiosHelper;
    notificationApi: AxiosHelper;
    cacheApi: AxiosHelper;
    forumApi: AxiosHelper;
    ratingApi: AxiosHelper;
}

// ✅ Create the context with default values
const AxiosContext = createContext<AxiosHelpers | undefined>(undefined);

// ✅ Custom Hook for consuming the Axios context
export const useAxios = (): AxiosHelpers => {
    const context = useContext(AxiosContext);
    if (!context) {
        throw new Error('useAxios must be used within an AxiosProvider');
    }
    return context;
};

// ✅ AxiosProvider managing multiple instances
export const AxiosProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const createAxiosInstance = (baseURL: string) => {
        const instance = axios.create({
            baseURL,
            headers: {
                'Content-Type': 'application/json'
            }
        });
        
        // ✅ Attach Interceptors for Token Management
        instance.interceptors.request.use(
            (config) => {
                const token = localStorage.getItem('token');
                if (token) {
                    config.headers.Authorization = `Bearer ${token}`;
                } else {
                    console.warn("No auth token found in localStorage");
                }
                return config;
            },
            (error) => {
                console.error("Error in request interceptor:", error);
                return Promise.reject(error);
            }
        );


        return new AxiosHelper(instance);
    };

    // ✅ Initialize multiple API helpers using AxiosHelper class
    const axiosHelpers: AxiosHelpers = {
        authApi: createAxiosInstance('http://127.0.0.1:5000'),
        courseApi: createAxiosInstance('http://127.0.0.1:5001'),
        progressApi: createAxiosInstance('http://127.0.0.1:5002'),
        assessmentApi: createAxiosInstance('http://127.0.0.1:5003'),
        notificationApi: createAxiosInstance('http://127.0.0.1:5004'),
        cacheApi: createAxiosInstance('http://127.0.0.1:5005'),
        forumApi: createAxiosInstance('http://127.0.0.1:5006'),
        ratingApi: createAxiosInstance('http://127.0.0.1:5007')
    };

    return (
        <AxiosContext.Provider value={axiosHelpers}>
            {children}
        </AxiosContext.Provider>
    );
};
