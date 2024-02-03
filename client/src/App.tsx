import React, { Suspense, lazy } from 'react';
import './App.css';
import Signup from './Components/User/Signup';
import Login from './Components/User/Login';
import {Route , Redirect ,Switch} from 'react-router-dom';
// import Mail from './Components/Mail/Mail';
import {useSelector} from 'react-redux';

function App() {
  const {token} = useSelector((state:any) => state.auth);

  const Mail = lazy(( )=> import('./Components/Mail/Mail'));
  const Sent = lazy(( )=> import('./Components/Mail/Sent'));

  return (
    <div className="App">
      <Switch>
        <Route
          path="/" exact><Redirect to="/login"/></Route>
        <Route
          path="/signup"
          component={Signup}
        />
        <Route
          path="/login"
          component={Login}
        />
        <Route path="/inbox" >
          {token.length>0 ? 
          <Suspense fallback={<div>Loading...</div>}><Mail/></Suspense>
          : <Redirect to="/login"/>}
        </Route>
        <Route path="/sent" >
          {token.length>0 ? 
          <Suspense fallback={<div>Loading...</div>}><Sent/></Suspense>
          : <Redirect to="/login"/>}
        </Route>
        
      </Switch>
    </div>

  );
}

export default App;