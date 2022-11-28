<template>
  <coordinateHud />
  <controlsHud />
</template>

<script lang="ts">
import CoordinateHud from "./CoordinateHud.vue";
import ControlsHud from "./ControlsHud.vue";

export default {
  name: "hud",
  components: {
    coordinateHud: CoordinateHud,
    controlsHud: ControlsHud,
  },
};
</script>

<style></style>
