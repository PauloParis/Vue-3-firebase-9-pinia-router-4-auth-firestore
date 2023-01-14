<template>
    <h1 class="text-center">Register</h1>
    <a-row>
        <a-col :xs="{span: 24}" :sm="{span : 12, offset : 6}">
        
            <a-form
                name="basicRegister"
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
                        :rules="[{required: true, whitespace: true, min: 6, messagge: 'Ingresa una contraseña con mínimo 6 caracteres'}]"
                        >
                        <a-input-password v-model:value="formState.password"></a-input-password>
                    </a-form-item>

                    <a-form-item
                        name="repassword"
                        label="Repita Password"
                        :rules="[{required: true, whitespaces: true, min: 6, validator: validatePass}]"
                        >
                        <a-input-password v-model:value="formState.repassword"></a-input-password>
                    </a-form-item>
                    
                    <a-form-item>
                        <a-button :loading="userStore.loadingUser" type="primary" htmlType="submit" :disabled="userStore.loadingUser">Registrar</a-button>
                    </a-form-item>


            </a-form>

        </a-col>
        <!-- <h1>Register</h1>
        <form @submit.prevent="handleSubmit">
            <input type="email" placeholder="Ingrese Email" v-model.trim="email"> trim, para eliminar los espacios vacios al principio y al final
            <input type="password" placeholder="Ingrese Password" v-model.trim="password">
            <button type="submit" :disabled="userStore.loadingUser">Crear Usuario</button>
        </form> -->
        
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
const formState = reactive({
    email: 'paulo@test.com',
    password: '123456',
    repassword: '123456'
})

const validatePass = async (_rule, value) => {
    if(value === '') return Promise.reject('Repita Password')
    if(value !== formState.password) return Promise.reject('No coinciden las contraseñas')
    return Promise.resolve();
}

const userStore = useUserStore();

//const router = useRouter();

//const handleSubmit = async() => {
    //if(!email.value || password.value.length < 6) return alert('llena los campos');

    //await userStore.registerUser(email.value, password.value);
    //router.push('/');
//}

//si No hay error en el login
const onFinish = async (values) => {
      console.log('Success:', values);
      const error = await userStore.registerUser(formState.email, formState.password);

      if(!error) return message.success('Registro exitoso')
      switch(error){
        case 'auth/email-already-in-use': 
            message.error('email ya registrado')
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

