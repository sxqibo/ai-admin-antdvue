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

</style>
