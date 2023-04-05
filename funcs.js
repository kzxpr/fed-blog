function fillWithZero(str, len){
    var countstr = str.toString();
    return "0".repeat(len - countstr.length)+str;
}

function sum(a,b){
    return (a+b)
}

function neq(arg1, arg2, options) {
    return (arg1 != arg2) ? true : false;
}

function eq(arg1, arg2, options) {
    return (arg1 == arg2) ? true : false;
}

function prettydatetime(datetime) {
    if(datetime){
        const my_date = new Date(datetime)
        return my_date.getDate() + "/" + (my_date.getMonth() + 1) + "-" + my_date.getFullYear() + " " + my_date.getHours() + ":" + fillWithZero(my_date.getMinutes(), 2) + ":" + fillWithZero(my_date.getSeconds(), 2);
    }else{
        return;
    }
}

function gt(arg1, arg2, options) {
    return (arg1 > arg2) ? true : false;
}

function lt(arg1, arg2, options) {
    return (arg1 < arg2) ? true : false;
}

function notempty(arg1){
    return (arg1 != "" && arg1 !== null)
}

function notnull(arg1) {
    return arg1 !== null;
}

function count(arr){
    if(arr){
        return arr.length;
    }else{
        return null;
    }
}

function parseJSON(str){
    return JSON.parse(str);
}

function prettyJSON(src){
    return JSON.stringify(JSON.parse(src), undefined, 4)
}

function setVar(varName, varValue, options) {
    options.data.root[varName] = varValue;
}

function substr(str, from, len = 0){
    if(str){
        if(len!=0){
            return str.substr(from, len);
        }else{
            return str.substr(from)
        }
    }else{
        return "";
    }
}

function onlyUnique(value, index, array) {
    // HOW TO USE:
    // var unique = a.filter(onlyUnique);
    return array.indexOf(value) === index;
}

module.exports = { sum, neq, eq, prettydatetime, gt, lt, count, fillWithZero, prettyJSON, notnull, notempty, parseJSON, setVar, substr, onlyUnique }