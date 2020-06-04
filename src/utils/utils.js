const Tools = {
    getUrlParamFromHash: function (name) {
        if (this.isEmpty(window.location.hash.split("?")[1])) return null;
        let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
        let r = decodeURIComponent(window.location.hash.split("?")[1]).match(reg);
        if (r !== null) return unescape(r[2]);
        return null;
    },
    /**
    * 获取url中指定参数
    * @param  {[type]} name [key]
    * @return {[type]}      [description]
    */
    getUrlParam: function (name) {
        let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
        let r = decodeURIComponent(window.location.search.substr(1)).match(reg);
        if (r !== null) return unescape(r[2]);
        return null;
    },
    /**
    * 判断一个值是否为空
    * author: cbl
    * @param  {[type]}  key [description]
    * @return {Boolean}     [description]
    */
    isEmpty: function (key) {
        if (typeof (key) === 'string') {
            key = key.replace(/(^\s*)|(\s*$)/g, '');
            if (key === '' || key === null || key === 'null' || key === undefined || key === 'undefined') {
                return true
            } else {
                return false
            }
        } else if (typeof (key) === 'undefined') {
            return true;
        } else if (typeof (key) === 'object') {
            for (const i in key) {
                return false;
            }
            return true;
        } else if (typeof (key) === 'boolean') {
            return false;
        }
    },
    /**
    * json转换字符串并进行uri编码
    * author: cbl
    * @param  {[type]} obj [json]
    * @return {[type]}     [uri]
    */
    toQueryString: function (obj) {
        return obj ? Object.keys(obj).sort().map(function (key) {
            let val = obj[key];
            if (Array.isArray(val)) {
                return val.sort().map(function (val2) {
                    return encodeURIComponent(key) + '=' + encodeURIComponent(val2);
                }).join('&');
            }
            return encodeURIComponent(key) + '=' + encodeURIComponent(val);
        }).join('&') : '';
    },
    getTimeString: function (matchStr, time) {
        let nowDate = new Date();
        if (time) {
            //日期字符串中的'-'改为'/'，否则会出NaN的问题
            if (typeof (time) === 'string') {
                nowDate = new Date(time.replace(new RegExp(/-/gm), "/"));
            } else {
                nowDate = new Date();
            }
        }

        let year = nowDate.getFullYear();
        let month = nowDate.getMonth() + 1;
        if (month <= 9) {
            month = "0" + month;
        }
        let date = nowDate.getDate();
        if (date <= 9) {
            date = "0" + date;
        }
        let hours = nowDate.getHours();
        if (hours <= 9) {
            hours = "0" + hours;
        }
        let minutes = nowDate.getMinutes();
        if (minutes <= 9) {
            minutes = "0" + minutes;
        }
        let seconds = nowDate.getSeconds();
        if (seconds <= 9) {
            seconds = "0" + seconds;
        }

        if (matchStr) {
            matchStr = matchStr.replace('YY', year);
            matchStr = matchStr.replace('MM', month);
            matchStr = matchStr.replace('DD', date);
            matchStr = matchStr.replace('hh', hours);
            matchStr = matchStr.replace('mm', minutes);
            matchStr = matchStr.replace('ss', seconds);
            return matchStr;
        } else {
            return year + '-' + month + '-' + date + ' ' + hours + ':' + minutes + ':' + seconds;
        }
    },
    dateDiff: function (sDate1, sDate2) { //sDate1和sDate2是2017-9-25格式
        sDate1 = sDate1.substring(0, 10);
        sDate2 = sDate2.substring(0, 10);
        let aDate = sDate1.split("-");
        let oDate1 = new Date(aDate[1] + '-' + aDate[2] + '-' + aDate[0]); //转换为9-25-2017格式
        aDate = sDate2.split("-");
        let oDate2 = new Date(aDate[1] + '-' + aDate[2] + '-' + aDate[0]);
        // eslint-disable-next-line
        let iDays = parseInt(Math.abs(oDate1 - oDate2) / 1000 / 60 / 60 / 24); //把相差的毫秒数转换为天数
        return iDays;
    },
    buildArgs: function (formData, args, keys = []) {
        for (let i in args) {
            if (typeof (args[i]) === 'object') {
                let newkeys = [...keys];
                if (newkeys.length > 0) {
                    newkeys[0] = newkeys[0] + `[${i}]`;
                } else {
                    newkeys.push(i);
                }
                buildArgs(formData, args[i], newkeys);
            } else {
                let key = '';
                // eslint-disable-next-line
                keys.map(c => {
                    isEmpty(key) ? key = c : key += `[${c}]`;
                })
                isEmpty(key) ? formData.append(i, args[i]) : formData.append(key + `[${i}]`, args[i]);
            }
        }
        return formData;
    }
};

export const isEmpty = Tools.isEmpty;
export const getTimeString = Tools.getTimeString;
export const toQueryString = Tools.toQueryString;
export const getUrlParam = Tools.getUrlParam;
export const getUrlParamFromHash = Tools.getUrlParamFromHash;
export const dateDiff = Tools.dateDiff;
export const buildArgs = Tools.buildArgs;
export default Tools;
