<!-- 加载模型 -->

<template></template>

<script setup lang="ts">
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import Stats from 'three/examples/jsm/libs/stats.module.js';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js';
// scene
function createScene() {
    return new THREE.Scene();
}
// plane
function createPlane() {
    const planeM = new THREE.MeshStandardMaterial({
        color: 0xcccccc,
    });
    const planeG = new THREE.PlaneGeometry(4, 4);
    const plane = new THREE.Mesh(planeG, planeM);
    plane.rotateX(-0.5 * Math.PI);
    plane.receiveShadow = true;
    return plane;
}

function createAxes() {
    // 坐标
    return new THREE.AxesHelper(2);
}

function createSphere() {
    // const cube
    const geometry = new THREE.SphereGeometry(0.25);
    const material = new THREE.MeshPhongMaterial({
        color: 0xff00ff,
    });
    const object = new THREE.Mesh(geometry, material);
    object.position.y = 0.25;
    object.castShadow = true;
    return object;
}

function createCube() {
    // const cube
    const geometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);
    const material = new THREE.MeshPhongMaterial({
        color: 0xff00ff,
    });
    const object = new THREE.Mesh(geometry, material);
    object.position.set(1, 0.8, 0);
    return object;
}

function createTorus() {
    const torusG = new THREE.TorusGeometry(0.3, 0.1, 10, 20);
    const material = new THREE.MeshPhongMaterial({
        color: 0xff00ff,
    });
    const torus = new THREE.Mesh(torusG, material);
    torus.position.set(-1, 0.8, 0);
    torus.rotation.x = -0.5 * Math.PI;
    return torus;
}

// light
function createLight() {
    const light = new THREE.AmbientLight(0xffffff, 0.5);
    return light;
}

function createDirectionLight() {
    const dLight = new THREE.DirectionalLight(0xffffff, 0.8);
    dLight.position.set(1, 1, 1);
    dLight.castShadow = true;
    return dLight;
}

function createSpotLight() {
    const sLight = new THREE.SpotLight(0xffffff);
    sLight.position.set(1, 1, 1);
    sLight.angle = (60 / 180) * Math.PI;
    return sLight;
}

function createDirLightHelper(dLight: any) {
    const helper = new THREE.DirectionalLightHelper(dLight, 1);
    return helper;
}

function createSpotLightHelper(sLight: any) {
    const helper = new THREE.SpotLightHelper(sLight);
    return helper;
}

// camera
function createCamera(w, h) {
    const camera = new THREE.PerspectiveCamera(75, w / h, 0.1, 1000);
    camera.position.set(0, 1, 3);
    camera.lookAt(0, 0, 0);
    return camera;
}

function createRenderer(w, h) {
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(w, h);
    renderer.shadowMap.enabled = true;
    return renderer;
}

const clock = new THREE.Clock();
function render(
    torus: any,
    cube: any,
    camera: any,
    renderer: any,
    scene: any,
    stats: any,
    orbitControls: any
) {
    const time = clock.getElapsedTime();

    cube.rotation.x = time * 0.4;
    cube.rotation.y = time * 0.4;
    torus.rotation.y = time * 0.4;
    torus.rotation.x = time * 0.4;
    renderer.render(scene, camera);
    stats.update();
    orbitControls.update();
    requestAnimationFrame(
        render.bind(
            null,
            torus,
            cube,
            camera,
            renderer,
            scene,
            stats,
            orbitControls
        )
    );
}

function start() {
    const w = window.innerWidth;
    const h = window.innerHeight;
    const scene = createScene();
    const cube = createCube();
    const sphere = createSphere();
    const torus = createTorus();
    const camera = createCamera(w, h);
    const renderer = createRenderer(w, h);
    const stats: Stats = Stats();
    const axes = createAxes();
    const plane = createPlane();
    const light = createLight();
    const dLight = createDirectionLight();

    let loader = new FBXLoader();
    loader.load('/mode/plane01.FBX', function (object) {
        object.position.set(0, 0, 0);
        console.log(object.position);

        scene.add(object);
    });

    // const sLight = createSpotLight();
    scene.add(axes);
    // scene.add(cube);
    // scene.add(sphere);
    // scene.add(torus);
    scene.add(plane);
    scene.add(light);
    scene.add(dLight);
    scene.add(createDirLightHelper(dLight));
    // scene.add(sLight);
    // scene.add(createSpotLightHelper(sLight));

    document.body.append(renderer.domElement);
    document.body.append(stats.domElement);
    const orbitControls = new OrbitControls(camera, renderer.domElement);
    render(torus, cube, camera, renderer, scene, stats, orbitControls);
}
start();
</script>
