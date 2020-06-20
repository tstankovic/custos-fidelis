import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';

import { AppProvider } from './context';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Shop from './pages/Shop';
import Shirts from './pages/Products/Shirts';
import SingleProduct from './pages/Products/SingleProduct';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Story from './pages/Story';
import About from './pages/About';

const App = () => (
  <AppProvider>
    <Router>
      <Header />
      <Switch>
        <Route path='/' exact component={Home} />
        <Route path='/shop' exact component={Shop} />
        <Route path='/products/shirts' exact component={Shirts} />
        <Route path='/product/:id' exact component={SingleProduct} />
        <Route path='/cart' exact component={Cart} />
        <Route path='/checkout' exact component={Checkout} />
        <Route path='/story' exact component={Story} />
        <Route path='/about' exact component={About} />
        <Redirect to='/' />
      </Switch>
      <Footer />
    </Router>
  </AppProvider>
);

export default App;
