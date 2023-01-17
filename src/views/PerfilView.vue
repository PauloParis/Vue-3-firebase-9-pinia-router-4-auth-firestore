<template>
    <div>
        <h1 class="text-center">Perfil de Usuario</h1>
        <div class="text-center mb-5">
            <a-avatar
                :src="userStore.userData.photoURL"
                :size="100"
                >
        </a-avatar>
        </div>
        <a-row>
    <a-col :xs="{span : 24}" :sm="{span : 12, offset : 6 }">
      <a-form 
       
        name="basicPerfil" 
        autocomplete="off"
        layout="vertical"
        :model="userStore.userData"
        @finish="onFinish"
        >
          <a-form-item 
            name="email" 
            label="Tú correo (no midificable)"
            :rules="[{required: true, type: 'email', whitespace: true, message: 'Ingresa un email válido'}]"
            >
            <a-input disabled v-model:value="userStore.userData.email"></a-input>
        </a-form-item> 

        <a-form-item 
            name="displayName" 
            label="Ingresa tu nickName"
            :rules="[{required: true, whitespace: true, message: 'Ingresa nick válido'}]"
            >
            <a-input v-model:value="userStore.userData.displayName"></a-input>
        </a-form-item> 

        <a-upload 
            v-model:file-list="fileList" 
            :before-upload="beforeUpload"
            :max-count="1"
            listType="picture"
            @change="handleChange"
            class="mb-5"
            >
            <a-button>Subir foto perfil</a-button>
        </a-upload>
            

        <a-form-item class="mt-5">
            <a-button :loading="userStore.loadingUser" type="primary" htmlType="submit" :disabled="userStore.loadingUser">Actualizar información</a-button>
        </a-form-item>
          
      </a-form>
    </a-col>
      
      
  </a-row>
    </div>
</template>

<script setup>

import {useUserStore} from '../stores/user'
import { message } from 'ant-design-vue'
import "ant-design-vue/es/message/style/css";
import { ref } from 'vue';

const userStore = useUserStore();

//para subir imagen
const fileList = ref([]);
const beforeUpload = file => {
    fileList.value = [...fileList.value, file];
    return false;
}

//para validar el tipo de imagen 1
const handleRemove = file => {
      const index = fileList.value.indexOf(file);
      const newFileList = fileList.value.slice();
      newFileList.splice(index, 1);
      fileList.value = newFileList;
    };


//para validar el tipo de imagen 2
const handleChange = (info) => {
    if (info.file.status !== 'uploading'){
        const isJpgOrPng = info.file.type === 'image/jpeg' || info.file.type === 'image/png';
        if (!isJpgOrPng) {
            message.error('Solo imagenes pgn o jpg');
            handleRemove(info.file)
            return;
        }
        const isLt2M = info.file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error('Maximo 2MB!');
            handleRemove(info.file)
            return;
      }
    }
}

const onFinish = async() => {
    const error = await userStore.updateUser(userStore.userData.displayName, fileList.value[0]);

    //para subir imagen, si son varias
    /* fileList.value.forEach(file => {
        console.log(file)
    }) */
    /* if(fileList.value[0]){ // si solo es una imagen
        const error = await userStore.updateImg(fileList.value[0]); //actualziar imagen si existe
        if(error) {
            return message.success('Problemas al subir tu imagen')
        }
        message.success('Se actualizó tu imagen')
    } */
    if(!error) {
        return message.success('Se actualizó tu nick name')
    }
    else {
        message.error('Ocurrio un error al actualizar el perfil')
    }
}
</script>

<style>
.mb-5 {
    margin-bottom: 2rem;
}
.mt-5 {
    margin-top: 2rem;
}
</style>