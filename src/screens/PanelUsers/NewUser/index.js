import React, { useState, useEffect } from 'react';
import {Divider, Drawer, SelectPicker, Button, Form, InputGroup, Input, Checkbox, toaster } from 'rsuite';
import api from '/src/api';
import USER_ROLES from "src/constants/userRoles"; 
import 'rsuite/styles/index.less';

function NewUser({open, setOpen, onSubmit}) {
  const [userRole, setUserRole] = useState(USER_ROLES[0]);
  const [email, setEmail] = useState("");

  async function newUser(){
    await api.newUser({userRole, email})
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
        <Drawer.Title>New User</Drawer.Title>
        <Drawer.Actions>
          <Button 
            disabled={!userRole || (email.length === 0)} 
            onClick={() => newUser()} 
            appearance="primary">
            Confirm
          </Button>
        </Drawer.Actions>
      </Drawer.Header>
      <Drawer.Body>

      <Form fluid>
        <div style={{paddingBottom: 20}}>
          <p style={{paddingBottom: 8}}>User Role</p>
          <SelectPicker 
            value={userRole} 
            onChange={(userRole)=> setUserRole(userRole)} 
            data={
              Object.keys(USER_ROLES).map(el => {
              return({
                value: el,
                label: el[0] + el.slice(1, el.length).toLowerCase(),
              })
            }) }  
            style={{ width: 300 }} />
        </div>
        
        <div style={{paddingBottom: 20}}>
          <p style={{paddingBottom: 8}}>Email</p>
          <InputGroup>
            <InputGroup.Addon> @</InputGroup.Addon>
            <Input
              value={email}
              onChange={(email)=> setEmail(email)}
              style={{ width: 300 }}/>
          </InputGroup>
        </div>

        <Divider/>
      </Form>


      </Drawer.Body>
    </Drawer>
  );
}

export default NewUser;
