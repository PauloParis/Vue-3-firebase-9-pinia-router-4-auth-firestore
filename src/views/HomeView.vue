<template>
  <main>
    <h1>Home</h1>
    <p>{{ userStore.userData?.email }}</p> <!-- ?, por si no está inicializado ese email (por si no existe) -->
  </main>
</template>


<script setup>

/* import {onAuthStateChanged} from 'firebase/auth'
import { auth } from '../firebaseConfig' */
/* onAuthStateChanged(auth, (user) =>{ //el problema es que, no es una promesa
  console.log(user)
}) */

import {useUserStore} from '@/stores/user'

const userStore = useUserStore();

</script>