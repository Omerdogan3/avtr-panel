import React, { useState, useEffect } from 'react';
import {Drawer,Button, Form ,Checkbox,InputGroup,Input,Divider} from 'rsuite';
import _ from "lodash"
import api from '/src/api';
import 'rsuite/styles/index.less';
import ColorPicker from 'material-ui-color-picker'

function EditColor({open, setOpen, onSubmit,id}) {
  const [color,setColor] = useState([])
  const [colorId,setColorId] = useState()
  const [colorpicker,setColorPicker]=useState('#fff')
  const [isPremium,setIsPremium]=useState(false)

useEffect(() => {
  if (id !== null && open) {
    getColor();
  }
}, [id, open]);

const getColor = async () => {
  const colorres = await api.getColorById(id);
  setColor(colorres);
  setColorId(colorres['_id'])
};

const updateColor = async()=>{
  await api.updateColor(colorId,color)
  setOpen(false)
  onSubmit()
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
      onClose={() => setOpen()}>
      <Drawer.Header>
        <Drawer.Title>Edit {color.title}</Drawer.Title>
        <Drawer.Actions>
          <Button onClick={() => updateColor()} appearance="primary">
            Save
          </Button>
        </Drawer.Actions>
      </Drawer.Header>
      <Drawer.Body>
      <Form fluid>
      <p style={{paddingBottom: 8}}>Color Title</p>
          <InputGroup>
            <Input
              placeholder={color.title}
              onChange={(val)=>setColor(color=>({...color,['title']:val}))}
              style={{ width: 300 }}/>
          </InputGroup>
        <Divider/>
    
        <p style={{paddingBottom: 8}}>layerColorId</p>
          <InputGroup>
          <Input 
          placeholder={color.layerColorId}
          onChange={(val)=>setColor(color=>({...color,['layerColorId']:val}))}/>
          </InputGroup>
        <Divider/>
        
        <p style={{paddingBottom: 8}}>Hex Color</p>
        <ColorPicker 
        value={colorpicker!=='#fff'?colorpicker:color.color}
        defaultValue='Color'
        onChange={(color) => handleColor(color)}/>
        <Divider/>
       
        <p style={{paddingBottom: 8}}>isPremium</p>
        <InputGroup>
          <Checkbox 
           checked={color.isPremium} 
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

export default EditColor;