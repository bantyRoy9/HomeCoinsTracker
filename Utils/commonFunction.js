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
    var ddd = graphdata.labels.map(el=> moment(el,'DD-MM-YYYY').format('YYYY-MM-DD'));
    var initialLavelDate = ddd[0],dd =[initialLavelDate];
    for(let i=1;i< graphdata.labels.length;i++){
        let addDays=1;
        console.log(initialLavelDate,new Date(initialLavelDate).setHours(0,0,0) , new Date(ddd[i]).setHours(0,0,0));
        while(new Date(initialLavelDate).setHours(0,0,0) <= new Date(ddd[i]).setHours(0,0,0)){
            if(new Date(initialLavelDate).setHours(0,0,0) == new Date(ddd[i]).setHours(0,0,0)){
                initialLavelDate=ddd[i]
            }else{
                initialLavelDate = new Date(moment(initialLavelDate,'DD-MM-YYY').add(addDays,'days')).setHours(0,0,0);
                var daysAdd = moment(initialLavelDate,'DD-MM-YYY').add(addDays,'days').format('DD-MM-YYYY');
                dd.push(daysAdd);
                addDays++;
            }
        }

    }
    // graphdata.labels.forEach((el,idx)=>{
    //     if(el == lastLavelDate){
            
    //         dd.push(el)
    //         return false;
    //     }else{
    //         if(idx==0){
    //             dd.push(el)
    //         }else{
    //             dd.push(moment(graphdata.labels[0],'DD-MM-YYYY').add(idx+1,'days').format('DD-MM-YYYY'))
    //         }
    //     }
        
    // })
    console.log(dd);
    return graphdata
};