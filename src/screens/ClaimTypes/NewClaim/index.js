import React, { useState } from 'react';
import {Divider, Drawer, Button, Form, InputGroup, Input,Checkbox } from 'rsuite';
import api from '/src/api';
import 'rsuite/styles/index.less';

function NewClaim({open, setOpen, onSubmit}) {
    const [claimName, setClaimName] = useState("");
    const [claimMessage, setClaimMessage] = useState("");
    const [claimNotifMessage, setClaimNotifMessage] = useState("");
    const [displayComparison, setDisplayComparison] = useState(false);

  async function newClaim(){
    await api.newClaim({claimName, claimMessage, claimNotifMessage,displayComparison})
    setOpen(false)
    onSubmit()
  }

  return (
    <Drawer 
      size={"xs"} 
      placement={"left"} 
      open={open} 
      onClose={() => setOpen(false)}>
      <Drawer.Header>
        <Drawer.Title>New Claim</Drawer.Title>
        <Drawer.Actions>
          <Button 
            disabled={!claimName || claimMessage.length === 0 || claimNotifMessage.length === 0} 
            onClick={() => newClaim()} 
            appearance="primary">
            Confirm
          </Button>
        </Drawer.Actions>
      </Drawer.Header>
      <Drawer.Body>

      <Form fluid>
      <div style={{paddingBottom: 20}}>
          <p style={{paddingBottom: 8}}>Claim Name</p>
          <InputGroup>
            <Input
              value={claimName}
              onChange={(claimName)=> setClaimName(claimName)}
              style={{ width: 300 }}/>
          </InputGroup>
        </div>
        <div style={{paddingBottom: 20}}>
          <p style={{paddingBottom: 8}}>Claim Mesage</p>
          <InputGroup>
            <Input
              value={claimMessage}
              onChange={(claimMessage)=> setClaimMessage(claimMessage)}
              style={{ width: 300 }}/>
          </InputGroup>
        </div>
        <div style={{paddingBottom: 20}}>
          <p style={{paddingBottom: 8}}>Claim Notif. Message</p>
          <InputGroup>
            <Input
              value={claimNotifMessage}
              onChange={(claimNotifMessage)=> setClaimNotifMessage(claimNotifMessage)}
              style={{ width: 300 }}/>
          </InputGroup>
        </div>
        <div style={{paddingBottom: 20}}>
          <Checkbox 
          checked={displayComparison} 
          onChange={()=> setDisplayComparison(!displayComparison)}>
           Display Comparison
        </Checkbox>
        </div>
        <Divider/>
      </Form>


      </Drawer.Body>
    </Drawer>
  );
}

export default NewClaim;
