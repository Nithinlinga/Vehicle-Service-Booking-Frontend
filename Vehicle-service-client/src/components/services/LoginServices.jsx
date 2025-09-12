import axios from "axios";

const api = "http://localhost:3001/login";

class LoginServices{
    postLogin(credentials){
        return axios.post(`${api}` , credentials);
    }
}

export default new LoginServices();