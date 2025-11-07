import axios from "axios";
import { getAuthHeader } from "../../utils/getAuthHeader";


const BASE = import.meta.env.VITE_SERVER_URL;

class LoginServices{
    postLogin(credentials){
        return axios.post(`${BASE}/app1/api/v1/auth/login` , credentials);
    }

    getAllUsers(){
        return axios.get(`${BASE}/app1/api/v1/auth/all`,{headers:getAuthHeader()});
    }
    
    updateUserStatus(id,status){
        
        return axios.patch(`${BASE}/app1/api/v1/auth/${id}`,status,{headers: {
    ...getAuthHeader(),
    "Content-Type": "application/json"
  }});

    }
}

export default new LoginServices();