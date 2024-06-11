import axios from "axios";
import { getAxiosHeader, showAlert, sourceControllerURL } from "../../Utils";
import { logoutUser } from "./userAction";

export const getSourceList = (urlType,details) => async(dispatch)=>{
    const urlConstant = urlType.toUpperCase();
    try{
        dispatch({type:`GET_${urlConstant}_REQUEST`});
        let method='get',reqBody={};
        if(details){method="post",reqBody=details};
        if(details && details.id){method="patch"};
        let { data } = await axios[method](`${sourceControllerURL}/${urlType}`,reqBody,await getAxiosHeader());
        dispatch({type:`GET_${urlConstant}_RESPONSE`,payload:{data:data.data,method}});
    }catch(err){
        const {response} = err;
        showAlert(response?.data.msg??"Something wrong happend","403",()=>{
            if(response?.data.statusCode==403){
                dispatch(logoutUser())
            }
        })
        dispatch({type:`GET_${urlConstant}_FAIL`,payload:[]});
    }
};
