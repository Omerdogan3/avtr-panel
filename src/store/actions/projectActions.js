export const getUserProjects = () => {
  return (dispatch, getState, {getFirestore}) => {
    const firestore = getFirestore();
    const authorId = getState().firebase.auth.uid;
    firestore.collection('links').doc(authorId).get().then((data) => {
      if(data.exists){
        dispatch({ type: 'RETRIEVE_LINKS_SUCCESS', data: data.data().project });
      }else{
        dispatch({ type: 'RETRIEVE_LINKS_SUCCESS', data: []});

      }
    }).catch(err => {
      dispatch({ type: 'RETRIEVE_LINKS_ERROR' }, err);
    });
  }
};

export const createProject = (project) => {
  return (dispatch, getState, {getFirestore}) => {
    const firestore = getFirestore();
    const authorId = getState().firebase.auth.uid;
    firestore.collection('links').doc(authorId).set({
      project: project,
      createdAt: new Date()
    }).then(() => {
      dispatch({ type: 'CREATE_PROJECT_SUCCESS' });
    }).catch(err => {
      dispatch({ type: 'CREATE_PROJECT_ERROR' }, err);
    });
  }
};


export const addProject = (project) => {
  return (dispatch, getState, {getFirestore}) => {
    const firestore = getFirestore();
    let data = getState().project.data;
    const authorId = getState().firebase.auth.uid;
    if(data){
      data.push(project)
      firestore.collection('links').doc(authorId).set({
        project: data,
        createdAt: new Date()
      }).then(() => {
        dispatch({ type: 'CREATE_PROJECT_SUCCESS' });
      }).catch(err => {
        dispatch({ type: 'CREATE_PROJECT_ERROR' }, err);
      });
    }else{
      firestore.collection('links').doc(authorId).set({
        project: [project],
        createdAt: new Date()
      }).then(() => {
        dispatch({ type: 'CREATE_PROJECT_SUCCESS' });
      }).catch(err => {
        dispatch({ type: 'CREATE_PROJECT_ERROR' }, err);
      });
    }
  }
};



export const deleteProject = (linkObj) => {
  return (dispatch, getState, {getFirestore}) => {
    const firestore = getFirestore();
    const data = getState().project.data;
    const authorId = getState().firebase.auth.uid;
    firestore.collection('links').doc(authorId).set({
      project: data,
      createdAt: new Date()
    }).then(() => {
      dispatch({ type: 'CREATE_PROJECT_SUCCESS' });
    }).catch(err => {
      dispatch({ type: 'CREATE_PROJECT_ERROR' }, err);
    });
  }
};