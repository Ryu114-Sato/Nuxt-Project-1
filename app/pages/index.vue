<template>
  <div class="p-10">
    <div class="bg-green-500 text-white text-center py-6 rounded-lg shadow-lg">
      Tailwind動作確認OK
    </div>
  </div>
  <div class="p-8 space-y-6">
    <h2 class="text-xl font-semibold">
      <NuxtLink to="/purchase">NuxtLink 購入する</NuxtLink>
    </h2>
    <hr />
    <div class="bg-white p-6 rounded-xl shadow-md">
      <h2 class="text-xl font-semibold text-gray-800 mb-2">Tailwindの基本</h2>
      <p class="text-gray-600 mb-4">これはTailwindの最もシンプルなカード</p>
      <!-- Outline -->
      <button
        @click="goToPurchase()"
        class="border border-gray-400 text-gray-700 font-medium px-4 py-2 rounded-md hover:bg-gray-100 transition"
      >
        購入する
      </button>
    </div>
    <div class="border-2">
      <label class="p-1">注文数を選択してください</label>
      <p><button class="p-3" @click="incrementPinia">+</button></p>
      <button class="p-3" @click="decrementPinia">-</button>
      <p class="p-1">Current Count. {{ store.count }}</p>
      <p class="p-1">double Count. {{ doubleValue }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useCounterStore } from "@/composables/index";

const router = useRouter();
const route = useRoute();
const goToPurchase = () => {
  console.log(`goToPurchase_Current Path:${route.fullPath}`);
  router.push("/purchase");
};
const store = useCounterStore();
store.$patch({ count: store.count + 1 });
const incrementPinia = () => {
  store.increment();
};
const decrementPinia = () => {
  store.decrement();
};

const doubleValue = computed(() => store.doubleCount);
</script>