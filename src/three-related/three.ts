import { Vector3 } from "three";
import * as THREE from "three";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

let renderer: THREE.WebGLRenderer;
let scene: THREE.Scene;
let camera: THREE.PerspectiveCamera;
let controls: any;

export function initialize(containerName: string) {
  let container = document.getElementById(containerName);
  const containerBoundingBox = container?.getBoundingClientRect();

  if (containerBoundingBox && container) {
    console.log(container.clientHeight, container.clientWidth);
    console.log(containerBoundingBox.height, containerBoundingBox.width);

    camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 100);

    camera.position.z = 10;

    scene = new THREE.Scene();

    const axesHelper = new THREE.AxesHelper(50)
    scene.add(axesHelper)

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(containerBoundingBox.width, containerBoundingBox.height);
    container.appendChild(renderer.domElement);

    controls = new OrbitControls(camera, renderer.domElement);
  }
}

export function createWorld(radius: number, hSegments: number, vSegments: number, materialPath: string) {
  const geometry = new THREE.SphereGeometry(radius, hSegments, vSegments);
  const material = new THREE.MeshBasicMaterial({
    map: new THREE.TextureLoader().load(materialPath)
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

export function addMeshToScene(mesh: any) {
  scene.add(mesh);
}

function render() {
  controls.update();
  renderer.render(scene, camera);
}

export function addMultipleMeshToScene(meshs: any[]) {
  if (Array.isArray(meshs)) {
    meshs.forEach(mesh => {
      scene.add(mesh)
    });
  }
}


export function createCustomBox(width: number, height: number, depth: number, color: { color: any }, positionVector: Vector3): THREE.Mesh {
  const geometry = new THREE.BoxGeometry(width, height, depth);
  const material = new THREE.MeshBasicMaterial(color);

  let obj = new THREE.Mesh(geometry, material);
  obj.position.set(positionVector.x, positionVector.y, positionVector.z);
  return obj;
}

export function calcPosFromLatLonRad(radius: any, lat: any, lon: any) {

  var phi = (90 - lat) * (Math.PI / 180);
  var theta = (lon + 180) * (Math.PI / 180);

  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const z = (radius * Math.sin(phi) * Math.sin(theta));
  const y = (radius * Math.cos(phi));

  return new Vector3(x, y, z);
}

window.addEventListener('resize', onWindowResize, false);
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}
