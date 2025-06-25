import "./style.css"

import * as THREE from 'three';

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

const geometry = new THREE.SphereGeometry(10, 10, 10);
const material = new THREE.MeshStandardMaterial( { color:0xFF6347 });
const circle = new THREE.Mesh( geometry, material );
scene.add(circle);

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5,5,5)
const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight)

const lightHelper = new THREE.PointLightHelper(pointLight);
scene.add(lightHelper);

const controls = new OrbitControls(camera, renderer.domElement);

const backgroundTexture = new THREE.TextureLoader().load('A$.png');
backgroundTexture.anisotropy -= 1000
scene.background = backgroundTexture;

function animate(){
  requestAnimationFrame( animate );
  circle.rotation.x += .01;
  circle.rotation.y += .005;
  circle.rotation.z += .01;
  controls.update()
  renderer.render(scene, camera);
}

animate();