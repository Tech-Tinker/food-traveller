import axios from "axios";

axios.defaults.baseURL = 'http://127.0.0.1:8000';
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.post['Accept'] = 'application/json';

// axios.defaults.withCredentials = true;
// axios.interceptors.request.use(function (config) {
//     const token = localStorage.getItem('auth_token');
//     config.headers.Authorization = token ? `Bearer ${token}` : '';
//     return config;
// });

export const AuthService = () => {
    const urnRegister = 'api/register';
    const urnLogin = 'api/login';

    const register = ($data) => {
        const res = axios.post(urnRegister, $data);
        return res;
    };

    const login = ($data) => {
        const res = axios.post(urnLogin, $data);
        return res;
    }

    return {
        register,
        login
    }
}