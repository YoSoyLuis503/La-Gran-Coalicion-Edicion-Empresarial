import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@/views/HomeView.vue';
import RegisterView from '@/views/RegisterView.vue';
import LoginView from '@/views/LoginView.vue';
import CandidatesView from '@/views/CandidatesView.vue';
import PruebasView from '@/views/PruebasView.vue';
import PostJobView from '@/views/PostJobView.vue';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView,
    meta: { requiresAuth: true,title: 'Jobs Empresarial' }
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView,
    meta: { title: 'Jobs Empresarial' }
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
    meta: { requiresAuth: true,title: 'candidatos' }
  },
  {
    path: '/Jobs-Empresarial',
    name: 'Jobs Empresarial',
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
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

  if (requiresAuth) {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        if (to.name === 'login' || to.name === 'register') {
          next({ name: 'Home' });
        } else {
          next();
        }
      } else {
        next({ name: 'login' });
      }
    });
  } else if ((to.name === 'login' || to.name === 'register') && auth.currentUser) {
    next({ name: 'Home' });
  } else {
    document.title = to.meta.title || 'Jobs Empresarial';
    next();
  }
});

export default router;