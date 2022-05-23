import React, {useEffect, useState} from 'react';
import 'rsuite/styles/index.less';

import { Container, Content,Table } from 'rsuite';
import PageHeader from '/src/components/PageHeader';
import { useSelector } from 'react-redux'
import ProtectedPage from 'src/components/ProtectedPage';

import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';

import DateSelect from 'src/components/DateSelect';
import RegionSelect from 'src/components/RegionSelect';
import api from 'src/api';
import AnalyticsTable from './AnalyticsTable';
import TrendsGraph from 'src/components/TrendsGraph';
const {Cell, Column, HeaderCell} = Table;

function Analytics({id}) {
const [val,setVal] = useState(false);
const [res,setRes] = useState([]);
const [regionFilter,setRegionFilter] = useState(null);

const country = useSelector(state => state.trendsReducer.country);

  useEffect(()=> {
    syncTrends()
  }, [])

  async function syncTrends(){
    api.getTrends()
   //const res = await api.getDownloadsByGameId();
   const res = await api.getAnalytics();
    setVal(!val)
    setRes(res);
  }

  const handleCountrySelect = (region)=>{
    setRegionFilter(region)
  }

  return (
    <Container>
      <ProtectedPage pageId={id}/>
      <PageHeader title="Analytics" rightComponent={() => 
        <div style={{flexDirection:'row',display:'flex'}}>
      <RegionSelect onChange={(val)=>handleCountrySelect(val)} style={{marginRight:20}}></RegionSelect>
      <DateSelect onSubmit={() => syncTrends()}/>
      </div>
      }/>
      <Content style={{padding: 50}}>
      <AnalyticsTable res={res} val={val}></AnalyticsTable>
      </Content>
    </Container>
  );
}

export default Analytics;