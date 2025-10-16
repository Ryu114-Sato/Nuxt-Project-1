<template>
  <UModal v-if="open" :dismissible="false">
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
  props:{
isOpen :{
  type :Boolean
}
  },
  setup(props, ctx) {
      
const open = ref(false)
open.value = props.isOpen;

console.log(`ModalExample_isOpen:${props.isOpen}`)
console.log(`ModalExample_open:${open.value}`)


//debug .
 watchEffect(()=>{
            console.log(`ModalExample_watch_open:${JSON.stringify(open.value)}`)
        })
return{
  open,
}
  },
})

</script>
