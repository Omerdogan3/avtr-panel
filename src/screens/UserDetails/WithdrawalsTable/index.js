import React from 'react';
import 'rsuite/styles/index.less';

import { Table, Button } from 'rsuite';
import TimeAgo from 'react-timeago'

const {Cell, Column, HeaderCell} = Table;


function WithdrawalsTable({userWithdrawals}) {
  
  function calcTotalwithdraw(){
    let totalReward = 0;
    userWithdrawals &&
    userWithdrawals.map(el => {
      totalReward = totalReward + (el.amount)
    })
    return totalReward
  }

  return (
    <div>
      <Table
        loading={!userWithdrawals}
        rowHeight={60}
        virtualized
        bordered
        height={500}
        data={userWithdrawals ? userWithdrawals : []}>
        
     
        <Column flexGrow={1}>
          <HeaderCell>Payment Tyoe</HeaderCell>
          <Cell dataKey="payment_type" />
        </Column>

        <Column flexGrow={1}>
          <HeaderCell>Withdrawal Limit (USD)</HeaderCell>
          <Cell dataKey="withdrawalLimit">
            {
              rowData => {
                return (
                  <span>
                    {rowData.withdrawalLimit}$
                  </span>
                );
              }
            }
          </Cell>
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
          <HeaderCell>Payment Status</HeaderCell>
          <Cell dataKey="paymentStatus" />
        </Column>

        <Column flexGrow={1}>
          <HeaderCell>Amount (USD) - {calcTotalwithdraw()}$</HeaderCell>
          <Cell style={{backgroundColor: "rgba(0,0,0,0.3)"}} dataKey="amount">
            {
              rowData => {
                return (
                  <span>
                    {rowData.amount}$
                  </span>
                );
              }
            }
          </Cell>
        </Column>

        <Column flexGrow={1}>
          <HeaderCell>Activity Time</HeaderCell>
          <Cell dataKey="creationTime"></Cell>
        </Column>

        <Column flexGrow={1}>
          <HeaderCell>Activity</HeaderCell>
          <Cell>
            {
              rowData => {
                return (
                  rowData.paymentStatus === "PENDING" &&
                  <Button onClick={()=> alert("Make payment")} appearance="ghost">Pay</Button>
                );
              }
            }
          </Cell>
        </Column>
        
      </Table>
    </div>
  );
}

export default WithdrawalsTable;