export const setGameList = (gameList) => {
	return (dispatch) => {
		dispatch({
      type: 'SET_GAME_LIST', 
      gameList
    });
	}
};
