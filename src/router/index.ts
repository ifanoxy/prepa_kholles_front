import { createRouter, createWebHistory } from 'vue-router'
import {ApiClient} from "@/plugins/API/client";
import HomeView from "@/views/HomeView.vue";
import LoginView from "@/views/LoginView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
  ]
});

router.beforeEach(async (to, from, next) => {
    if (to.name === "login")return next();

    const token = localStorage.getItem("token");

    if (!token)
        return next({ name: "login" });

    if (!await ApiClient.route.user.isAuth({ token }))
        return next({ name: "login" });

    next();
})

export default router
