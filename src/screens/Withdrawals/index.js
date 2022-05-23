import React, { useEffect, useState } from 'react';
import {Container, Content, Table, Button} from 'rsuite';
import PageHeader from 'src/components/PageHeader';
import ProtectedPage from 'src/components/ProtectedPage';
import {Link} from "react-router-dom";
import TimeAgo from 'react-timeago'
import ReactExport from "react-export-excel";

import api from 'src/api';
import 'rsuite/styles/index.less';

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

const {Cell, Column, HeaderCell} = Table;

function Withdrawals({id}) {
  const [paymentStatus, setPaymentStatus] = useState("PENDING");

  const [lastId, setLastId] = useState(null);
  const [hasMore, setHasMore] = useState(false);

  const [isLoading, setLoading] = useState(false);
  const [withdrawals, setWithdrawals] = useState([]);

  useEffect(()=> {
    getLastWithdrawals()
  }, [])
  
  async function getLastWithdrawals(){
    setLoading(true)
    const lastWithdrawals = await api.getLastWithdrawals(lastId);
    setHasMore(lastWithdrawals.hasMore)
    setLastId(lastWithdrawals.lastId)
    setWithdrawals([...lastWithdrawals.withdrawals, ...withdrawals])
    setLoading(false)
  }


  const dataSet1 = [
    {
      "amount": 2,
      "name": "omer dogan",
      "email": "omerdogan3@gmail.com",
      "message": "361 Ventures",
      "from": "361 Ventures"
    },
  ];

  async function payWithdrawals(){
    await api.payWithdrawals(withdrawals.map(el=> el._id))
    window.location.reload();
  }
  async function removeWithdrawal(id){
    await api.removeWithdrawal(id)
    window.location.reload();
  }

  return (
    <Container>
      <ProtectedPage
        pageId={id}
      />
      <PageHeader
        displayPlus={false}
        title="Withdrawals"/>
      <Content style={{paddingLeft: 40, paddingRight: 40}}>
        <div style={{padding: 10}}>
          <ExcelFile 
            element={
            <Button onClick={()=> {
              payWithdrawals()
            }}>
                Download Data
            </Button>
            }>

            <ExcelSheet data={
              withdrawals.filter((el)=> el.paymentStatus === "PENDING").map((el)=> {
                return({
                  amount: el.amount,
                  name: el.userData.displayName,
                  email: el.userData.email,
                  message: "Playhub, thank you message",
                  from: "Playhub Mobile"
                })
              })
            } name="Order">
              <ExcelColumn label="Amount" value="amount"/>
              <ExcelColumn label="Name" value="name"/>
              <ExcelColumn label="Email" value="email"/>
              <ExcelColumn label="Message" value="message"/>
              <ExcelColumn label="From" value="from"/>
            </ExcelSheet>
          </ExcelFile>
        </div>

        <Table
          loading={isLoading}
          rowHeight={60}
          autoHeight={true}
          data={withdrawals}>
  
            <Column flexGrow={1}>
              <HeaderCell>E-mail</HeaderCell>
              <Cell dataKey="amount">
                {
                  rowData => {
                    return (
                      <span>
                        <p>{rowData.userData.email}</p>
                      </span>
                    );
                  }
                }
              </Cell>
            </Column>

            <Column flexGrow={1}>
              <HeaderCell>Amount</HeaderCell>
              <Cell dataKey="amount">
                {
                  rowData => {
                    return (
                      <span>
                        <p>{rowData.amount}$</p>
                      </span>
                    );
                  }
                }
              </Cell>
            </Column>


            <Column flexGrow={1}>
              <HeaderCell>Payment Status</HeaderCell>
              <Cell>
                {
                  rowData => {
                    return (
                      <span>
                        <p>{rowData.paymentStatus}</p>
                      </span>
                    );
                  }
                }
              </Cell>
            </Column>

            <Column flexGrow={1}>
              <HeaderCell>Payment Type</HeaderCell>
              <Cell>
                {
                  rowData => {
                    return (
                      <span>
                        <p>{rowData.payment_type}</p>
                      </span>
                    );
                  }
                }
              </Cell>
            </Column>

            <Column flexGrow={1}>
              <HeaderCell>Creation Time</HeaderCell>
              <Cell dataKey="creationTime">
                {
                  rowData => {
                    return (
                      <span>
                        <TimeAgo date={rowData.creationTime}/>
                      </span>
                    );
                  }
                }
              </Cell>
            </Column>
                   
            <Column flexGrow={1}>
              <HeaderCell>Details</HeaderCell>
              <Cell>
                {
                  (rowData, index) => {
                    return (
                      <Link to={{pathname: `/users/${rowData.uid}`}}>
                        <Button onClick={()=> {}} color="orange" appearance="subtle">Details</Button>
                      </Link>
                    );
                 }
                }
              </Cell>
            </Column>
            <Column flexGrow={1}>
              <HeaderCell>Remove</HeaderCell>
              <Cell>
                {
                  (rowData, index) => {
                    return (
                      <Button onClick={()=> removeWithdrawal(rowData._id)} color="red" appearance="subtle">Remove</Button>
                    );
                 }
                }
              </Cell>
            </Column>

          </Table>


        <div style={{padding: 10}}>
          {
            hasMore &&
            <Button onClick={()=> getLastWithdrawals()}>
              Load More
            </Button>
          }
        </div>

      </Content>
    </Container>
  );
}

export default Withdrawals;