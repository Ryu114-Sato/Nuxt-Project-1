<template>
  <div v-if="modelValue" class="p-6 rounded-xl shadow-md">
    <div role="dialog" aria-model="true" class="p-2">
      <label class="p-2">購入内容確認</label>
      <hr />
      <h1 class="mb-6 text-2xl md:text-3xl font-bold">お支払い方法</h1>
      <p :class="infoClass">{{ userInfo.prefecture }}</p>
      <h2>配送先</h2>
      <ul v-show="userInfo" class="border-4 gray-500 p-3">
        <li>{{ userInfo.shimei }}</li>
        <li>{{ userInfo.phoneNumber }}</li>
        <li>{{ userInfo.postalCode }}</li>
        <li>{{ userInfo.houseNumber }} - {{ userInfo.roomName }}</li>
      </ul>
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
import { defineEmits, defineProps, reactive, watchEffect } from "vue";
import { useUserInfoStore } from "@/composables/user";
import { storeToRefs } from "pinia"; // state プロパティをリアクティブに保つために使用

const infoClass =
  "block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 placeholder-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500";
const store = useUserInfoStore();
const props = defineProps<{
  userInfo: {
    firstName: string;
    lastName: string;
    phoneNumber: string;
    postalCode: string;
    address1: string;
    address2: string;
    address3: string;
    prefecture: string;
    shimei?: string;
    houseNumber?: string;
    roomName?: string;
  };
  modelValue: boolean;
}>();

const userInfo = reactive(props.userInfo);
console.log(`userInfo_${JSON.stringify(props.userInfo)}`);

const test = "TEST";

const emit = defineEmits<{
  //親に渡す処理
  (e: "update:modelValue", v: boolean): void;
  (e: "confilm"): void;
  (e: "cancel"): void;
}>();

const close = () => {
  emit("update:modelValue", false);
};

watchEffect(() => {
  store.upDataInfo(userInfo);
  console.log(`userInfo_store:${JSON.stringify(userInfo)}`);
});
</script>

