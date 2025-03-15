import Axios from "./Caller.service";

const BASE_PATH = "tournament/";

const getTournamentList = () => {
    return Axios.get(BASE_PATH + "all");
}

const getTournamentById = (id: number) => {
    return Axios.get(BASE_PATH + "find/" + id);
}

const createTournament = (tournamentData :any) => {
    console.log(tournamentData);  
    return Axios.post(BASE_PATH + "create",tournamentData);
}
export const tournamentService = {
    getTournamentList,
    getTournamentById,
    createTournament,
}

