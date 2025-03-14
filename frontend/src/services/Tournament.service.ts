import Axios from "./Caller.service";

const getTournamentList = () => {
    return Axios.get("tournament/all")
}
export const tournamentService = {
    getTournamentList
}