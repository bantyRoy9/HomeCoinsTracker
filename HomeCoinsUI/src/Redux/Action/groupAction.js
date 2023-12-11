import axios from "axios"
import { GROUP_CREATE_FAIL, GROUP_CREATE_REQUEST, GROUP_CREATE_SUCCESS } from "../constants"
import { groupControllerURL } from "../../Utils/URLProperties";
import { getAxiosHeader, showAlert } from "../../Utils/CommonAuthFunction";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const createGroupAndRequest = (detail,userId,navigation)=> async(dispatch)=> {
    try{
        dispatch({type: GROUP_CREATE_REQUEST});
        const { data } = await axios.post(`${groupControllerURL}/group/${userId}`,detail,await getAxiosHeader());
        if(data && data.status){
            userId!=="" ? await AsyncStorage.setItem("isGroupIncluded",data.status) : navigation.navigate('CreateGroup')
            showAlert(data.msg);
            dispatch({type:GROUP_CREATE_SUCCESS,payload:data});
        }else{
            dispatch({type:GROUP_CREATE_FAIL,payload:{}});    
        }
    }catch(err){
        dispatch({type:GROUP_CREATE_FAIL,payload:{}});
        showAlert(err.response.data.msg);
    }
}