<script lang="ts">
import * as THREE from "three";
import { initialize, animate, createWorld, addMultipleMeshToScene, createCustomBox, calcPosFromLatLonRad } from "../three-related/three";

export default {
  mounted() {
    initialize("container");
    const earth = createWorld(5, 50, 50, './assets/8k_earth_nightmap.jpg');
    const testBox = createCustomBox(.05, .05, .05, {color: new THREE.Color( 'skyblue' )}, calcPosFromLatLonRad(5, 90, 135))
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
