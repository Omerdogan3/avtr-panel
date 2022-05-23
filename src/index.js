import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux'
import { ReactReduxFirebaseProvider, getFirebase } from 'react-redux-firebase';
import firebaseConfig from 'src/config/firebaseConfig'
import {store, persistor} from "src/store/configureStore";
import { register } from './registerServiceWorker';
import { PersistGate } from 'redux-persist/integration/react'

const rrfProps = {
  firebase: firebaseConfig,
  config: {
    userProfile: 'users'
  },
  dispatch: store.dispatch
}

if (process.env.NODE_ENV === 'production') {
  console.log = () => {}
  console.error = () => {}
  console.debug = () => {}
}

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
    <ReactReduxFirebaseProvider {...rrfProps}>
      <App/>
    </ReactReduxFirebaseProvider>
    </PersistGate>
  </Provider>,
  document.getElementById('root')
)

register();
