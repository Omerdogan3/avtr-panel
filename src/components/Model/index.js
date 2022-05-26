import React, { useEffect,useRef } from 'react'
import * as THREE from 'three';
import { GLTFLoader } from './GLTFLoader.js';
		
export default function Model({modelprop}) {
  
  useEffect(()=>{
    init();
    animate();
  },[])

  const box = useRef(null)
  let container, clock, mixer ;
  let camera, scene, renderer, model, face;

  function init() {
    camera = new THREE.PerspectiveCamera(40, 250/300 , 0.25, 100 );
    camera.position.set( 0, 0.2, 0.8 );
    camera.lookAt( new THREE.Vector3( 0, 0, 0 ) );
    scene = new THREE.Scene();
    clock = new THREE.Clock();
    // lights
    const hemiLight = new THREE.HemisphereLight( 0xffffff, 0x444444 );
    hemiLight.position.set( 0, 20, 0 );
    scene.add( hemiLight );
    const dirLight = new THREE.DirectionalLight( 0xffffff );
    dirLight.position.set( 0, 20, 10 );
    scene.add( dirLight );

    // model
    const loader = new GLTFLoader();
    loader.load('/230.glb', function ( gltf ) {
      model = gltf.scene;
      scene.add( model );
      createGUI( model, gltf.animations );
    }, undefined, function ( e ) {
      console.error( e );
    } );
    renderer = new THREE.WebGLRenderer( { antialias: true, alpha: true  } );
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setClearColor( 0x000000, 0 );
    renderer.setSize(250, 300);
    renderer.outputEncoding = THREE.sRGBEncoding;
    box.current.appendChild( renderer.domElement );
  }

  function createGUI( model, animations ) {
    // expressions
    face = model.getObjectByName( 'Head_4' );
    const eye = model.getObjectByName( 'Eye_R' );
    const hair = model.getObjectByName( 'Hair_1' );
    const hair2 = model.getObjectByName( 'Hair_2' );
    const hair3 = model.getObjectByName( 'Hair_3' );
    const hair4 = model.getObjectByName( 'Hair_4' );
    const hair5 = model.getObjectByName( 'Hair_5' );
    hair.visible=false
    hair2.visible=true
    hair3.visible=false
    hair4.visible=false
    hair5.visible=false
    console.log(model)
    eye.children[0].position.x=0.000
    eye.position.x=-modelprop
  }

  function animate() {
    const dt = clock.getDelta();
    if ( mixer ) mixer.update( dt );
    requestAnimationFrame( animate );
    renderer.render( scene, camera );
  }
  return (
   <div ref={box}></div>
  )
}