
import { ACCOUNT_ADD_FAIL, ACCOUNT_ADD_REQUIEST, ACCOUNT_ADD_SUCCESS, ACCOUNT_FAIL, ACCOUNT_REQUIEST, ACCOUNT_REQUIEST_ADD, ACCOUNT_SUCCCESS, USER_GETME_SUCCCESS,USER_GETME_FAIL} from "../constants";
import axios from 'axios';
import moment from 'moment';
import { getAxiosHeader, showAlert, accountControllerURL } from '../../Utils';

const getAnalyticsDetails = (resData) => {
    const analyticsJson ={};
    analyticsJson.Earn = resData.datasets[0].data.reduce((a, b) => a + b, 0);
    analyticsJson.Expend = resData.datasets[1].data.reduce((a, b) => a + b, 0);
    analyticsJson.Saving = analyticsJson.Earn - analyticsJson.Expend;
    return analyticsJson;
  }
  
export const getEarnExpendData = (dateRange,groupId,isGraph=false)=> async(dispatch)=>{
    try{
        dispatch({type:ACCOUNT_REQUIEST});
        console.log(`${accountControllerURL}/getEarnExpend?type=both&dateRange=${dateRange}&groupId=${groupId}&isGraph=${isGraph}`);
        const { data } = await axios.get(`${accountControllerURL}/getEarnExpend?type=both&dateRange=${dateRange}&groupId=${groupId}&isGraph=${isGraph}`)
        if (data.status && data.data && data.graphData) {
            if(isGraph){
                data.analyticsDetail = getAnalyticsDetails(data.graphData)
                data.graphData.datasets.map((el, id) => el['color'] = function () { return data.graphData.datasets[id].colorCode })
                data.graphData.labels = data.graphData.labels.map(el => moment(el, 'DD-MM-YYYY').format('DD MMM'));
            }else{
                data.earnList = data.graphData.filter(el=>el['earnBy']).map(el=>({...el,date:moment(new Date(el.date)).format("YYYY-MM-DD")}));
                data.expendList = data.graphData.filter(el=>el['expendBy']).map(el=>({...el,date:moment(new Date(el.date)).format("YYYY-MM-DD")}));
            };
            dispatch({type:ACCOUNT_SUCCCESS,payload:data});
          }else{
            dispatch({type:ACCOUNT_FAIL,payload:null});
          };
    }catch(err){
        if(err.response && err.response.data){showAlert(err?.response?.data.msg??err)};
        dispatch({type:ACCOUNT_FAIL,payload:null});
    }
};

export const addEarnExpend = (details,urlType,navigation) => async(dispatch) =>{
    try{
        dispatch({type:ACCOUNT_ADD_REQUIEST});
        let method="post";
        if(details.id) method="patch";
        const { data } = await axios[method](`${accountControllerURL}/${urlType}`,details, await getAxiosHeader());
        if(data && data.status){
            showAlert(data.msg);
            dispatch({type:ACCOUNT_ADD_SUCCESS,payload:data});
            navigation.navigate('Home')
        }else{
            showAlert(data.msg)
            dispatch({type:ACCOUNT_ADD_FAIL,payload:null});
        }
    }catch(err){
        showAlert(err.response.data.msg)
        dispatch({type:ACCOUNT_ADD_FAIL,payload:null});
    }
};
