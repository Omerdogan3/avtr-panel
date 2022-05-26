import React, {useEffect, useState} from 'react';
import _ from 'lodash';
import 'rsuite/styles/index.less';

import { Container, Content, PanelGroup, Panel,  Table, IconButton } from 'rsuite';
import PageHeader from 'src/components/PageHeader';
import ProtectedPage from 'src/components/ProtectedPage';
import {DRAWER_TYPES} from "src/constants";
import PlusIcon from '@rsuite/icons/Plus';
import EditIcon from '@rsuite/icons/Edit';
import CloseIcon from '@rsuite/icons/Close';
import api from 'src/api';
import NewShape from './NewShape';
import EditShape from './EditShape';
import Model from '../../components/Model';

const {Column, HeaderCell, Cell} = Table;
const shapes = ["Brows","Eyes","Lips","Head","Hairs"]

function BlendShapes({id}) {
  const [open, setOpen] = useState(null);
  const [open2, setOpen2] = useState(false);
  const [shapeid, setShapeId] = useState(null);
  const [blendShapes, setBlendShapes] = useState([]);

    useEffect(()=>{
      getShapes()
    },[])

    const getShapes = async()=>{
      const shapesres = await api.getAllBlendShapes()
      setBlendShapes(shapesres)
    }
    const editShapeDrawer= (id)=>{
      setOpen2(true)
      setShapeId(id)
    }

    const removeShape = async(id)=>{
      const res = await api.removeShape(id)
      getShapes()
    }

  return (
    <Container >
      <ProtectedPage pageId={id}/>
      {shapes.map((e)=>(
        <NewShape
        shapename={e}
        open={open==e}
        onSubmit={()=>getShapes()}
        setOpen={(e)=>setOpen(e)}
      />
      ))}
        <EditShape
          id={shapeid}
          open={open2}
          onSubmit={()=>getShapes()}
          setOpen={()=>setOpen2(false)}
        />
      <PageHeader 
        drawerType={DRAWER_TYPES.NEW_REWARD}
        title="BlendShapes"/>
      <Content style={{paddingLeft: 40, paddingRight: 40}}>
        <PanelGroup accordion bordered>
          {
            shapes.map((shapes, index)=> {
              return(
                <Panel 
                  shaded 
                  header={
                    <div style={{display: "flex", flexDirection: "row", alignItems: "center"}}>
                        <p style={{fontWeight: "600",fontSize: 15}}>{shapes}</p>
                      <IconButton onClick={()=> setOpen(shapes)} style={{marginLeft: 12}} icon={<PlusIcon />} circle size="xs"/>
                    </div>
                  }
                  eventKey={index} 
                  id={index}>
                   <PanelGroup accordion bordered>
          {
            blendShapes.filter(e=>e.type==shapes).map((shape, index)=> {
              return(
                <Panel 
                  shaded 
                  header={
                    <div style={{display: "flex", flexDirection: "row", alignItems: "center"}}>
                        <p style={{fontWeight: "600",fontSize: 15}}>{shape.title?shape.title:shape._id}</p>
                      <IconButton onClick={()=> editShapeDrawer(shape._id)} style={{marginLeft: 12}} icon={<EditIcon />} circle size="xs"/>
                      <IconButton onClick={()=> removeShape(shape._id)} style={{marginLeft: 12}} icon={<CloseIcon />} circle size="xs"/>
                    </div>
                  }
                  eventKey={index} 
                  id={index}>
                  {
                  _.times(11,String).map((e,i)=>(
                      <p>{shape.type=='Head'?
                      `C_Jawline${i+1}: ` + shape[`C_Jawline${i+1}`]:
                      shape.type=='Eyes'?
                      `C_Eyes${i+1}: ` + shape[`C_Eyes${i+1}`]:
                      shape.type=='Brows'?
                      `C_Brows${i+1}: ` + shape[`C_Brows${i+1}`]:
                      shape.type=='Hairs'?
                      `hair_${i+1}: ` + shape[`hair_${i+1}`]:
                      `C_${shape.type}${i+1}: ` + shape[`C_${shape.type}${i+1}`]
                    }</p>
                  ))
                    }
              </Panel>
            )
          })
        }
        </PanelGroup>
                  
              </Panel>
            )
          })
        }
        </PanelGroup>
      </Content>
    </Container>
  );
}

export default BlendShapes;