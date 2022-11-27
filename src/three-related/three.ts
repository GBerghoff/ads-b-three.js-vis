import { Vector3 } from "three";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { useHudStore } from "@/stores/hudStore";
import type { LatLon } from "@/interfaces/latlon";

let renderer: THREE.WebGLRenderer;
let scene: THREE.Scene;
let camera: THREE.PerspectiveCamera;
let controls: any;
let raycaster: THREE.Raycaster;
let pointer: THREE.Vector2;

// Event listeners
window.addEventListener("pointermove", onPointerMove);
window.addEventListener("resize", onWindowResize, false);

export function initialize(containerName: string) {
  let container = document.getElementById(containerName);
  const containerBoundingBox = container?.getBoundingClientRect();

  if (containerBoundingBox && container) {
    console.log(container.clientHeight, container.clientWidth);
    console.log(containerBoundingBox.height, containerBoundingBox.width);

    camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 100);

    camera.position.z = 10;

    scene = new THREE.Scene();

    // const axesHelper = new THREE.AxesHelper(50);
    // scene.add(axesHelper);

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(containerBoundingBox.width, containerBoundingBox.height);
    container.appendChild(renderer.domElement);

    controls = new OrbitControls(camera, renderer.domElement);
    raycaster = new THREE.Raycaster();
    pointer = new THREE.Vector2();
    onWindowResize();
  }
}

export function createWorld(radius: number, hSegments: number, vSegments: number, materialPath: string) {
  const geometry = new THREE.SphereGeometry(radius, hSegments, vSegments);
  const material = new THREE.MeshBasicMaterial({
    map: new THREE.TextureLoader().load(materialPath),
  });

  return new THREE.Mesh(geometry, material);
}

export function createBox(width: number, height: number, depth: number, color: { color: any }): THREE.Mesh {
  const geometry = new THREE.BoxGeometry(width, height, depth);
  const material = new THREE.MeshBasicMaterial(color);
  return new THREE.Mesh(geometry, material);
}

export function animateMesh(mesh: THREE.Mesh | any): any {
  function animate() {
    requestAnimationFrame(animate);
    if (mesh) {
      mesh.rotateX(0.01);
      mesh.rotateY(0.01);
    }
    render();
  }
  animate();
}

export function animate(): any {
  function animate() {
    requestAnimationFrame(animate);
    render();
  }
  animate();
}

function render() {
  controls.update();
  raycaster.setFromCamera(pointer, camera);
  renderer.render(scene, camera);
}

export function addMeshToScene(mesh: any) {
  scene.add(mesh);
}

export function addMultipleMeshToScene(meshs: any[]) {
  if (Array.isArray(meshs)) {
    meshs.forEach((mesh) => {
      scene.add(mesh);
    });
  }
}

export function createCustomBox(
  width: number,
  height: number,
  depth: number,
  color: { color: any },
  positionVector: Vector3,
): THREE.Mesh {
  const geometry = new THREE.BoxGeometry(width, height, depth);
  const material = new THREE.MeshBasicMaterial(color);

  let obj = new THREE.Mesh(geometry, material);
  // console.log(positionVector);
  obj.position.set(positionVector.x, positionVector.y, positionVector.z);
  return obj;
}

export function calcPosFromLatLon(latLon: LatLon): Vector3 {
  let sphereRadius = 5;

  const phi = (90 - latLon.lat) * (Math.PI / 180);
  const theta = (latLon.lon + 180) * (Math.PI / 180);

  const x = -(sphereRadius * Math.sin(phi) * Math.cos(theta));
  const z = sphereRadius * Math.sin(phi) * Math.sin(theta);
  const y = sphereRadius * Math.cos(phi);

  return new Vector3(x, y, z);
}

export function radToDeg(radians: number): number {
  return radians * (180 / Math.PI);
}

export function vector3toLatLon(position: Vector3): LatLon {
  let sphereRadius = 5;
  let lat = -radToDeg(Math.acos(position.y / sphereRadius)) + 90; //theta

  if (lat > 90) {
    lat -= 180;
  }

  let lon;
  if (position.z >= 0) lon = radToDeg(Math.atan(position.x / position.z)) - 90; //phi
  else lon = radToDeg(Math.atan(position.x / position.z)) + 90;

  if (lon < -180) {
    lon += 360;
  }
  return { lat: lat, lon: lon };
}

export function resetCameraPosition() {
  controls.reset();
}

function onPointerMove(event: any) {
  const hudStore = useHudStore();
  // calculate pointer position in normalized device coordinates
  // (-1 to +1) for both components

  pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
  pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;

  raycaster.setFromCamera(pointer, camera);
  const intersects = raycaster.intersectObjects(scene.children);

  if (intersects.length > 0) {
    const coords = vector3toLatLon(intersects[0].point);
    hudStore.lat = coords.lat;
    hudStore.lon = coords.lon;
  }
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}
