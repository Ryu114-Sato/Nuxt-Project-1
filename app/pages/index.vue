<template>
  <div class="p-8 space-y-6">
    <h2 v-show="getUserInfo.prefecture === ''" class="text-xl font-semibold">
      購入するボタンを押下してください
    </h2>
    <h2 v-show="!(getUserInfo.prefecture === '')" class="text-xl font-semibold">
      購入が完了しました！
    </h2>
    <div class="bg-white p-6 rounded-xl shadow-md">
      <h2 class="text-xl font-semibold text-gray-800 mb-2">あなたの購入情報</h2>
      <hr />
      <div>
        <div class="space-y-2 text-sm">
          <h3 class="text-lg font-semibold text-gray-900">お支払い方法</h3>

          <div :class="ModalClass">
            {{ getUserInfo.prefecture }}
          </div>
          <h3 class="text-lg font-semibold text-gray-900">配送先</h3>
          <div :class="ModalClass">
            <p>
              <span class="font-bold"></span>{{ getUserInfo.lastName }}
              {{ getUserInfo.firstName }}
            </p>
            <p>
              <span class="font-medium"></span>{{ getUserInfo.phoneNumber }}
            </p>
            <p>
              <span class="font-medium">〒</span>{{ getUserInfo.postalCode }}
            </p>
            <p><span class="font-medium"></span>{{ getUserInfo.address1 }}</p>
          </div>
        </div>
      </div>

      <!-- Outline -->

      <div>
        <button
          v-show="getUserInfo.prefecture === ''"
          @click="goToPurchase()"
          :class="btnClass"
        >
          購入する
        </button>
      </div>
      <div>
        <button
          v-show="!(getUserInfo.prefecture === '')"
          @click="goToPurchase()"
          :class="btnClass"
        >
          購入情報を編集する
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useCounterStore } from "@/composables/index";
import { useUserInfoStore } from "@/composables/user";

const ModalClass = ref(
  "rounded-md border border-gray-200 bg-white px-4 py-3 text-sm text-gray-700"
);

const btnClass = ref(
  "border border-gray-400 text-gray-700 font-medium px-4 py-2 my-2 rounded-md hover:bg-green-200 transition"
);

const router = useRouter();
const route = useRoute();
const goToPurchase = () => {
  console.log(`goToPurchase_Current Path:${route.fullPath}`);
  router.push("/purchase");
};
const purchaseInfo = useUserInfoStore();
const getUserInfo = purchaseInfo.userInfo;
console.log("getUserInfo:", getUserInfo);

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