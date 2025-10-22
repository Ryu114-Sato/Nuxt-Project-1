<template>
  <div>
    <p>モーダルウィンドウ</p>
    <button @click="isActive = false">close</button>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent, watchEffect, watch } from "vue";
export default defineComponent({
  //name: "modalExample",
  props: {
    ModalFlg: {
      type: Boolean,
    },
    modelValue: { type: Boolean, required: true },
  },
  setup(props, ctx) {
    const isActive = ref(props.ModalFlg);
    console.log(`ModalExample_isOpen:${props.ModalFlg}`);

    watch(
      () => props.ModalFlg,
      (val) => {
        isActive.value = val;
        console.log("DialogCmp__watch_local_isActive:" + isActive.value);
      }
    );

    return {
      isActive,
    };
  },
});
</script>
