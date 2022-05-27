import React from 'react';
import Dashboard from 'src/screens/Dashboard';
import PanelUsers from 'src/screens/PanelUsers';
import SigIn from 'src/screens/SignIn';
import BlendShapes from 'src/screens/BlendShapes';
import ColorPicker from 'src/screens/ColorPicker';

const appRoutes = [
  {path: "", component: <Dashboard id="dashboard"/>, id: "dashboard"},
  {path: "signin", component: <SigIn id="signin"/>, id: "signin"},
  {path: "blendshapes", component: <BlendShapes id="blendshapes"/>, id: "blendshapes"},
  {path: "colors", component: <ColorPicker id="colors"/>, id: "colors"},
  {path: "panelUsers", component: <PanelUsers id="panelUsers"/>, id: "panelUsers"},
]

export default appRoutes;