import React, {useEffect, useMemo, memo, useState} from "react";
import {useSelector} from 'react-redux';
import {store} from 'src/store/configureStore';
import TrendChart from './TrendChart';
import moment from "moment";
import _, { compact } from 'lodash';
import {setStartDate} from 'src/store/actions/trendsActions';
import {setEndDate} from 'src/store/actions/trendsActions';
import { Loader } from "rsuite";
const colors = ["#fa7e1e","#d62976","#962fbf","#4f5bd5","#fa7e1e","#d62976","#962fbf","#4f5bd5","#52bf90","#FF6F69","#800080","#005b96",]
const colors2 = ["#474da6","#02a9f7","#ff0000","#ffc100","#52bf90","#FF6F69","#800080","#005b96","#fa7e1e","#d62976","#962fbf","#4f5bd5",]

function TrendsGraph({trends,res,val,loading}) {
  const startDate = useSelector(state => state.trendsReducer.startDate);
  const endDate = useSelector(state => state.trendsReducer.endDate);
  const gameList = useSelector(state => state.gameReducer.gameList)
  const [data,setData] = useState([]);
  const [gamedata,setGameData] = useState([]);
  const [totaldownloads,setDownloads] = useState(0);
  const [newusers,setNewUsers] = useState(0);

  useEffect(()=> {
  store.dispatch(setStartDate(moment().subtract(1,'w')))
  store.dispatch(setEndDate(moment()))
  prepareData()
  prepareData2()
  }, [trends,res,val])


  function arrayToObject (arr) {
    return arr.reduce((obj, item) => {
      const key = Object.keys(item)[0]
      obj[key] = item[key]
      return obj
    }, {})
  }
  function prepareData(){
    const {trendsReducer} = store.getState();
    var totaldownloads=0;
    
    if(trendsReducer["downloads"]){
      trendsReducer["downloads"].map((item)=>{
        totaldownloads+=item.amount
      })
      setDownloads(totaldownloads)
    }
    var totalnewUsers=0;
    if(trendsReducer["newUsers"]){
      trendsReducer["newUsers"].map((item)=>{
        totalnewUsers+=item.amount
      })
      setNewUsers(totalnewUsers)
    }

    let keyArr = ["newUsers", "adDisplay", "referalUsers", "downloads"]
    var obj = [];
    if(trendsReducer){
    try{
      keyArr.map((el,i)=>(
      obj[i]={
        "label":keyArr[i],
        "data": arrayToObject(trendsReducer[el].map((a,i)=>({[a.date]:a.amount})).sort(function(a, b){return a < b})),
        "backgroundColor":colors[i]
        }
      ))
      }
      catch{
        alert("ERR:ChartErr")
      }
      setData(obj);
    }
  }

  function prepareData2(){
    const {trendsReducer} = store.getState();
    if(trendsReducer["downloadsbyid"])
    {
    var gameArr=[];
    var dateArr=[];
    var newDateArr=[];
    let tmpArr = [];
    let gameDownloadArr = [];
    let gameNames = [];
    const resArr = trendsReducer["downloadsbyid"];

    gameList.map((item,i)=>{
      gameNames[item._id]=item.appId.replace('com.',"").replace('venture361.',"")
    }) 
    //created gameNames arr [gameId:gameNames,gameId2:gameNames2]
    resArr.map((el,i)=>(
      gameArr.push(el.gameId),
      dateArr.push(el.creationTime) 
    ))
    let uniqueGameIds = gameArr.filter((item, i, ar) => ar.indexOf(item) === i);
    let uniqueDates = dateArr.filter((item, i, ar) => ar.indexOf(item) === i).sort(function(a, b){return a < b});
    
    uniqueDates.map((el)=>{
      newDateArr.push({[el]:0}) 
    })
    
    //created uniqueGameIds array 
    resArr && resArr.map((o, i) => {
      const existing = tmpArr.find(e => e.gameId == o.gameId);
      if (existing ) {
        existing.data.push(o.creationTime);
      }
      else {
      tmpArr.push({gameId:o.gameId,data:[o.creationTime]});
      }
    })
    //created tmpArr bygameId {gameId:gameId,data:["2022-04-12","2022-04-13"]}
   
    tmpArr.map((el,i)=>{
      el.data = (el.data.reduce((cnt, cur) => (cnt[cur] = cnt[cur] + 1 || 1, cnt), {}))
   })
    //updated tmpArr {gameId:gameId,data:[{"2022-04-12":1,"2022-04-13":1}]}
    gameDownloadArr[0]={
      "label":"init",
      "data":arrayToObject(newDateArr),
      "backgroundColor":"transparent"  //uses gameName as a variable, must defined at the top
    }
    try{
    uniqueGameIds.map((el,i)=>(
        gameDownloadArr[i+1]={
          "label":gameNames[tmpArr[i].gameId],
          "data":tmpArr[i].data,
          "backgroundColor":colors2[i]
        }
      ))
    }
    catch{
      alert("ERR:ChartErr")
    }
    //gameDownloadArr formatted for chartjs2 {label:gamename,data:({date:amount,date2:amount2}),backgro..}
    setGameData(gameDownloadArr);
    }
  }
  
return (
<>
{loading?
 <Loader backdrop content="loading..." vertical />
  :
  <>
<div style={{display:"flex",flexDirection:'row',justifyContent:'space-between'}}>
      <div style={{width:'48%',padding:20,border:"1px solid #222",}}>
      Total New Users : {newusers}
      </div>
      <div style={{width:'48%',padding:20,border:"1px solid #222",}}>
      Total Downloads : {totaldownloads}
      </div>
    </div>
<p style={{paddingBottom: 12,paddingTop:12}}>{Math.abs(moment(startDate).diff(endDate, "days"))} days total</p>
<div style={{display:"flex",flexDirection:'row',justifyContent:'space-between'}}>
      <div style={{width:'48%',border:"1px solid #222",}}>
      <TrendChart
        title="User Events"
        data={data}
      />
      </div>
      <div style={{width:'48%',border:"1px solid #222",}}>
      <TrendChart
        title="Game Downloads"
        data={gamedata}
      />
      </div>
    </div>
    </>
}
    </>

  );
}

export default TrendsGraph;