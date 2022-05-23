import React, {useEffect, useState} from 'react';
import TimeAgo from 'react-timeago'

import 'rsuite/styles/index.less';

import { Container, Content, PanelGroup, Panel, Placeholder, Table } from 'rsuite';
import PageHeader from 'src/components/PageHeader';
import ProtectedPage from 'src/components/ProtectedPage';
import syncGames from 'src/utils/syncGames';
import {useSelector} from 'react-redux'
import {DRAWER_TYPES} from "src/constants"; 
import api from 'src/api';
import {SortableContainer, SortableElement} from 'react-sortable-hoc';
import {arrayMoveImmutable} from 'array-move';

const {Column, HeaderCell, Cell} = Table;

const {Paragraph} = Placeholder;

function SortApps({id}) {
  const [gameOrder, setGameOrder] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [gameRewards, setGameRewards] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState([]);

  // const gameList = useSelector(state => state.gameReducer.gameList)

  useEffect(()=> {
    getGameOrders()

  }, [])

  async function getGameOrders(){
    // burada order'a gore appleri alacagiz.
    const games = await api.getGames("gameOrder");
    setGameOrder(games.games.map(el => {
      return({
        _id: el._id,
        title: el.title
      })
    }))
  }

  const SortableItem = SortableElement(({value}) => {
    return(
      <div style={{padding: 12}}>
        <Panel style={{backgroundColor: "rgba(255,255,255, 0.1)"}} bordered>
          <p style={{fontSize: 17, fontWeight: '500'}}>{value.title}</p>
        </Panel>
      </div>
    )
  });

  const SortableList = SortableContainer(({items}) => {
    return (
      <ul>
        {items.map((value, index) => (
          <SortableItem key={`item-${value}`} index={index} value={value} />
        ))}
      </ul>
    );
  });

  function onSortEnd({oldIndex, newIndex}){
    if(oldIndex !== newIndex){
      const tmpOrders = arrayMoveImmutable(gameOrder, oldIndex, newIndex)
      setGameOrder(tmpOrders)
      api.setGameOrders(tmpOrders.map(el => el._id))
    }
  };

  return (
    <Container >
      <ProtectedPage pageId={id}/>
      <PageHeader 
        displayPlus={false}
        title="Sort Games"/>
      <Content style={{paddingLeft: 40, paddingRight: 40}}>

        <SortableList items={gameOrder} onSortEnd={onSortEnd} />


      </Content>
    </Container>
  );
}

export default SortApps;