import React, { useState, useEffect } from 'react';
import {Divider, Drawer, SelectPicker, Button, Form, InputGroup, InputNumber, Checkbox, toaster } from 'rsuite';
import Slider from '@mui/material/Slider';

import api from '/src/api';
import 'rsuite/styles/index.less';
import syncGames from 'src/utils/syncGames';
import {useSelector} from 'react-redux'

import {EVENT_TYPES, COMPARISON_TYPES} from "src/constants"; 

function EditShape({open, setOpen, onSubmit,name}) {


  return (
    <Drawer 
      size={"xs"} 
      placement={"left"} 
      open={open} 
      onClose={() => setOpen(false)}>
      <Drawer.Header>
        <Drawer.Title>Edit {name}</Drawer.Title>
        <Drawer.Actions>
          <Button onClick={() => alert('new shape')} appearance="primary">
            Save
          </Button>
        </Drawer.Actions>
      </Drawer.Header>
      <Drawer.Body>

      <Form fluid>


      <Slider
        size="small"
        defaultValue={70}
        aria-label="Small"
        valueLabelDisplay="auto"
      />




        <Divider/>
        <Checkbox 
          checked={true} 
          >
            Notification on reward
        </Checkbox>

      </Form>


      </Drawer.Body>
    </Drawer>
  );
}

export default EditShape;