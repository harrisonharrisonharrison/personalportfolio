import * as TWEEN from '@tweenjs/tween.js';
import "./style.css"

import * as THREE from 'three';
import { PointLight } from "three";

import { GLTFLoader } from 'three/examples/jsm/Addons.js';
import { OrbitControls } from "three/examples/jsm/Addons.js";

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, .1, 1000 );

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( window.innerWidth, window.innerHeight );
camera.position.setZ(30);
renderer.render( scene, camera );

const backgroundTexture = new THREE.TextureLoader().load('A$.png');
scene.background = backgroundTexture;

let projects;
const gltfLoader = new GLTFLoader();
gltfLoader.load('../assets/projectsmain.glb', (gltf) => {
  projects = gltf.scene;
  gltf.scene.position.set(0, 0, 0);
  gltf.scene.scale.set(10, 10, 10);
  scene.add(gltf.scene);
});

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize( window.innerWidth, window.innerHeight );
}
window.addEventListener( 'resize', onWindowResize );

const ambience = new THREE.AmbientLight(0xffffff, 2)
scene.add(ambience)

function animate(){      
    if (projects) {
        projects.rotation.y -= .01;
    }

    requestAnimationFrame( animate );

    renderer.render(scene, camera);
}

animate();