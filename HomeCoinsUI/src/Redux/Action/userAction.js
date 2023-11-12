import axios from "axios";
import { getAxiosHeader, getAxiosHeaderWithoutCookie, showAlert } from "../../Utils/CommonAuthFunction"
import { USER_FAIL, USER_REQUIEST, USER_GETME_REQUIEST,USER_GETME_SUCCCESS,USER_SUCCCESS,USER_LOGOUT_SUCCCESS, USER_REGISTER_SUCCESS, USER_REGISTER_REQUIEST, USER_REGISTER_FAIL,ALL_USER_REQUIEST,ALL_USER_SUCCESS,ALL_USER_FAIL } from "../constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { userControllerURL } from "../../Utils/URLProperties";
export const loging = (userDetails) => async(dispatch) =>{
    try{
        dispatch({type:USER_REQUIEST});
        const { data } = await axios.post(`${userControllerURL}/loginUser`, userDetails, getAxiosHeaderWithoutCookie());
        if(data){
            await AsyncStorage.setItem('cookie',data.token);
            dispatch({type:USER_SUCCCESS,payload:data.data.user});
        };
    }catch(err){
        if(err.response){
            showAlert(`${err.response.data.statusCode}`, err.response.data.msg);
        }else{
            showAlert(err);
        }
        dispatch({type:USER_FAIL,payload:null});
    }
};

export const logoutUser = () => async(dispatch)=>{
    try{
        dispatch({type:USER_REQUIEST});
        const response = await axios.get(`${userControllerURL}/logout`);
        if(response && response.status === 200){
            await AsyncStorage.clear();
            dispatch({type:USER_LOGOUT_SUCCCESS,payload:response.data});
        }else{
            dispatch({type:USER_FAIL,payload:null});
        };
    }catch(err){
        dispatch({type:USER_FAIL,payload:null});
    };
}

export const getMe = () =>async(dispatch)=>{
    try{
        dispatch({type:USER_GETME_REQUIEST})
        const res = await axios.get(`${userControllerURL}/getUserDetailById`,getAxiosHeader());
        if(res && res.status == 200){
            dispatch({type:USER_GETME_SUCCCESS,payload:res?.data.data});
        }else{
            dispatch({type:USER_FAIL,payload:null});
        }
    }catch(err){
        dispatch({type:USER_FAIL,payload:null})
    }
};

export const createUser =(userDetails)=> async(dispatch) => {
    try{
        dispatch({type:USER_REGISTER_REQUIEST})
        const { data } = await axios.post(`${userControllerURL}/createUser`,userDetails,getAxiosHeaderWithoutCookie());
        if(data){
            dispatch({type:USER_REGISTER_SUCCESS,payload:data})
        }
    }catch(err){
        dispatch({type:USER_REGISTER_FAIL,payload:err?.response.data.msg})
    }
};

export const getAllUser = async(dispatch)=>{
    try{
        dispatch({type:ALL_USER_REQUIEST});
        const resData = await axios.get(`${userControllerURL}/users`,getAxiosHeaderWithoutCookie());
        if(resData && resData.status === 200){
            dispatch({type:ALL_USER_SUCCESS,payload:data.data});
        }else{
        dispatch({type:ALL_USER_FAIL,payload:null});
        }
    }catch(err){
        dispatch({type:ALL_USER_FAIL,payload:null});
    }
};

export const forgotPassword = async(user) =>{
    try{
        const { data } = axios.post(`${userControllerURL}/forgotPassword`,user);
        
    }catch(err){

    }
}