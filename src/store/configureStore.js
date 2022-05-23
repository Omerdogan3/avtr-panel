
import { createStore, applyMiddleware, compose } from 'redux'
import logger from 'redux-logger'
import thunk from 'redux-thunk'
import rootReducer from 'src/store/reducers/rootReducer'

import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web


import { reduxFirestore, getFirestore } from 'redux-firestore';
import firebaseConfig from 'src/config/firebaseConfig'
import { getFirebase } from 'react-redux-firebase';


const persistConfig = {
  key: 'root',
  storage,
}
const persistedReducer = persistReducer(persistConfig, rootReducer)

const composeEnhancers = typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose;

const enhancer = composeEnhancers(
  applyMiddleware(thunk.withExtraArgument({getFirebase, getFirestore})),
  applyMiddleware(logger),
  reduxFirestore(firebaseConfig)
);

const store = createStore(persistedReducer, enhancer);
let persistor = persistStore(store)

export {store, persistor};