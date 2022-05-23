import React, {useEffect, useState} from 'react';
import 'rsuite/styles/index.less';

import { Container, Content, InputGroup, Form, InputNumber, Panel } from 'rsuite';
import PageHeader from '/src/components/PageHeader';
import { useFirebase, isLoaded, isEmpty } from 'react-redux-firebase'
import {BrowserRouter as Router, Route, Routes, Navigate} from "react-router-dom";
import { useSelector } from 'react-redux'
import ProtectedPage from 'src/components/ProtectedPage';
import api from 'src/api';
import _ from 'lodash';
import RegionDividers from './RegionDividers';

function Config({id}) {
  const [panelValues, setPanelValues] = useState([]);
  const [regionDividers, setRegionDiv] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const auth = useSelector(state => state.firebase.auth)

  useEffect(()=> {
    syncPanelValues()
  }, [])

  async function syncPanelValues(){
    setIsLoading(true)
    const panelVals = await api.getPanelValues()
    setPanelValues(panelVals)
    const regionDiv = await api.getAllRegionDividers();
    setRegionDiv(regionDiv);
    setIsLoading(false)
  }

  async function setPanelValue(id, value){
    await api.setPanelValue(id, value)
  }

  return (
    <Container>
      <ProtectedPage pageId={id}/>
      <PageHeader title="Configs"/>
      <Content style={{padding: 50}}>
        <Panel bordered>
          <div style={{display:'flex',justifyContent:'space-between'}}>
          <div style={{flex:1}}>
          <Form fluid>
            {
              panelValues.map((panelValue, index)=> {
                return(
                  <div style={{paddingBottom: 20, width: 224}}>
                    <p style={{paddingBottom: 4}}>{_.startCase(panelValue._id)}</p>
                    <InputGroup>
                      <InputNumber value={panelValue.value} onChange={(value)=> {
                        panelValues[index]["value"] = value;
                        setPanelValues([...panelValues]);
                      }} />
                      <InputGroup.Button onClick={()=> setPanelValue(panelValue._id, panelValue.value)}>
                        Update
                      </InputGroup.Button>
                    </InputGroup>
                  </div>
                )
              })
            }
          </Form>
          </div>
          <div style={{flex:1}}>
            <RegionDividers regionDividers={regionDividers} isLoading={isLoading} onSubmit={()=>syncPanelValues()}/>
          </div>
          </div>
        </Panel>
      </Content>
    </Container>
  );
}

export default Config;