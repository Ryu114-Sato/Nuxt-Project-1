<template>
  <div>
    <h1>Test</h1>
    <button @click="goToPurchase">購入する</button>
    <br />
    <hr>
    <NuxtLink to="/purchase" >購入する</NuxtLink>
    <hr/>
    <button @click="$router.push('/purchase')">購入する</button>
  </div>
</template>

<script setup lang="ts">
import {useRouter, useRoute} from 'vue-router'
const router = useRouter()

const goToPurchase = () => {
  console.log('goToPurchase');
  router.push("/purchase")
}
</script>