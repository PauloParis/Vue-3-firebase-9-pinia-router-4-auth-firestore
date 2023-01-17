import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import {useUserStore} from '@/stores/user.js'
import { useDatabaseStore } from '../stores/database'

//Middleware
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

//Middleware para rediccionamiento
const redireccion = async(to, from, next) => {
  const databaseStore = useDatabaseStore();

  const userStore = useUserStore();
  userStore.loadingSession = true;

  //console.log(to.params.pathMatch[0]);
  const name = await databaseStore.getURL(to.params.pathMatch[0])
  if(!name) {
    next(); //manda al 404
    userStore.loadingSession = false;
  } else {
    window.location.href = name;
    userStore.loadingSession = true;
    next();
  }
  
}
/////////////////////////////////////////////////


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
      component: () => import('../views/LoginView.vue'),
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/RegisterView.vue')
    },
    {
      path: '/perfil',
      name: 'perfil',
      component: () => import('../views/PerfilView.vue'), beforeEnter: requireAuth
    },
    {
      path: '/:pathMatch(.*)*',
      name: '404',
      component: () => import('../views/NotFoundView.vue'), beforeEnter: redireccion
    }
  ]
})

export default router;
