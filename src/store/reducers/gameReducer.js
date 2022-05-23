const initState = {
  gameList: []
}

const gameReducer = (state=initState, action) => {
  switch (action.type) {
    case 'SET_GAME_LIST':
      return {
        ...state,
        gameList: action.gameList
      }    
    default:
      return state;
  }
};



export default gameReducer;