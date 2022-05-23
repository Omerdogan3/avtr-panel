import React, { useEffect, useState } from 'react';
import {Container, Content, Table, SelectPicker, Button} from 'rsuite';
import PageHeader from 'src/components/PageHeader';
import ProtectedPage from 'src/components/ProtectedPage';
import {DRAWER_TYPES} from "src/constants"; 
import USER_ROLES from "src/constants/userRoles"; 

import api from 'src/api';
import 'rsuite/styles/index.less';

const {Cell, Column, HeaderCell} = Table;

function PanelUsers({id}) {  
  const [isLoading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);

  useEffect(()=> {
    getAllUsers()
  }, [])
  
  async function getAllUsers(){
    setLoading(true)
    const users = await api.getAllUsers();
    setUsers(users)
    setLoading(false)
  }

  async function removeUser(userId){
    setLoading(true)
    await api.removeUser(userId)
    await getAllUsers()
    setLoading(false)
  }

  async function updateUser(userData){
    setLoading(true)
    await api.updateUser(userData)
    await getAllUsers()
    setLoading(false)
  }


  return (
    <Container>
      <ProtectedPage
        pageId={id}
      />
      <PageHeader
        drawerType={DRAWER_TYPES.NEW_USER}
        onSubmit={()=> {
          getAllUsers()
        }}
        displayPlus={true}
        title="Panel Users"/>
      <Content style={{paddingLeft: 40, paddingRight: 40}}>
        <Table
          loading={isLoading}
          rowHeight={60}
          autoHeight={true}
          data={users}>
  
            <Column flexGrow={1}>
              <HeaderCell>E-mail</HeaderCell>
              <Cell dataKey="email" />
            </Column>

            <Column flexGrow={1}>
              <HeaderCell>Role</HeaderCell>
              <Cell>
                {
                  (rowData, index) => {
                    return(
                      <SelectPicker 
                        value={rowData.userRole} 
                        appearance="subtle" 
                        onChange={(userRole)=> {
                          rowData["userRole"] = userRole;
                          updateUser(rowData)
                        }} 
                        data={
                          Object.keys(USER_ROLES).map(el => {
                          return({
                            value: el,
                            label: el[0] + el.slice(1, el.length).toLowerCase(),
                          })
                        }) } style={{width: 240}}  />

                    )
                  }
                }
           
              </Cell>
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
                        removeUser(users[index]._id)
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

export default PanelUsers;