<template>
  <main>
    <h1>Home</h1>
    <p>{{ userStore.userData?.email }}</p> <!-- ?, por si no está inicializado ese email (por si no existe) -->
    

    <!-- <form @submit.prevent="handleSubmit">
      <input type="text" placeholder="Ingrese URL" v-model="url">
      <button type="submit">Agregar</button>
    </form> -->
    
    <add-form></add-form> <!-- no se importa, por el plugin instalado en el vite.config.js -->
    
    <p v-if="databaseStore.loadingDoc">Loading Docs...</p>
   
    <a-space direction="vertical" v-if="!databaseStore.loadingDoc" style="width: 100%">
      <a-card
      v-for="item of databaseStore.documents" 
      :key="item.id"
      :title="item.short"
      
      >
        <template #extra>
          <a-space>
            <a-popconfirm
              title="¿Estás seguro de eliminar?"
              ok-text="Si"
              cancel_text="No"
              @confirm="confirm(item.id)"
              @cancel="cancel"
              >
              <a-button danger :loading="databaseStore.loading" :disabled="databaseStore.loading">Eliminar</a-button>
            </a-popconfirm>
            <a-button type="primary" @click="router.push(`/edit/${item.id}`)">Editar</a-button>
          </a-space>
        </template>
        <p>{{ item.name }}</p>
      </a-card>
    </a-space>
   
    
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
import { message } from 'ant-design-vue';

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


const confirm = async(id) => {
  
  const error = await databaseStore.deleteUrl(id);

  if(!error) return  message.success('Eliminado con exito');
  return message.error(error) //vienen de los throw new error
  
}
const cancel = () => {
  message.error('No se eliminó')
}

</script>