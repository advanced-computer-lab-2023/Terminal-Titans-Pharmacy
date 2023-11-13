// App.js
import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './Components/CartContext'; // Import the CartProvider
import Navbar from './Components/Navbar';
import Homescreen from './Screens/Homescreen';
import Meds2 from './Screens/Meds';
import CartScreen from './Screens/cartScreen';
import ForgotPassword from "./Screens/ForgotPassword";
import Checckout from './Components/Checkout';
import OrderDetails from './Screens/OrderDetails.js';
import Address from './Components/addAddress';
import Checkout from './Components/Checkout';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import Register from './Screens/Register';
import OrderScreen from './Screens/orderScreen';
import SignIn from './Screens/SignIn';
import PharmacistScreen from './Screens/pharmacistScreen';
import AdminPage from './Screens/AdminScreen';
import Success from './Components/success';
import Cancel from './Components/cancel';
import PaymentPage from './Components/paymentMethod';

function App() {
  // const signoutButtonFunc = () => {
  //   sessionStorage.removeItem('token');
  //   window.location.href = '/Health-Plus';
  // }

  return (
    <CartProvider>
      <Router>
        {
          window.location.pathname == '/Health-Plus' || window.location.pathname == '/Health-Plus/registerPharmacist' || window.location.pathname == '/Health-Plus/registerPatient' ?
            <></>
            :
            <Navbar />
        }
        {/* Navbar */}

        {/* Backdrop */}

        {/* Backdrop */}


        <main>
          <Routes basename="/Health-Plus">
            <Route path="/forgotPassword" element={<ForgotPassword />} />
            <Route path="/Health-Plus" element={<SignIn />} />
            <Route path="/Health-Plus/register" element={<Register />} />
            <Route path="/Health-Plus/admin" element={<AdminPage />} />
            <Route path="/orderDetails" element={<OrderScreen />} />
            <Route path="/Health-Plus/pharmacistScreen" element={<PharmacistScreen />} />
            <Route path="/orderDetails/:orderId" element={<OrderDetails />} />
            <Route path="/patient" element={<Homescreen />} />
            <Route path="/medicine" element={<Meds2 />} />
            <Route path="/medicine/:medicineId" element={<Meds2 />} />
            {/* Pass cartItems to CartScreen */}
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/success" element={<Success />} />
            <Route path="/cancel" element={<Cancel />} />
            <Route path="/payment" element={<PaymentPage />} />
            <Route path="/cart" element={<CartScreen />} />

          </Routes>
        </main>
      </Router>
    </CartProvider>
  );
}

export default App;
