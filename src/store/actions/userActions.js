export const getProfile = () => {
	return (dispatch, getState, {getFirestore}) => {
			const firestore = getFirestore();
			const authorId = getState().firebase.auth.uid;
			firestore.collection('users').doc(authorId).get().then((data) => {
			dispatch({ type: 'RETRIEVE_PROFILE_SUCCESS', data: data.data() });
			}).catch(err => {
			dispatch({ type: 'RETRIEVE_PROFILE_ERROR' }, err);
		});
	}
};


export const getUserData = (displayName) => {
	return (dispatch, getState, {getFirestore}) => {
			const firestore = getFirestore();
			firestore.collection('users').where('displayName', '==' , displayName).get().then((res)=>{
				if(res.docs.length > 0){
					firestore.collection('users').doc(res.docs[0].id).get().then((userData) => {
						firestore.collection('links').doc(res.docs[0].id).get().then((data) => {			
							dispatch({ type: 'RETRIEVE_USERDATA_SUCCESS', data: {links: data.data(), userData: userData.data()}});
						})
					})
				}else{
					dispatch({ type: 'RETRIEVE_USERDATA_ERROR'});

				}
			})
	}
};


export const getUserDataById = (userid) => {
	return (dispatch, getState, {getFirestore}) => {
			const firestore = getFirestore();
			firestore.collection('users').doc(userid).get().then((res)=>{
				dispatch({ type: 'RETRIEVE_USERDATA_SUCCESS', data: res.data()})
			})
}}


export const updateUserData = (userData) => {
	return (dispatch, getState, {getFirestore}) => {
			const firestore = getFirestore();
			const authorId = getState().firebase.auth.uid;
			firestore.collection('users').doc(authorId).update({displayName: userData.displayName}).then((data) => {
				dispatch({ type: 'USERDATA_UPDATE_SUCCESS' });
			}).catch(err => {
				dispatch({ type: 'USERDATA_UPDATE_ERROR' }, err);
		});
	}
};

export const setProfilePic = (url) => {
	return (dispatch, getState, {getFirestore}) => {
			const firestore = getFirestore();
			const authorId = getState().firebase.auth.uid;
			firestore.collection('users').doc(authorId).update({profilePic: url}).then((data) => {
				dispatch({ type: 'PIC_UPDATE_SUCCESS' });
			}).catch(err => {
				dispatch({ type: 'PIC_UPDATE_ERROR' }, err);
		});
	}
};


export const setUserRole = (userRole) => {
	return (dispatch) => {
		dispatch({
      type: 'SET_USER_ROLE', 
      userRole
    });
	}
};
