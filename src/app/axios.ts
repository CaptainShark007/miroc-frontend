import { store } from '@app/store';
import { clearToken } from '@features/auth/slices/auth.slice';
import { JwtPayload } from '@features/auth/types';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
    Authorization: '',
  },
  timeout: 10000,
});

axiosInstance.interceptors.request.use(
  (request) => {
    const token = store.getState().auth.token;
    const dispatch = store.dispatch;

    if (token) {
      try {
        const decoded = jwtDecode<JwtPayload>(token);
        const isTokenExpired = Date.now() >= (decoded.exp || 0) * 1000;

        if (isTokenExpired) {
          console.warn('Token expirado, limpiando sesión');
          dispatch(clearToken());
        } else {
          request.headers.Authorization = `Bearer ${token}`;
        }
      } catch (error) {
        console.error('Error al decodificar el token:', error);
        dispatch(clearToken());
      }
    }

    return request;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  async (response) => {
    return response;
  },
  async (error) => {
    return Promise.reject(error);
  }
);

export interface HttpClient {
  get<T>(url: string): Promise<T>;
  post<T>(url: string, data?: any): Promise<T>;
  put<T>(url: string, data?: any): Promise<T>;
  delete<T>(url: string): Promise<T>;
}

const AxiosClient: HttpClient = {
  get: (url) => axiosInstance.get(url).then((res) => res.data),
  post: (url, data) => axiosInstance.post(url, data).then((res) => res.data),
  put: (url, data) => axiosInstance.put(url, data).then((res) => res.data),
  delete: (url) => axiosInstance.delete(url).then((res) => res.data),
};

export default AxiosClient;
