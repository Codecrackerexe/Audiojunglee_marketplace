import axios from "axios";

const api = axios.create({
    baseURL: 'http://127.0.0.1:8000/api/'
});

// Adding a request interceptor to add auth token to requests`
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('access_token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error) 
);

// Adding a response interceptor to handle token refresh
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        
        // if 401, refresh hasn't been done
        if(error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                const refreshToken = localStorage.getItem('refresh_token');
                if(!refreshToken) {
                    return Promise.reject(error); //no refresh, redirect to login
                }
                
                const response = await api.post('api/auth/token/refresh/', {
                    refresh: refreshToken
                });
                
                localStorage.setItem('access_token', response.data.access);
                api.defaults.headers.common['Authorization'] = `Bearer ${response.data.access}`;
                originalRequest.headers['Authorization'] = `Bearer ${response.data.access}`;

                return api(originalRequest);
            } catch (refreshError) {
                // if token invalid, clear storage and redirect to login
                localStorage.removeItem('access_token');
                localStorage.removeItem('refresh_token');
                return Promise.reject(refreshError);
            }
        }
        return Promise.reject(error);
    }
);
export default api;