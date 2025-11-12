import { defineStore } from "pinia";
import { OrderInputSchema, type OrderInput } from "~/composables/order";

export const useUserInfoStore = defineStore("user", {
  state: () => {
    return {
      userInfo: {
        firstName: "",
        lastName: "",
        phoneNumber: "",
        postalCode: "",
        address1: "",
        address2: "",
        address3: "",
        prefecture: "",
      } as OrderInput,
    };
  },
  getters: {},
  actions: {
    setUserInfo(payload: Partial<OrderInput>) {
      console.log(`user.ts_info:${payload}`);
      this.userInfo = { ...this.userInfo, ...payload };
    },
    setField<K extends keyof OrderInput>(key: K, value: OrderInput[K]) {
      this.userInfo[key] = value;
    },
    // initUserInfo() {
    //   this.userInfo = {};
    // },
  },
});
