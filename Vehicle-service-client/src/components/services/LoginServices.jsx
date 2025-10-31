import axios from "axios";


const BASE = import.meta.env.VITE_SERVER_URL;

class LoginServices{
    postLogin(credentials){
        return axios.post(`${BASE}/app1/api/v1/auth/login` , credentials);
    }
}

export default new LoginServices();