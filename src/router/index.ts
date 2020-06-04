import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";

Vue.use(VueRouter);
const routes: Array<RouteConfig> = [
    {
        path: "/",
        name: "home",
        component: () => import("../page/home.vue")
    },
    {
        path: "/about",
        name: "about",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import("../page/about.vue"),
        /* 子路由 */
        // children:[
        //     {
        //         path: '',
        //         component: () => import(""),
        //     }
        // ]
    }
];

const router = new VueRouter({
    routes
});

export default router;
