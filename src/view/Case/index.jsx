import React from 'react';
import * as Three from 'three';
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
export default class Case extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.init();
    this.animate();
  }
  init = () => {
    //设置渲染区
    let threeModel = document.getElementById("threeModel");
    this.renderer = new Three.WebGL1Renderer({ antialias: true });
    this.renderer.setClearColor(new Three.Color(0xeeeeee))
    this.renderer.setSize(threeModel.clientWidth, threeModel.clientHeight);
    threeModel.appendChild(this.renderer.domElement);
    //设置场景
    this.scene = new Three.Scene();
    //设置相机
    this.camera = new Three.PerspectiveCamera(
      45,
      threeModel.clientWidth / threeModel.clientHeight,
      0.01,
      1000
    );
    this.camera.position.set(-30, 40, 30);
    this.camera.lookAt(this.scene.position);
    //设置模型
    const cubeGeometry = new Three.BoxGeometry(4, 4, 4);
    let cubeMaterial = new Three.MeshBasicMaterial({ color: 0x0000ff, wireframe: true });
    let cube = new Three.Mesh(cubeGeometry, cubeMaterial);
    cube.position.set(-4, 3, 0);
    this.scene.add(cube);
    
    //设置相机控件
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);//创建控件对象
  }
  animate = () => {
    requestAnimationFrame(this.animate);
    this.renderer.render(this.scene, this.camera);
  }
  render() {
    return (
      <div id="threeModel" style={{ width: "100%", height: "17.55rem" }}></div>
    )
  }
}
