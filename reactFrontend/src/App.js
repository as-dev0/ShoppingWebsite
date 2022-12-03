import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import ShoppingPage from './pages/ShoppingPage';
import CartPage from './pages/CartPage';
import ProductDetails from './pages/ProductDetails';
import CheckoutPage from './pages/CheckoutPage';
import OrdersPage from './pages/OrdersPage';
import OrderPage from './pages/OrderPage';
import SettingsPage from './pages/SettingsPage';

function App() {

  return (
    <div className="App">
      <Router>
        <div className="App-header">
          <Route path="/" exact>
            <ShoppingPage  />
          </Route>

          <Route path="/product/:productid" exact>
            <ProductDetails />
          </Route>

          <Route path="/cart" exact>
            <CartPage />
          </Route>

          <Route path="/checkout" exact>
            <CheckoutPage />
          </Route>

          <Route path="/order/:orderid" exact>
            <OrderPage />
          </Route>

          <Route path="/allorders" exact>
            <OrdersPage />
          </Route>

          <Route path="/settings" exact>
            <SettingsPage />
          </Route>
        </div>
      </Router>
    </div>
  );
}

export default App;
