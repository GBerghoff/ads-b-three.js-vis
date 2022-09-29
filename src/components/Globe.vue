<script lang="ts">
import { initialize, addMeshToScene, animate, animateMesh, createBox, createWorld, addMultipleMeshToScene } from "../three-related/three";

export default {
  mounted() {
    initialize("container");
    const earth = createWorld(5, 50, 50, './assets/8k_earth_nightmap.jpg');
    addMultipleMeshToScene([earth]);
    animate();
  },
};
</script>

<template>
  <div id="container"></div>
</template>

<style scoped>
#container {
  height: 1000px;
  width: 100%;
}
</style>
