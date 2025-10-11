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
                <div>
                    氏名 必須
                    <p><input type="text" placeholder="性" v-model="userInfo.shimei" /><input type="text" placeholder="名" v-model="userInfo.miyoji" /></p>
                    電話番号 必須
                    <p><input type="number" placeholder="08012345678" v-model="userInfo.phoneNumber" /></p>
                    郵便番号 必須
                    <p><input type="number" placeholder="00000000" /></p>
                    
                    <p>都道府県 必須</p>
                        <label for="pref">都道府県を選択：</label>
                        <select v-model="selectedPlace" id="pref">
                        <option disabled value="">選択してください</option>
                        <option
                            v-for="(name, code) in todoData"
                            :key="code"
                            :value="code"
                        >
                            {{ name }}
                        </option>
                        </select>

                        <p>選択された都道府県コード: {{ selectedPlace }}</p>
                        <p v-if="todoData">選択された都道府県名: {{ (todoData[selectedPlace] || '') }}</p>
                    番地 必須
                    <p><input type="text" /></p>

                    建物名・部屋番号
                    <p><input type="text" /></p>
                </div>
            </div>
            <div>
                <h2>お支払い方法</h2>
                <input type="radio" id="option1" v-model="radio" value="クレジットカード" />
                <label for="クレジットカード">クレジットカード</label>
                <br />
                <input type="radio" id="option2" v-model="radio" value="コンビニ決済" />
                <label for="コンビニ決済">コンビニ決済</label>
                <br />
                <input type="radio" id="option3" v-model="radio" value="キャリア決済" />
                <label for="キャリア決済">キャリア決済</label>
                <br />
                <p>あなたが選択した項目：{{ radio }}</p>
            </div>
            <div>
                <p><button @click="goPurchaseDetails()" >次へ進む</button></p>
                <p><button @click="$router.push('/')">戻る</button></p>
            </div>
        </form>
    </div>
</template>

<script setup lang="ts" >
import {ref, reactive, watch} from "vue"
import axios from 'axios'

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

/* Storeに保存して遷移先で取得する、戻る押下時に何か値を保存していた場合は再度反映する */
const radio = ref("クレジットカード")
const selectedPlace = ref("")
/* 
API取得して表示するのか? > 都道府県のデータはNuxt Contentで静的データを読み込むのか？ 　
*/
const todoData = ref(null)

const url = ref(`https://madefor.github.io/jisx0401/api/v1/jisx0401-ja.json`) 
todoData.value = null
axios
    .get(url.value)
    .then((res) => todoData.value = res.data)
    .catch((error) => todoData.value = error)

  console.log("todata is:"+JSON.stringify(todoData.value))

const userInfo = reactive({
    shimei :"",
    miyoji :"",
    phoneNumber:""
})

watch(userInfo, (val) => {
  if (!val) return;
  console.log(`userInfo:${JSON.stringify(userInfo)}`)
  //setTimeout(() => (userInfo.value = false), 2000);
});
console.log("userinfo")



</script>