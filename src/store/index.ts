import Vue from "vue";
import Vuex from "vuex";
import { getUserInfo } from '@/services/home.js';
import { isEmpty } from '@/utils/utils.js';

Vue.use(Vuex);

import home from './home';
export default new Vuex.Store({
    state: {
        userInfo: {}
    }, /* 只有state 区分命名空间 */
    /**
     * mutations 里面放置的是我们操作state对象属性的方法
     * 要用 commit 触发
     */
    mutations: {
        updateUserInfo(state, userInfo = {}) {
            return state.userInfo = userInfo;
        }
    },
    /**
     * actions 异步操作 要用 dispatch 触发
     */
    actions: {
        async getUserInfo({ commit }) {
            let data = await getUserInfo();
            console.log('getUserInfo', data);
            if (data.code != 200) {
                window.location.href = data.authUrl;
            } else {
                if (!isEmpty(data.result.userInfo)) {
                    commit('updateUserInfo', data.result.userInfo);
                } else {
                    commit('updateUserInfo', {});
                }
            }
        }
    },
    /**
     * getters 获取state中的值
     */
    getters: {},
    /**
     * 模块化，区分命名空间的store
     */
    modules: {
        home: home
    }
});
