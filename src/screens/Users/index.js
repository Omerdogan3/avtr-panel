import React, { useEffect, useState } from 'react';
import {Container, Content, Table, SelectPicker, Button} from 'rsuite';
import PageHeader from 'src/components/PageHeader';
import ProtectedPage from 'src/components/ProtectedPage';
import RegionSelect from 'src/components/RegionSelect';
import {DRAWER_TYPES} from "src/constants"; 
import {Link} from "react-router-dom";
import TimeAgo from 'react-timeago'
import api from 'src/api';
import 'rsuite/styles/index.less';

const {Cell, Column, HeaderCell} = Table;

function Users({id}) {  
  const [isLoading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [lastDate, setLastDate] = useState(null);
  const [hasMore, setHasMore] = useState(false);
  const [regionFilter, setRegionFilter] = useState(null);
  
  useEffect(()=> {
    getUsers(lastDate)
  }, [])
  
  async function getUsersByTimeZone(val,region){
    setLoading(true)
      const userRes = await api.getUsersByTimeZone(region,val?lastDate:null);
      if(users&&val){
        setUsers([...users, ...userRes.users])
      }else{
        setUsers(userRes.users)
      }
      if(!val){setRegionFilter(region)}
      setHasMore(userRes.hasMore)
      setLoading(false)
      setLastDate(userRes.lastDate)
  }

  async function getUsers(){
    setLoading(true)
    const userRes = await api.getUsers(lastDate);
    if(users){
      setUsers([...users, ...userRes.users])
    }else{
      setUsers(userRes.users)
    }
    setHasMore(userRes.hasMore)
    setLoading(false)
    setLastDate(userRes.lastDate)
  }

  return (
    <Container>
      <ProtectedPage
        pageId={id}
      />
      <PageHeader
        displayPlus={false}
        title="Users"/>

      <Content style={{paddingLeft: 40, paddingRight: 40}}>
      <RegionSelect onChange={(country)=>getUsersByTimeZone(false,country)}></RegionSelect>
        <Table
          loading={isLoading}
          rowHeight={60}
          height={500}
          autoHeight={false}
          virtualized
          bordered
          data={users}
          >
            <Column flexGrow={1}>
              <HeaderCell>E-mail</HeaderCell>
              <Cell dataKey="email" />
            </Column>

            <Column flexGrow={1}>
              <HeaderCell>Coins</HeaderCell>
              <Cell dataKey="coins" />
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

                   
            <Column flexGrow={1}>
              <HeaderCell></HeaderCell>
              <Cell>
                {
                  (rowData, index) => {
                    return (
                      <Link to={{pathname: `/users/${rowData._id}`}}>
                        <Button onClick={()=> {}} color="orange" appearance="subtle">Details</Button>
                      </Link>
                    );
                 }
                }
              </Cell>
            </Column>
          </Table>
          <div style={{padding: 10}}>
        { 
          hasMore &&
          <Button onClick={()=>regionFilter? getUsersByTimeZone(true,regionFilter):getUsers()}>
            Load More
          </Button>
        }
      </div>
      </Content>
    </Container>
  );
}

export default Users;