import moment from "moment";

export const homeNavList = [
    {
        label:'Today',
        dateRange: `${moment() - moment()}`,
        active:false
    },{
        label:'Last 7 days',
        dateRange:`${moment() - moment().add(7)}`,
        active:true
    },{
        label:'Month',
        dateRange:`${moment() - moment().add(7)}`,
        active:false
    },{
        label:'Year',
        dateRange:`${moment() - moment().add(365)}`,
        active:false
    }        
]