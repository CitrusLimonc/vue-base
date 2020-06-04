import axios from 'axios';
import { Domain } from '@/biz/domain.js';

const NetWork = {};

function parseQuery(obj) {
    let str = '';
    for (const key in obj) {
        const value = typeof obj[key] !== 'string' ? JSON.stringify(obj[key]) : obj[key];
        str += '&' + key + '=' + value;
    }
    return str.substr(1);
}

/**
* Requests a URL, returning a promise.
*
* @param  {string} url       The URL we want to request
* @param  {object} [options] The options we want to pass to "fetch"
* @return {object}           An object containing either "data" or "err"
*/
const request = (url, method = 'get', data, successCallback, errorCallback) => {
    const options = {
        baseURL: Domain.WEB_URL,
        method: method,   // HTTP请求方法，默认为GET
        headers: {// HTTP的请求头，默认为{}
            "content-type": "application/x-www-form-urlencoded;charset=UTF-8",
            "X-From-App": Domain.Product,
        },
        withCredentials: true, // 是否携带cookie，默认为omit,不携带; same-origi,同源携带; include,同源跨域都携带
    }
    if (method === 'get') {
        url += '?' + parseQuery(data);
    } else {
        // let formData = new FormData();
        // formData = buildArgs(formData,data);
        options.data = parseQuery(data);
    }
    options.url = url;
    axios(options)
        .then((response) => {
            console.log(url, response.data);
            if (successCallback) {
                successCallback(response.data);
            }
        })
        .catch(((err) => {
            console.error('php调用失败', err);
            if (errorCallback) {
                errorCallback(data);
            }
        }));
}

NetWork.Get = ({ url, param }, successCallback, errorCallback) => {
    return request(url, 'get', param, successCallback, errorCallback);
};

NetWork.Post = ({ url, param }, successCallback, errorCallback) => {
    return request(url, 'post', param, successCallback, errorCallback);
};
export { NetWork };
