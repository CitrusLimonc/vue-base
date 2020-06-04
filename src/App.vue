<script>
import { Domain } from "@/biz/domain";
import { isEmpty } from "@/utils/utils";
export default {
    name: "App",
    data() {
        return {
            navList: [
                { name: "首页", path: "/" },
                { name: "关于", path: "/about" },
            ]
        };
    },
    components: {},
    created() {
        this.$store.dispatch("getUserInfo");
    },
    methods: {
        getHeadInfo(type) {
            let userInfo = this.$store.state.userInfo;
            console.log("getHeadInfo", userInfo);

            return !isEmpty(userInfo[type]);
        }
    }
};
</script>
<!-- 
    这里做为项目的外框
 -->
<template>
    <div id="app">
        <div id="nav">
            <span class="head-title">没有名字</span>
            <div class="nav-box">
                <!-- 循环遍历导航列表 -->
                <div v-for="(item, index) in navList" :key="index">
                    <router-link :to="{ path: item.path }">
                        {{ item.name }}
                    </router-link>
                </div>
            </div>
            <div class="head-right">
                <div v-if="getHeadInfo('logo')" class="head-icon-box">
                    <img
                        :src="$store.state.userInfo.logo"
                        class="head-icon-img"
                    />
                </div>
            </div>
        </div>
        <div class="router-box">
            <router-view />
        </div>
    </div>
</template>

<style lang="scss">
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    .router-box {
        background-color: #f0f2f5;
        flex: 1;
    }
}
#nav {
    width: 100%;
    height: 64px;
    background-color: #ffffff;
    display: flex;
    flex-direction: row;
    align-items: center;
    .head-pic {
        width: 32px;
        height: 32px;
        margin-left: 30px;
    }
    .head-title {
        margin-left: 30px;
        font-size: 16px;
        color: #333333;
        font-weight: 600;
    }
    .nav-box {
        display: flex;
        flex-direction: row;
        align-items: center;
        margin-left: 64px;
    }
    a {
        font-weight: bold;
        color: #2c3e50;
        text-decoration: none;
        display: inline-block;
        height: 64px;
        margin-right: 18px;
        border-top: 4px solid #ffffff;
        line-height: 60px;
        padding-left: 18px;
        padding-right: 18px;
        &.router-link-exact-active {
            color: #1890ff;
            border-top: 4px solid #1890ff;
        }
    }
    .head-right {
        flex: 1;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: flex-end;
        padding-right: 30px;
        .head-icon-box {
            width: 32px;
            height: 32px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 16px;
        }
        .head-icon-img {
            width: 30px;
            height: 30px;
            border-radius: 15px;
        }
        .head-mall-title {
            font-size: 12px;
            color: #333333;
            margin-left: 8px;
        }
    }
}
</style>
