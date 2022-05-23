import React, {useEffect, useState} from 'react';
import TimeAgo from 'react-timeago'

import 'rsuite/styles/index.less';

import { Container, Content, PanelGroup, Panel, Placeholder, Table, Checkbox } from 'rsuite';
import PageHeader from 'src/components/PageHeader';
import ProtectedPage from 'src/components/ProtectedPage';
import EditReward from './EditReward';
import syncGames from 'src/utils/syncGames';
import {useSelector} from 'react-redux'
import {DRAWER_TYPES} from "src/constants"; 
import api from 'src/api';
const {Column, HeaderCell, Cell} = Table;

function Rewards({id}) {
  const [isLoading, setIsLoading] = useState(false);
  const [gameRewards, setGameRewards] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [open, setOpen] = useState(false);
  const [rewardId, setRewardId] = useState(null);

  const gameList = useSelector(state => state.gameReducer.gameList)

  useEffect(()=> {
    syncGames()
  }, [])

  async function getRewards(appId){
    setIsLoading(true)
    const gameRewards = await api.getRewards(appId)
    setGameRewards(gameRewards)
    setIsLoading(false)
  }

  async function removeReward(rewardId){
    setIsLoading(true)
    await api.removeReward(rewardId)
    getRewards(gameList[selectedIndex]._id)
    setIsLoading(false)
  }

  async function moveUpReward(rewardId){
    setIsLoading(true)
    await api.moveUpReward(rewardId)
    getRewards(gameList[selectedIndex]._id)
    setIsLoading(false)
  }
  const editReward = (id)=>{
    setOpen(true)
    setRewardId(id)
  }
 
  return (
    <Container >
      <ProtectedPage pageId={id}/>
      <EditReward
          rewardId={rewardId}
          open={open}
          onSubmit={()=>getRewards(gameList[selectedIndex]._id)}
          setOpen={setOpen}
        />
      <PageHeader 
        displayPlus={true}
        onSubmit={()=> getRewards(gameList[selectedIndex]._id)}
        drawerType={DRAWER_TYPES.NEW_REWARD}
        title="Rewards"/>
      <Content style={{paddingLeft: 40, paddingRight: 40}}>

        <PanelGroup onSelect={(index)=> {
          setSelectedIndex(index)
          setGameRewards([])
          getRewards(gameList[index]._id)
        }} accordion bordered>
          {
            gameList.map((game, index)=> {
              return(
                <Panel 
                  shaded 
                  header={
                    <div style={{display: "flex", flexDirection: "row", alignItems: "center"}}>
                      <img style={{width: 40, height: 40, borderRadius: 8}} src={game.thumbnail}/>
                      <div style={{paddingLeft: 8}}>
                        <p style={{fontWeight: "600", fontSize: 15}}>{game.title}</p>
                        <p style={{fontWeight: "600", fontSize: 12}}>Total: {game.totalRewards} coins.</p>
                      </div>
                    </div>
                  }
                  eventKey={index} 
                  id={game._id}>
                
                  <Table
                    // height={400}
                    loading={isLoading}
                    rowHeight={40}
                    data={gameRewards}>
  
                  <Column flexGrow={1}>
                    <HeaderCell>Claim Type</HeaderCell>
                    <Cell dataKey="claimType" />
                  </Column>

                  <Column flexGrow={1}>
                    <HeaderCell>Comparison</HeaderCell>
                    <Cell dataKey="comparison" />
                  </Column>

                  <Column flexGrow={1}>
                    <HeaderCell>Comparison Value</HeaderCell>
                    <Cell dataKey="comparisonValue" />
                  </Column>

                  <Column flexGrow={1}>
                    <HeaderCell>Reward Notification</HeaderCell>
                    <Cell dataKey="notifReward">
                      {
                        rowData => {
                          return (
                            <span>
                              <Checkbox checked={rowData.notifReward} readOnly></Checkbox>
                            </span>
                          );
                        }
                      }
                    </Cell>
                  </Column>


                  <Column flexGrow={1}>
                    <HeaderCell>Reward Amount</HeaderCell>
                    <Cell dataKey="rewardAmount" />
                  </Column>


                  <Column flexGrow={1}>
                    <HeaderCell>Last Update</HeaderCell>
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
            
                  <Column flexGrow={1} fixed="right">
                    <HeaderCell>Action</HeaderCell>

                    <Cell>
                      {rowData => {
                        function handleAction() {
                          alert(`id:${rowData.id}`);
                        }
                        return (
                          <span>
                            <a onClick={()=> editReward(rowData._id)}> 
                              Edit
                            </a>
                            <a> | </a>
                            <a onClick={()=> moveUpReward(rowData._id)}> 
                              Move Top
                            </a>
                            <a> | </a>
                            <a onClick={()=> window.confirm('Are you sure you wish to delete this item?') && removeReward(rowData._id)}> 
                            Remove 
                            </a>
                          </span>
                        );
                      }}
                    </Cell>
                  </Column>
                </Table>
              </Panel>
            )
          })
        }
        </PanelGroup>
      </Content>
    </Container>
  );
}

export default Rewards;