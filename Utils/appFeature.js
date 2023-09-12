
// {
//     labels: ["January", "February", "March", "April", "May", "June"],
//     datasets: [{data: []}]

const moment = require("moment/moment");

//   }
exports.graphData = (data) =>{
    let graphdata = {
        labels:[],
        datasets:[{data:[]}]
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
            console.log(dataObj);
        for(let keys in dataObj){
            graphdata.labels.push(keys);
            graphdata.datasets[0].data.push(dataObj[`${keys}`].reduce((a,b)=> a+b,0));
        };
         return graphdata;
    }
}