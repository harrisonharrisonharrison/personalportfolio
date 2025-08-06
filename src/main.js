import * as TWEEN from '@tweenjs/tween.js';
import "./style.css"

import * as THREE from 'three';
import { PointLight } from "three";

import { GLTFLoader } from 'three/examples/jsm/Addons.js';
import { OrbitControls } from "three/examples/jsm/Addons.js";

import { getFresnelMat } from './getFresnelMat.js';
import getStarfield from './getStarfield.js';

import { lightPosition } from './lights.js';
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, .1, 1000 );

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( window.innerWidth, window.innerHeight );
camera.position.setZ(30);
renderer.render( scene, camera );

//main planet
const geometry = new THREE.SphereGeometry(9, 10, 10);
const meTexture = new THREE.TextureLoader().load("pfp2.jpg")
const material = new THREE.MeshPhysicalMaterial( { map: meTexture });
const circle = new THREE.Mesh( geometry, material );
scene.add(circle);

//fresnel effect
const fresnelMat = getFresnelMat();
const glowMesh = new THREE.Mesh(geometry, fresnelMat);
glowMesh.scale.setScalar(1.01);
scene.add(glowMesh);

//projects mesh
let projects;
const gltfLoader = new GLTFLoader();
gltfLoader.load('projects.glb', (gltf) => {
  projects = gltf.scene;
  gltf.scene.position.set(-20, 7, 0);
  gltf.scene.scale.set(3, 3, 3);
  gltf.scene.rotation.x = .4;
  scene.add(gltf.scene);
});

//fresnel for projects
const projGeo = new THREE.SphereGeometry(3.1,10,10)
const projectsFresnelMat = getFresnelMat({ rimHex: 0xf6b26b});
const projectsGlowMesh = new THREE.Mesh(projGeo, projectsFresnelMat)
projectsGlowMesh.scale.setScalar(1.02);
projectsGlowMesh.position.set(-20, 7, 0);
scene.add(projectsGlowMesh);

//statistics planet
let stats;
const gltfLoader1 = new GLTFLoader();
gltfLoader1.load('stats.glb', (gltf1) => {
  stats = gltf1.scene;
  gltf1.scene.position.set(20, -10, 0);
  gltf1.scene.scale.set(3, 3, 3);
  gltf1.scene.rotation.x = -.2;
  scene.add(gltf1.scene);
});

//stats fresnel
const statsGeo = new THREE.SphereGeometry(3.1,10,10)
const statsFresnelMat = getFresnelMat({ rimHex: 0x4287f5});
const statsGlowMesh = new THREE.Mesh(statsGeo, statsFresnelMat)
statsGlowMesh.scale.setScalar(1.02);
statsGlowMesh.position.set(20, -10, 0);
scene.add(statsGlowMesh);

let settings;
const gltfLoader2 = new GLTFLoader();
gltfLoader2.load('gear.glb', (gltf2) => {
  settings = gltf2.scene;
  gltf2.scene.position.set(-20, -10, 0);
  gltf2.scene.scale.set(2.5, 2.5, 2.5);
  gltf2.scene.rotation.x = .4;
  scene.add(gltf2.scene);
});

//flying exclamation mark jit
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

let exclamationY = cylinder.position.y;
const tween = new TWEEN.Tween({ y: exclamationY })
  .to({y:exclamationY+2},750)
  .onUpdate((coords) => {
    cylinder.position.y = coords.y;
    mark.position.y = coords.y - 4;
  })
const tween2 = new TWEEN.Tween({ y: exclamationY+2 })
  .to({y:exclamationY},750)
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

// lights
const light = new THREE.PointLight( 0xffffff, 4, 0, 0.2 );
light.position.set(7, 4, 17);

const light2 = new THREE.PointLight( 0xffffff, 5,0 , 1 );
light2.position.set(20, -5, 4);

const ambience = new THREE.AmbientLight(0xffffff, .2)
scene.add( light, light2, ambience)

let lightHelper; // define outside so we can add/remove

document.getElementById('light-helper-toggle').addEventListener('change', function (e) {
  if (e.target.checked) {
    lightHelper = new THREE.PointLightHelper(light2);
    scene.add(lightHelper);
  } else {
    if (lightHelper) {
      scene.remove(lightHelper);
      lightHelper.dispose(); // cleanup
      lightHelper = null;
    }
  }
});

// const backgroundTexture = new THREE.TextureLoader().load('A$.png');
// scene.background = backgroundTexture;

//orbit controls
let controls;
document.getElementById('controls-toggle').addEventListener('change', function (e) {
  if (e.target.checked) {
    controls = new OrbitControls(camera, renderer.domElement);
    controls.enableZoom = false;
    controls.enablePan = false;
  } else {
    if (controls) {
      controls.dispose();
      controls = null;
    }
  }
})

const geometryB =  new THREE.SphereGeometry( 1, 12, 8 );
const ghTexture = new THREE.TextureLoader().load("gh.png")
const ghMaterial = new THREE.MeshPhysicalMaterial( { map: ghTexture });
const meshB = new THREE.Mesh ( geometryB,ghMaterial );
meshB.rotation.y = -1.2;
meshB.position.set(0,0,10)
scene.add( meshB );

const geometryC =  new THREE.SphereGeometry( 1, 12, 8 );
const sTexture = new THREE.TextureLoader().load("steam.png")
const sMaterial = new THREE.MeshPhysicalMaterial( { map: sTexture });
const meshC = new THREE.Mesh ( geometryC,sMaterial );
meshC.rotation.y = -1.6;
meshC.position.set(0,0,10)
scene.add( meshC );

const geometryD =  new THREE.SphereGeometry( 1, 12, 8 );
const lTexture = new THREE.TextureLoader().load("in.png")
const lMaterial = new THREE.MeshPhysicalMaterial( { map: lTexture });
const meshD = new THREE.Mesh ( geometryD,lMaterial );
meshD.rotation.y = -1.2;
meshD.position.set(0,0,10)
scene.add( meshD );

const geometryE =  new THREE.SphereGeometry( 1, 12, 8 );
const iTexture = new THREE.TextureLoader().load("ig.png")
const iMaterial = new THREE.MeshPhysicalMaterial( { map: iTexture });
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

//resize scene on window resize
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize( window.innerWidth, window.innerHeight );
}
window.addEventListener( 'resize', onWindowResize );

//speech bubble responsive positioning
function updateSpeechBubblePosition() {

  const speechBubbleDiv = document.querySelector('.speech-bubble');
  speechBubbleDiv.style.left = `${window.innerWidth/5}px`;
  speechBubbleDiv.style.top = `${window.innerHeight/3}px`;
}

//adding stars 
const starfield = getStarfield();
scene.add(starfield);

//jit loop
function animate(){
  updateSpeechBubblePosition();
  requestAnimationFrame( animate );
  circle.rotation.y -= .01
  glowMesh.rotation.y -= .01;
  mark.rotation.y += .01
  mark.rotation.z -= .01

  if (projects) {
    projects.rotation.y -= .005;
    projectsGlowMesh.rotation.y -= .005;
  }
  if (stats) {
    stats.rotation.y -= .005
    statsGlowMesh.rotation.y -= .005
  }
  if (settings) {
    settings.rotation.y -= .005;
    settings.rotation.x -= .005;
  }
  //light position and brightness update
  light2.position.set(lightPosition.x, lightPosition.y, lightPosition.z);
  light2.intensity = lightPosition.brightness;

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

//scroll animation
canvas.addEventListener('wheel', (event) => {
    circle.rotation.y -= .1;
    if (projects) {
      projects.rotation.y -= .05;
    }
    if (stats) {
      stats.rotation.y -= .05;
    }
    if ( settings) {
      settings.rotation.y -= .05;
    }
});

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
      mark.position.set(-20,10,0)
      cylinder.position.set(-20,0,0);
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

  const intersectsProj = raycaster.intersectObject(projects);
  if (intersectsProj.length > 0) {
    window.open('projects.html', '_self');
  }

  const intersectsStats = raycaster.intersectObject(stats);
  if (intersectsStats.length > 0) {
    window.open('stats.html', '_self');
  }

  const intersectsSettings = raycaster.intersectObject(settings);
  if (intersectsSettings.length > 0) {
    const settingsBubble = document.querySelector('#settings');
    if (settingsBubble) {
      settingsBubble.style.display = 'flex';
    }
  } else {
    const settingsBubble = document.querySelector('#settings');
    if (settingsBubble) {
      settingsBubble.style.display = 'none';
    }
  }
});


