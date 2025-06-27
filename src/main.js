import * as TWEEN from '@tweenjs/tween.js';
import "./style.css"

import * as THREE from 'three';
import { PointLight } from "three";

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

const geometry = new THREE.SphereGeometry(9, 10, 10);
const meTexture = new THREE.TextureLoader().load("pfp2.jpg")
const material = new THREE.MeshBasicMaterial( { map: meTexture });
const circle = new THREE.Mesh( geometry, material );
scene.add(circle);

const cylinderGeometry = new THREE.CylinderGeometry(1,.7,4.2);
const cylinderMaterial = new THREE.MeshPhysicalMaterial( { 
  color: 0xf6e604, 
  emissive: 0xf6e604, 
  metalness: 1, 
  iridescence: 1,
  clearcoat: 1 
})
const cylinder = new THREE.Mesh(cylinderGeometry, cylinderMaterial);
cylinder.position.set( 0, 15, 0)
scene.add(cylinder);

const tween = new TWEEN.Tween({ y: 15 })
  .to({y:17},750)
  .onUpdate((coords) => {
    cylinder.position.y = coords.y;
    mark.position.y = coords.y - 4;
  })
const tween2 = new TWEEN.Tween({ y: 17 })
  .to({y:15},750)
  .onUpdate((coords) => {
    cylinder.position.y = coords.y;
    mark.position.y = coords.y - 4;
  })
tween.chain(tween2);
tween2.chain(tween);
tween.start()

const exclamation = new TWEEN.Group(tween,tween2);

const markGeometry = new THREE.DodecahedronGeometry(1);
const mark = new THREE.Mesh(markGeometry, cylinderMaterial);
mark.position.set( 0, 11, 0)
scene.add(mark);

const light = new THREE.PointLight( 0xffffff, 3, 0 );
light.position.set( 1, 16, 2);

const ambience = new THREE.AmbientLight(0xffffff, 2)
scene.add(light, ambience)

//const lightHelper = new THREE.PointLightHelper(light)
//scene.add(lightHelper);

const backgroundTexture = new THREE.TextureLoader().load('A$.png');
scene.background = backgroundTexture;

//const controls = new OrbitControls(camera, renderer.domElement);

function animate(){
  requestAnimationFrame( animate );
  circle.rotation.y -= .01
  mark.rotation.y += .01
  mark.rotation.z -= .01

  exclamation.update();

  renderer.render(scene, camera);
}

animate();
