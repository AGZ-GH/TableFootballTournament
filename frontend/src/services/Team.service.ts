import Axios from "./Caller.service";

const BASE_PATH = "team/";

const getAllTeams = () => {
    return Axios.get(BASE_PATH + "all");
}

const getListAllTeams = () => {
    return Axios.get(BASE_PATH + "list/all");
}
export const teamService = {
    getAllTeams,    
    getListAllTeams,
}