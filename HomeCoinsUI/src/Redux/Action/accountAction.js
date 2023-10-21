
import { ACCOUNT_ADD_FAIL, ACCOUNT_ADD_REQUIEST, ACCOUNT_ADD_SUCCESS, ACCOUNT_FAIL, ACCOUNT_REQUIEST, ACCOUNT_REQUIEST_ADD, ACCOUNT_SUCCCESS, USER_GETME_SUCCCESS} from "../constants";
import axios from 'axios';
import moment from 'moment';
import { getAxiosHeader, showAlert } from '../../Utils/CommonAuthFunction';
import { accountControllerURL, userControllerURL } from '../../Utils/URLProperties';

const getAnalyticsDetails = (resData) => {
    const analyticsJson ={};
    analyticsJson.Earn = resData.datasets[0].data.reduce((a, b) => a + b, 0);
    analyticsJson.Expend = resData.datasets[1].data.reduce((a, b) => a + b, 0);
    analyticsJson.Saving = analyticsJson.Earn - analyticsJson.Expend;
    return analyticsJson;
  }
  
export const getEarnExpendData = (dateRange,isAuthenticated)=> async(dispatch)=>{
    try{
        dispatch({type:ACCOUNT_REQUIEST});
        console.log(`${accountControllerURL}/getEarnExpend?type=both&dateRange=${dateRange[0].dateRange}`);
        const {data} = await axios.get(`${accountControllerURL}/getEarnExpend?type=both&dateRange=${dateRange[0].dateRange}`)
        let response={};
        if(isAuthenticated){
            response = await axios.get(`${userControllerURL}/getUserDetailById`,getAxiosHeader());
        }
        // console.log(data,response);
        if (data.status && data.data && data.graphData) {
            data.analyticsDetail = getAnalyticsDetails(data.graphData)
            data.graphData.datasets.map((el, id) => el['color'] = function () { return data.graphData.datasets[id].colorCode })
            data.graphData.labels = data.graphData.labels.map(el => moment(el, 'DD-MM-YYYY').format('DD MMM'));
            dispatch({type:ACCOUNT_SUCCCESS,payload:data});
            dispatch({type:USER_GETME_SUCCCESS,payload:response?.data.data});
          };
    }catch(err){
        showAlert(err?.response.data.msg??err)
        dispatch({type:ACCOUNT_FAIL,payload:err?.response.data.msg??err});
    }
};

export const addEarnExpend = (details,urlType) => async(dispatch) =>{
    try{
        dispatch({type:ACCOUNT_ADD_REQUIEST});
        const { data } = await axios.post(`${accountControllerURL}/${urlType}`,details,getAxiosHeader());
        if(data){
            showAlert(`${details.amount} add successfully.`);
            dispatch({type:ACCOUNT_ADD_SUCCESS,payload:data});
        }
    }catch(err){
        dispatch({type:ACCOUNT_ADD_FAIL,payload:err.response.data.msg});
    }
};
