import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true, // Habilitar el envío de cookies
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para manejar el error 401
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401) {
      if (originalRequest.url.includes('/auth/login') || originalRequest.url.includes('/auth/refresh')) {
        // Si la solicitud fallida es al login o al refresh, eliminar el token y redirigir al login
        return Promise.reject(error);
      }

      // Evitar reintentar más de una vez
      if (!originalRequest._retry) {
        originalRequest._retry = true;

        try {
          // Solicitar un nuevo access token
          const response = await api.post('/auth/refresh');

          const newAccessToken = response.data.accessToken;
          localStorage.setItem('accessToken', newAccessToken);

          originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
          return api(originalRequest);
        } catch (refreshError) {
          console.error('Error al refrescar el token:', refreshError);
          // Si el refresh falla, eliminar el token y redirigir al login
          localStorage.removeItem('accessToken');
          window.location.href = '/login';
          return Promise.reject(refreshError);
        }
      }
    }

    return Promise.reject(error);
  }
);

export default api;
