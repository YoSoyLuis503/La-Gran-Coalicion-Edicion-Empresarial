import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@/views/HomeView.vue';
import RegisterView from '@/views/RegisterView.vue';
import LoginView from '@/views/LoginView.vue';
import CandidatesView from '@/views/CandidatesView.vue';
import PruebasView from '@/views/PruebasView.vue';
import PostJobView from '@/views/PostJobView.vue';
import { getAuth } from 'firebase/auth';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView,
    meta: { requiresAuth: true }
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView,
    meta: { title: 'Login' }
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterView,
    meta: { title: 'Registro Empresarial' }
  },
  {
    path: '/candidates',
    name: 'candidates',
    component: CandidatesView,
    meta: { requiresAuth: true }
  },
  {
    path: '/prueba',
    name: 'prueba',
    component: PruebasView,
    meta: { requiresAuth: true }
  },
  {
    path: '/post-job',
    name: 'post-job',
    component: PostJobView,
    meta: { requiresAuth: true }
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach((to, from, next) => {
  const auth = getAuth();
  const user = auth.currentUser;
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

  if (requiresAuth && !user) {
    next({ name: 'login' });
  } else if ((to.name === 'login' || to.name === 'register') && user) {
    next({ name: 'Home' });
  } else {
    document.title = to.meta.title || 'Título predeterminado';
    next();
  }
});

export default router;
