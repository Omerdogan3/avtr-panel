import React, {useEffect, useState} from 'react';
import _ from 'lodash';
import 'rsuite/styles/index.less';

import { Container, Content, PanelGroup, Panel,  Table, IconButton } from 'rsuite';
import PageHeader from 'src/components/PageHeader';
import ProtectedPage from 'src/components/ProtectedPage';
import {DRAWER_TYPES} from "src/constants";
import PlusIcon from '@rsuite/icons/Plus';
import api from 'src/api';
import NewShape from './NewShape';
import EditShape from './EditShape';

const {Column, HeaderCell, Cell} = Table;
const shapes = ["Brows","Eye","Lips","Head","Hairs"]

function BlendShapes({id}) {
  const [open, setOpen] = useState(null);
  const [open2, setOpen2] = useState(false);
  const [blendShapes, setBlendShapes] = useState([]);

    useEffect(()=>{
      getShapes()
    },[])

    const getShapes = async()=>{
      const shapesres = await api.getAllBlendShapes()
      setBlendShapes(shapesres)
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
          name={"Head"}
          rewardId={"0"}
          open={open2}
          onSubmit={()=>alert('submit')}
          setOpen={()=>setOpen2(!open2)}
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
                        <p style={{fontWeight: "600",fontSize: 15}}>{shape._id}</p>
                      <IconButton onClick={()=> setOpen(shape._id)} style={{marginLeft: 12}} icon={<PlusIcon />} circle size="xs"/>
                    </div>
                  }
                  eventKey={index} 
                  id={index}>
                  {
                  _.times(11,String).map((e,i)=>(
                      <p>{`C_${shape.type}${i+1}: ` + shape[`C_${shape.type}${i+1}`]}</p>
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