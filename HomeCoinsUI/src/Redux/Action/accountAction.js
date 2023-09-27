import { NODE_ENV, REACT_LOCAL_URL,REACT_PROD_URL} from '@env';
import { ACCOUNT_ADD_FAIL, ACCOUNT_ADD_REQUIEST, ACCOUNT_ADD_SUCCESS, ACCOUNT_FAIL, ACCOUNT_REQUIEST, ACCOUNT_REQUIEST_ADD, ACCOUNT_SUCCCESS} from "../constants";
import axios from 'axios';
import moment from 'moment';
import { getAxiosHeader, showAlert } from '../../Utils/CommonAuthFunction';
let URL = `${NODE_ENV != 'production' ? REACT_PROD_URL:REACT_LOCAL_URL}/api/v1/accountController`;
//URL = 'http://192.168.1.12:8000/api/v1/accountController'
const getAnalyticsDetails = (resData) => {
    const analyticsJson ={};
    analyticsJson.Earn = resData.datasets[0].data.reduce((a, b) => a + b, 0);
    analyticsJson.Expend = resData.datasets[1].data.reduce((a, b) => a + b, 0);
    analyticsJson.Saving = analyticsJson.Earn - analyticsJson.Expend;
    return analyticsJson;
  }
  
export const getEarnExpendData = (dateRange)=> async(dispatch)=>{
    try{
        dispatch({type:ACCOUNT_REQUIEST});
        console.log(`${URL}/getEarnExpend?type=both&dateRange=${dateRange[0].dateRange}`);
        const { data } = await axios.get(`${URL}/getEarnExpend?type=both&dateRange=${dateRange[0].dateRange}`);
        if (data.status && data.data && data.graphData) {
            data.analyticsDetail = getAnalyticsDetails(data.graphData)
            data.graphData.datasets.map((el, id) => el['color'] = function () { return data.graphData.datasets[id].colorCode })
            data.graphData.labels = data.graphData.labels.map(el => moment(el, 'DD-MM-YYYY').format('DD MMM'));
            dispatch({type:ACCOUNT_SUCCCESS,payload:data});
          };
    }catch(err){
        dispatch({type:ACCOUNT_FAIL,payload:err.response.data.msg});
    }
};

export const addEarn = (details) => async(dispatch) =>{
    try{
        dispatch({type:ACCOUNT_ADD_REQUIEST});
        console.log(`${URL}/earn`,'2222');
        const { data } = await axios.post(`${URL}/earn`,details,getAxiosHeader());
        if(data){
            showAlert(`${details.amount} add successfully.`);
            dispatch({type:ACCOUNT_ADD_SUCCESS,payload:data});
        }
    }catch(err){
        dispatch({type:ACCOUNT_ADD_FAIL,payload:err.response.data.msg});
    }
};