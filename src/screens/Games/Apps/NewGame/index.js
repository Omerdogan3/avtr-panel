import React, { useState, useEffect } from 'react';
import {Divider, Drawer, Notification, Button, Form, Radio, RadioGroup, toaster } from 'rsuite';
import notifMessage from 'src/utils/notifMessage';
import api from '/src/api';
import 'rsuite/styles/index.less';
import syncGames from 'src/utils/syncGames';

function NewGame({open, setOpen}) {
  const [platform, setPlatform] = useState("Android");
  const [bundleId, setBundleId] = useState("");
  let [searchResult, setSearchResult] = useState({});

  useEffect(()=> {

  }, [])


  async function syncAppData(){
    const searchRes = await api.searchApps(bundleId)
    searchRes["platform"] = platform;
    setSearchResult(searchRes);
  }

  async function newGame(){
    await api.newGame(searchResult)
    // get game feed
    syncGames()
    setOpen(false)
  }

  return (
    <Drawer 
      size={"xs"} 
      placement={"left"} 
      open={open} 
      onClose={() => setOpen(false)}>
      <Drawer.Header>
        <Drawer.Title>New Game</Drawer.Title>
        <Drawer.Actions>
          <Button onClick={() => newGame()} appearance="primary">
            Confirm
          </Button>
        </Drawer.Actions>
      </Drawer.Header>
      <Drawer.Body>

      <Form onSubmit={()=> syncAppData()} fluid>
        <Form.Group controlId="name-1">
          <Form.ControlLabel>Bundle Id</Form.ControlLabel>            
          <Form.Control onChange={(val)=> setBundleId(val)} name="name" />
        </Form.Group>
        
        <Form.Group controlId="radio">
          <Form.ControlLabel>Platform:</Form.ControlLabel>
          <Form.Control value={platform}  onChange={(value)=> setPlatform(value)} name="radio" accepter={RadioGroup}>
            <Radio value="Android">Android</Radio>
            <Radio disabled value="IOS">IOS</Radio>
          </Form.Control>
        </Form.Group>
      </Form>

      <Divider/>

      {
        searchResult.status &&
        <Form 
          formValue={searchResult}
          onChange={(tmp)=> setSearchResult(tmp)}>

          {/* <img src={searchResult.thumbnail + "?sz=10"} style={{width: 80, height: 80, marginBottom: 10, borderRadius: 14}}/> */}

          <Form.Group>
            <Form.ControlLabel>Title</Form.ControlLabel>
            <Form.Control 
              name="title" />
          </Form.Group>

          <Form.Group>
            <Form.ControlLabel>Summary</Form.ControlLabel>
            <Form.Control 
              rows={5} 
              name="summary" />
          </Form.Group>

          <Form.Group>
            <Form.ControlLabel>Description</Form.ControlLabel>
            <Form.Control 
              rows={6} 
              name="description" />
          </Form.Group>

          <Form.Group>
            <Form.ControlLabel>Url</Form.ControlLabel>
            <Form.Control name="url" />
          </Form.Group>
        </Form>
      }

      </Drawer.Body>
    </Drawer>
  );
}

export default NewGame;
