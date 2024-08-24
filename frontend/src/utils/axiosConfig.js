import axios from 'axios';

export const apiRequest = axios.create({
  baseURL: import.meta.env.VITE_API_DOMAIN,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const apiRequestPrivate = axios.create({
  baseURL: import.meta.env.VITE_API_DOMAIN,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true, // This allows cookies to be sent with requests
});

apiRequestPrivate.interceptors.request.use(
  (config) => {
    // The access token is automatically included in cookies, no need to set Authorization header
    return config;
  },
  (error) => Promise.reject(error)
);

// apiRequestPrivate.interceptors.response.use(
//   (response) => response, // Pass through successful responses
//   async (error) => {
//     const originalRequest = error.config;
//     if (error.response?.status === 403 && !originalRequest._retry) {
//       // Check if it's a 401 error and not a retry attempt
//       try {
//         const response = await apiRequestPrivate.post('/users/refresh-token', {
//           withCredentials: true,
//         });

//         if (response.status !== 200) {
//           // Check for success response from backend
//           console.error('Refresh token failed:', response.data.message);
//           // Handle refresh failure (e.g., prompt re-login)
//           return Promise.reject(error);
//         }

//         originalRequest._retry = true; // Mark as retry attempt

//         return apiRequestPrivate(originalRequest); // Retry the original request with new access token
//       } catch (refreshError) {
//         console.error('Refresh token error:', refreshError.message);
//         // Handle network errors or other refresh errors (e.g., prompt re-login)
//         return Promise.reject(error);
//       }
//     }

//     return Promise.reject(error);
//   }
// );

// apiRequestPrivate.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response.status === 401 && error.response.statusText === 'Unauthorized') {
//       window.location.href = '/sign-in';
//       return Promise.reject(error);
//     }

//     return Promise.reject(error);
//   }
// );
