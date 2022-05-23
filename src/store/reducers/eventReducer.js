const initState = {}
  
  const eventReducer = (state = initState, action) => {
    switch(action.type){
      case 'INSERT_EVENT_SUCCESS':
        return state
      
      case 'INSERT_EVENT_ERROR':
        return state
    
      case 'RETRIEVE_MY_EVENTS_SUCCESS':
        return {
          ...state,
          data: action.data
        }
      
      case 'RETRIEVE_USER_EVENTS_SUCCESS':
        return {
          ...state,
          userEvents: action.data
        }
      
      case 'RETRIEVE_USER_EVENTS_ERROR':
        return {
          ...state,
          error: "User is not exist"
        }

      case 'RETRIEVE_EVENT_BY_ID_SUCCESS':
        return {
          ...state,
          data: action.data
        }

      case 'REMOVE_BUSYDAY_SUCCESS':
        return state

      case 'INSERT_BUSYDAY_SUCCESS':
        console.log('INSERT_BUSYDAY_SUCCESS')
        return state

      default:
        return state
    }
  };
  
  export default eventReducer;