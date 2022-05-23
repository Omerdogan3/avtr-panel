import React from 'react';
import 'rsuite/styles/index.less';

import { Table, Button } from 'rsuite';
import TimeAgo from 'react-timeago'

const {Cell, Column, HeaderCell} = Table;


function MessagesTable({messagesFromUser}) {
  return (
    <div>
      <Table
        loading={!messagesFromUser}
        rowHeight={60}
        virtualized
        bordered
        height={500}
        data={messagesFromUser ? messagesFromUser : []}>
        
     
        <Column flexGrow={5}>
          <HeaderCell>Snippet</HeaderCell>
          <Cell dataKey="snippet" />
        </Column>

      

        <Column flexGrow={2}>
          <HeaderCell>Message Time</HeaderCell>
          <Cell dataKey="creationTime"></Cell>
        </Column>


        <Column flexGrow={1}>
          <HeaderCell></HeaderCell>
          <Cell dataKey="creationTime">
            {
              rowData => {
                return (
                  <Button onClick={()=> window.open("https://mail.google.com/mail/u/3/#inbox/" + rowData.threadId, "_blank")} appearance="ghost">Display</Button>
              
                );
              }
            }
          </Cell>
        </Column>

    
        
      </Table>
    </div>
  );
}

export default MessagesTable;