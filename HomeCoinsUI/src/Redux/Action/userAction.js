import axios from "axios";
import { NODE_ENV, REACT_LOCAL_URL,REACT_PROD_URL} from '@env';
import { getAxiosHeader, getAxiosHeaderWithoutCookie, showAlert } from "../../Utils/CommonAuthFunction"
import { USER_REQUIEST, USER_SUCCCESS } from "../userConstants";
import AsyncStorage from "@react-native-async-storage/async-storage";
const URL = NODE_ENV == 'production' ? REACT_PROD_URL:REACT_LOCAL_URL;

export const loging = (userDetails) => async(dispatch) =>{
    try{
        dispatch({type:USER_REQUIEST});
        const header = {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
      console.log(`${NODE_ENV == 'production' ? REACT_PROD_URL:REACT_LOCAL_URL}/api/v1/userController/loginUser`);
      const res = await axios.post(`${URL}/api/v1/userController/loginUser`, userDetails, header);
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
    }
}