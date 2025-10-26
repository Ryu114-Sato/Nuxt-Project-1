<template>
  <div v-if="modelValue" class="bg-indigo-500 p-6 rounded-xl shadow-md">
    <div role="dialog" aria-model="true" class="p-2 bg-sky-500">
      <labe class="p-2">購入内容確認</labe>
      <hr />
      <h2 class="p-2">お支払い方法</h2>
      <p class="border-4 gray-500 p-3">{{ props.modelValue }}</p>
      <h2>配送先</h2>
      <section class="p-3 border-2 slate-500">
        <slot>{{ props.modelValue }}</slot>
      </section>
      <button
        type="button"
        @click="
          close();
          emit('confirm');
        "
        class="items-center border-2 bg-black-500"
      >
        注文を確定する
      </button>
      <button
        type="button"
        @click="
          close();
          emit('cancel');
        "
        class="items-center border-2"
      >
        戻る
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineEmits, defineProps } from "vue";

const props = defineProps<{ modelValue: boolean }>();

const emit = defineEmits<{
  //親に渡す処理
  (e: "update:modelValue", v: boolean): void;
  (e: "confilm"): void;
  (e: "cancel"): void;
}>();

const close = () => {
  emit("update:modelValue", false);
};
</script>

