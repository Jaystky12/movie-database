
import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './Home/Home';
import Login from './Login/Login';
import User from './User/User';
import Signup from "./Signup/Signup";
import NotFound from "./NotFound/NotFound";

export default function Routes(props:any){
  return(
    <Switch>
      <Route exact path='/'
      render={() =>(
        <Home {...props} />)}

      />
      <Route path='/login'
        render={() =>
          <Login/>}
      />
      <Route path='/user'
        render={() =>
          <User{...props}/>}
      />
      <Route path='/signup'
        render={() =>
          <Signup/>}
      />
      <Route>
        <NotFound />
      </Route>
    </Switch>
  )
}