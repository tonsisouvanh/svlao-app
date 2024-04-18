import axios from "axios";

const apiRequest = axios.create({
  baseURL: import.meta.env.VITE_API_DOMAIN,
  withCredentials: true,
});

// Add interceptors for refresh token handling
apiRequest.interceptors.request.use(
  (config) => config,
  (error) => Promise.reject(error),
);

apiRequest.interceptors.response.use(
  (response) => response, // Pass through successful responses
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 403 && !originalRequest._retry) {
      // Check if it's a 401 error and not a retry attempt
      try {
        const response = await apiRequest.post("/users/refresh-token", {
          withCredentials: true,
        });
        if (!response.data.success) {
          // Check for success response from backend
          console.error("Refresh token failed:", response.data.message);
          // Handle refresh failure (e.g., prompt re-login)
          return Promise.reject(error);
        }

        const newAccessToken = response.data.accessToken;

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        originalRequest._retry = true; // Mark as retry attempt

        return apiRequest(originalRequest); // Retry the original request with new access token
      } catch (refreshError) {
        console.error("Refresh token error:", refreshError.message);
        // Handle network errors or other refresh errors (e.g., prompt re-login)
        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  },
);

export default apiRequest;
