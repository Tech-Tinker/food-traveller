import axios from "axios";

axios.defaults.baseURL = 'http://127.0.0.1:8000';
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.post['Accept'] = 'application/json';

axios.defaults.withCredentials = true;

axios.interceptors.request.use(function (config) {
    const token = localStorage.getItem('auth_token');
    config.headers.Authorization = token ? `Bearer ${token}` : '';
    return config;
});

const urnRegister = 'api/register';
const urnLogin = 'api/login';

export async function register($data) {
    try {
        const outcome = await axios.post(urnRegister, $data) // Añade axios.post
        return outcome.data;
    } catch (error) {
        throw error;
    }
};

export async function login($data) {
    try {
        const res = await axios.post(urnLogin, $data);
        return res.data;
    } catch (error) {
        throw error;
    }
}


const AuthServices = { register, login };

export default AuthServices;

