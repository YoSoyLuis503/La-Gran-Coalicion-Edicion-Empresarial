import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@/views/HomeView.vue';
import RegisterView from '@/views/RegisterView.vue';
import LoginView from '@/views/LoginView.vue';
import CandidatesView from '@/views/CandidatesView.vue';
import PruebasView from '@/views/PruebasView.vue';
import PostJobView from '@/views/PostJobView.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView,
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
  },
  {
    path: '/prueba',
    name: 'prueba',
    component: PruebasView,
  },
  {
    path: '/post-job',
    name: 'post-job',
    component: PostJobView
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach((to, from, next) => {
  document.title = to.meta.title || 'Título predeterminado';
  next();
});


export default router;
