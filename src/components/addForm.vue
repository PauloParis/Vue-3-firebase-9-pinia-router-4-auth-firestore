<template>
    <a-form
        name="addForm"
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
            <a-button :loading="databaseStore.loading" :disabled="databaseStore.loading" type="primary" htmlType="submit">Agregar</a-button>
        </a-form-item>

    </a-form>
</template>

<script setup>
import { reactive } from "vue";
import { useDatabaseStore } from "../stores/database";
import { message } from 'ant-design-vue';
import "ant-design-vue/es/message/style/css";

const formState = reactive({
    url: "",
})

const databaseStore = useDatabaseStore();

const onFinish = async(value) => {
    console.log('todo correcto' + value);
    const error = await databaseStore.addUrl(formState.url);
    
    if(!error) {
        formState.url = '';
        return message.success('url agregada')
    } 
    
    switch(error){
        //buscar errores de firestore
        default: 
            message.error('fallo algo desde firebase intentelo nuevamente')
      }
}

</script>

