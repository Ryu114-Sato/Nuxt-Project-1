import { defineStore } from "pinia";

export const useUserInfoStore = defineStore("user", {
  state: () => {
    return { userInfo: {} };
  },
  getters: {},
  actions: {
    upDataInfo(info: {}) {
      console.log(`user.ts_info:${info}`);
      this.userInfo = info;
    },
    initUserInfo() {
      this.userInfo = {};
    },
  },
});
