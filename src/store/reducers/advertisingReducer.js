const initState = {}
  
  const advertisingReducer = (state = initState, action) => {
    switch(action.type){
      case 'PUBLISH_ADVERTISING_SUCCESS':
        return state
      
      case 'RETRIEVE_ADVERTISING_SUCCESS':
        return {
          ...state,
          data: action.data
        }
      
      case 'RETRIEVE_ADVERTISING_ERROR':
        return state
  
      case 'RETRIEVE_ADVERTISING_DETAIL_SUCCESS':
        return {
          ...state, 
          advertisingDetail: action.advertisingDetail
        }

      case 'RETRIEVE_ADVERTISING_USERNAME_SUCCESS':
        return {
          ...state,
          userAdvertising: action.userAdvertising
        }

      case 'SET_SUBJECTS_SUCCESS':
        return state
      
      case 'SET_SUBJECTS_ERROR':
        return state

      case 'SET_BUSYTIMES_SUCCESS':
        return state

      case 'SET_BUSYTIMES_ERROR':
        return state

      default:
        return state
    }
  };
  
  export default advertisingReducer;