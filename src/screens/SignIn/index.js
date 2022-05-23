import React from 'react'
import { useSelector } from 'react-redux'
import { useFirebase, isLoaded, isEmpty } from 'react-redux-firebase'
import GoogleButton from 'react-google-button' // optional
import { FlexboxGrid, Content, Loader, Panel } from 'rsuite';
import {Navigate} from "react-router-dom";

function SignIn () {
  const firebase = useFirebase()
  const auth = useSelector(state => state.firebase.auth)

  function loginWithGoogle() {
    firebase.login({ provider: 'google', type: 'popup' })
    .then((res)=> {
      // document.location.href="/";
    }).catch((err)=> {

    })
  }

  return (
    <Content>
      {!isEmpty(auth) && <Navigate to="/"/>}
      <FlexboxGrid style={{paddingTop: "15%"}} justify="center">
        <Panel
          style={{padding: 20, backgroundColor: "rgba(255,255,255,0.64)"}}>
          {
            !isLoaded(auth)
            ? <Loader size="md"/>
            : 
            isEmpty(auth) ?
            <GoogleButton 
              type="dark"  
              onClick={loginWithGoogle}/>
            : 
            <pre>{JSON.stringify(auth, null, 2)}</pre>
          }
        </Panel>
      </FlexboxGrid>
    </Content>
  )
}

export default SignIn