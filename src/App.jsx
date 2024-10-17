import './App.css'
import SIGNUP from './pages/Signup'
import SIGNIN from './pages/Signin'
import { HashRouter, Route, Routes } from 'react-router-dom'
import { Dashboard } from './pages/Dashboard'
import PRODUCT from './pages/ProductPage'
import PROFILEPAGE from './pages/UserProfilePage'
import CARTPAGE from './pages/CartPage'
import OrderPage from './pages/Myorders'
import ADMINPROFILEPAGE from './pages/AdminProfilePage'
import Orders from './components/Orders'
import USERS from './components/Users'
import CHECKOUTPAGE from './pages/CheckOutPage'
import MYORDERSPAGE from './pages/Myorders'
import { RecoilRoot, useRecoilState } from 'recoil'
import { userDetailAtom } from './atoms/userAtom'
import { useEffect } from 'react'
import { Error404Page } from './pages/Error404Page'
import {LandingPage} from './pages/LandingPage'

function App() {
  const token = localStorage.getItem('token');

  // Use Recoil state for userInfo
  const [userInfo, setUserInfo] = useRecoilState(userDetailAtom);

  // Load userInfo from localStorage if it's not already in Recoil
  useEffect(() => {
    const userInfoString = localStorage.getItem('userInfo');
    if (!userInfo && userInfoString) {
      setUserInfo(JSON.parse(userInfoString));
    }
  }, [userInfo, setUserInfo]);

  const isAdmin = userInfo?.isAdmin || false;

  console.log(userInfo);
  console.log(isAdmin);

  
  return (
    <div>
      <HashRouter>    
      <Routes>
          {/* Landing Page should always be accessible */}
          <Route path="/" element={<LandingPage />} />

          {/* Public Routes */}
          <Route path="/signin" element={<SIGNIN />} />
          <Route path="/signup" element={<SIGNUP />} />
          
          {/* Protected Routes */}
          { token ? (
            <>
              {isAdmin ? (
                <Route path="/admin" element={<ADMINPROFILEPAGE />} />
              ) : (
                <Route path="/dashboard" element={<Dashboard />} />
              )}
              <Route path="/productpage/:id" element={<PRODUCT />} />
              <Route path="/Userprofile" element={<PROFILEPAGE />} />
              <Route path="/cart" element={<CARTPAGE />} />
              <Route path="/checkout" element={<CHECKOUTPAGE />} />
              <Route path="/myorders" element={<MYORDERSPAGE />} />

              {/* Admin-specific Routes */}
              {isAdmin && (
                <>
                  <Route path="/orders" element={<Orders />} />
                  <Route path="/users" element={<USERS />} />
                </>
              )}
            </>
          ) : (
            // Redirect to sign-in if the user tries to access protected routes without a token
            <Route path="/dashboard" element={<Navigate to="/signin" />} />
          )}

          {/* 404 Error Page */}
          <Route path="*" element={<Error404Page />} />
        </Routes>
      </HashRouter>
    </div>
  );
}

export default function Root() {
  return (
    <RecoilRoot>
      <App />
    </RecoilRoot>
  );
}
