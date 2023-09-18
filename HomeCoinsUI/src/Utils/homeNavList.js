import moment from "moment";

export const homeNavList = [
    {
        label:'Today',
        dateRange: `${moment().format('YYYY-MM-DD')}_${moment().format('YYYY-MM-DD')}`,
        active:false
    },{
        label:'Last 7 days',
        dateRange:`${moment().subtract(7,'days').format('YYYY-MM-DD')}_${moment().format('YYYY-MM-DD')}`,
        //dateRange:'2023-08-23_2023-08-21',
        active:true
    },{
        label:'Last Month',
        dateRange:`${moment().subtract(1,'months').format('YYYY-MM-DD')}_${moment().format('YYYY-MM-DD')}`,
        active:false
    },{
        label:'Last Year',
        dateRange:`${moment().subtract(1,'years').format('YYYY-MM-DD')}_${moment().format('YYYY-MM-DD')}`,
        active:false
    }        
]