<!-- 页面内容 -->
<template>
    <div class="home">
        <HelloWorld :msg="firstData" />
    </div>
</template>
<!-- js 部分 -->
<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
export default {
    name: "Home",
    data() {
        return {
            firstData: "Welcome to Your Vue.js App"
        };
    },
    components: {
        HelloWorld
    }
};
</script>
<style scoped lang="scss">
.home {
    display: flex;
    flex-direction: column;
    align-items: center;
}
</style>
