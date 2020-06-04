export default {
    /* 区分命名空间 */
    namespaced: true,
    state: {
        inputVal: 123
    },
    /**
     * mutations 里面放置的是我们操作state对象属性的方法
     * 要用 commit 触发
     */
    mutations: {
        changeInput(state, val = '') {
            console.log('changeInput', val);
            return state.inputVal = val;
        },
    },
    /**
     * actions 异步操作 要用 dispatch 触发
     */
    actions: {
        actionChangeInput({ commit }, val = '') {
            return commit('changeInput', val)
        }
    },
    /**
     * getters 获取state中的值
     */
    getters: {
        getInputVal(state) {
            return state.inputVal;
        }
    }
};
