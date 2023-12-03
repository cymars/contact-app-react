import { GET_USERS_START, GET_USERS_FAIL, GET_USERS_SUCCESS , EDIT_BOOK} from "./ActionTypes";
import axios from 'axios';
import { toast } from "react-toastify"

export const getUsersStart=()=> {
    return{
        type:GET_USERS_START
    }
}

export const getUsersFail=(err)=> {
    return{
        type:GET_USERS_FAIL,
        payload: err
    }
}

export const getUsersSuccess=(data)=> {
    return{
        type:GET_USERS_SUCCESS,
        payload: data}
} 

export const editUser=(data)=>{
    return{
        type:EDIT_BOOK,
        payload:data
    }
}