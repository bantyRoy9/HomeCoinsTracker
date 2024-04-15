import axios from 'axios';
import { GET_MEMBER_FAIL, GET_MEMBER_REQUEST, GET_MEMBER_RESPONSE } from "../constants";
import { getAxiosHeader } from '../../Utils';
import { groupControllerURL } from '../../Utils/URLProperties';

export const getMemberList = (groupId) =>async(disptch)=>{
    try{
        disptch({type:GET_MEMBER_REQUEST});
        const { data } = await axios.get(`${groupControllerURL}/groupMembers/${groupId}`, await getAxiosHeader());
        disptch({type:GET_MEMBER_RESPONSE,payload:data.data});
    }catch(err){
        disptch({type:GET_MEMBER_FAIL,payload:[]})
    }
}