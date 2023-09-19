const moment = require("moment/moment");
const filterJsonForGraph =(jsonData)=>{
    let dataObj ={},dateList=[];
    if(jsonData){
        dateList = jsonData.map(el=> moment(new Date(el.date)).format('DD-MM-YYYY'));
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

exports.graphData = (data,legendNameArr,svgColorArr) =>{
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
    filterData.forEach((ele,idx)=>{
        let dataSet ={
            data:[],
            colorCode: "",
            strokeWidth: 2
        },objectKeys = Object.keys(ele);
        graphdata.labels.forEach((date,idx)=>{
            if(objectKeys.includes(date)){
                dataSet.data.push(ele[`${date}`].reduce((a,b)=> a+b,0));
            }else{
                dataSet.data.push(0);
            }
        });
        dataSet.colorCode= svgColorArr[idx]
        graphdata.datasets.push(dataSet);
    });
    var dd =[],lastLavelDate =graphdata.labels[graphdata.labels?.length-1];
    graphdata.labels.forEach((el,idx)=>{
        if(el == lastLavelDate){
            console.log(idx);
            dd.push(el)
            return false;
        }else{
            if(idx==0){
                dd.push(el)
            }else{
                dd.push(moment(graphdata.labels[0],'DD-MM-YYYY').add(1,'days').format('DD-MM-YYYY'))
            }
        }
        
    })
    console.log(dd);
    return graphdata
};