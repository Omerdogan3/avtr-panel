import React, { useState,useRef, useEffect } from 'react';
import {Divider, Drawer, Button, Form, InputGroup, Input, Checkbox } from 'rsuite';
import 'rsuite/styles/index.less';
import api from '../../../api';
import ColorPicker from 'material-ui-color-picker'


function NewColor({ onSubmit,shapename,setOpen,open}) {
  const [color,setColor]=useState([])
  const [colorpicker,setColorPicker]=useState('#fff')
  const [isPremium,setIsPremium]=useState(false)

useEffect(()=>{
  if(shapename!==null){
    setColor(color=>({...color,["colorLayer"]:shapename}))
  }
},[open])

const handleNewShape=async()=>{
  await api.newColor(color)
  setOpen(null)
  onSubmit()
  setColor(null)
  setIsPremium(false)
}

const handleIsPremium= ()=>{
  setIsPremium(!isPremium)
  setColor(color=>({...color,['isPremium']:!isPremium}))
}
const handleColor= (colorval)=>{
  setColorPicker(colorval) 
  setColor(color=>({...color,['color']:colorval})) 
}
  return (
    <Drawer 
      size={"xs"} 
      placement={"left"} 
      open={open} 
      onClose={() => setOpen(false)}>
      <Drawer.Header>
        <Drawer.Title>New {shapename} Color</Drawer.Title>
        <Drawer.Actions>
          <Button onClick={() => handleNewShape()} appearance="primary">
            Save
          </Button>
        </Drawer.Actions>
      </Drawer.Header>
      <Drawer.Body>

      <Form fluid>
        <p style={{paddingBottom: 8}}>title</p>
          <InputGroup>
          <Input onChange={(val)=>setColor(color=>({...color,['title']:val}))}/>
          </InputGroup>
        <Divider/>
        
        <p style={{paddingBottom: 8}}>layerColorId</p>
          <InputGroup>
          <Input onChange={(val)=>setColor(color=>({...color,['layerColorId']:val}))}/>
          </InputGroup>
        <Divider/>
        
        <p style={{paddingBottom: 8}}>Hex Color</p>
        <ColorPicker 
        value={colorpicker}
        defaultValue='Color' onChange={(color) => handleColor(color)}/>
        <Divider/>
       
        <p style={{paddingBottom: 8}}>isPremium</p>
        <InputGroup>
          <Checkbox 
           checked={isPremium} 
           onChange={()=>handleIsPremium()}>
           isPremium
          </Checkbox>
        </InputGroup>
        <Divider/>

      </Form>

      </Drawer.Body>
    </Drawer>
  );
}

export default NewColor;

