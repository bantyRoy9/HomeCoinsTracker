import axios from "axios";
import { NODE_ENV, REACT_LOCAL_URL,REACT_PROD_URL} from '@env';
import { getAxiosHeader, getAxiosHeaderWithoutCookie, showAlert } from "../../Utils/CommonAuthFunction"
import { USER_FAIL, USER_REQUIEST, USER_GETME_REQUIEST,USER_GETME_SUCCCESS,USER_SUCCCESS,USER_LOGOUT_SUCCCESS, USER_REGISTER_SUCCESS, USER_REGISTER_REQUIEST, USER_REGISTER_FAIL,ALL_USER_REQUIEST,ALL_USER_SUCCESS,ALL_USER_FAIL } from "../constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { userControllerURL } from "../../Utils/URLProperties";
console.log(userControllerURL);
export const loging = (userDetails) => async(dispatch) =>{
    try{
        dispatch({type:USER_REQUIEST});
        const res = await axios.post(`${userControllerURL}/loginUser`, userDetails, getAxiosHeaderWithoutCookie());
        if(res.status){
            await AsyncStorage.setItem('cookie',res.data.token);
            dispatch({type:USER_SUCCCESS,payload:res.data.data.user});
        };
    }catch(err){
        if(err.response){
            showAlert(`${err.response.data.statusCode}`, err.response.data.msg);
        }else{
            showAlert(err);
        }
        dispatch({type:USER_FAIL,payload:err.response.data.msg});
    }
};

export const logoutUser = () => async(dispatch)=>{
    try{
        dispatch({type:USER_REQUIEST});
        console.log(`${userControllerURL}/logout`);
        const response = await axios.get(`${userControllerURL}/logout`);
        if(response){
            console.log(response);
            await AsyncStorage.clear();
        }
        dispatch({type:USER_LOGOUT_SUCCCESS,payload:response.data});
    }catch(err){
        dispatch({type:USER_FAIL,payload:err.response.data.msg})
    }
}

export const getMe = () =>async(dispatch)=>{
    try{
        dispatch({type:USER_GETME_REQUIEST})
        const { data } = await axios.get(`${userControllerURL}/getUserDetailById`,getAxiosHeader());
        
        dispatch({type:USER_GETME_SUCCCESS,payload:data.data})
    }catch(err){
        dispatch({type:USER_FAIL,payload:err?.response.data.msg})
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
        const { data } = await axios.get(`${userControllerURL}/users`,getAxiosHeaderWithoutCookie());
        dispatch({type:ALL_USER_SUCCESS,payload:data.data});
    }catch(err){
        dispatch({type:ALL_USER_FAIL,payload:err.response.data.msg})
    }
}