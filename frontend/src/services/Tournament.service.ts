import Axios from "./Caller.service";

const BASE_PATH = "tournament/";

const getTournamentList = () => {
    return Axios.get(BASE_PATH + "all");
}

const getTournamentWithoutMatchesById = (id: number) => {
    return Axios.get(BASE_PATH + "find/" + id);
}
const getTournamentWithMatchesById = (id: number) => {
    return Axios.get(BASE_PATH + "find/withMatches/" + id);
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

const generateTournament = (tournamentId : number) => {
    return Axios.post(BASE_PATH + "generate/" + tournamentId)
}

export const tournamentService = {
    getTournamentList,
    getTournamentWithoutMatchesById,
    createTournament,
    addTeamToTournament,
    generateTournament,
    getTournamentWithMatchesById,
}

