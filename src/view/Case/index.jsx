import React from 'react';
import * as Three from 'three';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import imgUrl from "../../assets/img/earth.jpg";
let camera, scene, renderer;
let group, cubes;
export default class Case extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.init();
    this.animate();
  }
  addImageBitmap = () => {
    new Three.ImageBitmapLoader()
      .setOptions({ imageOrientation: 'none' })
      .load(imgUrl + '?' + performance.now(), function (imageBitmap) {
        const texture = new Three.CanvasTexture(imageBitmap);
        const material = new Three.MeshBasicMaterial({ map: texture });
        const geometry= new Three.BoxGeometry( 1, 1, 1 );
        const cube = new Three.Mesh(geometry, material);
        cube.position.set(Math.random() * 2 - 1, Math.random() * 2 - 1, Math.random() * 2 - 1);
        cube.rotation.set(Math.random() * 2 * Math.PI, Math.random() * 2 * Math.PI, Math.random() * 2 * Math.PI);
        cubes.add(cube);
      });
  }

  addImage = () => {
    new Three.ImageLoader()
      .setCrossOrigin('*')
      .load(imgUrl + '?' + performance.now(), function (image) {
        const texture = new Three.CanvasTexture(image);
        const material = new Three.MeshBasicMaterial({ color: 0xff8888, map: texture });
        const geometry= new Three.BoxGeometry( 1, 1, 1 );
        const cube = new Three.Mesh(geometry, material);
        cube.position.set(Math.random() * 2 - 1, Math.random() * 2 - 1, Math.random() * 2 - 1);
        cube.rotation.set(Math.random() * 2 * Math.PI, Math.random() * 2 * Math.PI, Math.random() * 2 * Math.PI);
        cubes.add(cube);
      });

  }

  addCube = (material) => {
    const geometry= new Three.BoxGeometry( 1, 1, 1 );
    const cube = new Three.Mesh(geometry, material);
    cube.position.set(Math.random() * 2 - 1, Math.random() * 2 - 1, Math.random() * 2 - 1);
    cube.rotation.set(Math.random() * 2 * Math.PI, Math.random() * 2 * Math.PI, Math.random() * 2 * Math.PI);
    cubes.add(cube);
  }

  init=()=>{
    let threeModel = document.getElementById("threeModel");
  	camera = new Three.PerspectiveCamera( 30, threeModel.clientWidth/threeModel.clientHeight, 1, 1500 );
  	camera.position.set( 0, 4, 7 );
  	camera.lookAt( 0, 0, 0 );

  	scene = new Three.Scene();
    scene.background = new Three.Color( 0xeeeeee );

  	group = new Three.Group();
  	scene.add( group );

  	group.add( new Three.GridHelper( 4, 12, 0x888888, 0x444444 ) );

  	cubes = new Three.Group();
  	group.add( cubes );

  	// RENDERER

  	renderer = new Three.WebGL1Renderer( { antialias: true } );
  	renderer.setPixelRatio( window.devicePixelRatio );
  	renderer.setSize(threeModel.clientWidth, threeModel.clientHeight);
  	threeModel.appendChild( renderer.domElement );
    new OrbitControls(camera, renderer.domElement)
  	// TESTS

  	setTimeout( this.addImage, 300 );
  	setTimeout( this.addImage, 600 );
  	setTimeout( this.addImage, 900 );
  	setTimeout( this.addImageBitmap, 1300 );
  	setTimeout( this.addImageBitmap, 1600 );
  	setTimeout( this.addImageBitmap, 1900 );
  }
  animate = () => {
    group.rotation.y = performance.now() / 3000;
    requestAnimationFrame(this.animate);
    renderer.render( scene, camera );
  }
  render() {
    return (
      <div id="threeModel" style={{ width: "100%", height: "17.55rem" }}></div>
    )
  }
}
