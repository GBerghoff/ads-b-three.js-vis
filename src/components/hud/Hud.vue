<template>
  <div class="hud-container">
    <p>Latitude: {{ hudStore.x }}</p>
    <p>Longitude: {{ hudStore.y }}</p>
  </div>
</template>

<script lang="ts">
import { useHudStore } from "@/stores/hudStore";

export default {
  name: "hud",
  setup() {
    return {
      hudStore: useHudStore(),
    };
  },
};
</script>

<style>
.hud-container {
  position: absolute;
  background-color: white;
}
</style>
