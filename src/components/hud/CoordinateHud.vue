<template>
  <div class="hud__coordinates">
    <div>
      <span>Latitude:</span><span class="monospace">{{ formatPosition(hudStore.lat) }}</span>
    </div>
    <div>
      <span>Longitude:</span><span class="monospace">{{ formatPosition(hudStore.lon) }}</span>
    </div>
  </div>
</template>

<script lang="ts">
import { useHudStore } from "@/stores/hudStore";

export default {
  name: "coordinate-hud",
  setup() {
    return {
      hudStore: useHudStore(),
    };
  },
  methods: {
    formatPosition(position: number): number {
      return Math.round(position * 100000) / 100000;
    },
  },
};
</script>

<style>
.hud__coordinates {
  position: absolute;
  top: 1rem;
  left: 1rem;
  padding: 0.5em;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  border-radius: 5px;
  border: 3px solid gray;
  color: gray;
  min-width: 175px;
}

.hud__coordinates div {
  display: flex;
  justify-content: space-between;
}

.monospace {
  font-family: "Courier New", Courier, monospace;
}
</style>
