import * as TWEEN from '@tweenjs/tween.js';
import "./style.css"

import * as THREE from 'three';
import { PointLight } from "three";

import { GLTFLoader } from 'three/examples/jsm/Addons.js';
import { OrbitControls } from "three/examples/jsm/Addons.js";

import { getFresnelMat } from './getFresnelMat.js';

import getStarfield from './getStarfield.js';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, .1, 1000 );

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( window.innerWidth, window.innerHeight );
camera.position.setZ(30);
renderer.render( scene, camera );

// const backgroundTexture = new THREE.TextureLoader().load('A$.png');
// scene.background = backgroundTexture;

//resize the canvas to fit the window
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize( window.innerWidth, window.innerHeight );
}
window.addEventListener( 'resize', onWindowResize );

//statistics planet
let stats;
const gltfLoader = new GLTFLoader();
gltfLoader.load('statsmain.glb', (gltf) => {
  stats = gltf.scene;
  gltf.scene.scale.set(10, 10, 10);
  scene.add(gltf.scene);
});

//lights
const sun = new THREE.DirectionalLight(0xffffff, 5); 
sun.position.set(100, 100, 40);
const ambience = new THREE.AmbientLight(0xffffff, .4)
scene.add(sun, ambience);

//stats fresnel
const statsGeo = new THREE.SphereGeometry(10.2,10,10.2)
const statsFresnelMat = getFresnelMat({ rimHex: 0x4287f5});
const statsGlowMesh = new THREE.Mesh(statsGeo, statsFresnelMat)
statsGlowMesh.scale.setScalar(1.01);
scene.add(statsGlowMesh);

//add stars
const starfield = getStarfield();
scene.add(starfield);

//animate the scene
function animate(){    
    if (stats) {    
      stats.rotation.y -= .005;
      statsGlowMesh.rotation.y -= .005;
    }
    requestAnimationFrame( animate );
    renderer.render(scene, camera);
}

animate();

const canvas = renderer.domElement;
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

//scroll animation
canvas.addEventListener('wheel', (event) => {
    if (stats) {
      
    }
});