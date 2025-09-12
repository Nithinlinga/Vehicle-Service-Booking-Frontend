import axios from "axios";
import { cloneElement } from "react";

const api = "http://localhost:3001/mechanics";

class MechanicServices{
    addMechanics(credentials){
        return axios.post(`${api}` , credentials);
    }
    getMechanics(){
        return axios.get(`${api}`);
    }
    getMechanicsById(id){
        return axios.get(`${api}/${id}`);
    }
    deleteMechanicsById(id){
        return axios.delete(`${api}/${id}`);
    }
    deleteMechanics(){
        return axios.delete(`${api}`);
    }
    editMechanics(id , credentials){
        return axios.put(`${api}/${id}`, credentials);
    }
    updateAvailability(id, availability) {
        return axios.patch(`${api}/${id}`, { availability });
    }
    updateRating(id, rating) {
        return axios.patch(`${api}/${id}`, { rating });
    }

}

export default new MechanicServices();