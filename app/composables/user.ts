import { defineStore } from "pinia";

export const useUserInfoStore = defineStore("user", {
  state: () => ({
    userInfo: {},
  }),
  getters: {},
  actions: {
    upDataInfo(info: {}) {
      this.userInfo = info;
    },
    initUserInfo() {
      this.userInfo = {};
    },
  },
});
