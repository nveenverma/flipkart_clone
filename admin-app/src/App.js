import React, { useEffect } from "react"
import { Route, Switch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import './App.css';
import Home from "./containers/Home";
import Signin from "./containers/Signin";
import Signup from "./containers/Signup";
import PrivateRoute from "./components/HOC/PrivateRoute"
import { isUserLoggedIn } from "./actions"

function App() {

  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);

  // This will run when the signin page loads and check if the user is already logged in
  useEffect(() => {
    if (!auth.authenticate) {
        dispatch(isUserLoggedIn())        
    }
  }, [])

  return (
    <div className="App">
        <Switch>
          <PrivateRoute path='/' exact component={Home} />
          <Route path='/signin' component={Signin} />
          <Route path='/signup' component={Signup} />
      </Switch>
    </div>
  );
}

export default App;
