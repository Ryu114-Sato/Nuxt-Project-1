<template>
  <div>
    <h1>ご購入手続き</h1>
    <h2>配送先情報</h2>
    <form @submit.prevent="validate">
      <div>
        <div>
          ※配送先住所に誤りがある場合は、住所不明のため配送不可となります。送付先ご住所。郵便番号に誤り
          がないか十分にご確認をお願いいたします。
        </div>
        <Transition>
          <Modal v-model="ModalFlg" :userInfo="userInfo" />
        </Transition>

        <div>
          氏名 必須
          <p>
            <input
              type="text"
              placeholder="性"
              v-model="userInfo.firstName"
              require
            /><input
              type="text"
              placeholder="名"
              v-model="userInfo.lastName"
              require
            />
          </p>
          電話番号 必須
          <p>
            <input
              type="number"
              placeholder="08012345678"
              v-model="userInfo.phoneNumber"
              require
            />
          </p>
          <label
            >郵便番号 必須
            <input
              type="number"
              placeholder="123-4567"
              v-model="userInfo.postalCode"
              require
            />
          </label>
          <p><label>都道府県 必須</label></p>
          <label for="pref">都道府県を選択：</label>
          <select v-model="userInfo.address1" id="pref">
            <option disabled value="">選択してください</option>
            <option v-for="(name, code) in todoData" :key="code" :value="code">
              {{ name }}
            </option>
          </select>

          <p>選択された都道府県コード: {{ userInfo.address1 }}</p>
          <p v-if="todoData">
            選択された都道府県名: {{ todoData[userInfo.address1] || "" }}
          </p>
          番地 必須
          <p><input type="text" v-model="userInfo.address2" /></p>

          建物名・部屋番号
          <p><input type="text" v-model="userInfo.address3" /></p>
        </div>
      </div>
      <div>
        <h2>お支払い方法</h2>
        <input
          type="radio"
          id="option1"
          v-model="radio"
          value="クレジットカード"
        />
        <label for="クレジットカード">クレジットカード</label>
        <br />
        <input type="radio" id="option2" v-model="radio" value="コンビニ決済" />
        <label for="コンビニ決済">コンビニ決済</label>
        <br />
        <input type="radio" id="option3" v-model="radio" value="キャリア決済" />
        <label for="キャリア決済">キャリア決済</label>
        <br />
        <p>あなたが選択した項目：{{ radio }}</p>
        <div class="border-2">
          <label class="p-1">注文数を選択してください</label>
          <p><button class="p-3" @click="incrementPinia">+</button></p>
          <button class="p-3" @click="decrementPinia">-</button>
          <p class="p-1">Current Count. {{ store.count }}</p>
          <p class="p-1">double Count. {{ doubleValue }}</p>
        </div>
      </div>
      <div>
        <p><button @click="goPurchaseDetails()">次へ進む</button></p>
        <p><button @click="$router.push('/')">戻る</button></p>
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
import { useCounterStore } from "@/composables/index";
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

const store = useCounterStore();
store.$patch({ count: store.count + 1 });
const incrementPinia = () => {
  store.increment();
};
const decrementPinia = () => {
  store.decrement();
};

const doubleValue = computed(() => store.doubleCount);

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