import axios from "axios";
import { GET_SOURCE_FAIL, GET_SOURCE_REQUEST, GET_SOURCE_RESPONSE } from "../constants";
import { sourceControllerURL } from "../../Utils";

export const getSourceList = () => async(dispatch)=>{
    try{
        dispatch({type:GET_SOURCE_REQUEST})
        const { data } = await axios.get(`${sourceControllerURL}/source`);
        dispatch({type:GET_SOURCE_RESPONSE,payload:data.data})
    }catch(err){
        dispatch({type:GET_SOURCE_FAIL,payload:[]})
    }
};
