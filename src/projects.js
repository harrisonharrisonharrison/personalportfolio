import * as TWEEN from '@tweenjs/tween.js';
import "./style.css"

import * as THREE from 'three';
import { PointLight } from "three";

import { GLTFLoader } from 'three/examples/jsm/Addons.js';
import { OrbitControls } from "three/examples/jsm/Addons.js";

import { getFresnelMat } from './getFresnelMat.js';
import { cross } from 'three/tsl';

const scene = new THREE.Scene();

let camera
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( window.innerWidth, window.innerHeight );

const backgroundTexture = new THREE.TextureLoader().load('cyberbg.jpg');
scene.background = backgroundTexture;
scene.backgroundIntensity = .05;
scene.backgroundBlurriness = 0.5;

//projects main
const gltfLoader = new GLTFLoader();
gltfLoader.load('scene.gltf', (gltf) => {
  gltf.scene.position.set(0, 0, 0);
  scene.add(gltf.scene);
  scene.traverse(function (object){
    if (object.isCamera){
      camera = object
      renderer.render( scene, camera );
    }
  })
});

const geometry = new THREE.BoxGeometry(9, 14, 10);
const meTexture = new THREE.TextureLoader().load("pfp2.jpg")
const material = new THREE.MeshPhysicalMaterial();
const stellarship = new THREE.Mesh( geometry, material );
stellarship.position.set(-2, 10, 3);
stellarship.material.visible=false;
scene.add(stellarship);

const cinemaker = new THREE.Mesh( geometry, material );
cinemaker.position.set(13, 10, 3);
scene.add(cinemaker);

const personal = new THREE.Mesh( geometry, material );
personal.position.set(-12, 10, 3.2);
scene.add(personal);

const geometry2 = new THREE.BoxGeometry(9, 25, 10);
const crosswalk = new THREE.Mesh( geometry2, material );
crosswalk.position.set(8, 18, -10);
scene.add(crosswalk);

let car;
const gltfLoader3 = new GLTFLoader();
gltfLoader3.load('car.glb', (gltf2) => {
  car = gltf2.scene;
  gltf2.scene.position.set(0,3,10);
  gltf2.scene.rotation.y = Math.PI * 7/2;
  gltf2.scene.scale.set(.3, .3, .3);
  scene.add(gltf2.scene);

});
const tween = new TWEEN.Tween({ x: -30 })
    .to({ x: 30 }, 3000)
    .onUpdate((coords) => {
      car.position.x = coords.x;
    })
    .delay(500)
    .repeat(40)
    .easing(TWEEN.Easing.Bounce.In
);

tween.start();
const tweenGroup = new TWEEN.Group(tween);

// let arc;
// const gltfLoader4 = new GLTFLoader();
// gltfLoader4.load('arc.glb', (gltf3) => {
//   arc = gltf3.scene;
//   gltf3.scene.position.set(-0, 0, -0);
//   gltf3.scene.scale.set(10, 10, 10  );
//   gltf3.scene.rotation.y = Math.PI/8;
//   gltf3.scene.rotation.x = .7;
//   scene.add(gltf3.scene);
// });

// let laat;
// const gltfLoader5 = new GLTFLoader();
// gltfLoader5.load('laat.glb', (gltf4) => {
//   laat = gltf4.scene;
//   gltf4.scene.position.set(20, 0, -1000);
//   gltf4.scene.scale.set(.01, .01, .01  );
//   gltf4.scene.rotation.y = Math.PI/1.1;
//   //scene.add(gltf4.scene);
// });

// const tween2 = new TWEEN.Tween({y:1000, z: -1000 })
//   .to({z:-42, y:20},1500)
//   .onUpdate((coords) => {
//     starD2.position.z = coords.z;
//     starD2.position.y = coords.y;
//   })
//   .delay(1300)
//   .easing(TWEEN.Easing.Bounce.In
// );
// const tween3 = new TWEEN.Tween({y:1000, z: -1000 })
//   .to({z:-20, y:17},3500)
//   .onUpdate((coords) => {
//     arc.position.z = coords.z;
//     arc.position.y = coords.y;
//   })
//   .delay(200)
//   .easing(TWEEN.Easing.Bounce.In
// );
// const tween4 = new TWEEN.Tween({y:1000, z: -1000 })
//   .to({z:0, y:0},3500)
//   .onUpdate((coords) => {
//     laat.position.z = coords.z;
//     laat.position.y = coords.y;
//   })
//   .delay(500)
//   .easing(TWEEN.Easing.Bounce.In
// );
// tween2.start()
// tween3.start()
// tween4.start()
// const starT = new TWEEN.Group(tween3);
//const controls = new OrbitControls(camera, renderer.domElement);

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize( window.innerWidth, window.innerHeight );
  renderer.render(scene, camera);

}
window.addEventListener( 'resize', onWindowResize );

//responsive speech bubble positions
function updateSpeechBubblePosition() {

  const speechBubbleDiv = document.querySelector('.speech-bubble-projects');
  speechBubbleDiv.style.left = `${window.innerWidth/7}px`;
  speechBubbleDiv.style.top = `${window.innerHeight/11}px`;
  const crosswalkDiv = document.querySelector('#crosswalk');
  crosswalkDiv.style.left = `${window.innerWidth/2.3}px`;
  crosswalkDiv.style.top = `${window.innerHeight/8}px`;
  const stellarDiv = document.querySelector('#stellarship');
  stellarDiv.style.left = `${window.innerWidth/5}px`;
  stellarDiv.style.top = `${window.innerHeight/2}px`;
  const cineDiv = document.querySelector('#cinemaker');
  cineDiv.style.left = `${window.innerWidth/1.3}px`;
  cineDiv.style.top = `${window.innerHeight/2}px`;
  const wDiv = document.querySelector('#website');
  wDiv.style.left = `${window.innerWidth/4}px`;
  wDiv.style.top = `${window.innerHeight/2}px`;

}

// const sun = new THREE.DirectionalLight(0xffffff, 5); 
// sun.position.set(100, 100, 40);
const ambience = new THREE.AmbientLight(0xffffff, .4)
scene.add(ambience);


// const lightHelper = new THREE.PointLightHelper(sun)
// scene.add(lightHelper);

function animate(){    
    updateSpeechBubblePosition()  
    requestAnimationFrame( animate );
    tweenGroup.update();
    scene.traverse(function (object){
      if (object.isCamera){
        camera = object
        renderer.render( scene, camera );
      }
    })
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

  const intersectsCW = raycaster.intersectObject(crosswalk);
  if (intersectsCW.length > 0) {
    const cwBubble = document.querySelector('#crosswalk');
    if (cwBubble) {
      cwBubble.style.display = 'block';
    }
  } else {
    const cwBubble = document.querySelector('#crosswalk');
    if (cwBubble) {
      cwBubble.style.display = 'none';
    }
  }

  const intersectsSS = raycaster.intersectObject(stellarship);
  if (intersectsSS.length > 0) {
    const ssBubble = document.querySelector('#stellarship');
    if (ssBubble) {
      ssBubble.style.display = 'block';
    }
  } else {
    const ssBubble = document.querySelector('#stellarship');
    if (ssBubble) {
      ssBubble.style.display = 'none';
    }
  }

  const intersectsCM = raycaster.intersectObject(cinemaker);
  if (intersectsCM.length > 0) {
    const cmBubble = document.querySelector('#cinemaker');
    if (cmBubble) {
      cmBubble.style.display = 'block';
    }
  } else {
    const cmBubble = document.querySelector('#cinemaker');
    if (cmBubble) {
      cmBubble.style.display = 'none';
    }
  }

  const intersectsW = raycaster.intersectObject(personal);
  if (intersectsW.length > 0) {
    const wBubble = document.querySelector('#website');
    if (wBubble) {
      wBubble.style.display = 'block';
    }
  } else {
    const wBubble = document.querySelector('#website');
    if (wBubble) {
      wBubble.style.display = 'none';
    }
  }

});