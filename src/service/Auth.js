import { MAIN_API } from "../env";
import axios from 'axios';
import jwt_decode from "jwt-decode";

function userSignUp(data){
    return axios.post(`${MAIN_API}users`,data);
}

function loginUser(data){
    return axios.post(`${MAIN_API}auth`,data)
}

function isLoggedIn(){
    const data = localStorage.getItem("_token");
    if(!data){
        return false;
    }
    return true;
}

function doLogout(){
    localStorage.removeItem("_token");
    localStorage.removeItem("mycart");
    localStorage.removeItem("myproid");
    window.location = "/";
}

function getUser(){
    try{
        return jwt_decode(localStorage.getItem("_token"))
    }
    catch(ex){
        return null
    }
}

function isAdmin(){
    return !getUser()? false:getUser().isAdmin;
}

function getToken(){
    return localStorage.getItem('_token');
}

export { userSignUp, loginUser, isLoggedIn, doLogout, isAdmin, getToken };