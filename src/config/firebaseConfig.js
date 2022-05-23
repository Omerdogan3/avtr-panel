import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
import 'firebase/compat/storage';
import 'firebase/compat/database';

/* var config = {
  apiKey: "AIzaSyDTCeeIZCFssbL__YHtmCQlz1cJshWdNkk",
  authDomain: "project-unite-361.firebaseapp.com",
  projectId: "project-unite-361",
  databaseURL: "https://project-unite-361.firebaseio.com",
  storageBucket: "project-unite-361.appspot.com",
  messagingSenderId: "1035152439025",
  appId: "1:1035152439025:web:abc5db4935371e0e35db50",
  measurementId: "G-ET6QCDD317"
}; */

var config = {
  apiKey: "AIzaSyAmegnsUz2T00qW2g7sF_2HHxvZxqwrKCI",
  authDomain: "avtr-361.firebaseapp.com",
  projectId: "avtr-361",
  storageBucket: "avtr-361.appspot.com",
  messagingSenderId: "408299215053",
  appId: "1:408299215053:web:096f6b5d51b746d8ca3184",
  measurementId: "G-56DWBLZQ1X"
};
firebase.initializeApp(config);
firebase.firestore().settings({ timestampsInSnapshots: true });
const storage = firebase.storage()
const auth = firebase.auth()

export {
  storage, 
  auth,
  firebase as default
} 