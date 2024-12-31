import { axiosInstance } from "../lib/axios";

export const login = async (data) => {
    const response = await axiosInstance.post('/auth/login', data)
    return response.data
}
export const siginUp = async (data) => {
    const response = await axiosInstance.post('/auth/signup', data)
    return response.data
}
export const logout = async () => {
    const response = await axiosInstance.get('/auth/logout')
    return response.data
}
export const checkAuth = async () => {
    const response = await axiosInstance.get('/auth/check')
    return response.data
} 