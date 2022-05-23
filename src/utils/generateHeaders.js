import {store} from 'src/store/configureStore';
import firebase from 'src/config/firebaseConfig';
import api from 'src/api';

import {setUserRole} from 'src/store/actions/userActions';

const generateHeaders = new Promise((resolve) => {
	const {user} = store.getState();
	let headers = {'Content-Type': 'application/json'}

	firebase.auth().onAuthStateChanged(function(authData) {
		if (authData) {
			headers['Authorization'] = authData.uid;
			// burada reducer check et. 
			if(!user.userRole){
				api.checkPanelUser(authData.email).then((userRole)=> {
					store.dispatch(setUserRole(userRole))
					resolve(headers)
				})
			}
		}
	});
});

export default generateHeaders;