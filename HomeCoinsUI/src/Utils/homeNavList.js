import moment from "moment";
const date = new Date();
console.log(date.getDate(),date.getMonth());
export const topHomeNavList = [{
    label:"Daily",
    dateRange:`${moment().format('YYYY-MM-DD')}_${moment().format('YYYY-MM-DD')}`,
    active:true
},{
    label:"Monthly",
    dateRange:`${moment().startOf('month').format('YYYY-MM-DD')}_${moment().endOf('month').format('YYYY-MM-DD')}`,
    active:false
},{
    label:"Yearly",
    dateRange:`${moment().startOf('year').format('YYYY-MM-DD')}_${moment().endOf('year').format('YYYY-MM-DD')}`,
    active:false
}]
export const homeNavList = [
    {
        label:'Today',
        dateRange: `${moment().format('YYYY-MM-DD')}_${moment().format('YYYY-MM-DD')}`,
        active:false
    },{
        label:'Last 7 days',
        dateRange:`${moment().subtract(7,'days').format('YYYY-MM-DD')}_${moment().format('YYYY-MM-DD')}`,
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
];

export const bottomHeaderList = [
    {
        iconName:"bank",
        title:"Home",
        navUrl:"Home"
    },
    {
        iconName:"users",
        title:"Member",
        navUrl:"Members"
    },
    {
        iconName:"list-ul",
        title:"Activity",
        navUrl:"Activity"
    },
    {
        iconName:"user",
        title:"Account",
        navUrl:"Profile"
    }
]