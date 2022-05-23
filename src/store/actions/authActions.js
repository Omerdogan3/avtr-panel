export const signIn = (credentials) => {
  return (dispatch, getState, {getFirebase}) => {
    const firebase = getFirebase();
    
    firebase.auth().signInWithEmailAndPassword(
      credentials.email,
      credentials.password
    ).then(() => {
      dispatch({ type: 'LOGIN_SUCCESS', data: credentials.userType });
    }).catch((err) => {
      dispatch({ type: 'LOGIN_ERROR', err });
    });
  }
}

export const signOut = () => {
  return (dispatch, getState, {getFirebase}) => {
    const firebase = getFirebase();

    firebase.auth().signOut().then(() => {
      dispatch({ type: 'SIGNOUT_SUCCESS' })
    });
  }
}

export const signUp = (newUser) => {
  return (dispatch, getState, {getFirebase, getFirestore}) => {
    const firebase = getFirebase();
    const firestore = getFirestore();
    firestore.collection('users').where('displayName', '==' ,newUser.username).get().then((res)=>{
      if(res.size === 0){
        firebase.auth().createUserWithEmailAndPassword(
          newUser.email, 
          newUser.password
        ).then(resp => {
          return firestore.collection('users').doc(resp.user.uid).set({
            displayName: newUser.username
          })
        }).then((userData)=>{
          firestore.collection('links').doc(userData).set({
            project: []
          }).then(()=>{
            dispatch({ type: 'SIGNUP_SUCCESS' })
          })
        })
      }else{
        const err = {
          code: "auth/email-already-in-use",
          message: "The username is already in use by another account."
        }
        dispatch({ type: 'SIGNUP_ERROR', err});
      }
    }).catch((err) => {
      dispatch({ type: 'SIGNUP_ERROR', err});
    });
  }
}