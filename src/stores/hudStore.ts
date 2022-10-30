import { defineStore } from "pinia";

interface State {
  x: number;
  y: number;
}

export const useHudStore = defineStore("hud", {
  state: (): State => ({
    x: 0,
    y: 0,
  }),
  getters: {},
  actions: {},
});
