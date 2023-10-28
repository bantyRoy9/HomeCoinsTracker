import axios from "axios"
import { GROUP_CREATE_REQUEST, GROUP_CREATE_SUCCESS } from "../constants"
import { groupControllerURL } from "../../Utils/URLProperties";
import { getAxiosHeader, showAlert } from "../../Utils/CommonAuthFunction";

export const createGroupAndRequest = (detail,userId)=> async(dispatch)=> {
    try{
        dispatch({type: GROUP_CREATE_REQUEST});
        const createGroupRes = await axios.post(`${groupControllerURL}/group/${userId}`,detail,getAxiosHeader());
        dispatch({type:GROUP_CREATE_SUCCESS,payload:createGroupRes.data});
    }catch(err){
        showAlert(err.response.data.msg);
    }
}