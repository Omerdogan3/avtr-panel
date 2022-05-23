const initState = {
  userRole: null
}

const userReducer = (state = initState, action) => {
  switch (action.type) {
    case 'RETRIEVE_PROFILE_SUCCESS':
      return {
        ...state,
        data: action.data
      }    
    
    case 'RETRIEVE_PROFILE_ERROR':
      return state;
    
    case 'RETRIEVE_USERDATA_SUCCESS':
      return {
        ...state,
        data: action.data
      }  
    

      case 'SET_USER_ROLE':
        return {
          ...state,
          userRole: action.userRole
        }

    case 'RETRIEVE_USERDATA_ERROR':
      return {
        ...state, 
        error: "User is not exist"
      }

    case 'PIC_UPDATE_SUCCESS':
      console.log('profile pic success');
      return state;

    case 'PIC_UPDATE_ERROR':
      console.log('profile pic error');
      return state;

    case 'USERDATA_UPDATE_SUCCESS':
      console.log('userdata update success');
      return state;
    
      

    default:
      return state;
  }
};



export default userReducer;