import { MAIN_API } from "../env";
import axios from "axios";

function getProducts(){
    return axios.get(`${MAIN_API}products`)
}

function searchProducts(search){
    return axios.get(`${MAIN_API}products/${search}`)
}

function getProductById(id){
    return axios.get(`${MAIN_API}products/${id}`)
}

function deleteProduct(id){
    return axios.delete(`${MAIN_API}products/${id}`)
}

function saveProducts(data){
    return axios.post(`${MAIN_API}products`,data)
}




export {getProducts,getProductById, saveProducts,searchProducts,deleteProduct};