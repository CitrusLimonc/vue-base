import { isEmpty } from '@/utils/utils.js';
import { NetWork } from '@/utils/NetWork.js';

/**
 * 获取用户信息
 * @param {*} callback 回调
 */
const getUserInfo = () => {
    return new Promise((resolve, reject) => {
        // NetWork.Post({
        //     url: "***/***",
        //     param: {}
        // }, (result) => {
        //     // let userInfo = {};
        //     // if (!isEmpty(result.loginId)) {
        //     //     userInfo = result;
        //     // }
        //     resolve(result);
        // }, (error) => {
        //     resolve({});
        // })
    })
};


export { getUserInfo };