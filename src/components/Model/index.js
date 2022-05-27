import React, { useEffect,useRef, useState, useImperativeHandle, forwardRef } from 'react'
import * as THREE from 'three';
import { GLTFLoader } from './GLTFLoader.js';
import {OrbitControls} from './OrbitControls';

 function Model(props,ref) {
  const [modelx,setModelx]=useState()

  useEffect(()=>{
    init();
    animate();
  },[])
    
  const box = useRef(null)
  useImperativeHandle(ref, () => ({
    editModel: (shape,defshapename,val,i) => {
      createGUI(modelx,null,val,defshapename,shape,i)
    },
  }));
  let clock, mixer;
  let camera, scene, renderer, model, face;
  const api = { state: 'Walking' };

  function init() {
    camera = new THREE.PerspectiveCamera(40, 280/300 , 0.25, 100 );
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
      setModelx(model)
    }, undefined, function ( e ) {
      console.error( e );
    } );
    renderer = new THREE.WebGLRenderer( { antialias: true, alpha: true  } );
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setClearColor( 0x000000, 0 );
    renderer.setSize(280, 300);
    renderer.outputEncoding = THREE.sRGBEncoding;
     //controls
     const controls = new OrbitControls( camera, renderer.domElement );
     controls.enablePan = false;
     controls.enableZoom = false;
     controls.target.set( 0,0,0 );
     controls.update();

    box.current.appendChild( renderer.domElement );
  }
	function createGUI(model,animations,val2,defshapename,shapex,shapeindex) {
    // expressions
    console.log(model)
    //Head,Eyes,Lips,Brows,Hairs
    const hair0 = model.getObjectByName( 'Hair_1' );
    const hair2 = model.getObjectByName( 'Hair_2' );
    const hair3 = model.getObjectByName( 'Hair_3' );
    const hair4 = model.getObjectByName( 'Hair_4' );
    const hair5 = model.getObjectByName( 'Hair_5' );
    hair0.visible=false
    hair2.visible=false
    hair3.visible=false
    hair4.visible=false
    hair5.visible=false
    if(shapex=='Brows'){
    const shape = model.getObjectByName( 'Eyebrows' );
    const exp = Object.keys(shape.morphTargetDictionary).map((e,i)=>{return e==defshapename?i:null})
    const ind = parseFloat(exp.toString().replaceAll(',',''))
    shape.morphTargetInfluences[ind]=val2
   }
   if(shapex=='Eyes'){
    const head = model.getObjectByName( 'Head' );
    const plane = head.children[0];
    const exp = Object.keys(plane.morphTargetDictionary).map((e,i)=>{return e==defshapename?i:null})
    const ind = parseFloat(exp.toString().replaceAll(',',''))
    plane.morphTargetInfluences[ind]=val2
   }
   if(shapex=='Head'){
    const head = model.getObjectByName( 'Head' );
    const plane = head.children[0];
    const exp = Object.keys(plane.morphTargetDictionary).map((e,i)=>{return e==defshapename?i:null})
    const ind = parseFloat(exp.toString().replaceAll(',',''))
    plane.morphTargetInfluences[ind]=val2
   }
   if(shapex=='Lips'){
    const head = model.getObjectByName( 'Head' );
    const plane = head.children[0];
    const exp = Object.keys(plane.morphTargetDictionary).map((e,i)=>{return e==defshapename?i:null})
    const ind = parseFloat(exp.toString().replaceAll(',',''))
    plane.morphTargetInfluences[ind]=val2
   }
   if(shapex=='Hairs'){
    const hair = model.getObjectByName( shapex.replace('s','')+`_${shapeindex+1}`);
    hair.visible=val2==1?true:false
   }
  }
  
  function animate() {
    const dt = clock.getDelta();
    if ( mixer ) mixer.update( dt );
    requestAnimationFrame( animate );
    renderer.render( scene, camera );
  }

  return (
    <>
   <div ref={box}></div>
   </>
  )
}

export default forwardRef(Model);