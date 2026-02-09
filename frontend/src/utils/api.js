import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add auth token to requests
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Handle response errors
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

// Auth API
export const authAPI = {
    register: (data) => api.post('/auth/register', data),
    login: (data) => api.post('/auth/login', data),
    getMe: () => api.get('/auth/me'),
};

// Income API
export const incomeAPI = {
    getAll: () => api.get('/income'),
    getOne: (id) => api.get(`/income/${id}`),
    create: (data) => api.post('/income', data),
    update: (id, data) => api.put(`/income/${id}`, data),
    delete: (id) => api.delete(`/income/${id}`),
};

// Expense API
export const expenseAPI = {
    getAll: () => api.get('/expense'),
    getOne: (id) => api.get(`/expense/${id}`),
    create: (data) => api.post('/expense', data),
    update: (id, data) => api.put(`/expense/${id}`, data),
    delete: (id) => api.delete(`/expense/${id}`),
};

// Dashboard API
export const dashboardAPI = {
    getStats: () => api.get('/dashboard/stats'),
};

export default api;
