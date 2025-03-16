import Axios from "./Caller.service";

const pathName = "/player/"

const login = async (credentials: any) => {
    return Axios.post(pathName + "login", credentials);
}

const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("isAdmin");
}

const saveToken = (token: string) => {
    localStorage.setItem('token', token);
}

const isAdmin = async () : Promise<boolean> => {
    const isAdmin = localStorage.getItem("isAdmin");
    if (!isAdmin || isAdmin !== "true") {
        return false;
    }
    return (await Axios.post(pathName + "checkAdmin")).request.status == 200
}

const isLogged = async () => {
    const token = localStorage.getItem('token');
    if (!token || token === "") {
        return false;
    }
    return true;
}

const signIn = (data: any) => {
    return Axios.post(pathName + "create", data);
}

const getPlayerData = (id: number) => {
    return Axios.get(pathName + id);
}


export const playerService = {
    login,
    logout,
    saveToken,
    isLogged,
    signIn,
    getPlayerData,
    isAdmin
}