<template>
  <div>
    <h1>APP</h1>
    <nav v-if="!userStore.loadingSession">
      <RouterLink to="/" v-if="userStore.userData">Home</RouterLink> |
      <RouterLink to="/login" v-if="!userStore.userData">Login</RouterLink> |
      <RouterLink to="/register" v-if="!userStore.userData">Register</RouterLink> |
      <button @click="userStore.logoutUser" v-if="userStore.userData">Logout</button>
    </nav>
    <div v-else>Loading user...</div>
    <RouterView></RouterView>
  </div>
</template>


<script setup>
import { useUserStore } from './stores/user';

const userStore = useUserStore();
</script>
