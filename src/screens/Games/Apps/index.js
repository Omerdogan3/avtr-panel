import React, { useEffect } from 'react';
import {Container, Content, FlexboxGrid, Row} from 'rsuite';
import PageHeader from 'src/components/PageHeader';

import {Grid} from 'rsuite';
import {useSelector} from 'react-redux'
import GameObj from 'src/screens/Games/Apps/components/GameObj';
import ProtectedPage from 'src/components/ProtectedPage';
import syncGames from 'src/utils/syncGames';
import _ from 'lodash';
import {DRAWER_TYPES} from "src/constants"; 

import 'rsuite/styles/index.less';

function Apps({id}) {
  const gameList = useSelector(state => state.gameReducer.gameList)

  useEffect(() => {
    syncGames()
  }, [])

  return (
    <Container>
      <ProtectedPage
        pageId={id}
      />
      <PageHeader
        displayPlus={true}
        drawerType={DRAWER_TYPES.NEW_GAME}
        title="Apps"/>
      <Content>
        <Grid fluid>
          {
            _.chunk(gameList, 3).map((gameChunk, index)=> {
                return(
                  <Row>
                    {
                      gameChunk.map((game, index)=> {
                        return(
                          <GameObj
                            key={index}
                            appId={game._id}
                            title={game.title}
                            isActive={game.isActive}
                            thumbnail={game.thumbnail}
                            platform={game.platform}
                          />
                        )
                      })
                   
                   
                    }

                  </Row>
                )
              
          
            })
          }
        </Grid>
      </Content>
    </Container>
  );
}

export default Apps;