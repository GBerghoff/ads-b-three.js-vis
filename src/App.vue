<script lang="ts">
import { defineComponent } from "vue";
import Globe from "./components/Globe.vue";

export default defineComponent({
  components: {
    Globe,
  },
});
</script>

<template>
  <Globe />
</template>

<style>
html,
body {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
body {
  margin: 0px;
}
</style>
