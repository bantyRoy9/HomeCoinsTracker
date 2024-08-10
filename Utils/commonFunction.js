const moment = require("moment");
const getContinousesDate = (startDateStr, endDateStr) => {
    const startDate = moment(startDateStr);
    const endDate = moment(endDateStr);
    const dateArr = [];
    let currentDate = startDate.clone();

    while (currentDate.isSameOrBefore(endDate, 'days')) {
        dateArr.push(currentDate.format('DD-MM-YYYY'));
        currentDate.add(1, 'days');
    };
    return dateArr;
}
const filterJsonForGraph = (jsonData) => {
    let dataObj = {}, dateList = [];
    if (jsonData && jsonData.length) {
        var dateListSort = jsonData.map(el => new Date(el.date).setHours(0, 0, 0)).sort();
        dateList = getContinousesDate(moment(new Date(dateListSort[0])).format('YYYY-MM-DD'), moment(new Date(dateListSort[dateListSort?.length - 1])).format('YYYY-MM-DD'));
        dateList.forEach((date, idx) => {
            var totalAmount = jsonData.filter(el => moment(new Date(el.date)).format('DD-MM-YYYY') == date).map(ele => ele?.amount ?? 0);
            dataObj[date] = totalAmount;
        });
    };
    return { dataObj, dateList };
};

exports.graphData = (data, legendNameArr, svgColorArr) => {
    let graphdata = {
        labels: [],
        datasets: [],
        legend: legendNameArr
    };
    let filterData = [];
    data.forEach((ele) => {
        let filterDataObj = filterJsonForGraph(ele);
        filterData.push(filterDataObj.dataObj);
        if (filterDataObj.dateList.length) {
            graphdata.labels = [...new Set([...graphdata?.labels, ...filterDataObj.dateList])];
        }
    });
    filterData.forEach((ele, idx) => {
        let dataSet = {
            data: [],
            colorCode: "",
            strokeWidth: 2
        },
            objectKeys = Object.keys(ele);

        graphdata.labels.forEach((date, idx) => {
            if (objectKeys.includes(date)) {
                dataSet.data.push(ele[`${date}`].reduce((a, b) => a + b, 0));
            } else {
                dataSet.data.push(0);
            }
        });
        dataSet.colorCode = svgColorArr[idx]
        graphdata.datasets.push(dataSet);
    });
    return graphdata
};
exports.sortArrayDataByDate = (data, keyName) => {
    data.sort((a, b) => {
        let firstItem = new Date(a[keyName]).setHours(0, 0, 0);
        let secondItem = new Date(b[keyName]).setHours(0, 0, 0);
        if (firstItem < secondItem) {
            return 1
        }
        if (firstItem > secondItem) {
            return -1
        }
        return 0
    });
    return data
};

exports.removeWhiteSpace = (str, toTransform) => {
    str = str.toString().replace(/\s/g, "");
    return toTransform == 'U' ? str.toUpperCase() : str.toLowerCase();
};

exports.requiredResponseBody = async (modal, responseArr) => {
    if (modal && responseArr && responseArr.length > 0) {
        Object.keys(modal).forEach(el => {
            if (!responseArr.includes(el)) {
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
            startDate = moment().subtract(7, 'days')// new Date(now.setDate(now.getDate() - 7));
            break;
        case 'monthly':
            startDate = moment().subtract(1, 'months') //new Date(now.setMonth(now.getMonth() - 1));
            break;
        case 'yearly':
            startDate = moment().subtract(1, 'years') //new Date(now.setFullYear(now.getFullYear() - 1));
            break;
        default:
            throw new Error('Invalid period specified');
    }

    return { startDate, endDate };
};
const pieJson = (data, type, theme) => {
    const themeColors = {
        light: {
            sliceColors: ["rgb(1, 66, 131)", "rgb(34, 119, 0)", "rgb(254, 103, 0)", "rgba(1, 66, 131, 0.5)", "rgb(207, 102, 121)"],
            legendFontColor: "rgb(10, 6, 26)"
        },
        dark: {
            sliceColors: ["rgba(0, 82, 164, 0.9)", "rgb(34, 119, 0)", "rgb(254, 103, 0)", "rgba(240, 240, 240, 0.5)", "rgb(159, 96, 0)"],
            legendFontColor: "rgb(240, 240, 240)"
        }
    };

    const colors = themeColors[theme];
    let finalobj = {};
    let colorIndex = 0;

    Object.keys(data).forEach(el => {
        if (["earnBySources", "earnByMembers", "expendByTypes", "expendByMembers"].includes(el)) {
            let arr = [];
            data[el].forEach(ele => {
                arr.push({
                    name: ele._id[el === "earnBySources" ? 'sourceName' : el === "expendByTypes" ? "expendName" : 'name'],
                    [type]: parseFloat(ele.totalAmount),
                    color: colors.sliceColors[colorIndex % colors.sliceColors.length],
                    legendFontColor: colors.legendFontColor,
                    legendFontSize: 15
                });
                colorIndex++;
            });
            finalobj[el] = arr;
        }
    });

    return finalobj;
}

exports.picGraphData = (data, theme = "light") => {
    let graphResponse = [];
    Object.keys(data).forEach(el => {
        graphResponse.push(pieJson(data[el], el, theme))

        // if (el === "earn") {
        //     graphResponse[el] = pieJson(data[el], 'earn', theme);
        // } else {
        //     graphResponse[el] = pieJson(data[el], 'expend', theme);
        // }
    });
    return graphResponse;
};
