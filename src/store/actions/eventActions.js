export const retrieveMyEvents = () => {
	return (dispatch, getState, {getFirestore}) => {
		const firestore = getFirestore();
		const authorId = getState().firebase.auth.uid;
		let bossRes = []
		firestore.collection('events').where('uid', '==' ,authorId).get().then((data)=>{
			data.forEach(function(doc) {
				let tmp = doc.data()
				tmp.id = doc.id
				tmp.type = "event"
				bossRes.push(tmp);
			});
			firestore.collection('busyDays').where('uid', '==' ,authorId).get().then((data)=>{
				data.forEach(function(doc) {
					let tmp = doc.data()
					tmp.id = doc.id
					tmp.type = "busy"
					bossRes.push(tmp);
				});
			}).then(()=>{
				dispatch({ type: 'RETRIEVE_MY_EVENTS_SUCCESS', data: bossRes})
			})
		})
	}
};


export const retrieveEventById = (eventId) => {
	return (dispatch, getState, {getFirestore}) => {
		const firestore = getFirestore();
		const authorId = getState().firebase.auth.uid;
		let bossRes = []
		firestore.collection('events').doc(eventId).get().then((data)=>{
			let tmpData = data.data()
			tmpData.exists = data.exists
			if(tmpData.exists){
				firestore.collection('users').doc(tmpData.requestedFrom).get().then((res)=>{
					dispatch({ type: 'RETRIEVE_EVENT_BY_ID_SUCCESS', data: {eventData: tmpData, userData: res.data()}})
				})
			}
		})
	}
};

export const retrieveOtherUserEvents = (displayName) => {
	return (dispatch, getState, {getFirestore}) => {
		const firestore = getFirestore();
		let bossRes = []
		firestore.collection('advertising').where('displayName', '==' ,displayName).get().then((data)=>{
			if(!data.empty){
				firestore.collection('events').where('uid', "==", data.docs[0].data().uid).get().then((events)=>{
					events.docs.forEach(function(doc) {
						let tmp = doc.data()
						tmp.id = doc.id
						tmp.type = "events"
						bossRes.push(tmp);
					});
				}).then(()=>{
					firestore.collection('busyDays').where('uid', "==", data.docs[0].data().uid).get().then((busyDays)=>{
						busyDays.docs.forEach(function(doc) {
							let tmp = doc.data()
							tmp.id = doc.id
							tmp.type = "busy"
							bossRes.push(tmp);
						});
					}).then(()=>{
						dispatch({ type: 'RETRIEVE_USER_EVENTS_SUCCESS', data: bossRes})
					})
				})
			}
		})
	}
};


export const insertEvent = (eventData) => {
	return (dispatch, getState, {getFirestore}) => {
		const firestore = getFirestore();
		const authorId = getState().firebase.auth.uid;
		let ref = firestore.collection('events').doc()
		eventData.uid = authorId
		ref.set(eventData).then(() => {
			firestore.collection('advertising').doc(authorId).get().then((data)=>{
				data = data.data()
				if(data.events){
					data.events.push(ref.id)
				}else{
					data.events = [ref.id]
				}
				firestore.collection('advertising').doc(authorId).set(data).then(()=>{
					dispatch({ type: 'INSERT_EVENT_SUCCESS'});
				})
			})

		})
	}
};

export const removeBusyDay = (busyDayId) => {
	return (dispatch, getState, {getFirestore}) => {
		const firestore = getFirestore();
		let ref = firestore.collection('busyDays').doc(busyDayId)
		ref.delete().then(() => {
			dispatch({ type: 'REMOVE_BUSYDAY_SUCCESS'});
		})
	}
};


export const insertBusyDay = (eventData) => {
	return (dispatch, getState, {getFirestore}) => {
		const firestore = getFirestore();
		const authorId = getState().firebase.auth.uid;
		let ref = firestore.collection('busyDays').doc()
		eventData.uid = authorId
		ref.set(eventData).then(() => {
			dispatch({ type: 'INSERT_BUSYDAY_SUCCESS'});
		})
	}
};



