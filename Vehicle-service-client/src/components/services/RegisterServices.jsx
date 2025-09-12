import axios from "axios";

const api = "http://localhost:3001/register";

class RegisterServices{
    getAuth(){
        return axios.get(`${api}`);
    }
    getAuthById(id){
        return axios.get(`${api}/${id}`);
    }
    addAuth(credentials){
        return axios.post(`${api}` , credentials);
    }
    deleteAuth(id){
        return axios.delete(`${api}/${id}`);
    }
    editAuth(id , credentials){
        return axios.put(`${api}/${id}` , credentials);
    }
}

export default new RegisterServices();