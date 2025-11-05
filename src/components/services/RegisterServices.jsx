import axios from "axios";


const BASE = import.meta.env.VITE_SERVER_URL;
const AUTH_URL = `${BASE}/app1/api/v1/auth/register`;
class RegisterServices{
    getAuth(){
        return axios.get(`${api}/app2/api`);
    }
    getAuthById(id){
        return axios.get(`${api}/${id}`);
    }
    addAuth(credentials){
        return axios.post(`${AUTH_URL}` , credentials);
    }
    deleteAuth(id){
        return axios.delete(`${api}/${id}`);
    }
    editAuth(id , credentials){
        return axios.put(`${api}/${id}` , credentials);
    }
}

export default new RegisterServices();