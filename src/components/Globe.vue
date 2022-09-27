<script lang="ts">
import { initialize, addMeshToScene, animateMesh, createBox } from "../three-related/three";

export default {
  mounted() {
    initialize("container");
    const cube = createBox(1, 1, 1, { color: 0x00ff00 });
    addMeshToScene(cube);
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
  border: 1px solid red;
}
</style>
