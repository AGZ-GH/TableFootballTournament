import Axios from "./Caller.service";

const login = (credentials: any) => {
    return Axios.post("/player/login", credentials);
}

const logout = () => {
    localStorage.removeItem("token");
}

const saveToken = (token: string) => {
    localStorage.setItem('token', token);
}

const isLogged = () => {
    const token = localStorage.getItem('token');
    return !!token
}

const signIn = (data: any) => {
    return Axios.post("player/create", data);
}


export const playerService = {
    login,
    logout,
    saveToken,
    isLogged,
    signIn
}