import React, {useEffect, useMemo, memo, useState} from "react";
import { Container, Content,Table } from 'rsuite';
import {useSelector} from 'react-redux';
import {store} from 'src/store/configureStore';
import moment from "moment";
import _, { compact } from 'lodash';
import {setStartDate} from 'src/store/actions/trendsActions';
import {setEndDate} from 'src/store/actions/trendsActions';

const colors = ["#fa7e1e","#d62976","#962fbf","#4f5bd5","#fa7e1e","#d62976","#962fbf","#4f5bd5",]
const colors2 = ["#474da6","#FF6F69","#d9534f","#005b96","#474da6","#FF6F69","#d9534f","#005b96",]
const {Cell, Column, HeaderCell} = Table;

function AnalyticsTable({val,res}) {
  const startDate = useSelector(state => state.trendsReducer.startDate);
  const endDate = useSelector(state => state.trendsReducer.endDate);
  const gameList = useSelector(state => state.gameReducer.gameList)
  const [response,setResponse] = useState()
  
  useEffect(()=> {
  store.dispatch(setStartDate(moment().subtract(1,'w')))
  store.dispatch(setEndDate(moment()))
  prepareData()
  }, [val,res])

  function prepareData(){
    if(res){
      if(res.analytics){
        setResponse(res.analytics)
      }
    }
  }

return (
<>
<p style={{paddingBottom: 12}}>{Math.abs(moment(startDate).diff(endDate, "days"))} days total</p>
{response&&
    <Table
style={{zIndex:0}}
rowHeight={60}
height={500}
autoHeight={false}
virtualized
bordered
data={response}
>
  <Column flexGrow={1}>
    <HeaderCell>Date</HeaderCell>
    <Cell dataKey="date" />
  </Column>
  <Column flexGrow={1}>
    <HeaderCell>New Users</HeaderCell>
    <Cell dataKey="newuseramount" />
  </Column>
  <Column flexGrow={1}>
    <HeaderCell>Downloads</HeaderCell>
    <Cell dataKey="amount" />
  </Column>
  <Column flexGrow={1}>
    <HeaderCell>Downloads Per User</HeaderCell>
    <Cell dataKey="rate" />
  </Column>
</Table>
}
    </>

  );
}

export default AnalyticsTable;
