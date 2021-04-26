import logo from './logo.svg';
import './App.css';
import { createContext, useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Home from './components/Home/Home/Home';
import Signup from './components/Home/Signup/Signup';
import Dashboard from './components/Dashboard/Dashboard/Dashboard';
import PrivateRoute from './components/Home/PrivateRoute/PrivateRoute';
import AddQuery from './components/Dashboard/AddQuery/AddQuery';

export const userContext=createContext()
function App() {
  const [loginInfo, setLoginInfo]=useState({})
  return (
    <userContext.Provider value={[loginInfo, setLoginInfo]}>
      <Router>
        <Switch>
          <Route exact path="/">
            <Home></Home>
          </Route>
          <Route exact path="/home">
            <Home></Home>
          </Route>
          <PrivateRoute exact path="/dashboard">
            <Dashboard></Dashboard>
          </PrivateRoute>
          <Route path="/signup">
            <Signup></Signup>
          </Route>
          <Route path="/dashboard/addquery">
            <Dashboard></Dashboard>
          </Route>
          <Route path="/dashboard/managequery">
            <Dashboard></Dashboard>
          </Route>
        </Switch>
      </Router>
    </userContext.Provider>
  );
}

export default App;
