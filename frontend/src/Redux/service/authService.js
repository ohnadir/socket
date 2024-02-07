import axios from 'axios';

export const baseUrl = "http://localhost:8080/user";
const config = {
    headers:{
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
    withCredentials : true
}

const register = (name, email, password) => {

    return axios.post( `${baseUrl}/login` , { name, email, password })
    .then((response) => {

        if(response.data?.user?._id){
            localStorage.setItem("token", JSON.stringify(response?.data?.token))
        }

        return response?.data?.user;
    }, config);
};

const login = (email, password) => {
    return axios.post( `${baseUrl}/login` , { email, password })
    .then((response) => {
        if(response.data?.user?._id){
            localStorage.setItem("token", JSON.stringify(response?.data?.token))
        }

        return response?.data?.user;

    }, config);
};

const loadUser = (token) => {

    return axios.get( `${baseUrl}/me/${token}`)
    .then((response) => {

        if(response.data?.user?._id){
            localStorage.setItem("token", JSON.stringify(response?.data?.token))
        }

        return response?.data?.user;
    }, config);
};



const auth = { register, login, loadUser }
export default auth;