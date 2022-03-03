import React from 'react';
import * as Three from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
// import { OrbitControls } from 'three/examples/jsm/controls/orbitcontrols';
export default class BusinessScope extends React.Component {
  constructor(props) {
    super(props)
  }
  componentDidCatch() {
    this.initThree();
    this.animate();
  }
  initThree = () => {
    let threeLoader = document.getElementById("threeLoader");
    let width = threeLoader.clientWidth;
    let height = threeLoader.clientHeight;
    this.renderer = new Three.WebGL1Renderer({ antialias: true });//创建渲染器对象
    this.renderer.setSize(width, height);
    threeLoader.appendChild(this.renderer.domElement);
    //设置相机
    this.camera = new Three.PerspectiveCamera(50, width / height, 1, 10000);
    this.camera.position.set(0, 0, 400);
    this.camera.lookAt(this.scene.position);//设置相机的方向(指向场景对象)
    //设置场景
    this.scene = new Three.Scene();
    // 辅助坐标系  参数250表示坐标系大小，可以根据场景大小去设置
    let axisHelper = new Three.AxisHelper(250);
    this.scene.add(axisHelper);
    //设置相机控件
    // this.controls = new OrbitControls(this.camera, this.renderer.domElement);

    //加载3D模型
    let loader = new GLTFLoader().setPath("");
    loader.load("../../models/Bee.glb", (gltf) => {
      this.scene.add(gltf.scene);
      this.renderer.render(this.scene, this.camera);
    });
  }
  animate = () => {
    requestAnimationFrame(this.animate);
    this.renderer.render(this.scene, this.camera);
  }
  render() {
    return (
      <div id="threeLoader" style={{ width: "100%", height: "20rem" }}></div>
    )
  }
}