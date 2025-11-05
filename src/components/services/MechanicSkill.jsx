import axios from "axios";

const api = "http://localhost:3001/skill";

class MechanicSkill {
    getAllSkills(id) {
        return axios.get(`${api}/${id}`);
    }
    addSkill(skill) {
        return axios.post(`${api}`, skill);
    }
    deleteSkillByName(name) {
        return axios.delete(`${api}/${name}`);
    }
}

export default new MechanicSkill();
