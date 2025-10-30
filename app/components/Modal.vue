<template>
  <div v-if="modelValue" class="bg-indigo-500 p-6 rounded-xl shadow-md">
    <div role="dialog" aria-model="true" class="p-2 bg-sky-500">
      <labe class="p-2">購入内容確認</labe>
      <hr />
      <h2 class="p-2">お支払い方法</h2>
      <p class="border-4 gray-500 p-3">{{ userInfo.prefecture }}</p>
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

