import React, { useEffect } from "react"
import { Route, Switch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import './App.css';
import Home from "./containers/Home";
import Signin from "./containers/Signin";
import Signup from "./containers/Signup";
import PrivateRoute from "./components/HOC/PrivateRoute"
import { isUserLoggedIn } from "./actions"
import Products from "./containers/Products";
import Orders from "./containers/Orders";
import Categories from "./containers/Categories";

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
          <PrivateRoute path='/products' component={Products} />
          <PrivateRoute path='/orders' component={Orders} />
          <PrivateRoute path='/categories' component={Categories} />

          <Route path='/signin' component={Signin} />
          <Route path='/signup' component={Signup} />
      </Switch>
    </div>
  );
}

export default App;
