<template>
  <div class="p-8 items-center">
    <h1 class="mb-6 text-2xl md:text-3xl font-bold">ご購入手続き</h1>
    <h2 class="text-xl md:text-2xl font-semibold py-4 space-y-6">配送先情報</h2>

    <form @submit.prevent="validate">
      <div class="border border-gray-200 bg-white/80 p-5 md:p-6">
        <div class="border text-orange-300 p-3 bg-orange-50">
          ※配送先住所に誤りがある場合は、住所不明のため配送不可となります。送付先ご住所。郵便番号に誤りがないか十分にご確認をお願いいたします。
        </div>
        <Transition class="animate-pulse">
          <Modal v-model="ModalFlg" :userInfo="userInfo" />
        </Transition>

        <div class="text-xs md:text-sm">
          <div class="mb-1 flex gap-2 py-2">
            <label class="text-gray-400">氏名</label>
            <label class="text-red-500 font-medium">必須</label>
          </div>
          <div class="grid grid-cols-1 gap-3 md:grid-cols-2">
            <input
              class="block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 placeholder-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              type="text"
              v-model="userInfo.lastName"
              placeholder="姓"
              required
            />
            <input
              class="block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 placeholder-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              type="text"
              v-model="userInfo.firstName"
              placeholder="名"
              required
            />
          </div>
          <div class="flex gap-3 py-2">
            <label class="text-gray-400">電話番号</label>
            <label class="text-red-500 font-medium">必須</label>
          </div>
          <p>
            <input
              :class="inputClass"
              type="number"
              placeholder="08012345678"
              v-model="userInfo.phoneNumber"
              require
            />
          </p>
          <div class="flex gap-3 py-2">
            <label class="text-gray-400">郵便番号</label>
            <label class="text-red-500 font-medium">必須</label>
          </div>

          <input
            :class="inputClass"
            placeholder="123-4567"
            v-model="userInfo.postalCode"
            require
          />
          <div class="flex gap-3 py-2">
            <label class="text-gray-400">都道府県</label>
            <label class="text-red-500 font-medium"> 必須 </label>
          </div>
          <select :class="inputClass" v-model="userInfo.address1" id="pref">
            <option :class="inputClass" disabled value="">東京</option>
            <option v-for="(name, code) in todoData" :key="code" :value="code">
              {{ name }}
            </option>
          </select>

          <div class="flex gap-3 py-2">
            <label class="text-gray-400">番地 </label
            ><lavel class="text-red-500 font-medium">必須</lavel>
          </div>

          <p>
            <input
              type="text"
              :class="inputClass"
              v-model="userInfo.address2"
            />
          </p>

          <div class="flex gap-3 py-2">
            <label class="text-gray-400">建物名・部屋番号</label>
          </div>

          <p>
            <input
              type="text"
              :class="inputClass"
              v-model="userInfo.address3"
            />
          </p>
        </div>
      </div>
      <div class="py-2">
        <h2 class="text-lg font-semibold py-4">お支払い方法</h2>
        <div class="space-y-2">
          <label :class="labelClass">
            <input
              type="radio"
              id="option1"
              value="クレジットカード"
              v-model="radio"
            />
            <span class="text-sm text-gray-900"
              >クレジットカード(Visa,MasterCard,JCB, American Express)</span
            >
          </label>
          <label :class="labelClass">
            <input
              type="radio"
              id="option2"
              v-model="radio"
              value="コンビニ決済"
            />
            <span class="text-sm text-gray-900">コンビニ決済</span>
          </label>
          <label :class="labelClass">
            <input
              type="radio"
              id="option3"
              v-model="radio"
              value="キャリア決済"
            />
            <span class="text-sm text-gray-900">キャリア決済</span>
          </label>
        </div>
      </div>
      <div class="text-sm py-4 justify-center text-center space-y-2">
        <p :class="btnClass">
          <button @click="goPurchaseDetails()">次へ進む</button>
        </p>
        <p class="border-2 mx-11 py-2 hover:border-indigo-400 transition">
          <button @click="$router.push('/')">戻る</button>
        </p>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts" >
/* 
※最後に確認
・必要な処理を全てチェックしたか？
・AIにRV
・Kaitakuを参考にする
・KindleでNuxtを体系的に学習
例：エラーハンドリング処理


設計：

・購入確認内容ダイアログへのデータ受け渡し
    - psopsで渡す ?
    - Storeには保存する？

・ダイアログは共通機能化？
    - Udemyに確かダイアログあったはず
    - MSG もどこかに定数として置いておく

*/
import { ref, reactive, watch, watchEffect, computed } from "vue";
import axios from "axios";
import { z } from "zod";
import { OrderInputSchema, type OrderInput } from "~/composables/order";

const userInfo = reactive<OrderInput>({
  firstName: "",
  lastName: "",
  phoneNumber: "",
  postalCode: "",
  address1: "",
  address2: "",
  address3: "",
  prefecture: "",
});

const inputClass = ref(
  "block rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 placeholder-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
);

const labelClass = ref(
  "flex items-center gap-3 border border-gray-300 px-4 py-3 hover:border-indigo-400 transition"
);

const btnClass = ref(
  "text-white bg-black py-2 border-2 mx-11 hover:border-indigo-400 transition"
);

/* 
- Storeに保存して遷移先(ダイアログ)で取得する.
- 戻る押下時に何か値を保存していた場合は再度反映する 
*/

const props = defineProps({
  testPs: String,
  indexToPurchase: String,
});

//const
const radio = ref("クレジットカード");
// const address1 = ref("")
/* 
API取得して表示するのか? > 都道府県のデータはNuxt Contentで静的データを読み込むのか？ 　
*/
const todoData = ref(null);

const url = ref(`https://madefor.github.io/jisx0401/api/v1/jisx0401-ja.json`);
try {
  axios
    .get(url.value)
    .then(async (res) => await (todoData.value = res.data))
    .catch(async (error) => await (todoData.value = error));
} catch (e) {
  console.log("e" + e);
}
console.log("todata is:" + JSON.stringify(todoData.value));

let ModalFlg = ref<boolean>(false);
const goPurchaseDetails = () => {
  ModalFlg.value = true;
  console.log(`goPurchaseDetails_ModalFlg:${ModalFlg}`);
};

watchEffect(() => {
  userInfo.prefecture = radio.value;
  console.log(`userInfo:${JSON.stringify(userInfo)}`);
});
</script>