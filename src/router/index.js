
import VueRouter from 'vue-router'
import Vue from 'vue'
import home from "../components/home.vue";

Vue.use(VueRouter)

export default new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'home',
            component: home
        },
    ]
})