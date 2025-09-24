import axios from "axios";

const api = "http://localhost:3001/skill";

class BookingServices {
    getAllSkills() {
        return axios.get(`${api}`);
    }
    addSkill(skill) {
        return axios.post(`${api}`, skill);
    }
    deleteSkillByName(name) {
        return axios.delete(`${api}/${name}`);
    }
}

export default new BookingServices();
