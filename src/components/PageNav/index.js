import React, { useState } from 'react';
// import './App.css';

// import default style
import 'rsuite/styles/index.less'; // or 'rsuite/dist/rsuite.min.css'

import { Nav, Dropdown, Navbar, Loader } from 'rsuite';
import { useSelector } from 'react-redux'
import { useFirebase, isLoaded, isEmpty } from 'react-redux-firebase'
import USER_ROLES from "src/constants/userRoles"; 

import {Link} from "react-router-dom";

const navbarRoutes = [
  {component: <BlendShapes/>, id: "blendshapes"},
  {component: <PanelUsers/>, id: "panelUsers"},
  {component: <ColorPicker/>, id: "colors"},
]
function ColorPicker(){
  return(
        <Nav.Item as={Link} to="/colors" eventKey="1">
          Colors
        </Nav.Item>
  )
}
function PanelUsers(){
  return(
        <Nav.Item as={Link} to="/panelUsers" eventKey="2">
          Panel Users
        </Nav.Item>
  )
}

function BlendShapes(){
  return(
    <Nav.Item as={Link} to="/blendshapes" eventKey="3">
    Blend Shapes
  </Nav.Item>
  )
}

function PageNav() {
  const firebase = useFirebase()
  const auth = useSelector(state => state.firebase.auth)
  const userRole = useSelector(state => state.user.userRole)

  const [activeKey, setActiveKey] = useState(null);

  const NavBarInstance = ({ onSelect, activeKey, ...props }) => {
  
    return (
      <Navbar style={{display: 'flex', flex: 1}}  {...props}>
        <Navbar.Brand as={Link} to="/">AVTR</Navbar.Brand>
        <Nav style={{display: 'flex', justifyContent: 'center', flex: 1}} onSelect={onSelect} activeKey={activeKey}>
          {
            userRole &&
            navbarRoutes.map((el)=> {
              if(USER_ROLES[userRole].pageAccess.includes(el.id)){
                return(el.component)
              }
            })
          }
        </Nav>
        <Nav>
          
        {
          isEmpty(auth) ?
          <Nav.Item eventKey="5">
            <Loader/>
          </Nav.Item>
          :
            <Dropdown 
              icon={<img src={auth.photoURL} style={{width: 26, height: 26, borderRadius: 13, marginBottom: 4, marginRight: 10}}/>} 
              noCaret
              title={auth.displayName}>
              <Dropdown.Item onClick={()=> firebase.logout()}>
                <Nav.Item>
                  Sign Out
                </Nav.Item>
                </Dropdown.Item>
            </Dropdown>
        }
        </Nav>
       
      </Navbar>
    );
  };
  
  return (
    <NavBarInstance activeKey={activeKey} onSelect={setActiveKey} />
  );
}

export default PageNav;


