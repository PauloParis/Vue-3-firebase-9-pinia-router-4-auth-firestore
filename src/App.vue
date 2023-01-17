<template>
  <div>
  <a-layout>
    <a-layout-header v-if="!userStore.loadingSession">
      
      <a-menu
        v-model:selectedKeys="selectedKeys" 
        theme="dark" 
        mode="horizontal" 
        :style="{ lineHeight: '64px' }"
        >
        <a-menu-item key="home" v-if="userStore.userData">
          <RouterLink to="/">Home</RouterLink> 
        </a-menu-item>
        <a-menu-item key="perfil" v-if="userStore.userData">
          <RouterLink to="/perfil">Perfil</RouterLink> 
        </a-menu-item>
        <a-menu-item key="login" v-if="!userStore.userData">
          <RouterLink to="/login">Login</RouterLink> 
        </a-menu-item>
        <a-menu-item key="register" v-if="!userStore.userData">
          <RouterLink to="/register">Register</RouterLink> 
        </a-menu-item>
        <a-menu-item key="logout" @click="userStore.logoutUser" v-if="userStore.userData">
          Logout
        </a-menu-item>
      </a-menu>
      
      <nav >
        
        
        
        
      </nav>
    </a-layout-header>
    
    <a-layout-content style="padding: 0 50px">  
      <div class="container">
        <div v-if="userStore.loadingSession">Loading user...</div>
        <RouterView v-else></RouterView>
      </div>
    </a-layout-content>
    
    
  </a-layout>  
  </div>
</template>


<script setup>
import { ref, watch } from 'vue';
import { useUserStore } from './stores/user';
import { useRoute } from 'vue-router';

const userStore = useUserStore();

const selectedKeys= ref([]);

const route = useRoute();
watch(
  () => route.name, //lo que observa
  ()=> {
      selectedKeys.value = [route.name]; //lo que hace
      }
);
</script>

<style>
.container {
  background-color: #fff;
  padding: 24px;
  min-height: calc(100vh - 64px);
}
.text-center {
  text-align: center;
}
</style>