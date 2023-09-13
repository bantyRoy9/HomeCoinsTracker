
// {
//    labels: ["January", "February", "March", "April", "May", "June"],
//    datasets: [ 
    //      {data: [10,14, 16, 18,0,11,22],strokeWidth: 2,},{data: [15,18,16,19,18,22,12],strokeWidth: 2}],
//    legend: ['car', 'bike'],
//}

const moment = require("moment/moment");
const filterJsonForGraph =(data,legendName)=>{
    let graphdata = {
        labels:[],
        datasets:{},
        legend:[]
    };
    if(data){
        const dates = data.map(el=> moment(new Date(el.date)).format('DD-MM-YYYY')).sort();
        let dataObj ={};
        dates.forEach(function(date,idx){
                if(Object.keys(dataObj).includes(date)){
                    dataObj[date] = [...dataObj[`${date}`], data[idx].amount]
                }else{
                    dataObj[date] = [ data[idx].amount];    
                }
            });
        
        for(let keys in dataObj){
            graphdata.labels.push(keys);
            dataSets['data'].push(dataObj[`${keys}`].reduce((a,b)=> a+b,0));
        };
        graphdata.datasets.push(dataSets);
        graphdata.legend.push(legendName)
        return graphdata;
    }
}
exports.graphData = (data,legendNameArr) =>{
    let graphdata = {
        labels:[],
        datasets:[{data:[]}],
        datasets:[],
        legend:[]
    };
    var uniqueDates = new Set();
    data.forEach((ele,idx)=>{
        var dataFilter = filterJsonForGraph(ele,legendNameArr[idx]);
        graphdata.legend = [...graphdata.legend, dataFilter.legend];
        graphdata.labels =[...graphdata.labels, ...dataFilter.labels];

    });

    uniqueDates.forEach((ele,idx)=>{

    })
    if(data){
        const dates = data.map(el=> moment(new Date(el.date)).format('DD-MM-YYYY')).sort();
        let dataObj ={};
        dates.forEach(function(date,idx){
                if(Object.keys(dataObj).includes(date)){
                    dataObj[date] = [...dataObj[`${date}`], data[idx].amount]
                }else{
                    dataObj[date] = [ data[idx].amount];    
                }
            });
        for(let keys in dataObj){
            graphdata.labels.push(keys);
            graphdata.datasets[0].data.push(dataObj[`${keys}`].reduce((a,b)=> a+b,0));
        };
         return graphdata;
    }
}