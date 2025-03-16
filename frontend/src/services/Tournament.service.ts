import Axios from "./Caller.service";

const BASE_PATH = "tournament/";

const getTournamentList = () => {
    return Axios.get(BASE_PATH + "all");
}

const getTournamentById = (id: number) => {
    return Axios.get(BASE_PATH + "find/" + id);
}

const createTournament = (tournamentData :any) => {
    return Axios.post(BASE_PATH + "create",tournamentData);
}

const addTeamToTournament = (teamId :number, tournamentId: number) => {
    const data = {
        tournamentId: tournamentId,
        teamId: teamId,
    }
    Axios.post(BASE_PATH + "addTeam",data);
}

export const tournamentService = {
    getTournamentList,
    getTournamentById,
    createTournament,
    addTeamToTournament,
}

