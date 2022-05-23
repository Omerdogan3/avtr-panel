import React, { useState, useEffect } from 'react';
import {Divider, Drawer, SelectPicker, Button, Form, InputGroup, InputNumber, Checkbox, toaster } from 'rsuite';
import api from '/src/api';
import 'rsuite/styles/index.less';
import syncGames from 'src/utils/syncGames';
import {useSelector} from 'react-redux'

import {EVENT_TYPES, COMPARISON_TYPES} from "src/constants"; 

function NewReward({open, setOpen, onSubmit}) {
  const gameList = useSelector(state => state.gameReducer.gameList)

  const [appId, setAppId] = useState(null);
  const [claimType, setClaimType] = useState(null);
  const [allClaimTypes, setAllClaimTypes] = useState([]);
  const [claimIndex, setClaimIndex] = useState(null);
  const [displayComparison, setDisplayComparison] = useState(false);
  const [comparison, setComparison] = useState(COMPARISON_TYPES.EQUAL["value"]);
  const [comparisonValue, setComparisonValue] = useState(0);
  const [rewardAmount, setRewardAmount] = useState(0);
  const [claimMultiple, setClaimMultiple] = useState(false);
  const [notifReward, setNotifReward] = useState(false);

  useEffect(()=> {
    getClaims(appId)
  }, [appId])

  const claimActions = (claimIndex) =>{
    setClaimIndex(claimIndex);
    setClaimType(allClaimTypes[claimIndex].claimName);
    setDisplayComparison(allClaimTypes[claimIndex].displayComparison);
  }

  async function getClaims(appId){
    if(appId){
    const claims = await api.getAllClaimsByGameId(appId);
    setAllClaimTypes(claims)
    }
    else{
    const claims = await api.getAllClaims();
    setAllClaimTypes(claims)  
    }
  }

  async function newReward(){
    await api.newReward(appId, {claimType, comparison, comparisonValue, claimMultiple, rewardAmount, notifReward})
    // syncGames()
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
        <Drawer.Title>New Reward</Drawer.Title>
        <Drawer.Actions>
          <Button disabled={!appId} onClick={() => newReward()} appearance="primary">
            Confirm
          </Button>
        </Drawer.Actions>
      </Drawer.Header>
      <Drawer.Body>

      <Form fluid>
        <div style={{paddingBottom: 20}}>
          <p style={{paddingBottom: 4}}>App</p>
          <SelectPicker 
            value={appId} 
            onChange={(appId)=> setAppId(appId)} 
            data={gameList.map(el => {
              return({
                value: el._id,
                label: el.title,
              })
            }) }  
            style={{ width: 224 }} />
        </div>

        <div style={{paddingBottom: 20}}>
          <p style={{paddingBottom: 4}}>Claim Type</p>
          <SelectPicker 
            value={claimIndex} 
            onChange={(claimIndex)=> claimActions(claimIndex)} 
            data={allClaimTypes.map((el,i) => {
              return({
                value: i,
                label: el.claimName,
              })
            }) }  
            style={{ width: 224 }} />
        </div>

        <Divider/>

        { displayComparison &&
          <div>
          <div style={{paddingBottom: 20}}>
            <p style={{paddingBottom: 4}}>Comparison</p>
            <SelectPicker 
              value={comparison} 
              onChange={(comparison)=> setComparison(comparison)} 
              data={Object.keys(COMPARISON_TYPES).map(el => {
                return(COMPARISON_TYPES[el])
              }) }  
              style={{ width: 224 }} />
          </div>
          <div style={{paddingBottom: 20, width: 224}}>
            <p style={{paddingBottom: 4}}>Amount</p>
            <InputGroup>
              <InputGroup.Button onClick={()=> setComparisonValue(parseInt(comparisonValue, 10) - 1)}>-</InputGroup.Button>
              <InputNumber value={comparisonValue} onChange={setComparisonValue} />
              <InputGroup.Button onClick={()=> setComparisonValue(parseInt(comparisonValue, 10) + 1)}>+</InputGroup.Button>
            </InputGroup>
          </div>
          </div>
        }

        <Divider/>

        <div style={{paddingBottom: 20, width: 224}}>
          <p style={{paddingBottom: 4}}>Reward Amount</p>
          <InputGroup>
            <InputGroup.Button onClick={()=> setRewardAmount(parseInt(rewardAmount, 10) - 1)}>-</InputGroup.Button>
            <InputNumber value={rewardAmount} onChange={setRewardAmount} />
            <InputGroup.Button onClick={()=> setRewardAmount(parseInt(rewardAmount, 10) + 1)}>+</InputGroup.Button>
          </InputGroup>
        </div>
        
        <Checkbox 
          checked={notifReward} 
          onChange={()=> setNotifReward(!notifReward)}>
            Notification on reward
        </Checkbox>



      </Form>


      </Drawer.Body>
    </Drawer>
  );
}

export default NewReward;