<template>
  <a-layout>

    <TheHeader />

    <router-view />

    <TheFooter />

  </a-layout>
</template>

<script lang="ts">
import TheHeader from '@/components/TheHeader.vue';
import TheFooter from '@/components/TheFooter.vue';
import {defineComponent} from "vue";

export default defineComponent({
  components: {TheFooter, TheHeader}
})


</script>

<style>
nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
