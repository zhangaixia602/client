import React from 'react';
import * as Three from "three";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import modelUrl from "../../assets/models/Squirtle.obj";
export default class About extends React.Component {
  constructor(props) {
    super(props)
  }
  componentDidMount() {
    this.initObj();
    this.animate();
  }
  initObj = () => {
    //创建渲染器
    let threeLoader = document.getElementById("objLoader");
    let width = threeLoader.clientWidth;
    let height = threeLoader.clientHeight;
    this.renderer = new Three.WebGL1Renderer({ antialias: true });
    this.renderer.setSize(width, height);
    threeLoader.appendChild(this.renderer.domElement);
    //设置场景
    this.scene = new Three.Scene();
    this.scene.background = new Three.Color(0xeeeeee);
    //设置光源
    let light = new Three.HemisphereLight(0xbbbbff, 0x444422, 1.5);
    light.position.set(0, 1, 0);
    this.scene.add(light);
    //设置相机
    this.camera = new Three.PerspectiveCamera(50, width / height, 1, 10000);
    this.camera.position.set(0, 0, 400);
    this.camera.lookAt(this.scene.position);//设置相机的方向(指向场景对象)
    //设置相机控件
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    //加载3D模型
    let loader = new OBJLoader();
    loader.load(modelUrl, (obj) => {
      this.scene.add(obj);
      this.scene.scale.set(15, 15, 15);
    });
  }
  animate = () => {
    requestAnimationFrame(this.animate);
    this.renderer.render(this.scene, this.camera);
  }
  render() {
    return (
      <div id="objLoader" style={{ width: "100%", height: "30rem" }}></div>
    )
  }
}