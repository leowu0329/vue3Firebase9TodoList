import { createRouter, createWebHistory } from 'vue-router';
import Login from '../pages/Login.vue';
import Register from '../pages/Register.vue';
import { useAuthStore } from '../store/useAuthStore'; // 引入auth store

const router = createRouter({
  routes: [
    {
      path: '/',
      redirect: '/login',
    }, // 默認重定向到 Login
    {
      name: '首頁',
      path: '/home',
      component: () => import('../pages/Home.vue'),
      meta: { requiresAuth: true },
    },
    {
      name: '關於',
      path: '/about',
      component: () => import('../pages/About.vue'),
    },
    {
      name: 'Login',
      path: '/login',
      component: Login,
    },
    {
      name: 'Register',
      path: '/register',
      component: Register,
    },
  ],
  history: createWebHistory(),
});

// 路由守衛
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);

  if (requiresAuth && !authStore.user) {
    next('/login');
  } else {
    next();
  }
});

export default router;
