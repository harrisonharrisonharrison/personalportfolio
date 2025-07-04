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

let starD;
const gltfLoader2 = new GLTFLoader();
gltfLoader2.load('../assets/starD.glb', (gltf1) => {
  starD = gltf1.scene;
  gltf1.scene.position.set(10, 32, -1000);
  gltf1.scene.scale.set(.1, .1, .1);
  gltf1.scene.rotation.y = -Math.PI/2;
  gltf1.scene.rotation.x = .52;
  scene.add(gltf1.scene);
});
const tween = new TWEEN.Tween({y:1000, z: -1000 })
  .to({z:-42, y:32},1500)
  .onUpdate((coords) => {
    starD.position.z = coords.z;
    starD.position.y = coords.y;
  })
  .delay(1000)
  .easing(TWEEN.Easing.Bounce.In
);
tween.start()
const starTween = new TWEEN.Group(tween);

//const controls = new OrbitControls(camera, renderer.domElement);

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
    starTween.update();
    renderer.render(scene, camera);
}

animate();