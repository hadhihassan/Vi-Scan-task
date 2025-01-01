import { axiosInstance } from "../lib/axios";

export const createBlog = async (data) => {
    const response = await axiosInstance.post('/blog', data)
    return response.data
}

export const getAllBlogs = async (page, limit) => {
    const response = await axiosInstance.get(`/blog?page=${page}&limit=${limit}`);
    return response.data;
};

export const getMyBlogs = async (page, limit) => {
    const response = await axiosInstance.get(`/blog/my-blogs?page=${page}&limit=${limit}`);
    return response.data;
};

export const deleteBlog = async (id) => {
    const response = await axiosInstance.delete(`/blog/${id}`);
    return response.data;
};

export const updateBlog = async (id, data) => {
    const response = await axiosInstance.put(`/blog/${id}`, { data });
    return response.data;
};

export const getBlog = async (id) => {
    const response = await axiosInstance.get(`/blog/${id}`);
    return response.data;
};