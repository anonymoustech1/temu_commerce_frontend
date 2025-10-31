import axios from "axios"

const API_BASE_URL = 'http://localhost:8000/api'

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
})

//request interceptor to add auth token 
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('access_token')
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

//response interceptor to handle token refresh
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true

            try {
                const refreshToken = localStorage.getItem('refresh_token')
                const response = await axios.post(`${API_BASE_URL}/token/refresh/`, {
                    refresh: refreshToken
                })

                const { access } = response.data
                localStorage.setItem('access_token', access)
                originalRequest.headers.Authorization = `Bearer ${access}`

                return api(originalRequest)
            } catch (error) {
                localStorage.removeItem('access_token')
                localStorage.removeItem('refresh_token')
                window.location.href = '/login'
                return Promise.reject(error)
            }
        }

        return Promise.reject(error)
    }
)

export const authAPI = {
    login: (credentials) => api.post('/auth/login/', credentials),
    register: (userData) => api.post('/auth/register/', userData),
    logout: () => api.post('/auth/logout'),
    profile: () => api.post('/auth/profile'),
    UpdateProfile: (data) => api.patch('/auth/profile/', data),

}

export const productsAPI = {
    list: (params) => api.get('/products/', { params }),
    retrieve: (slug) => api.get(`/products/${slug}/`),
    related: (slug) => api.get(`/products/${slug}/related/`),
    categories: () => api.get(`categories/`),
}

export const cartAPI = {
    retrieve: () => api.get('/cart/'),
    addItem: (data) => api.post('/cart/items/', data),
    updateItem: (id, data) => api.patch(`/cart/items/${id}/`, data),
    removeItem: (id) => api.delete(`/cart/items/${id}/`),
    clear: () => api.delete('/cart/clear/'),
}

export const ordersAPI = {
    list: () => api.get('/orders'),
    create: (data) => api.post('/orders/', data),
    retrieve: (id) => api.get(`/orders/${id}/`),
    cancel: (id) => api.post(`orders/${id}/cancel/`),
}

export const reviewsAPI = {
    list: (productId) => api.get(`/products/${productId}/reviews/`),
    create: (productId, data) => api.post(`/products/${productId}/reviews/`, data),
    vote: (reviewId, data) => api.post(`/reviews/${reviewId}/vote`, data)
}

export default api