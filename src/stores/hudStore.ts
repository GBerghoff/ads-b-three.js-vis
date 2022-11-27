import { defineStore } from "pinia";

interface State {
  lat: number;
  lon: number;
}

export const useHudStore = defineStore("hud", {
  state: (): State => ({
    lat: 0,
    lon: 0,
  }),
  getters: {},
  actions: {},
});
