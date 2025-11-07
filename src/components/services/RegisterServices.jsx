import axios from "axios";


const BASE = import.meta.env.VITE_SERVER_URL;
const AUTH_URL = `${BASE}/app1/api/v1/auth/register`;
class RegisterServices{
    addAuth(credentials){
        return axios.post(`${AUTH_URL}` , credentials);
    }
}

export default new RegisterServices();