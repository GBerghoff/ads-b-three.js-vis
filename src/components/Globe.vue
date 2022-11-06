<script lang="ts">
import * as THREE from "three";
import { initialize, animate, createWorld, addMultipleMeshToScene, createCustomBox, calcPosFromLatLon } from "../three-related/three";

export default {
  mounted() {
    initialize("container");
    const earth = createWorld(5, 50, 50, './assets/01-3.jpg');
    const testBox = createCustomBox(.05, .05, .05, {color: new THREE.Color( 'skyblue' )}, calcPosFromLatLon(-37.8136, 144.9631))
    addMultipleMeshToScene([earth]);
    addMultipleMeshToScene([testBox]);
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
