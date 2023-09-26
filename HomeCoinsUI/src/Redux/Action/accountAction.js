import { NODE_ENV, REACT_LOCAL_URL,REACT_PROD_URL} from '@env';
import { ACCOUNT_REQUIEST, ACCOUNT_SUCCCESS} from "../constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from 'axios';
import moment from 'moment';
const URL = NODE_ENV != 'production' ? REACT_PROD_URL:REACT_LOCAL_URL;
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
        console.log(`${NODE_ENV != 'production' ? REACT_PROD_URL:REACT_LOCAL_URL}/api/v1/accountController/getEarnExpend?type=both&dateRange=${dateRange[0].dateRange}`);
        const { data } = await axios.get(`${NODE_ENV != 'production' ? REACT_PROD_URL:REACT_LOCAL_URL}/api/v1/accountController/getEarnExpend?type=both&dateRange=${dateRange[0].dateRange}`);
        if (data.status && data.data && data.graphData) {
            data.analyticsDetail = getAnalyticsDetails(data.graphData)
            data.graphData.datasets.map((el, id) => el['color'] = function () { return data.graphData.datasets[id].colorCode })
            data.graphData.labels = data.graphData.labels.map(el => moment(el, 'DD-MM-YYYY').format('DD MMM'));
            dispatch({type:ACCOUNT_SUCCCESS,payload:data});
          };
    }catch(err){
        console.log(err);
    }
}