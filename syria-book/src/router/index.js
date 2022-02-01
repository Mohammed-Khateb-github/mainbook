import { createWebHistory, createRouter } from "vue-router";

import Login from "../components/Login.vue";
import Dashboard from "../components/Dashboard.vue";
import CreateAccount from "../components/CreateAccount.vue";

const routes = [
    {
        path: "/dashboard",
        name: "Dashboard",
        component: Dashboard,
        props:{msg:"hello",name:"Bash"}
    },
    {
        path: "/login",
        name: "Login",
        component: Login,
    },
    {
        path: "/createAccount",
        name: "CreateAccount",
        component: CreateAccount,
    },

];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;