import './App.css';
import SIGNUP from './pages/Signup';
import SIGNIN from './pages/Signin';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { Dashboard } from './pages/Dashboard';
import PRODUCT from './pages/ProductPage';
import PROFILEPAGE from './pages/UserProfilePage';
import CARTPAGE from './pages/CartPage';
import ADMINPROFILEPAGE from './pages/AdminProfilePage';
import Orders from './components/Orders';
import USERS from './components/Users';
import CHECKOUTPAGE from './pages/CheckOutPage';
import MYORDERSPAGE from './pages/Myorders';
import { RecoilRoot, useRecoilState } from 'recoil';
import { userDetailAtom } from './atoms/userAtom';
import { useEffect } from 'react';
import { Error404Page } from './pages/Error404Page';
import { LandingPage } from './pages/LandingPage';

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
      <BrowserRouter>
        <Routes>
          {/* Landing Page should always be accessible */}
          <Route path="/" element={<LandingPage />} />

          {/* Public Routes */}
          <Route path="/signin" element={<SIGNIN />} />
          <Route path="/signup" element={<SIGNUP />} />
          
          {/* Protected Routes */}
          {token ? (
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
            // If no token, redirect to the landing page when accessing protected routes
            <>
              <Route path="/dashboard" element={<Navigate to="/signin" />} />
              <Route path="/productpage/:id" element={<Navigate to="/signin" />} />
              <Route path="/Userprofile" element={<Navigate to="/signin" />} />
              <Route path="/cart" element={<Navigate to="/signin" />} />
              <Route path="/checkout" element={<Navigate to="/signin" />} />
              <Route path="/myorders" element={<Navigate to="/signin" />} />
              {/* Admin-specific Routes */}
              <Route path="/admin" element={<Navigate to="/signin" />} />
              <Route path="/orders" element={<Navigate to="/signin" />} />
              <Route path="/users" element={<Navigate to="/signin" />} />
            </>
          )}

          {/* 404 Error Page */}
          <Route path="*" element={<Error404Page />} />
        </Routes>
      </BrowserRouter>
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
