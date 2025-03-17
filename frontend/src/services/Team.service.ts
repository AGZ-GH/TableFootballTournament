import Axios from "./Caller.service";

const BASE_PATH = "team/";

const createTeam = (data: any) => {
    return Axios.post(BASE_PATH, data);
}

const getTeamById = (id: number) => {
    return Axios.get(BASE_PATH + "find/" + id)
}

const getAllTeams = () => {
    return Axios.get(BASE_PATH + "all");
}

const getListAllTeams = () => {
    return Axios.get(BASE_PATH + "list/all");
}

const getPlayerTeam = (playerId: number) => {
    return Axios.get(BASE_PATH + "find/byPlayer/" + playerId)
}

const getTeamListFilteredByIds = (ids: number[]) => {
    return Axios.post(BASE_PATH + "filter/byIds/list", { teamIds: ids });

}
export const teamService = {
    getAllTeams,
    getListAllTeams,
    getTeamById,
    getPlayerTeam,
    getTeamListFilteredByIds,
    createTeam,
}