<template>
  <a-layout>

    <TheHeader />

    <router-view />

    <TheFooter />

  </a-layout>
</template>

<script lang="ts" setup>
import TheHeader from '@/components/TheHeader.vue';
import TheFooter from '@/components/TheFooter.vue';
</script>

<style>

</style>
