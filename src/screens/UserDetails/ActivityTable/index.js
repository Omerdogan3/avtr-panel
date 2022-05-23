import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import 'rsuite/styles/index.less';
import { Button } from 'rsuite';
import api from 'src/api';
import { Table, Toggle } from 'rsuite';

const {Cell, Column, HeaderCell} = Table;

function ActivityTable() {
  const [events, setEvents] = useState(null);
  const [hasMore, setHasMore] = useState(false);
  const [lastId, setLastId] = useState(null);
  const [onlyRewards, setOnlyRewards] = useState(false);

  const params = useParams();

  useEffect(() => {
    getUserEvents(params.userId)
  }, [])



  async function getUserEvents(userId){
    const eventRes = await api.getUserEvents(userId, lastId)
    if(events){
      setEvents([...events, ...eventRes["events"]])
    }else{
      setEvents(eventRes["events"])
    }
    setHasMore(eventRes["hasMore"])
    setLastId(eventRes["lastId"])
  }

  function calcTotalReward(){
    let totalReward = 0;
    events &&
    events.map(el => {
      if(el.rewardDivider){
        totalReward = totalReward + (el.rewardValue / el.rewardDivider)
      }
    })
    return totalReward.toFixed(2)
  }

  return (
    <div>
      <Table
        loading={!events}
        rowHeight={40}
        virtualized
        bordered
        height={500}
        data={events ? events.filter(el => onlyRewards ? el.rewardValue > 0 : el) : []}>
        
        <Column flexGrow={1}>
          <HeaderCell>Game</HeaderCell>
          <Cell dataKey="title" />
        </Column>
        
        <Column flexGrow={1}>
          <HeaderCell>Event Name</HeaderCell>
          <Cell dataKey="eventName" />
        </Column>

        <Column flexGrow={1}>
          <HeaderCell>Value</HeaderCell>
          <Cell dataKey="eventValue" />
        </Column>

        <Column flexGrow={1}>
          <HeaderCell>Reward (Coin)</HeaderCell>
          <Cell dataKey="rewardValue" />
        </Column>

        <Column flexGrow={1}>
          <HeaderCell>Reward (USD) - {calcTotalReward()}$</HeaderCell>
          <Cell style={{backgroundColor: "rgba(0,0,0,0.3)"}} dataKey="creationTime">
            {
              rowData => {
                return (
                  <span>
                    {rowData.rewardValue && (rowData.rewardValue / rowData.rewardDivider).toFixed(2)}$
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
      </Table>

      <div style={{padding: 10}}>
        {
          hasMore &&
          <Button onClick={()=> getUserEvents(params.userId)}>
            Load More
          </Button>
        }
          <Toggle 
            style={{float: 'right'}}
            value={onlyRewards} 
            checkedChildren="Rewards" unCheckedChildren="All"
            onChange={()=> {setOnlyRewards(!onlyRewards)}}/>
      </div>
    </div>
  );
}

export default ActivityTable;