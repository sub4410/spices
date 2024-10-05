import { useState } from 'react'
import './App.css'
import SIGNUP, { SignupPage } from './pages/Signup'
import SIGNIN, { SigninPage } from './pages/Signin'
import { HashRouter, Route, Routes } from 'react-router-dom'
import { Dashboard } from './pages/Dashboard'
import PRODUCT  from './pages/ProductPage'
import PROFILEPAGE from './pages/UserProfilePage'
import CARTPAGE from './pages/CartPage'
import OrderPage from './pages/userOrders'

import ADMINPROFILEPAGE from './pages/AdminProfilePage'
import Orders from './components/Orders'
import USERS from './components/Users'
import CHECKOUTPAGE from './pages/CheckOutPage'


function App() {
  const token = localStorage.getItem('token');
;

  return (
    <div>
      <HashRouter>
        <Routes>
          { token ? <Route path="/" element={<Dashboard />} />:<Route path="/" element={<SIGNIN />} /> }
          <Route path="/signin" element={<SIGNIN />} />
          <Route path="/signup" element={<SIGNUP />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path = '/productpage/:id' element={<PRODUCT/>} />
          <Route path = "/Userprofile" element = {<PROFILEPAGE/>}/>
          <Route path = "/cart" element = {<CARTPAGE/>}/>
          <Route path = "/admin" element = {<ADMINPROFILEPAGE/>}/>
          <Route path = "/orders" element={<Orders/>} />
          <Route path = "/Users" element={<USERS/>} />
          <Route path = "/checkout" element={<CHECKOUTPAGE/>} />
          <Route path = "/userorders" element={<OrderPage/>} />
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;
