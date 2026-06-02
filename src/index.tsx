import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeContextProvider, AxiosProvider, ToastProvider, ErrorBoundary } from 'fog-ui';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { API_BASE_URLS } from './config/apiConfig';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <React.StrictMode>
    <Router>
      <ErrorBoundary>
        <AxiosProvider
          services={{
            auth: {
              baseURL: API_BASE_URLS.user,
              requiresAuth: false, // Auth endpoints don't require token
            },
            user: {
              baseURL: API_BASE_URLS.user,
              requiresAuth: true, // User/Role/Tenant endpoints require auth
            },
            project: {
              baseURL: API_BASE_URLS.project,
              requiresAuth: true,
            },
            testcase: {
              baseURL: API_BASE_URLS.testcase,
              requiresAuth: true,
            },
            results: {
              baseURL: API_BASE_URLS.results,
              requiresAuth: true,
            },
            configuration: {
              baseURL: API_BASE_URLS.configuration,
              requiresAuth: true,
            },
          }}
          authConfig={{
            tokenKey: 'accessToken',
            refreshConfig: {
              refreshEndpoint: '/auth/refresh',
              refreshTokenKey: 'refreshToken',
            },
            onRefreshFailed: () => {
              localStorage.removeItem('accessToken');
              localStorage.removeItem('refreshToken');
              localStorage.removeItem('userId');
              localStorage.removeItem('tenantId');
              window.location.href = '/login';
            },
          }}
        >
          <ToastProvider>
            <ThemeContextProvider>
              <App />
            </ThemeContextProvider>
          </ToastProvider>
        </AxiosProvider>
      </ErrorBoundary>
    </Router>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(console.log);
