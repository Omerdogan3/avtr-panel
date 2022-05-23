const initState = {
	data: []
}
  
const bookingReducer = (state = initState, action) => {
	switch(action.type){
		case 'INSERT_BOOKING_SUCCESS':
			return {
				...state,
				data: [...state.data, action.data]
			}

		case 'CLEAR_BOOKING_SUCCESS':
			return {
				...state,
				data: []
			}

		case 'EDIT_BOOKING_SUCCESS':
			return {
				...state,
				data: action.data
			}

		case 'BOOKING_REQUEST_SUCCESS':
			console.log('BOOKING_REQUEST_SUCCESS')
			return state
			
		case 'RETRIEVE_OFFERS_SUCCESS':
			return{
				...state, 
				offers: action.offers
			}

		case 'RETRIEVE_MY_OFFERS_SUCCESS':
			return {
				...state,
				myOffers: action.myOffers
			}
		
		case 'CHANGE_STATUS_OFFER_SUCCESS':
			return state
		
		default:
			return state
	}		
};
  
export default bookingReducer;