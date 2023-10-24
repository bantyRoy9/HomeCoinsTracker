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
    if(jsonData && jsonData.length){
        var dateListSort = jsonData.map(el=> new Date(el.date).setHours(0,0,0)).sort();
        dateList = getContinousesDate(moment(new Date(dateListSort[0])).format('YYYY-MM-DD'),moment(new Date(dateListSort[dateListSort?.length-1])).format('YYYY-MM-DD'));
        dateList.forEach((date,idx)=>{
            var totalAmount = jsonData.filter(el=> moment(new Date(el.date)).format('DD-MM-YYYY') == date).map(ele=> ele?.amount??0);
            dataObj[date] = totalAmount;    
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
        if(filterDataObj.dateList.length){
            graphdata.labels = [...new Set([...graphdata?.labels, ...filterDataObj.dateList])];    
        }
    });
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
exports.sortArrayDataByDate = (data,keyName)=>{
    data.sort((a,b)=>{
        let firstItem = new Date(a[keyName]).setHours(0,0,0);
        let secondItem = new Date(b[keyName]).setHours(0,0,0);
        if(firstItem < secondItem){
            return 1
        }
        if(firstItem > secondItem){
            return -1
        }
        return 0
    });
    return data
}