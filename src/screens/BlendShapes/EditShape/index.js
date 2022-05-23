import React, { useState, useEffect } from 'react';
import {Drawer,Button, Form ,InputGroup,Input,Divider} from 'rsuite';
import Slider from '@mui/material/Slider';
import _ from "lodash"
import api from '/src/api';
import 'rsuite/styles/index.less';

function EditShape({open, setOpen, onSubmit,id}) {
  const [shapes,setShapes] = useState([])
  const [shapeId,setShapeId] = useState()

useEffect(() => {
  if (id !== null && open) {
    getShape();
  }
}, [id, open]);

const getShape = async () => {
  const shape = await api.getShapeById(id);
  setShapes(shape);
  setShapeId(shape['_id'])
};

const updateShape = async()=>{
  await api.updateShape(shapeId,shapes)
  setOpen(false)
  onSubmit()
}
  return (
    <Drawer 
      size={"xs"} 
      placement={"left"} 
      open={open} 
      onClose={() => setOpen()}>
      <Drawer.Header>
        <Drawer.Title>Edit {shapes.title}</Drawer.Title>
        <Drawer.Actions>
          <Button onClick={() => updateShape()} appearance="primary">
            Save
          </Button>
        </Drawer.Actions>
      </Drawer.Header>
      <Drawer.Body>
      <Form fluid>
      <p style={{paddingBottom: 8}}>Shape Title</p>
          <InputGroup>
            <Input
              onChange={(val)=>setShapes(shapes=>({...shapes,['title']:val}))}
              style={{ width: 300 }}/>
          </InputGroup>
        <Divider/>
   {  
    _.times(11,String).map((e,i)=>(
      <>
         <p>{shapes.type=='Head'?`C_Jawline${i+1}: `+shapes[`C_Jawline${i+1}`]:`C_${shapes.type}${i+1}: `+shapes[`C_${shapes.type}${i+1}`]}</p>
         {shapes.type=='Hairs'?
          <Slider
          size="small"
          onChange={(e,val)=>setShapes(shapes=>({...shapes,[shapes.type=='Head'?`C_Jawline${i+1}`:`C_${shapes.type}${i+1}`]:val}))}
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
         onChange={(e,val)=>setShapes(shapes=>({...shapes,[shapes.type=='Head'?`C_Jawline${i+1}`:`C_${shapes.type}${i+1}`]:val}))}
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
     ))
    }
      </Form>
      </Drawer.Body>
    </Drawer>
  );
}

export default EditShape;