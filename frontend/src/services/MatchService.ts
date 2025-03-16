import Axios from "./Caller.service";

const BASE_PATH = "match/";

const getMatchById = (id: number) => {
    return Axios.get(BASE_PATH + "find/" + id);
}


const getAllMatches = () => {
    return Axios.get(BASE_PATH + "list/all");
}
export const matchService = {
    getMatchById,
    getAllMatches,  
}