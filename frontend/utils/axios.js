import axios from 'axios';

const api = axios.create({
  // حطينا رابط الباك اند مباشرة هنا بدل المتغير
  baseURL: 'http://localhost:5000/api', 
});

// إضافة الـ Token لأي ريكويست بيتبعت للباك اند
api.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

export default api;