import moment from 'moment';

const initState = {
  startDate: moment().subtract(7, "days"),
  endDate: moment(),
  country:"All"
}

const trendsReducer = (state = initState, action) => {
  switch (action.type) {
    case 'SET_START_DATE':
      return {
        ...state,
        startDate: action.startDate
      }    

    case 'SET_END_DATE':
      return {
        ...state,
        endDate: action.endDate
      }   
      case 'SET_COUNTRY':
        return {
          ...state,
          country: action.country
        }    
      case 'SET_TRENDS_DATA':
      return {
        ...state,
        [action.trendsVal]: action.trendsData
      }    
      case 'SET_DOWNLOADS_DATA':
        return {
          ...state,
          [action.downloadsVal]: action.downloadsData
        }    
    default:
      return state;
  }
};



export default trendsReducer;