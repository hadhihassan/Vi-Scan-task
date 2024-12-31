import { axiosInstance } from "../lib/axios";

export const updateProfilePic = async (file) => {
    const response = await axiosInstance.patch('/profile/update-profilePic', { file })
    return response.data
}

export const updateProfile = async (data) => {
    const response = await axiosInstance.patch('/profile', data)
    return response.data
}