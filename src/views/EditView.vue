<template>
    <div>
        <h1>Editar id: {{route.params.id}}</h1>
        <!-- <form @submit.prevent="handleSubmit">
            <input type="text" placeholder="Ingrese" v-model="url">
            <button type="submit">Editar</button>
        </form> -->

        <a-form
        name="editForm"
        autocomplete="off"
        layout="vertical"
        :model="formState"
        @finish="onFinish"
        >
        <a-form-item
            name="url"
            label="Ingrese una url"
            :rules="[{required: true, whitespace: true, pattern: /^https?:\/\/[\w\-]+(\.[\w\-]+)+[/#?]?.*$/, message: 'Ingresa una url valida', }]"
            >
            
            <a-input v-model:value="formState.url"></a-input>
        </a-form-item>

        <a-form-item>
            <a-button :loading="databaseStore.loading" :disabled="databaseStore.loading" type="primary" htmlType="submit">Editar</a-button>
        </a-form-item>

    </a-form>

    </div>
</template>

<script setup>
import { onMounted, reactive, ref } from '@vue/runtime-core';
import {useRoute} from 'vue-router'
import {useDatabaseStore} from '../stores/database'
import { message } from 'ant-design-vue';
import "ant-design-vue/es/message/style/css";


const route = useRoute();
//console.log(route.params);

const databaseStore = useDatabaseStore();


const formState = reactive({
    url: ''
})

onMounted(async() => {
    formState.url = await databaseStore.readurl(route.params.id)
})

const onFinish = async(value) => {
    console.log('todo correcto' + value);
    const error = await databaseStore.update(route.params.id, formState.url);
    
    if(!error) {
        formState.url = '';
        return message.success('url editada')
    } 
    
    switch(error){
        //buscar errores de firestore
        default: 
            message.error('fallo algo desde firebase intentelo nuevamente')
      }
}

/* const handleSubmit = () => {
    //validaciones de la url...
    databaseStore.update(route.params.id, url.value);
} */


/* const url = ref('');
onMounted(async() => {
    url.value = await databaseStore.readurl(route.params.id)
}) */

</script>