const initState = {}

const projectReducer = (state = initState, action) => {
  switch (action.type) {
    case 'CREATE_PROJECT_SUCCESS':
      console.log('create project success');
      return state;
    case 'CREATE_PROJECT_ERROR':
      console.log('create project error');
      return state;
    case 'DELETE_PROJECT_SUCCESS':
      console.log('delete project success');
      return state;
    case 'DELETE_PROJECT_ERROR':
      console.log('delete project error');
      return state;
    case 'RETRIEVE_LINKS_SUCCESS':
      return {
        ...state,
        data: action.data
      }
    case 'RETRIEVE_LINKS_ERROR':
      console.log('retrieve links error')
      return state
    default:
      return state;
  }
};

export default projectReducer;