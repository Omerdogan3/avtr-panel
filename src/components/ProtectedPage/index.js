import React from 'react';
import 'rsuite/styles/index.less';
import { isLoaded, isEmpty } from 'react-redux-firebase'
import {Navigate} from "react-router-dom";
import { useSelector } from 'react-redux'
import USER_ROLES from "src/constants/userRoles"; 

function ProtectedPage({pageId}) {
  const auth = useSelector(state => state.firebase.auth)
  const userRole = useSelector(state => state.user.userRole)

  return (
    isLoaded(auth) && isEmpty(auth) ?  
    <Navigate to="/signin" />
    :
    userRole && !USER_ROLES[userRole]?.pageAccess.includes(pageId) 
    && 
    <Navigate to="/" />
  );
}

export default ProtectedPage;