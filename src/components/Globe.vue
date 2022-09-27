









<script lang="ts">
import * as THREE from 'three';

export default {
    data() {
        return {
            camera: null,
            scene: null,
            renderer: null,
            mesh: null
        }
    },
    methods: {
        init: function() {
            let container = document.getElementById('container');

            this.camera = new THREE.PerspectiveCamera(70, container.clientWidth/container.clientHeight, 0.01, 10);
            this.camera.position.z = 1;

            this.scene = new THREE.Scene();

            let geometry = new THREE.BoxGeometry(0.2, 0.2, 0.2);
            let material = new THREE.MeshNormalMaterial();

            this.mesh = new THREE.Mesh(geometry, material);
            this.scene.add(this.mesh);

            this.renderer = new THREE.WebGLRenderer({antialias: true});
            this.renderer.setSize(container.clientWidth, container.clientHeight);
            container.appendChild(this.renderer.domElement);

        },
    },
    mounted() {
        this.init();
    }
}


</script>

<template>
    <div id="container"></div>
</template>

<style scoped></style>