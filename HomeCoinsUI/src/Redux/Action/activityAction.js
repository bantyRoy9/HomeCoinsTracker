import axios from "axios"
import { ACCOUNT_ADD_FAIL, ACTIVITY_REQUIEST, ACTIVITY_SUCCESS } from "../constants"
import { activityControllerURL } from "../../Utils/URLProperties"
import { getAxiosHeader } from "../../Utils/CommonAuthFunction"

export const getActivity = (groupId,dateRange) =>async(dispatch)=>{
    try{
        dispatch({type:ACTIVITY_REQUIEST})
        const { data } = await axios.get(`${activityControllerURL}/activity/${groupId}?dateRange=${dateRange}`, await getAxiosHeader());
    if(data){
        dispatch({type:ACTIVITY_SUCCESS,payload:data});
    }
    }catch(err){
        dispatch({type:ACCOUNT_ADD_FAIL,payload:null});
    }
}