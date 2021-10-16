function sort(object) {
    sortedList = [];

    for (let key in object) {
        sortedList.push([key, object[key]]);
    }

    sortedList.sort(function (a, b) {
        return b[1] - a[1];
    });

    sortedObj = {}

    for(item of sortedList) {
        sortedObj[item[0]] = item[1];
    }
    return sortedObj;
}

module.exports = sort;