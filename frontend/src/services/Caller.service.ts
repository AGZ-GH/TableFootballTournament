import axios from 'axios'

const Axios = axios.create({
    baseURL: 'http://localhost:3000'
});

Axios.interceptors.request.use(async (request) => {
    const token = localStorage.getItem('token');
    request.headers.Authorization = "Bearer " + token;
    return request;
}); 

Axios.interceptors.response.use(response => {
    return response;
}, error => { return error });

export default Axios;