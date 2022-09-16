import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import Auth from "../views/Auth.vue";


const routes = [
    {
        path: "/",
        name: "Home",
        component: Home,
    },
    {
        path: "/login",
        name: "Login",
        component: Login,
    },
    {
        path: "/Register",
        name: "Register",
        component: Register,
    },
    {
        path: "/auth",
        name: "Auth",
        component: Auth,
    },
];

const router = createRouter({
    history: createWebHistory(import.meta.env.VITE_APP_ENV),
    routes,
});

export default router; 