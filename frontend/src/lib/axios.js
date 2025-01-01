import axios from 'axios';

export const axiosInstance = axios.create({
    baseURL : 'https://vi-scan-task.onrender.com/api',
    withCredentials:true    
})