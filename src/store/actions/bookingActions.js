export const insertBooking = (bookingData) => {
	return (dispatch, getState, {getFirestore}) => {
		dispatch({ type: 'INSERT_BOOKING_SUCCESS', data: bookingData})
	}
};

export const clearBooking = () => {
	return (dispatch, getState, {getFirestore}) => {
		dispatch({ type: 'CLEAR_BOOKING_SUCCESS'})
	}
};


export const editBooking = (bookingData) => {
	return (dispatch, getState, {getFirestore}) => {
		dispatch({ type: 'EDIT_BOOKING_SUCCESS', data: bookingData})
	}
};

export const bookingRequest = (bookingData) => {
	return (dispatch, getState, {getFirestore}) => {
		const firestore = getFirestore();
		const authorId = getState().firebase.auth.uid;
		bookingData.requestedFrom = authorId;
		const ref = firestore.collection('events').doc()
		ref.set(bookingData).then(() => {				
			dispatch({ type: 'BOOKING_REQUEST_SUCCESS' })
    }).catch(err => {
      dispatch({ type: 'BOOKING_REQUEST_ERROR' });
    });
	}
}

export const retrieveOffers = () => {
	return (dispatch, getState, {getFirestore}) => {
		const firestore = getFirestore();
		const authorId = getState().firebase.auth.uid;
		let bossRes = []
		firestore.collection('events').where('uid', '==' ,authorId).get().then((data)=>{
				data.forEach(function(doc) {
					let tmp = doc.data()
					tmp.id = doc.id
					if(tmp.status !== 3){
						bossRes.push(tmp);
					}
				});

				return data
		}).then((data)=>{
			
			dispatch({ type: 'RETRIEVE_OFFERS_SUCCESS', offers: data.empty ? false : bossRes })
		})
	}
}

export const retrieveMyOffers = () => {
	return (dispatch, getState, {getFirestore}) => {
		const firestore = getFirestore();
		const authorId = getState().firebase.auth.uid;
		let bossRes = []
		firestore.collection('events').where('requestedFrom', '==' ,authorId).get().then((data)=>{
			data.forEach(function(doc) {
				let tmp = doc.data()
				tmp.id = doc.id
				if(tmp.status !== 3){
					bossRes.push(tmp);
				}
			});
		}).then(()=>{
			dispatch({ type: 'RETRIEVE_MY_OFFERS_SUCCESS', myOffers: bossRes })
		})
	}
}




export const changeStatusOffer = (offerId, offerStatus) => {
	return (dispatch, getState, {getFirestore}) => {
		const firestore = getFirestore();
		firestore.collection('events').doc(offerId).update({status: offerStatus}).then((data)=>{
			dispatch({ type: 'CHANGE_STATUS_OFFER_SUCCESS' })
		})
	}
}