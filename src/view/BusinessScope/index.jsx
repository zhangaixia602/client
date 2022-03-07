import React from 'react';
import * as Three from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import modelUrl from "../../assets/models/Bee.glb";
let mixer=null;
let clock = new Three.Clock();
export default class BusinessScope extends React.Component {
  constructor(props) {
    super(props)
  }
  componentDidMount() {
    this.initThree();
    this.animate();
  }
  initThree = () => {
    //创建渲染器
    let threeLoader = document.getElementById("threeLoader");
    let width = threeLoader.clientWidth;
    let height = threeLoader.clientHeight;
    this.renderer = new Three.WebGL1Renderer({ antialias: true });
    this.renderer.setSize(width, height);
    threeLoader.appendChild(this.renderer.domElement);
    //设置场景
    this.scene = new Three.Scene();
    this.scene.background = new Three.Color( 0xeeeeee );
     //设置光源
     let light = new Three.HemisphereLight( 0xbbbbff, 0x444422, 1.5 );
     light.position.set( 0, 1, 0 );
     this.scene.add(light);
     //设置相机
     this.camera = new Three.PerspectiveCamera(50, width/height, 1, 10000);
     this.camera.position.set(0, 0, 400);
     this.camera.lookAt(this.scene.position);//设置相机的方向(指向场景对象)
    //设置相机控件
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    //加载3D模型
    let loader = new GLTFLoader();
    loader.load(modelUrl, (gltf) => {
      this.scene.add(gltf.scene);
      this.scene.scale.set(15, 15, 15);
      console.log(gltf.scene)
      mixer = new Three.AnimationMixer(gltf.scene);
      var AnimationAction = mixer.clipAction(gltf.scene.animations[0]);
      AnimationAction.play();
    });
  }
  animate = () => {
    requestAnimationFrame(this.animate);
    this.renderer.render(this.scene, this.camera);
    if(mixer!==null){
      //clock.getDelta()方法获得两帧的时间间隔
      // 更新混合器相关的时间
      mixer.update(clock.getDelta());
    }
  }
  render() {
    return (
      <div id="threeLoader" style={{ width: "100%", height: "30rem" }}></div>
    )
  }
}