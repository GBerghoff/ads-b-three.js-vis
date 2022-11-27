<script lang="ts">
import { defineComponent } from "vue";
import Globe from "./components/Globe.vue";
import Hud from "./components/hud/Hud.vue";

export default defineComponent({
  components: {
    Globe,
    Hud,
  },
});
</script>

<template>
  <Globe />
  <Hud />
</template>

<style>
html,
body {
  width: 100%;
  height: 100%;
  overflow: hidden;
  font-family: arial;
}
body {
  margin: 0px;
}
</style>
