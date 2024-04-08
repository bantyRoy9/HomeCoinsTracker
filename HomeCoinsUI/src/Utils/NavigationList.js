import moment from "moment";
const date = new Date();
export const topHomeNavList = [{
    label: "Daily",
    dateRange: `${moment().format('YYYY-MM-DD')}_${moment().format('YYYY-MM-DD')}`,
    active: true
}, {
    label: "Monthly",
    dateRange: `${moment().startOf('month').format('YYYY-MM-DD')}_${moment().endOf('month').format('YYYY-MM-DD')}`,
    active: false
}, {
    label: "Yearly",
    dateRange: `${moment().startOf('year').format('YYYY-MM-DD')}_${moment().endOf('year').format('YYYY-MM-DD')}`,
    active: false
}]
export const homeNavList = [
    {
        label: 'Today',
        dateRange: `${moment().format('YYYY-MM-DD')}_${moment().format('YYYY-MM-DD')}`,
        active: false
    }, {
        label: 'Last 7 days',
        dateRange: `${moment().subtract(7, 'days').format('YYYY-MM-DD')}_${moment().format('YYYY-MM-DD')}`,
        active: true
    }, {
        label: 'Last Month',
        dateRange: `${moment().subtract(1, 'months').format('YYYY-MM-DD')}_${moment().format('YYYY-MM-DD')}`,
        active: false
    }, {
        label: 'Last Year',
        dateRange: `${moment().subtract(1, 'years').format('YYYY-MM-DD')}_${moment().format('YYYY-MM-DD')}`,
        active: false
    }
];

export const bottomHeaderList = [
    {
        iconName: "bank",
        title: "Home",
        navUrl: "Home"
    },
    {
        iconName: "users",
        title: "Member",
        navUrl: "Member"
    },
    {
        iconName: "list-ul",
        title: "Activity",
        navUrl: "Activity"
    },
    {
        iconName: "user",
        title: "Account",
        navUrl: "Profile"
    }
];
export const profileNavList = [{
    label: 'User Dashboard',
    onPress: 'userDashboard',
    Icons: ["dashboard"]
},
{
    label: 'Add Members',
    onPress: 'addMember',
    Icons: ["users"]
},
{
    label: 'Email Settings',
    onPress: 'emailSettings',
    Icons: ["envelope-o"]
}, {
    label: 'Notification Settings',
    onPress: 'notificationSetting',
    Icons: ["bell"]
}, {
    label: 'Password',
    onPress: 'passwordSetting',
    Icons: ["lock"]
}, {
    label: 'Logout',
    onPress: 'Logout',
    Icons: ["sign-out"]
},
]