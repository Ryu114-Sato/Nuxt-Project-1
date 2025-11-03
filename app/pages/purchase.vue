<template>
  <div class="p-8 items-center">
    <h1 class="text-xl font-semibold">ご購入手続き</h1>
    <h2 class="text-lg font-semibold py-4 space-y-6">配送先情報</h2>
    <form @submit.prevent="validate">
      <div class="text-xs p-4 border bg-gray-50">
        <div class="border text-orange-300 p-3 bg-orange-50">
          ※配送先住所に誤りがある場合は、住所不明のため配送不可となります。送付先ご住所。郵便番号に誤りがないか十分にご確認をお願いいたします。
        </div>
        <Transition class="animate-pulse">
          <Modal v-model="ModalFlg" :userInfo="userInfo" />
        </Transition>

        <div>
          <div class="flex gap-3 py-2">
            <label class="text-gray-400">氏名</label>
            <label class="text-red-500 font-medium">必須</label>
          </div>
          <p>
            <input
              type="text"
              placeholder="性"
              v-model="userInfo.firstName"
              require
              class="border"
            /><input
              type="text"
              placeholder="名"
              v-model="userInfo.lastName"
              require
              class="border"
            />
          </p>
          <div class="flex gap-3 py-2">
            <label class="text-gray-400">電話番号</label>
            <label class="text-red-500 font-medium">必須</label>
          </div>
          <p>
            <input
              type="number"
              placeholder="08012345678"
              v-model="userInfo.phoneNumber"
              require
              class="border"
            />
          </p>
          <div class="flex gap-3 py-2">
            <label class="text-gray-400">郵便番号</label>
            <label class="text-red-500 font-medium">必須</label>
          </div>

          <input
            type="number"
            placeholder="123-4567"
            v-model="userInfo.postalCode"
            require
            class="border"
          />
          <div class="flex gap-3 py-2">
            <label class="text-gray-400">都道府県</label>
            <label class="text-red-500 font-medium"> 必須 </label>
          </div>
          <select class="border" v-model="userInfo.address1" id="pref">
            <option class="border" disabled value="">東京</option>
            <option v-for="(name, code) in todoData" :key="code" :value="code">
              {{ name }}
            </option>
          </select>

          <div class="flex gap-3 py-2">
            <label class="text-gray-400">番地 </label
            ><lavel class="text-red-500 font-medium">必須</lavel>
          </div>

          <p>
            <input type="text" class="border" v-model="userInfo.address2" />
          </p>

          <div class="flex gap-3 py-2">
            <label class="text-gray-400">建物名・部屋番号</label>
          </div>

          <p>
            <input type="text" class="border" v-model="userInfo.address3" />
          </p>
        </div>
      </div>
      <div class="gap-3 py-2 w-full">
        <h2 class="text-lg font-semibold py-4 space-y-6">お支払い方法</h2>
        <div class="text-sm">
          <label class="border-2" for="クレジットカード">
            <input
              type="radio"
              id="option1"
              v-model="radio"
              value="クレジットカード"
            />
            クレジットカード</label
          >
          <br />
          <label class="border-2" for="コンビニ決済">
            <input
              type="radio"
              id="option2"
              v-model="radio"
              value="コンビニ決済"
            />
            コンビニ決済</label
          >
          <br />
          <label class="border-2" for="キャリア決済">
            <input
              type="radio"
              id="option3"
              v-model="radio"
              value="キャリア決済"
            />
            キャリア決済</label
          >
        </div>
      </div>
      <div class="py-4 justify-center text-center">
        <p class="my-2 border-2 mx-11">
          <button @click="goPurchaseDetails()">次へ進む</button>
        </p>
        <p class="border-2 mx-11">
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