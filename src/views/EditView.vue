<template>
    <div>
        <h1>Editar id: {{route.params.id}}</h1>
        <form @submit.prevent="handleSubmit">
            <input type="text" placeholder="Ingrese" v-model="url">
            <button type="submit">Editar</button>
        </form>
    </div>
</template>

<script setup>
import { onMounted, ref } from '@vue/runtime-core';
import {useRoute} from 'vue-router'
import {useDatabaseStore} from '../stores/database'

const route = useRoute();
//console.log(route.params);

const databaseStore = useDatabaseStore();


const handleSubmit = () => {
    //validaciones de la url...
    databaseStore.update(route.params.id, url.value);
}

const url = ref('');
onMounted(async() => {
    url.value = await databaseStore.readurl(route.params.id)
})

</script>