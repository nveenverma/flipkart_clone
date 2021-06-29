import React, { useEffect } from "react"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"

import { isUserLoggedIn, updateCart } from "./actions"
import Homepage from "./containers/Homepage";
import ProductListPage from "./containers/ProductListPage";
import ProductDetailsPage from "./containers/ProductDetailsPage";
import CartPage from "./containers/CartPage";
import CheckoutPage from "./containers/CheckoutPage";
import OrderPage from "./containers/OrderPage";
import OrderDetailsPage from "./containers/OrderDetailsPage"
import './App.css';

function App() {

  const dispatch = useDispatch()
  const auth = useSelector(state => state.auth);

    useEffect(() => {
      if (!auth.authenticate) {
        dispatch(isUserLoggedIn())
      }
      dispatch(updateCart())
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [auth.authenticate])
    

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path='/' component={Homepage} />
          <Route path='/cart' component={CartPage} />
          <Route path='/checkout' component={CheckoutPage} />
          <Route path="/account/orders" component={OrderPage} />
          <Route path="/order_details/:orderId" component={OrderDetailsPage} />
          <Route path='/:productSlug/:productId/p' component={ProductDetailsPage} />
          <Route path='/:slug' component={ProductListPage} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
