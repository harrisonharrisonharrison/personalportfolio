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

const geometryB =  new THREE.SphereGeometry( 1, 12, 8 );
const ghTexture = new THREE.TextureLoader().load("gh.png")
const ghMaterial = new THREE.MeshBasicMaterial( { map: ghTexture });
const meshB = new THREE.Mesh ( geometryB,ghMaterial );
meshB.rotation.y = -1.2;
meshB.position.set(0,0,10)
scene.add( meshB );

const geometryC =  new THREE.SphereGeometry( 1, 12, 8 );
const sTexture = new THREE.TextureLoader().load("steam.png")
const sMaterial = new THREE.MeshBasicMaterial( { map: sTexture });
const meshC = new THREE.Mesh ( geometryC,sMaterial );
meshC.rotation.y = -1.6;
meshC.position.set(0,0,10)
scene.add( meshC );

const geometryD =  new THREE.SphereGeometry( 1, 12, 8 );
const lTexture = new THREE.TextureLoader().load("in.png")
const lMaterial = new THREE.MeshBasicMaterial( { map: lTexture });
const meshD = new THREE.Mesh ( geometryD,lMaterial );
meshD.rotation.y = -1.2;
meshD.position.set(0,0,10)
scene.add( meshD );

const geometryE =  new THREE.SphereGeometry( 1, 12, 8 );
const iTexture = new THREE.TextureLoader().load("ig.png")
const iMaterial = new THREE.MeshBasicMaterial( { map: iTexture });
const meshE = new THREE.Mesh ( geometryE,iMaterial );
meshE.rotation.y = -.6;
meshE.position.set(0,0,10)
scene.add( meshE );

const orbitRadius = 11;
const orbitRadius2 = 9;
const orbitRadius3 = 13;
const orbitRadius4 = 15;
const steps = 600000/window.innerWidth + 400;
const mpi = Math.PI/180;
const startAngle = 0;
const startRadians = startAngle + mpi;
let calcRadians = startRadians;
const incrementRadians =  360/steps * mpi;

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize( window.innerWidth, window.innerHeight );
}
window.addEventListener( 'resize', onWindowResize );

function updateSpeechBubblePosition() {

  const speechBubbleDiv = document.querySelector('.speech-bubble');
  speechBubbleDiv.style.left = `${window.innerWidth/5}px`;
  speechBubbleDiv.style.top = `${window.innerHeight/3}px`;
}

function animate(){
  updateSpeechBubblePosition();
  requestAnimationFrame( animate );
  circle.rotation.y -= .01
  mark.rotation.y += .01
  mark.rotation.z -= .01

  meshB.position.set(
    Math.cos(calcRadians) * orbitRadius,
    Math.cos(calcRadians) * orbitRadius,
    Math.sin(calcRadians) * orbitRadius
  );

  meshC.position.set(
    Math.sin(calcRadians) * orbitRadius2,
    Math.sin(calcRadians) * orbitRadius2,
    Math.cos(calcRadians) * orbitRadius2
  );

  meshD.position.set(
    Math.sin(calcRadians) * orbitRadius3,
    0,
    Math.cos(calcRadians) * orbitRadius3
  );

  meshE.position.set(
    -Math.sin(calcRadians) * orbitRadius4,
    Math.sin(calcRadians) * orbitRadius4,
    Math.cos(calcRadians) * orbitRadius4
  );
  calcRadians += incrementRadians;


  exclamation.update();

  renderer.render(scene, camera);
}



animate();

const canvas = renderer.domElement;
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

canvas.addEventListener('click', (event) => {
  const rect = canvas.getBoundingClientRect();
  mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
  mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

  raycaster.setFromCamera(mouse, camera);
  const intersects = raycaster.intersectObject(circle);
  if (intersects.length > 0) {
    const speechBubble = document.querySelector('.speech-bubble');
    if (speechBubble) {
      speechBubble.style.display = 'block';
    }
  } else {
    const speechBubble = document.querySelector('.speech-bubble');
    if (speechBubble) {
      speechBubble.style.display = 'none';
    }
  }

  const intersectsGH = raycaster.intersectObject(meshB);
  if (intersectsGH.length > 0) {
    window.open('https://github.com/harrisonharrisonharrison', '_blank');
  }

  const intersectsSteam = raycaster.intersectObject(meshC);
  if (intersectsSteam.length > 0) {
    window.open('https://steamcommunity.com/id/carrotoes/', '_blank');
  }

  const intersectsLI = raycaster.intersectObject(meshD);
  if (intersectsLI.length > 0) {
    window.open('https://www.linkedin.com/in/harrison-tran-547213294/', '_blank');
  }

  const intersectsIG = raycaster.intersectObject(meshE);
  if (intersectsIG.length > 0) {
    window.open('https://www.instagram.com/lasnganga/', '_blank');
  }
});


