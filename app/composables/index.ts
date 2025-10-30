import { defineStore } from "pinia";

export const useCounterStore = defineStore("counter", {
  state: () => {
    return { count: 0 };
  },
  getters: {
    // getters: state から派生した値を計算して返すもの。Vue の computed プロパティに似ています。
    doubleCount: (state) => state.count * 2,
  },
  actions: {
    // actions: ストアの状態を変更するためのメソッド。Vuex の mutations + actions のような役割を果たします。
    // 非同期処理もここで行うことができます。
    increment() {
      this.count++;
    },
    decrement() {
      this.count--;
    },
  },
});
