<template>
  <main>
    <h1>Home</h1>
    <p>{{ userStore.userData?.email }}</p> <!-- ?, por si no está inicializado ese email (por si no existe) -->
    

    <form @submit.prevent="handleSubmit">
      <input type="text" placeholder="Ingrese URL" v-model="url">
      <button type="submit">Agregar</button>
    </form>
    
    
    <p v-if="databaseStore.loadingDoc">Loading Docs...</p>
    <ul v-else>
      <li v-for="item of databaseStore.documents" :key="item.id">
        {{ item.id }}
        <br>
        {{ item.name }}
        <br>
        {{ item.short }}
        <button @click="databaseStore.deleteUrl(item.id)">Eliminar</button>
        <button @click="router.push(`/edit/${item.id}`)">Editar</button>
      </li>
    </ul>
  </main>
</template>


<script setup>

/* import {onAuthStateChanged} from 'firebase/auth'
import { auth } from '../firebaseConfig' */
/* onAuthStateChanged(auth, (user) =>{ //el problema es que, no es una promesa
  console.log(user)
}) */

import {useUserStore} from '@/stores/user'
import { ref } from 'vue';
import { useDatabaseStore } from '../stores/database';
import { useRouter } from 'vue-router';

const userStore = useUserStore();
const databaseStore = useDatabaseStore();

databaseStore.getUrls();

const url = ref('');
const handleSubmit = () => {
  //validaciones de la url.... // con expresiones regulares ?? libreria externa ??
  databaseStore.addUrl(url.value);
  url.value = '';
}

const router = useRouter();

</script>