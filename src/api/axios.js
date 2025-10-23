// src/api/axios.js
import { saveAccessToken, getAccessToken, removeAccessToken } from "../utils/tokenStorage";
import axios from "axios";

// ==========================
// Axios Instance
// ==========================
const api = axios.create({
  baseURL: "https://haoc.vercel.app/api/v1",
  withCredentials: true, // send HttpOnly refresh cookies
});

// ==========================
// Request Interceptor
// ==========================
api.interceptors.request.use((config) => {
  // Removed: (config: InternalAxiosRequestConfig)
  const token = getAccessToken();
  if (token && config.headers) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

// ==========================
// Response Interceptor
// ==========================
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Prevent infinite loop
    if (originalRequest._retry) {
      return Promise.reject(error);
    }

    // Skip auto-refresh for these endpoints
    const skipRefreshEndpoints = [
      "/auth/login",
      "/auth/change-password",
      "/auth/verify-otp",
      "/auth/register",
      "/auth/logout",
    ];
    
    const isAuthError = error.response?.status === 401;
    const isNotRefreshEndpoint = !skipRefreshEndpoints.includes(originalRequest?.url || "");

    // Check for 401 Unauthorized error and ensure it's not a skipped endpoint
    if (
      isAuthError &&
      originalRequest &&
      isNotRefreshEndpoint
    ) {
      try {
        originalRequest._retry = true;

        // Call refresh token endpoint (using standard axios instance)
        const { data } = await axios.post(
          "https://haoc.vercel.app/api/v1/auth/refresh-token",
          {},
          { withCredentials: true }
        );

        // ✅ Save new access token using helper
        // Note: saveAccessToken should return the token or handle its storage.
        saveAccessToken(data.accessToken); 
        
        // Get the token again after saving (assuming saveAccessToken doesn't return it)
        const newToken = getAccessToken(); 

        if (newToken) {
          // Update Authorization header for original request
          // Ensure headers object exists on the config
             originalRequest.headers = originalRequest.headers || {};
          originalRequest.headers["Authorization"] = `Bearer ${newToken}`;
        }

        // Retry original request with updated token using the 'api' instance
        return api(originalRequest);
      } catch (refreshError) {
        // If refresh fails, clear stored token and reject
        removeAccessToken();
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;