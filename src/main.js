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
const meTexture = new THREE.TextureLoader().load("pfp2.jpg")
const material = new THREE.MeshBasicMaterial( { map: meTexture });
const circle = new THREE.Mesh( geometry, material );
scene.add(circle);

const light = new THREE.PointLight( 0xff0000, 1, 100 );
light.position.set( 50, 50, 50 );
scene.add( light );

const backgroundTexture = new THREE.TextureLoader().load('A$.png');
scene.background = backgroundTexture;

function animate(){
  requestAnimationFrame( animate );
  circle.rotation.y -= .01
  renderer.render(scene, camera);
}

animate();