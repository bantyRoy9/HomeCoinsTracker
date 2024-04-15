import axios from "axios";
import { getAxiosHeader, showAlert, sourceControllerURL } from "../../Utils";

export const getSourceList = (urlType,details) => async(dispatch)=>{
    const urlConstant = urlType.toUpperCase();
    try{
        dispatch({type:`GET_${urlConstant}_REQUEST`});
        let method='get',reqBody={};
        if(details){method="post",reqBody=details};
        if(details && details.id){method="patch"};
        console.log(`${sourceControllerURL}/${urlType}`,method,details);
        let { data } = await axios[method](`${sourceControllerURL}/${urlType}`,reqBody,await getAxiosHeader());
        dispatch({type:`GET_${urlConstant}_RESPONSE`,payload:{data:data.data,method}});
    }catch(err){
        showAlert(err?.response?.data.msg??"Something wrong happend")
        dispatch({type:`GET_${urlConstant}_FAIL`,payload:[]});
    }
};
