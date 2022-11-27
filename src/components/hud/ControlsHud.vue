<template>
  <div class="hud__controls">
    <button @click="resetCamera">Reset Camera</button>
  </div>
</template>

<script lang="ts">
import { resetCameraPosition } from "@/three-related/three";

export default {
  name: "controls-hud",
  methods: {
    resetCamera() {
      resetCameraPosition();
    },
  },
};
</script>

<style scoped>
.hud__controls {
  position: absolute;
  left: 1rem;
}
</style>
