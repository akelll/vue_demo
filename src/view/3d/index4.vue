<template>
  <div ref="threeRef"></div>
</template>

<script setup>
import {defineComponent, Line, onMounted, ref} from 'vue'
import WebGl from "@/view/3d/js/WebGl";
import {
  Vector3,
  LineBasicMaterial,
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  Color,
  AxesHelper,
  PlaneGeometry,
  MeshBasicMaterial,
  Mesh,
  BoxGeometry,
  SphereGeometry,
  BufferGeometry, MeshLambertMaterial, PointLight, AmbientLight, OrthographicCamera, MeshPhongMaterial,Fog
} from 'three'
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader";
import {FBXLoader} from "three/examples/jsm/loaders/FBXLoader";


const threeRef = ref()


function init2() {
  const scene = new Scene()
  scene.background  = new Color(0xb3cefb)
  scene.fog = new Fog(scene.background,1,100)





  const w = window.innerWidth
  const h = window.innerHeight
  const k = w / h
  const s = 200
  const camera = new PerspectiveCamera(45,  w/h,  1, 1000)
  camera.position.z = 15


  const renderer = new WebGLRenderer({alpha:true,antialias:true})
  renderer.setSize(w, h)
  renderer.setPixelRatio(window.devicePixelRatio)
  threeRef.value.appendChild(renderer.domElement)
  function render(){
    renderer.render(scene, camera)
    requestAnimationFrame(render)
  }
  render()
  const controls = new OrbitControls(camera,renderer.domElement)
  // controls.addEventListener('change',renderer)



  const axis = new AxesHelper(250)
  scene.add(axis)


    let gltfLoader = new FBXLoader()
    gltfLoader.load('/xxhh.FBX',function (gltf) {
      gltf.scale.set(0.05,0.05,0.05)
      console.log(gltf)
      scene.add(gltf)
    })

}

onMounted(() => {
  init2();
})

</script>
<style>
body {
  margin: 0;
}
</style>
