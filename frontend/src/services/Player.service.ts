import Axios from "./Caller.service";

const pathName = "/player/"

const login = (credentials: any) => {
    return Axios.post(pathName + "login", credentials);
}

const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
}

const saveToken = (token: string) => {
    localStorage.setItem('token', token);
}

const isLogged = async () => {
    const token = localStorage.getItem('token');
    const id = localStorage.getItem('userId');
    if(!id || !token || token === ""){
        return false;
    }
    let isLogged : boolean = false;
    await Axios.post(pathName + "checkSession",{token:token, id:id}).then(res => {
        isLogged = res.data.isLogged;
    });
    return isLogged;
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
    getPlayerData
}