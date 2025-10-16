<template>
  <UModal v-model:open="open" :dismissible="false">
    <!-- <UButton label="Open" color="neutral" variant="subtle" /> -->

    <template #content>
        <p>モーダルウィンドウ</p>
        <button @click="open = false">close</button>
      <Placeholder class="h-48 m-4" />
    </template>
  </UModal>
</template>

<script lang="ts">
import {ref, defineComponent, watchEffect} from "vue"
export default defineComponent({
  name:'ModalExample',
  setup(props, ctx) {
      
const open = ref(false)

/* 定数 */
props = defineProps({
  //v-modelで親側の値をデフォルトでpropsに受け取ることが可能
  isOpen: { type: Boolean },
});

open.value = props.isOpen;

//debug .
 watchEffect(()=>{
            console.log(`ModalExample_open:${JSON.stringify(open.value)}`)
        })
return{
  open,
}


  },
})

</script>
