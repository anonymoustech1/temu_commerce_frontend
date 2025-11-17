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
    (error) => {F
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
                const response = await axios.post(`${API_BASE_URL}/auth/token/refresh/`, {
                    refresh: refreshToken
                })

                const { access } = response.data
                localStorage.setItem('access_token', access)
                originalRequest.headers.Authorization = `Bearer ${access}`

                return api(originalRequest)
            } catch (error) {
                localStorage.removeItem('access_token')
                localStorage.removeItem('refresh_token')
                window.location.href = 'login'
                return Promise.reject(error)
            }
        }

        return Promise.reject(error)
    }
)

export const authAPI = {
    login: (credentials) => api.post('auth/login/', credentials),
    register: (userData) => api.post('auth/register/', userData),
    logout: () => api.post('auth/logout'),
    profile: () => api.post('auth/profile'),
    UpdateProfile: (data) => api.patch('auth/profile/', data),

}

export const productsAPI = {
    list: (params) => api.get(`/products/categories`, { params }),
    retrieve: (slug) => api.get(`/products/products/${slug}/`),
    related: (slug) => api.get(`/products/products/${slug}/related/`),
    categories: () => api.get(`/products/categories/`),
}

export const cartAPI = {
    retrieve: () => api.get('/orders/cart/'),
    addItem: (data) => api.post('/orders/cart/items/', data),
    updateItem: (id, data) => api.patch(`/orders/cart/items/${id}/`, data),
    removeItem: (id) => api.delete(`/orders/cart/items/${id}/`),
    clear: () => api.delete('/orders/cart/clear/'),
}

export const ordersAPI = {
    list: () => api.get('/orders/orders'),
    create: (data) => api.post('/orders/', data),
    retrieve: (id) => api.get(`/orders/${id}/`),
    cancel: (id) => api.post(`orders/${id}/cancel/`),
}

export const reviewsAPI = {
    list: (productId) => api.get(`/products/${productId}/reviews/`),
    create: (productId, data) => api.post(`/products/${productId}/reviews/`, data),
    vote: (reviewId, data) => api.post(`/reviews/${reviewId}/vote`, data)
}
export const VendorAPI = {
    getStat: () => api.get('/vendor/stats'),
    getProducts: ()=> api.get('/vendor/products/'),
    createProduct: (data) => api.post('/vendor/products/', data),
    updateAddress: (id, data) => api.patch(`auth/auth/addresses/${id}/`, data),
    deleteAddress: (id) => api.delete(`auth/auth/addresses/${id}`),
}
export const userAPI = {
    getAddresses: () => api.get('/auth/addresses/'),
    createAddress: (data) => api.post('/auth/addresses/', data),
    updateAddress: (id, data) => api.patch(`/auth/addresses/${id}/`, data),
    deleteAddress: (id) => api.delete(`/auth/addresses/${id}`),
}

export default api