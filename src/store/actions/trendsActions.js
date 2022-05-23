export const setStartDate = (startDate) => {
	return (dispatch) => {
		dispatch({
      type: 'SET_START_DATE', 
      startDate
    });
	}
};

export const setCountry = (country) => {
	return (dispatch) => {
		dispatch({
      type: 'SET_COUNTRY', 
      country
    });
	}
};

export const setEndDate = (endDate) => {
	return (dispatch) => {
		dispatch({
      type: 'SET_END_DATE', 
      endDate
    });
	}
};

export const setTrendsData = (trendsVal, trendsData) => {
	return (dispatch) => {
		dispatch({
      type: 'SET_TRENDS_DATA', 
      trendsVal,
      trendsData
    });
	}
};

export const setDownloadsData = (downloadsVal, downloadsData) => {
	return (dispatch) => {
		dispatch({
      type: 'SET_DOWNLOADS_DATA', 
      downloadsVal,
      downloadsData
    });
	}
};
