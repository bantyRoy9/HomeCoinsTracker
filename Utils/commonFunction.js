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
};

exports.removeWhiteSpace = (str,toTransform) =>{
    str = str.toString().replace(/\s/g,"");
    return toTransform == 'U' ? str.toUpperCase() : str.toLowerCase();
};

exports.requiredResponseBody = async(modal,responseArr) =>{
    if(modal && responseArr && responseArr.length>0){
        Object.keys(modal).forEach(el=>{
            if(!responseArr.includes(el)){
                delete modal[el];
            };
        });
    };
    return modal;
};

exports.getDateRange = (period) => {
    const endDate = moment();
    let startDate;

    switch (period) {
        case 'weekly':
            startDate = moment().subtract(7,'days')// new Date(now.setDate(now.getDate() - 7));
            break;
        case 'monthly':
            startDate = moment().subtract(1,'months') //new Date(now.setMonth(now.getMonth() - 1));
            break;
        case 'yearly':
            startDate = moment().subtract(1,'years') //new Date(now.setFullYear(now.getFullYear() - 1));
            break;
        default:
            throw new Error('Invalid period specified');
    }

    return { startDate, endDate };
};