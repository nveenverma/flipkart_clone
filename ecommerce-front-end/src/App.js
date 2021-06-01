import React from "react"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"

import './App.css';
import Homepage from "./containers/Homepage";
import ProductListPage from "./containers/ProductListPage";


function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path='/' component={Homepage} />
          <Route path='/:slug' component={ProductListPage} />
        </Switch>
      </Router>
      {/* <Homepage /> */}
    </div>
  );
}

export default App;
