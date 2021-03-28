
import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './Home/Home';
import Login from './Login/Login';
import User from './User/User';
import Signup from "./Signup/Signup";
import NotFound from "./NotFound/NotFound";

export default function Routes(){
  return(
    <Switch>
      <Route exact path='/' >
        <Home/>
      </Route>
      <Route path='/login' >
        <Login/>
      </Route>
      <Route path='/user' >
        <User/>
      </Route>
      <Route path='/signup' >
        <Signup/>
      </Route>
      <Route>
        <NotFound />
      </Route>
    </Switch>
  )
}