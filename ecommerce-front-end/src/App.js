import React, { useEffect } from "react"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"

import { isUserLoggedIn } from "./actions"
import Homepage from "./containers/Homepage";
import ProductListPage from "./containers/ProductListPage";
import ProductDetailsPage from "./containers/ProductDetailsPage";
import './App.css';

function App() {

  const dispatch = useDispatch()
  const auth = useSelector(state => state.auth);

    useEffect(() => {
      if (!auth.authenticate) {
        dispatch(isUserLoggedIn())
      }
      return () => {
        
      }
    }, [auth.authenticate])

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path='/' component={Homepage} />
          <Route path='/:productSlug/:productId/p' component={ProductDetailsPage} />
          <Route path='/:slug' component={ProductListPage} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
