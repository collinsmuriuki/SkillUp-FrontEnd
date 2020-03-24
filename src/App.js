import React from 'react'
import { Provider } from 'react-redux'
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
import 'firebase/firestore' // make sure you add this for firestore
import { ReactReduxFirebaseProvider } from 'react-redux-firebase'
import { createFirestoreInstance } from 'redux-firestore'
import configureStore from './store/store'
import { firebase as fbConfig, rrfConfig } from './config/config'
import { BrowserRouter } from 'react-router-dom'
import 'antd/dist/antd.css'
import './index.css'
import { Page } from './components'

const initialState = window && window.__INITIAL_STATE__ // set initial state here
const store = configureStore(initialState)
firebase.initializeApp(fbConfig)

export default function App() {
  return (
    <Provider store={store}>
      <ReactReduxFirebaseProvider
        firebase={firebase}
        config={rrfConfig}
        dispatch={store.dispatch}
        createFirestoreInstance={createFirestoreInstance}>
        <BrowserRouter>
          <Page />
        </BrowserRouter>
      </ReactReduxFirebaseProvider>
    </Provider>
  )
}
