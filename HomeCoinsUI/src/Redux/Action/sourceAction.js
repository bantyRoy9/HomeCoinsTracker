import axios from "axios";
import { getAxiosHeader, sourceControllerURL } from "../../Utils";

export const getSourceList = (urlType) => async(dispatch)=>{
    const urlConstant = urlType.toUpperCase();
    try{
        dispatch({type:`GET_${urlConstant}_REQUEST`});
        console.log(`${sourceControllerURL}/${urlType}`);
        const { data } = await axios.get(`${sourceControllerURL}/${urlType}`,await getAxiosHeader());
        dispatch({type:`GET_${urlConstant}_RESPONSE`,payload:data.data});
    }catch(err){
        dispatch({type:`GET_${urlConstant}_FAIL`,payload:[]});
    }
};
