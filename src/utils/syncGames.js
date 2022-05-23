
import api from 'src/api';
import {setGameList} from 'src/store/actions/gameActions';
import {store} from 'src/store/configureStore';

async function syncGames() {
  const games = await api.getGames("lastUpdate")
  if(games.status){
    store.dispatch(setGameList(games.games))
    return games.games
  }
}

export default syncGames;