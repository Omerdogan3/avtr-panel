import React, { useState } from 'react';
import './App.css';
import 'rsuite/styles/index.less';
import "rsuite/Container/styles/index.less"

import { CustomProvider } from 'rsuite';
import {HashRouter as Router, Route, Routes} from "react-router-dom";

import PageNav from './components/PageNav';
import appRoutes from 'src/constants/appRoutes';

function App() {

  return (
    <div className="show-fake-browser navbar-page">
      <CustomProvider theme={"dark"}>
          <Router>
            <PageNav/>         
            <Routes>
              {
                appRoutes.map((el)=> {
                  return(
                    <Route path={"/" + el.path} element={el.component}/>
                  )
                })
              }
            </Routes>
        </Router>
      </CustomProvider>
    </div>
  );
}

export default App;