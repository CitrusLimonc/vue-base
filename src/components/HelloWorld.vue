<template>
    <div class="hello">
        <!-- {{}} 用来引入props -->
        <h1>{{ msg }}</h1>
        <el-button @click="getText">点击获取</el-button>
        <el-input
            type="textarea"
            placeholder="请输入内容"
            v-model="$store.state.home.inputVal"
            maxlength="30"
            show-word-limit
            @input="inputOnChange"
        >
        </el-input>
        <!-- <div v-show="$store.state.home.inputVal.length > 20">
            超过了20个字符
        </div> -->
        <div v-if="$store.state.home.inputVal.length > 20">
            超过了20个字符
        </div>
        <div v-else>
            没超过20个字符
        </div>
    </div>
</template>

<script>
export default {
    name: "HelloWorld",
    props: {
        msg: String
    },
    data() {
        return {
            inputVal: "134135"
        };
    },
    created() {
        console.log(this.$store.state.home.inputVal);
    },
    methods: {
        inputOnChange(e) {
            // this.$store.commit("home/changeInput", e); // 直接修改state
            // this.$store.dispatch("actionChangeInput", e); // 异步 不区分命名空间
            this.$store.dispatch("home/actionChangeInput", e); // 异步 区分命名空间
        },
        getText() {
            this.$message({
                message: this.$store.state.home.inputVal,
                type: "success"
            });
        }
    }
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
    margin: 40px 0 0;
}
ul {
    list-style-type: none;
    padding: 0;
}
li {
    display: inline-block;
    margin: 0 10px;
}
a {
    color: #42b983;
}
</style>
