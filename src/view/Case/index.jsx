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
    let threeModel = document.getElementById("threeModel");
    this.scene = new Three.Scene();
    this.camera = new Three.PerspectiveCamera(
      45,
      threeModel.clientWidth / threeModel.clientHeight,
      0.01,
      1000
    );
    this.renderer = new Three.WebGL1Renderer({ antialias: true });
    this.renderer.setSize(threeModel.clientWidth, threeModel.clientHeight);
    const cubeGeometry = new Three.BoxGeometry(4, 4, 4);
    let cubeMaterial = new Three.MeshBasicMaterial({ color: 0x0000ff, wireframe: true });
    let cube = new Three.Mesh(cubeGeometry, cubeMaterial);
    cube.position.set(-4, 3, 0);
    this.scene.add(cube);
    this.camera.position.set(-30, 40, 30);
    this.camera.lookAt(this.scene.position);
    threeModel.appendChild(this.renderer.domElement);
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);//创建控件对象
    this.renderer.render(this.scene, this.camera);
  }
  animate = () => {
    requestAnimationFrame(this.animate);
    this.renderer.render(this.scene, this.camera);
  }
  render() {
    return (
      <div id="threeModel" style={{ width: "100%", height: "10rem" }}></div>
    )
  }
}
