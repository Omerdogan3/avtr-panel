import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import 'rsuite/styles/index.less';

import { Container, Content, Button } from 'rsuite';
import PageHeader from '/src/components/PageHeader';
import ProtectedPage from 'src/components/ProtectedPage';
import api from 'src/api';

import { Nav, Table, Col, Row, Panel, Toggle } from 'rsuite';
import TimeAgo from 'react-timeago'

import ActivityTable from './ActivityTable';
import WithdrawalsTable from './WithdrawalsTable';
import MessagesTable from './MessagesTable';

function UserDetails({id}) {
  const [activeTab, setActiveTab] = useState('activity');
  const [userDetail, setUserDetail] = useState({});
  const [userWithdrawals, setUserWithdrawals] = useState(null);
  const [messagesFromUser, setMessagesFromUser] = useState(null);

  const params = useParams();

  useEffect(() => {
    getUser(params.userId)
  }, [])

  function setActive(value){
    if(value === "withdrawals"){
      getUserWithdrawals()
    }else if(value === "tickets"){
      getMessagesFromUser()
    }
    setActiveTab(value)
  }

  async function getUser(userId){
    const userDetail = await api.getUser(userId)
    setUserDetail(userDetail)
  }

  async function getUserWithdrawals(){
    const userWithdrawals = await api.getUserWithdrawals(params.userId)
    setUserWithdrawals(userWithdrawals)
  }

  async function getMessagesFromUser(){
    const messagesFromUser = await api.getMessagesFromUser(params.userId)
    setMessagesFromUser(messagesFromUser)
  }

  return (
    <Container>
      <ProtectedPage pageId={id}/>
      <PageHeader title="User Details"/>
      <Content style={{paddingLeft: 50, paddingRight: 50, paddingBottom: 100}}>

        <Row>
          <Col md={8} sm={12}>
            <Panel bordered>
              <p>{userDetail.email}</p>
              <p>{userDetail.displayName}</p>
              {userDetail.countryCode && <p>{userDetail.countryCode} - {userDetail.languageCode}</p>}
            </Panel>
          </Col>
          <Col md={8} sm={12}>
            <Panel bordered>
              <p>{userDetail.timeZone}</p>
              <p>{userDetail.model}</p>
              <p>{userDetail.systemVersion}</p>
            </Panel>
          </Col>
          <Col md={8} sm={12}>
            <Panel bordered>
              <p>{userDetail.coins && (userDetail.coins + " coins")} </p>
              {
                userDetail.lastUpdate &&
                <p>Last Active: <TimeAgo date={userDetail.lastUpdate}/></p>
              }
            </Panel>
          </Col>
        </Row>


        <Nav style={{marginTop: 20}} activeKey={activeTab} onSelect={setActive}>
          <Nav.Item eventKey="activity" appearance="tabs">Activity</Nav.Item>
          <Nav.Item eventKey="withdrawals" appearance="tabs"> Withdrawals</Nav.Item>
          <Nav.Item eventKey="tickets" appearance="tabs">Support Tickets</Nav.Item>      
          {
            userDetail.isBlocked ? 
            <p style={{float: 'right'}}>User Blocked!</p>
            :
            Object.keys(userDetail).length > 0 &&
            <Button onClick={()=> {
              if(window.confirm('Are you sure you wish to block this user?')){
                api.blockUser(userDetail._id)
                userDetail["isBlocked"] = true;
                setUserDetail({...userDetail})
              }
            }} color="red" appearance="ghost" style={{float: 'right'}}>Block</Button>   
          }
        </Nav>
        
        {
          activeTab === 'activity' ? 
          <ActivityTable/>
          :
          activeTab === 'tickets' ? 
          <MessagesTable messagesFromUser={messagesFromUser}/>
          :
          <WithdrawalsTable userWithdrawals={userWithdrawals}/>
        }
        

      </Content>


    </Container>
  );
}

export default UserDetails;