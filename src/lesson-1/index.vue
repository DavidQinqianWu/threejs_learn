<template></template>

<script setup lang="ts">
import * as THREE from 'three';
const w = window.innerWidth;
const h = window.innerHeight;

// scene
const scene = new THREE.Scene();

// 坐标
const axes = new THREE.AxesHelper(2);
scene.add(axes);

// const cube
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial();
const cube = new THREE.Mesh(geometry, material);
cube.position.set(-1, -1, -1);
cube.rotateX((45 / 180) * Math.PI);
cube.rotateY((45 / 180) * Math.PI);
scene.add(cube);

// light
const light = new THREE.AmbientLight();
scene.add(light);

// camera
const camera = new THREE.PerspectiveCamera(75, w / h, 0.1, 100);
camera.position.set(0, 0, 5);
camera.lookAt(0, 0, 0);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(w, h);
document.body.append(renderer.domElement);

const clock = new THREE.Clock();
tick();
function tick() {
    const time = clock.getElapsedTime() * 1.5;
    cube.rotation.z = time;
    cube.position.x = Math.sin(time * 10) * 2;
    cube.position.y = Math.cos(time) * 2;
    requestAnimationFrame(tick);
    renderer.render(scene, camera);
}
</script>
