import axios from "axios";
import { NODE_ENV, REACT_LOCAL_URL,REACT_PROD_URL} from '@env';
import { getAxiosHeader, getAxiosHeaderWithoutCookie, showAlert } from "../../Utils/CommonAuthFunction"
import { USER_FAIL, USER_REQUIEST, USER_GETME_REQUIEST,USER_GETME_SUCCCESS,USER_SUCCCESS,USER_LOGOUT_SUCCCESS } from "../constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { userControllerURL } from "../../Utils/URLProperties";

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
        const { data } = await axios.get(`${userControllerURL}/logout`);
        if(data){
            console.log(data);
            await AsyncStorage.clear();
        }
        dispatch({type:USER_LOGOUT_SUCCCESS,payload:data});
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
}