import Axios from "./Caller.service";

let login = (credentials : any) => {
    return Axios.post("/player/login", credentials);
}

let logout = () => {
    localStorage.removeItem("token");
}

let saveToken = (token   : string) => {
    localStorage.setItem('token', token);
}

let isLogged = () => {
    const token = localStorage.getItem('token');
    return !!token
}

export const playerService = {
    login,
    logout,
    saveToken,
    isLogged
}