import Axios from "./Caller.service";

const BASE_PATH = "team/";

const getTeamById = (id:number) => {
    return Axios.get(BASE_PATH + "find/" + id)
}

const getAllTeams = () => {
    return Axios.get(BASE_PATH + "all");
}

const getListAllTeams = () => {
    return Axios.get(BASE_PATH + "list/all");
}
export const teamService = {
    getAllTeams,    
    getListAllTeams,
    getTeamById,
}