export const publishAdvertising = (advertisingData) => {
	return (dispatch, getState, {getFirestore}) => {
		const firestore = getFirestore();
		const authorId = getState().firebase.auth.uid;
		const ref = firestore.collection('advertising').doc(authorId)
		ref.set(advertisingData).then(() => {				
			dispatch({ type: 'PUBLISH_ADVERTISING_SUCCESS'});
		}).catch(err => {
			dispatch({ type: 'PUBLISH_ADVERTISING_ERROR' }, err);
		});
	}
};

export const retrieveAdvertising = () => {
	return (dispatch, getState, {getFirestore}) => {
		const firestore = getFirestore();
		const authorId = getState().firebase.auth.uid;
		firestore.collection('advertising').doc(authorId).get().then((data) => {
			dispatch({ type: 'RETRIEVE_ADVERTISING_SUCCESS', data: data.data() })
    }).catch(err => {
      dispatch({ type: 'RETRIEVE_ADVERTISING_ERROR' });
    });
	}
};

export const retrieveAdvertisingByUsername = (displayName) => {
	return (dispatch, getState, {getFirestore}) => {
		const firestore = getFirestore();
		firestore.collection('advertising').where('displayName', '==' ,displayName).get().then((data)=>{
			return data
		}).then((data)=>{
			if(data.docs.length > 0){
				dispatch({ type: 'RETRIEVE_ADVERTISING_USERNAME_SUCCESS', userAdvertising: data.docs[0].data()})
			}else{
				dispatch({ type: 'RETRIEVE_ADVERTISING_USERNAME_ERROR' });
			}
		}).catch(err => {
      dispatch({ type: 'RETRIEVE_ADVERTISING_USERNAME_ERROR' });
    });
	}
};

export const updateSubjects = (subjectsArray) => {
	return (dispatch, getState, {getFirestore}) => {
		const firestore = getFirestore();
		const authorId = getState().firebase.auth.uid;
		const ref = firestore.collection('advertising').doc(authorId)
		ref.update({subjects: subjectsArray}).then(() => {				
			dispatch({ type: 'SET_SUBJECTS_SUCCESS'});
		}).catch(err => {
			dispatch({ type: 'SET_SUBJECTS_ERROR' });
		});
	}
};


export const setBusyTimes = (busyTimes) => {
	return (dispatch, getState, {getFirestore}) => {
		const firestore = getFirestore();
		const authorId = getState().firebase.auth.uid;
		const ref = firestore.collection('advertising').doc(authorId)
		ref.update({busyTimes: busyTimes}).then(() => {				
			dispatch({ type: 'SET_BUSYTIMES_SUCCESS'});
		}).catch(err => {
			dispatch({ type: 'SET_BUSYTIMES_ERROR' }, err);
		});
	}
};


export const retrieveAdvertisingDetail = (offerId) => {
	return (dispatch, getState, {getFirestore}) => {
		const firestore = getFirestore();
		firestore.collection('advertising').doc(offerId).get().then((data) => {
			dispatch({ type: 'RETRIEVE_ADVERTISING_DETAIL_SUCCESS', advertisingDetail: {data: data.data(), id: offerId}})
    }).catch(err => {
		});
	}
};


