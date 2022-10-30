import { defineStore } from "pinia";

export interface Point {
  id: string;
  coordinates: {
    x: number;
    y: number;
    z: number;
  };
}

interface State {
  points: Point[];
}

export const usePointStore = defineStore("point", {
  state: (): State => ({
    points: new Array<Point>(),
  }),
  getters: {},
  actions: {},
});
