import Axios from "./Caller.service";

const BASE_PATH = "match/";

const getMatchById = (id: number) => {
    return Axios.get(BASE_PATH + "find/" + id);
}

const updateMatch = (updatedMatch : any) => {
    return Axios.post(BASE_PATH + "update/" + updatedMatch.id, updatedMatch)
}

const getAllMatches = () => {
    return Axios.get(BASE_PATH + "list/all");
}
export const matchService = {
    getMatchById,
    getAllMatches, 
    updateMatch, 
}