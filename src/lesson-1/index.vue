<template></template>

<script setup lang="ts">
import * as THREE from 'three';
import State from 'three/examples/jsm/libs/stats.module.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const w = window.innerWidth;
const h = window.innerHeight;
const state = State();
// scene
const scene = new THREE.Scene();

// 坐标
const axes = new THREE.AxesHelper(2);
scene.add(axes);

// 光源

// object
const carGroup = new THREE.Group();

const bodyGroup = new THREE.Group();

const bodyCube1 = new THREE.Mesh(
    new THREE.BoxGeometry(1, 2, 0.5),
    new THREE.MeshNormalMaterial()
);
const bodyCube2 = new THREE.Mesh(
    new THREE.BoxGeometry(0.5, 0.5, 0.5),
    new THREE.MeshBasicMaterial({
        color: 0xff0000,
    })
);
bodyCube2.position.z = 0.5;

bodyGroup.add(bodyCube1);
bodyGroup.add(bodyCube2);

const wheelGroup = new THREE.Group();
const wheel1 = new THREE.Mesh(
    new THREE.BoxGeometry(0.1, 0.7, 0.7),
    new THREE.MeshBasicMaterial({
        color: 0x0000ff,
    })
);
wheel1.position.set(-0.7, 0.5, 0);
wheelGroup.add(wheel1);

carGroup.add(bodyGroup);
carGroup.add(wheelGroup);
scene.add(carGroup);

// camera
const camera = new THREE.PerspectiveCamera(75, w / h, 0.1, 100);
camera.position.set(0, 0, 5);
camera.lookAt(0, 0, 0);

// Renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(w, h);
document.body.append(renderer.domElement);
document.body.append(state.dom);

// orbit controls
const orbitControls = new OrbitControls(camera, renderer.domElement);

const clock = new THREE.Clock();
tick();
function tick() {
    const time = clock.getElapsedTime();
    wheel1.rotation.x = time;
    carGroup.position.y = Math.sin(time) * 2;
    renderer.render(scene, camera);

    state.update();
    orbitControls.update();
    requestAnimationFrame(tick);
}
</script>
