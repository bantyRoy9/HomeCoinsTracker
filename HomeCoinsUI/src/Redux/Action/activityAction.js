import axios from "axios"
import { ACTIVITY_REQUIEST, ACTIVITY_SUCCESS } from "../constants"
import { activityControllerURL } from "../../Utils/URLProperties"
import { getAxiosHeader } from "../../Utils/CommonAuthFunction"

export const getActivity = () =>async(dispatch)=>{
    try{
    dispatch({type:ACTIVITY_REQUIEST})
    const { data } = await axios.get(`${activityControllerURL}/activity`,getAxiosHeader());
    if(data){
        dispatch({type:ACTIVITY_SUCCESS,payload:data});
    }
    }catch(err){
        console.log(err);
    }
}