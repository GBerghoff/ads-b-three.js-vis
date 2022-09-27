<script lang="ts">
import { initialize, addMeshToScene, animateMesh, createBox, createWorld, addMultipleMeshToScene } from "../three-related/three";

export default {
  mounted() {
    initialize("container");
    const cube = createBox(1, 1, 1, { color: 0x00ff00 });
    const earth = createWorld(5, 50, 50, './assets/8k_earth_nightmap.jpg');
    addMeshToScene(earth);
    addMultipleMeshToScene([cube]);
    animateMesh(cube);
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
