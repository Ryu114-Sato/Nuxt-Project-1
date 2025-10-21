<template>
  <NuxtPage :testPs="testSt" />
</template>

<script setup lang="ts">
import { ref } from "vue";

const testSt = ref("プロップスです");
</script>
