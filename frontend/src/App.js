// App.js
import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './Components/CartContext'; // Import the CartProvider
import Navbar from './Components/Navbar';
import Sidedrawer from './Components/sidedrawer';
import Backdrop from './Components/backdrop';
import Homescreen from './Screens/Homescreen';
import Meds2 from './Screens/Meds';
import CartScreen from './Screens/cartScreen';
import Login from './Screens/Login.js';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const signoutButtonFunc = () => {
    sessionStorage.removeItem('token');
    window.location.href = '/';
  }

  return (
    <CartProvider>
      <Router>
        {
          window.location.pathname == '/Health-Plus' || window.location.pathname == '/Health-Plus/registerPatient' || window.location.pathname == '/Health-Plus/registerDoctor' ?
            <></>
            : <div className="signoutButton">
              <Button variant="danger" onClick={signoutButtonFunc}>Sign Out</Button>
              <Navbar />
              <Sidedrawer />
              <Backdrop />
            </div>
        }
        {/* Navbar */}
        
        {/* Backdrop */}
        
        {/* Backdrop */}
        

        <main>
          <Routes basename="/Health-Plus">
            <Route path="/Health-Plus" element={<Login />} />
            <Route path="/patient" element={<Homescreen />} />
            <Route path="/medicine" element={<Meds2 />} />
            <Route path="/medicine/:medicineId" element={<Meds2 />} />
            {/* Pass cartItems to CartScreen */}
            <Route path="/cart" element={<CartScreen />} />

          </Routes>
        </main>
      </Router>
    </CartProvider>
  );
}

export default App;
