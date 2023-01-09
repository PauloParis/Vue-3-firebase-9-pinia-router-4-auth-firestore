<template>
    <div>
        <h1>Register</h1>
        <form @submit.prevent="handleSubmit">
            <input type="email" placeholder="Ingrese Email" v-model.trim="email"> <!-- trim, para eliminar los espacios vacios al principio y al final -->
            <input type="password" placeholder="Ingrese Password" v-model.trim="password">
            <button type="submit" :disabled="userStore.loadingUser">Crear Usuario</button>
        </form>
        
    </div>
</template>

<script setup>

import {useUserStore} from '@/stores/user.js'
import { ref } from 'vue';
//import { useRouter } from 'vue-router';

const email = ref('paulo@test.com');
const password = ref('123456');

const userStore = useUserStore();

//const router = useRouter();

const handleSubmit = async() => {
    if(!email.value || password.value.length < 6) return alert('llena los campos');

    await userStore.registerUser(email.value, password.value);
    //router.push('/');
}

</script>

