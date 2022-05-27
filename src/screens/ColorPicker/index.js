import React, {useEffect, useState} from 'react';
import _ from 'lodash';
import 'rsuite/styles/index.less';
import TimeAgo from 'react-timeago'

import { Container, Content, PanelGroup, Panel,  Table, IconButton } from 'rsuite';
import PageHeader from 'src/components/PageHeader';
import ProtectedPage from 'src/components/ProtectedPage';
import {DRAWER_TYPES} from "src/constants";
import PlusIcon from '@rsuite/icons/Plus';
import EditIcon from '@rsuite/icons/Edit';
import CloseIcon from '@rsuite/icons/Close';
import api from 'src/api';
import NewColor from './NewColor';
import EditColor from './EditColor';

const {Column, HeaderCell, Cell} = Table;
const shapes = ["Brows","Eyes","Lips","Head","Hairs"]

function ColorPicker({id}) {
  const [open, setOpen] = useState(null);
  const [open2, setOpen2] = useState(false);
  const [colorid, setColorId] = useState(null);
  const [colors,setColors] = useState([]);

    useEffect(()=>{
      getColors()
    },[])

    const getColors = async()=>{
      const colorres = await api.getAllColors()
      setColors(colorres)
    }
    const editShapeDrawer= (id)=>{
      setOpen2(true)
      setColorId(id)
    }

    const removeColor = async(id)=>{
      const res = await api.removeColor(id)
      getColors()
    }

  return (
    <Container >
      <ProtectedPage pageId={id}/>
      {shapes.map((e)=>(
        <NewColor
        shapename={e}
        open={open==e}
        onSubmit={()=>getColors()}
        setOpen={(e)=>setOpen(e)}
      />
      ))}
        <EditColor
          id={colorid}
          open={open2}
          onSubmit={()=>getColors()}
          setOpen={()=>setOpen2(false)}
        />
      <PageHeader 
        drawerType={DRAWER_TYPES.NEW_REWARD}
        title="Colors"/>
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
                <Table
                rowHeight={40}
                virtualized
                data={colors.filter(e=>e.colorLayer==shapes)}
                >
              <Column flexGrow={2} align="center" fixed>
                <HeaderCell>title</HeaderCell>
                <Cell dataKey="title" />
              </Column>

              <Column flexGrow={1}>
                <HeaderCell>colorLayer</HeaderCell>
                <Cell dataKey="colorLayer" />
              </Column>
              <Column flexGrow={1}>
                <HeaderCell>color</HeaderCell>
                <Cell dataKey="color" />
              </Column>
              <Column flexGrow={1}>
                <HeaderCell>layerColorId</HeaderCell>
                <Cell dataKey="layerColorId" />
              </Column>
              <Column flexGrow={1}>
                <HeaderCell>isPremium</HeaderCell>
                <Cell dataKey="isPremium">
                      {
                        rowData => {
                          return (
                            <span>
                               {rowData.isPremium?'true':"false"}
                            </span>
                          );
                        }
                      }
                    </Cell>
              </Column>
              <Column flexGrow={1}>
                <HeaderCell>creationTime</HeaderCell>
                <Cell dataKey="creationTime">
                      {
                        rowData => {
                          return (
                            <span>
                              <TimeAgo date={rowData.creationTime}/>
                            </span>
                          );
                        }
                      }
                    </Cell>
              </Column>
              <Column flexGrow={1}>
                <HeaderCell>lastUpdate</HeaderCell>
                <Cell dataKey="lastUpdate">
                      {
                        rowData => {
                          return (
                            <span>
                              <TimeAgo date={rowData.lastUpdate}/>
                            </span>
                          );
                        }
                      }
                    </Cell>
              </Column>
              <Column  flexGrow={2}>
                <HeaderCell>Action</HeaderCell>
                <Cell>
                  {rowData => {
                    return (
                      <span>
                     <IconButton onClick={()=> editShapeDrawer(rowData._id)} style={{marginLeft: 12}} icon={<EditIcon />} circle size="xs"/>
                  <IconButton onClick={()=> window.confirm('Are you sure you wish to delete this item?') &&  removeColor(rowData._id)} style={{marginLeft: 12}} icon={<CloseIcon />} circle size="xs"/>
                      </span>
                    );
                  }}
                </Cell>
              </Column>
             
            </Table>

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

export default ColorPicker;