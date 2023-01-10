import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import {useUserStore} from '@/stores/user.js'

const requireAuth = async(to, from, next) => {
  const userStore = useUserStore(); //debe estar dentro de la función, está en la documentación
  
  userStore.loadingSession = true;

  const user = await userStore.currentUser(); //aqui verifico si la sesión está activa
  if(user) {
    next();
  }
  else {
    next('/login');
  }
  userStore.loadingSession = false;
}


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView, beforeEnter: requireAuth
    },
    {
      path: '/edit/:id',
      name: 'edit',
      component: () => import('../views/EditView.vue'), beforeEnter: requireAuth
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/RegisterView.vue')
    }
  ]
})

export default router;
