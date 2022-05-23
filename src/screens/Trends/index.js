import React, {useEffect, useState} from 'react';
import 'rsuite/styles/index.less';

import { Container, Content } from 'rsuite';
import PageHeader from '/src/components/PageHeader';
import { useFirebase, isLoaded, isEmpty } from 'react-redux-firebase'
import {BrowserRouter as Router, Route, Routes, Navigate} from "react-router-dom";
import { useSelector } from 'react-redux'
import ProtectedPage from 'src/components/ProtectedPage';

import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import { DateRangePicker } from 'react-dates';

import moment from 'moment';
import DateSelect from 'src/components/DateSelect';
import RegionSelect from 'src/components/RegionSelect';
import api from 'src/api';

import TrendsGraph from 'src/components/TrendsGraph';

function Trends({id}) {
const [val,setVal] = useState(false);
const [loading,setLoading] = useState(false);
const [trends,setTrends] = useState([]);
const [res,setRes] = useState([]);

  useEffect(()=> {
    syncTrends()
  }, [])

  async function syncTrends(){
    setLoading(true)
    const trends = await api.getTrends()
    const res = await api.getDownloadsByGameId();
    setTrends(trends)
    setRes(res)
    setVal(!val)
    setLoading(false)
  }

  return (
    <Container>
      <ProtectedPage pageId={id}/>
      <PageHeader title="Trends" rightComponent={() => 
        <div style={{flexDirection:'row',display:'flex'}}>
      <RegionSelect style={{marginRight:20}}></RegionSelect>
      <DateSelect onSubmit={() => syncTrends()}/>
      </div>
      }/>
      <Content style={{padding: 50}}>
        <TrendsGraph width={400} height={200} trends={trends} res={res} loading={loading} val={val}/>
      </Content>
    </Container>
  );
}

export default Trends;




/**
 * 

 */