<template>
  <h1 class="text-center">Login</h1>
  <a-row>
    <a-col :xs="{span : 24}" :sm="{span : 12, offset : 6 }">
      <a-form 
       
        name="basicLogin" 
        autocomplete="off"
        layout="vertical"
        :model="formState"
        @finish="onFinish"
        @finishFailed="onFinishFailed"
        >
          <a-form-item 
            name="email" 
            label="Ingresa tu Email"
            :rules="[{required: true, type: 'email', whitespace: true, message: 'Ingresa un email válido'}]"
            >
            <a-input v-model:value="formState.email"></a-input>
        </a-form-item> 

        <a-form-item
            name="password"
            label="Ingresa tu Password"
            :rules="[{required: true, whitespace: true, min: 6 , message: 'Ingresa una contraseña con mínimo 6 caracteres'}]"
            >
            <a-input-password v-model:value="formState.password"></a-input-password>
        </a-form-item>

        <a-form-item>
            <a-button :loading="userStore.loadingUser" type="primary" htmlType="submit" :disabled="userStore.loadingUser">Ingresar</a-button>
        </a-form-item>
          <!-- <input type="email" placeholder="Ingrese Email" v-model.trim="email"> trim, para eliminar los espacios vacios al principio y al final -->
          <!-- <input type="password" placeholder="Ingrese Password" v-model.trim="password">
          <button type="submit" :disabled="userStore.loadingUser">Acceso</button> -->
      </a-form>
    </a-col>
      
      
  </a-row>
</template>

<script setup>

import {useUserStore} from '@/stores/user.js'
import { reactive, ref } from 'vue';
import { message } from 'ant-design-vue'
import "ant-design-vue/es/message/style/css";
//import { useRouter } from 'vue-router';

//const email = ref('paulo@test.com');
//const password = ref('123456');

//la idea con esto, esque las validaciones se vean en tiempo real
const formState = reactive({ //la diferencia con ref, esque no se pueden utilizar datos primitivos y no se usa los .value
    email: 'paulo@test.com',
    password: '123456'
})


const userStore = useUserStore();

//const router = useRouter();

const handleSubmit = async() => {
  //if(!formState.email || formState.password.length < 6) return alert('llena los campos'); //ya no es necesario porq las validaciones se hacen con el antd

  //await userStore.loginUser(formState.email, formState.password);
  //router.push('/');
}


//si No hay error en el login
const onFinish = async (values) => {
      console.log('Success:', values);
      const error = await userStore.loginUser(formState.email, formState.password);

      if(!error) return message.success('Bienvenido a la super app')
      switch(error){
        case 'auth/user-not-found': 
            message.error('no existe el email registrado')
            break;
        case 'auth/wrong-password':
            message.error('contraseña incorrecta')
            break;
        default: 
            message.error('fallo algo desde firebase intentelo nuevamente')
      }

    };
//no HAY error en el login
const onFinishFailed = (errorInfo) => {
      console.log('Failed:', errorInfo);
    };


</script>