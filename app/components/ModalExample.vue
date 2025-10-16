<template>
  <UModal v-model:open="open" :dismissible="false">
    <UButton label="Open" color="neutral" variant="subtle" />

    <template #content>
      <Placeholder class="h-48 m-4" />
    </template>
  </UModal>
</template>

<script setup lang="ts">
import {ref, reactive, watch, watchEffect} from "vue"

const open = ref(false)

/* 定数 */
const props = defineProps({
  mainMsg: Object,
  backMsg: Object,
  //v-modelで親側の値をデフォルトでpropsに受け取ることが可能
  isOpen: { type: Boolean, required: true },
});

open.value = props.isOpen;

// defineShortcuts({
//   o: () => open.value = !open.value
// })

</script>
