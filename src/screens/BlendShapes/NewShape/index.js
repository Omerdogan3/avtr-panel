import React, { useState,useRef, useEffect } from 'react';
import {Divider, Drawer, Button, Form, InputGroup, Input } from 'rsuite';
import 'rsuite/styles/index.less';
import Slider from '@mui/material/Slider';
import api from '../../../api';
import Model from '../../../components/Model';
const {Head,Eyes,Lips,Brows,Hairs} = require('../../../constants/blendShapes')

function NewShape({ onSubmit,shapename,setOpen,open}) {
  const [shape,setShape]=useState(null)
  const [values,setValues]=useState()
  const inputRef = useRef(null);

useEffect(()=>{
  if(shapename!==null){
    eval(shapename).map((val)=>{
      setValues(val.values.map((e,i)=>{return  Object.keys(e)}))
      val.values.map((e,i)=>{setShape(shape=>({...shape,[Object.keys(e)]:0}))})
    })
    setShape(shape=>({...shape,["type"]:shapename}))
  }
},[open])

const handleNewShape=async()=>{
  await api.newBlendShape(shape)
  setOpen(null)
  onSubmit()
  setValues(null)
  setShape(null)
}

const handleShape= (defshapename,val,i)=>{
  inputRef.current.editModel(shapename,defshapename,val,i)
  setShape(shape=>({...shape,[defshapename]:val}))
}
  return (
    <Drawer 
      size={"xs"} 
      placement={"left"} 
      open={open} 
      onClose={() => setOpen(false)}>
      <Drawer.Header>
        <Drawer.Title>New {shapename}</Drawer.Title>
        <Drawer.Actions>
          <Button onClick={() => handleNewShape()} appearance="primary">
            Save
          </Button>
        </Drawer.Actions>
      </Drawer.Header>
      <Drawer.Body>

      <Form fluid>
      <Model ref={inputRef}></Model>
       <p style={{paddingBottom: 8}}>Shape Title</p>
          <InputGroup>
            <Input
              onChange={(val)=>setShape(shape=>({...shape,['title']:val}))}
              style={{ width: 300 }}/>
          </InputGroup>
        <Divider/>
        {values&& values.map((defshapename,i)=>(
          <>
        <p>{defshapename}</p>
        {
          defshapename.includes(`hair_${i+1}`)?
          <Slider
          size="small"
          onChange={(e,val)=>handleShape(defshapename,val,i)}
          min={0}
          max={1}
          marks
          defaultValue={0}
          aria-label="Small"
         valueLabelDisplay="auto"
        />
         :
         <Slider
         size="small"
        onChange={(e,val)=>handleShape(defshapename,val,i)}
         min={0.0}
         max={1.0}
         step={0.1}
         marks
         defaultValue={0.0}
         aria-label="Small"
        valueLabelDisplay="auto"
       />
         }
        </>
        ))}
      </Form>


      </Drawer.Body>
    </Drawer>
  );
}

export default NewShape;
 