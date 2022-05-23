import React, { useEffect, useState, useCallback } from 'react';
import {Container, Content, Breadcrumb, Button, Modal, Form, IconButton, Placeholder, ButtonToolbar, Panel} from 'rsuite';
import PageHeader from 'src/components/PageHeader';
import {useSelector, shallowEqual} from 'react-redux'
import ProtectedPage from 'src/components/ProtectedPage';
import { useParams } from 'react-router-dom'
import AsyncToggle from 'src/components/AsyncToggle';
import {Link} from "react-router-dom";
import PlatformBadge from 'src/components/PlatformBadge';
import api from 'src/api';
import 'rsuite/styles/index.less';
import {storage} from 'src/config/firebaseConfig';
import Compressor from 'compressorjs';
import uploadImage from 'src/utils/uploadImage';

import CloseIcon from '@rsuite/icons/Close';


function AppDetail({id}) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [appDetails, setAppDetails] = useState({});

  const gameList = useSelector(state => state.gameReducer.gameList, shallowEqual)
  const params = useParams()

  useEffect(() => {
    checkAppDetail()
  }, [])

  // const instance = <Input as="textarea" rows={3} placeholder="Textarea" />;


  async function checkAppDetail(){
    const appDetail = await api.getGameData(params.appId)
    setAppDetails(appDetail)
  }

  async function removeGame(){
    await api.removeGame(params.appId)
    handleClose();
  }

  const uploadThumbnail = (e) => {
    const image = e.target.files[0]
    new Compressor(image, {
      width: 800,
      height: 800,
      quality: 1,
      success: (compressedResult) => {      
        uploadRoutine("thumbnail", compressedResult)
      },
    });
  }


  const uploadPromoted = (e) => {
    const image = e.target.files[0]
    new Compressor(image, {
      width: 1200,
      height: 500,
      quality: 1,
      success: (compressedResult) => {      
        uploadRoutine("promotedImage", compressedResult)
      },
    });
  }

  async function uploadRoutine(uploadType, compressedResult){
    const img = await uploadImage(uploadType, appDetails.title, compressedResult)
    appDetails[uploadType] = img;
    setAppDetails({...appDetails})
    await api.updateGame(params.appId, {[uploadType]: img})
  }

  function updateGame(){
    delete appDetails["isActive"]
    api.updateGame(params.appId, appDetails)
  }

  return (
    <Container>
      <ProtectedPage pageId={id}/>
      {/* <PageHeader
        title={appDetails.title}/> */}


      <Content style={{paddingTop: 40, display: 'flex', flex: 1, justifyContent: 'center'}}>
        <Panel bordered style={{width: "60%"}}>

          <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
            <Breadcrumb>
              <Breadcrumb.Item as={Link} to="/">Home</Breadcrumb.Item>
              <Breadcrumb.Item as={Link} to="/apps">Apps</Breadcrumb.Item>
              <Breadcrumb.Item active>{appDetails.title}</Breadcrumb.Item>
              <PlatformBadge style={{marginTop: 5}} platform={appDetails.platform}/>
            </Breadcrumb>

            <div>
              {
                appDetails.isActive !== undefined &&
                <AsyncToggle 
                  size="lg" 
                  isActive={appDetails.isActive}
                  appId={params.appId}
                  checkedChildren="Active" 
                  unCheckedChildren="Inactive" />
              }
              <Button onClick={()=> {
                updateGame()
              }} style={{marginLeft: 4}} appearance="primary">Update</Button>
            </div>
          </div>

          <Form 
            formValue={appDetails}
            onChange={(appDetail)=> setAppDetails(appDetail)} 
            fluid>
              <div style={{display: 'flex', flex: 1, flexDirection: 'row'}}>
                {
                  appDetails.thumbnail ? 
                  <div style={{display: 'flex', flex: 1, width: 100, alignItems: 'center', justifyContent: 'center'}}>
                    <IconButton onClick={()=> {
                      appDetails.thumbnail = null;
                      setAppDetails({...appDetails})
                    }} style={{position: "absolute"}} icon={<CloseIcon />} circle size="xs"/>
                    <img 
                      style={{width: 100, height: 100, borderRadius: 24}}
                      src={appDetails.thumbnail}/>
                  </div>
                  :
                  <div style={{borderRadius: 24, width: 100, height: 100}}>
                    <label for="file">Upload Thumbnail</label>
                    <input 
                      id="file"
                      style={{width: 100, height: 100}} 
                      onChange={uploadThumbnail}
                      accept="image/png, image/jpeg"
                      type="file"/>
                    
                  </div>
                }
                <div style={{width: "100%", paddingLeft: 20}}>
                  <Form.ControlLabel>Title</Form.ControlLabel>            
                  <Form.Control name="title" />
                </div>
              </div>

              <Form.Group style={{paddingTop: 20}} controlId="textarea">
                <Form.ControlLabel>Description</Form.ControlLabel>
                <Form.Control name="description"/>
              </Form.Group>

              <Form.Group controlId="textarea">
                <Form.ControlLabel>URL</Form.ControlLabel>
                <Form.Control name="url"/>
              </Form.Group>


              {
                appDetails.promotedImage ? 
                <div style={{display: 'flex', flex: 1, width: 500, alignItems: 'center', justifyContent: 'center'}}>
                  <IconButton onClick={()=> {
                    appDetails.promotedImage = null;
                    setAppDetails({...appDetails})
                  }} style={{position: "absolute"}} icon={<CloseIcon />} circle size="xs"/>
                  <img 
                    style={{width: 450, height: 200, borderRadius: 24}}
                    src={appDetails.promotedImage}/>
                </div>
                :
                <div style={{display: 'flex', flex: 1, paddingBottom: 20, flexDirection: 'column', alignItems: 'center', backgroundColor: "rgba(255,255,255,0.2)", justifyContent: 'center', borderRadius: 24, width: 500, height: 200}}>
                  <p style={{padding: 20}}>Upload Promoted Image - width: 900, height: 400</p>
                  <input 
                    id="file"
                    style={{marginLeft: 75}} 
                    onChange={uploadPromoted}
                    accept="image/png, image/jpeg"
                    type="file"/>
                </div>
              }


          </Form>

          <Button color="red" onClick={handleOpen} style={{marginTop: 10}} appearance="link">
            Remove App
          </Button>
        </Panel>


        <Modal open={open} onClose={handleClose}>
          <Modal.Header>
            <Modal.Title>
              Warning!
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Are you sure? You are about to remove 
            <br/> 
            {appDetails.title}.
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={()=> {
              removeGame()
            }} color="red" appearance="primary">
              Remove
            </Button>
            <Button onClick={handleClose} appearance="subtle">
              Cancel
            </Button>
          </Modal.Footer>
        </Modal>

      </Content>
    </Container>
  );
}

export default AppDetail;