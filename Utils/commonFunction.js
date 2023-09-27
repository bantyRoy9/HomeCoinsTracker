const moment = require("moment");
const getContinousesDate = (startDateStr,endDateStr) =>{
    const startDate = moment(startDateStr);
    const endDate=moment(endDateStr);
    const dateArr=[];
    let currentDate = startDate.clone();

    while(currentDate.isSameOrBefore(endDate,'days')){
        dateArr.push(currentDate.format('DD-MM-YYYY'));
        currentDate.add(1,'days');
    };
   // console.log(dateArr,'end');
    return dateArr;
}
const filterJsonForGraph =(jsonData)=>{
    let dataObj ={},dateList=[];
    if(jsonData){
        var dateListSort = jsonData.map(el=> new Date(el.date).setHours(0,0,0)).sort();
        dateList = getContinousesDate(moment(new Date(dateListSort[0])).format('YYYY-MM-DD'),moment(new Date(dateListSort[dateListSort?.length-1])).format('YYYY-MM-DD'));
        dateList.forEach((date,idx)=>{
            var totalAmount = jsonData.filter(el=> moment(new Date(el.date)).format('DD-MM-YYYY') == date).map(ele=> ele.amount);
            dataObj[date] = totalAmount;    
           /* if(Object.keys(dataObj).includes(date)){
                //dataObj[date] = [...dataObj[`${date}`], ...jsonData[idx]?.amount??0]
                dataObj[date] = [...dataObj[`${date}`], ...totalAmount]
            }else{
                dataObj[date] = totalAmount;    
            }*/
        });
    };
    //console.log(dataObj,dateList);
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
        },
        objectKeys = Object.keys(ele);

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
    return graphdata
};