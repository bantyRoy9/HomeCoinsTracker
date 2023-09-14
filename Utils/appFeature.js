const moment = require("moment/moment");
const filterJsonForGraph =(jsonData)=>{
    let dataObj ={},dateList=[];
    if(jsonData){
        dateList = jsonData.map(el=> moment(new Date(el.date)).format('DD-MM-YYYY')).sort();
        dateList.forEach(function(date,idx){
            if(Object.keys(dataObj).includes(date)){
                dataObj[date] = [...dataObj[`${date}`], jsonData[idx].amount]
            }else{
                dataObj[date] = [ jsonData[idx].amount];    
            }
        });
    };
    return {dataObj,dateList};
};

exports.graphData = (data,legendNameArr) =>{
    let graphdata = {
        labels:[],
        datasets:[],
        legend:legendNameArr
    };
    let filterData=[];
    data.forEach((ele)=>{
        let filterDataObj = filterJsonForGraph(ele);
        filterData.push(filterDataObj.dataObj);
        graphdata.labels = [...new Set([...graphdata?.labels, ...filterDataObj.dateList])];
    });
    // console.log(filterData,'ssss');
    filterData.forEach((ele)=>{
        let dataSet ={data:[]},objectKeys = Object.keys(ele);
        graphdata.labels.forEach((date,idx)=>{
            if(objectKeys.includes(date)){
                dataSet.data.push(ele[`${date}`].reduce((a,b)=> a+b,0));
            }else{
                dataSet.data.push(0);
            }
        });
        graphdata.datasets.push(dataSet);
    });
    return graphdata
};