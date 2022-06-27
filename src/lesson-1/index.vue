<template></template>

<script setup lang="ts">
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import Stats from 'three/examples/jsm/libs/stats.module.js';

// scene
function createScene() {
    return new THREE.Scene();
}

function createAxes() {
    // 坐标
    return new THREE.AxesHelper(2);
}

function createCube() {
    // const cube
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshNormalMaterial();
    const cube = new THREE.Mesh(geometry, material);
    cube.rotateX((45 / 180) * Math.PI);
    cube.rotateY((45 / 180) * Math.PI);
    return cube;
}

// light
function createLight() {
    const light = new THREE.AmbientLight();
    return light;
}

// camera
function createCamera(w, h) {
    const camera = new THREE.PerspectiveCamera(75, w / h, 0.1, 1000);
    camera.position.set(0, 0, 5);
    camera.lookAt(0, 0, 0);
    return camera;
}

function createRenderer(w, h) {
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(w, h);
    return renderer;
}

const clock = new THREE.Clock();
function render(
    cube: any,
    camera: any,
    renderer: any,
    scene: any,
    stats: any,
    orbitControls: any
) {
    // const time = clock.getElapsedTime() * 1.5;
    // cube.rotation.z = time;
    // cube.position.x = Math.sin(time * 10) * 2;
    // cube.position.y = Math.cos(time) * 2;
    renderer.render(scene, camera);
    stats.update();
    orbitControls.update();
    requestAnimationFrame(
        render.bind(null, cube, camera, renderer, scene, stats, orbitControls)
    );
}

function start() {
    const w = window.innerWidth;
    const h = window.innerHeight;
    const scene = createScene();
    const cube = createCube();
    const camera = createCamera(w, h);
    const renderer = createRenderer(w, h);
    const stats: Stats = Stats();
    const axes = createAxes();
    scene.add(axes);
    scene.add(cube);

    document.body.append(renderer.domElement);
    document.body.append(stats.domElement);
    const orbitControls = new OrbitControls(camera, renderer.domElement);
    render(cube, camera, renderer, scene, stats, orbitControls);
}
start();
</script>
