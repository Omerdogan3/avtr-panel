import authReducer from './authReducer';
import projectReducer from './projectReducer';
import userReducer from './userReducer';
import trendsReducer from './trendsReducer';
import { combineReducers } from 'redux';
import { firestoreReducer } from 'redux-firestore';
import { firebaseReducer } from 'react-redux-firebase';
import advertisingReducer from './advertisingReducer';
import eventReducer from './eventReducer';
import bookingReducer from './bookingReducer';
import gameReducer from './gameReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  project: projectReducer,
  user: userReducer,
  gameReducer: gameReducer,
  trendsReducer: trendsReducer,
  firestore: firestoreReducer,
  firebase: firebaseReducer,
  advertising: advertisingReducer,
  event: eventReducer,
  booking: bookingReducer
});

export default rootReducer