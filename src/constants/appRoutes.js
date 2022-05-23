import React from 'react';
import Dashboard from 'src/screens/Dashboard';
import Apps from 'src/screens/Games/Apps';
import AppDetail from 'src/screens/Games/AppDetail';
import Rewards from 'src/screens/Games/Rewards';
import PanelUsers from 'src/screens/PanelUsers';
import Users from 'src/screens/Users';
import UserDetails from 'src/screens/UserDetails';
import Config from 'src/screens/Config';
import SigIn from 'src/screens/SignIn';
import Trends from 'src/screens/Trends';
import Analytics from 'src/screens/Analytics';
import SortApps from 'src/screens/Games/SortApps';
import Withdrawals from 'src/screens/Withdrawals';
import ClaimTypes from 'src/screens/ClaimTypes';
import BlendShapes from 'src/screens/BlendShapes';

const appRoutes = [
  {path: "", component: <Dashboard id="dashboard"/>, id: "dashboard"},
  {path: "signin", component: <SigIn id="signin"/>, id: "signin"},
  {path: "blendshapes", component: <BlendShapes id="blendshapes"/>, id: "blendshapes"},
  {path: "apps", component: <Apps id="apps"/>, id: "apps"},
  {path: "apps/:appId", component: <AppDetail id="appDetail"/>, id: "appDetail"},
  {path: "trends", component: <Trends id="trends"/>, id: "trends"},
  {path: "analytics", component: <Analytics id="analytics"/>, id: "analytics"},
  {path: "rewards", component: <Rewards id="rewards"/>, id: "rewards"},
  {path: "sort", component: <SortApps id="sort"/>, id: "sort"},
  {path: "users", component: <Users id="users"/>, id: "users"},
  {path: "users/:userId", component: <UserDetails id="userDetails"/>, id: "userDetails"},
  {path: "config", component: <Config id="config"/>, id: "config"},
  {path: "withdrawals", component: <Withdrawals id="withdrawals"/>, id: "withdrawals"},
  {path: "panelUsers", component: <PanelUsers id="panelUsers"/>, id: "panelUsers"},
  {path: "claimTypes", component: <ClaimTypes id="claimTypes"/>, id: "claimTypes"},
]

export default appRoutes;