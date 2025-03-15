import Axios from "./Caller.service";

const getTournamentList = () => {
    return Axios.get("tournament/all");
}

const getTournamentById = (id: number) =>{
    return Axios.get("tournament/find/"+id);
}
export const tournamentService = {
    getTournamentList,
    getTournamentById
}

