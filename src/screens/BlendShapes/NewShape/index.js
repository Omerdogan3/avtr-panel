import React, { useState, useEffect } from 'react';
import {Divider, Drawer, SelectPicker, Button, Form, InputGroup, InputNumber, Checkbox, toaster } from 'rsuite';
import 'rsuite/styles/index.less';
import Slider from '@mui/material/Slider';
import api from '../../../api';
const {Head,Eye,Lips,Brows,Hairs} = require('../../../constants/blendShapes')

function NewShape({ onSubmit,shapename,setOpen,open}) {
  const [shape,setShape]=useState(null)
  const [values,setValues]=useState()

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

        {values&& values.map((defshapename)=>(
          <>
        <p>{defshapename}</p>
        <Slider
          size="small"
          onChange={(e,val)=>setShape(shape=>({...shape,[defshapename]:val}))}
          min={0.0}
          max={1.0}
          step={0.1}
          marks
          defaultValue={0.0}
          aria-label="Small"
        valueLabelDisplay="auto"
        />
        </>
        ))}
        <Divider/>
      

      </Form>


      </Drawer.Body>
    </Drawer>
  );
}

export default NewShape;