import React, { useEffect, useState } from 'react';
import {Container, Content, Table,Avatar, SelectPicker, Button, IconButton} from 'rsuite';
import PageHeader from 'src/components/PageHeader';
import ProtectedPage from 'src/components/ProtectedPage';
import {DRAWER_TYPES} from "src/constants"; 
import {useSelector} from 'react-redux'
import CloseIcon from '@rsuite/icons/Close';

import api from 'src/api';
import 'rsuite/styles/index.less';

const {Cell, Column, HeaderCell} = Table;

function ClaimTypes({id}) {  
  const [isLoading, setLoading] = useState(false);
  const [claims, setClaims] = useState([]);
  const gameList = useSelector(state => state.gameReducer.gameList)

  useEffect(()=> {
    getAllClaims()
  }, [])

  async function updateSupportedGame(action,claimId,gameId){
    setLoading(true)
    api.updateClaim({"action":action,"claimId":claimId,"gameId":gameId})
    setLoading(false)
    window.location.reload();
  }  

  async function getAllClaims(){
    setLoading(true)
    const claims = await api.getAllClaims();
    setClaims(claims)
    setLoading(false)
  }

  async function removeClaim(claimId){
    setLoading(true)
    await api.removeClaim(claimId)
    await getAllClaims()
    setLoading(false)
  }

  return (
    <Container>
      <ProtectedPage
        pageId={id}
      />
      <PageHeader
        drawerType={DRAWER_TYPES.NEW_CLAIM}
        onSubmit={()=> {
            getAllClaims()
        }}
        displayPlus={true}
        title="Claim Types"/>
      <Content style={{paddingLeft: 40, paddingRight: 40}}>
        <Table
          loading={isLoading}
          rowHeight={60}
          autoHeight={true}
          data={claims}>
  
            <Column flexGrow={1}>
              <HeaderCell>Claim Name</HeaderCell>
              <Cell dataKey="claimName" />
            </Column>
            <Column flexGrow={2}>
            <HeaderCell>Games</HeaderCell>
              <Cell>
                {
                  (rowData, index) => {
                    return(
                      <SelectPicker  
                        value={rowData.supportedGames} 
                        placeholder={
                        rowData.supportedGames.map((el,i) => {
                            return(
                              gameList.filter(element => element._id === el).map(el=>{
                                return(
                              <div style={{display:'inline-block',border:'1px solid #333',borderRadius:5}}>
                                <Avatar size="xs" src={el.thumbnail} alt={el.label}/>
                                <IconButton onClick={()=> {
                                updateSupportedGame("delete",rowData._id,rowData.supportedGames[i])
                                  }}  icon={<CloseIcon />} circle size="xs"/>
                              </div>
                              )})
                           )
                          })
                        }
                        onChange={(supportedGames)=> {
                          rowData["supportedGames"] = supportedGames;
                          updateSupportedGame("add",rowData._id,supportedGames)
                        }} 
                        
                        renderMenuItem={(label,item)=>{
                          return(
                            <div style={{display:'flex',alignItems:'center'}}>
                            <Avatar style={{marginRight:10}} src={item.children} alt={item.label}/> {item.label}
                          </div>
                          )
                        }}
                        data={
                          gameList.map(el => {
                          return(
                            {
                              value: el._id,
                              label: el.title,
                              children: el.thumbnail
                            }
                         )
                        }) } style={{width: '90%'}}  />
                    )
                  }
                }
           
              </Cell>
            </Column>
            <Column flexGrow={1}>
              <HeaderCell>Claim Message</HeaderCell>
              <Cell dataKey="claimMessage" />
            </Column>
            <Column flexGrow={1}>
              <HeaderCell>Claim Notif Message</HeaderCell>
              <Cell dataKey="claimNotifMessage" />
            </Column>
            <Column flexGrow={1}>
              <HeaderCell>Display Comparison</HeaderCell>
              <Cell>{rowData => JSON.stringify(rowData.displayComparison)}</Cell>
            </Column>
            <Column flexGrow={1}>
              <HeaderCell>Last Update</HeaderCell>
              <Cell dataKey="lastUpdate"/>
            </Column>
            
            <Column flexGrow={1}>
              <HeaderCell>Action</HeaderCell>

              <Cell>
                {
                  (rowData, index) => {
                    return (
                      <Button onClick={()=> {
                        removeClaim(claims[index]._id)
                      }} color="red" appearance="subtle">Remove</Button>
                    );
                 }
                }
              </Cell>
            </Column>
          </Table>

      </Content>
    </Container>
  );
}

export default ClaimTypes;