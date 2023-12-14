// App.js
import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import { CartProvider } from './Components/CartContext'; // Import the CartProvider
import Homescreen from './Screens/Homescreen';
import Meds2 from './Screens/Meds';
//import MedsPharm from './Screens/MedPagePharm.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import Checkout from './Components/Checkout';
import Cancel from './Components/cancel';
import PaymentPage from './Components/paymentMethod';
import Success from './Components/success';
import ViewReqPharmDoc from './Components/viewReqPharmDoc.js';
import AdminPage from './Screens/AdminScreen';
import AvailableMeds from './Screens/AvailableMeds.js';
import ForgotPassword from "./Screens/ForgotPassword";
import MedPharm from './Screens/MedPagePharm.js';
import MonthlySales from './Screens/MonthlySalesPage.jsx';
import OrderDetails from './Screens/OrderDetails.js';
import Register from './Screens/Register';
import SignIn from './Screens/SignIn';
import CartScreen from './Screens/cartScreen';
import NewMed from './Screens/newmedPage.jsx';
import OrderScreen from './Screens/orderScreen';
import PharmacistScreen from './Screens/pharmacistScreen';
import AdminAvailableMeds from './Screens/AdminAvailableMedecine';
import AdminSalesReport from './Screens/AdminSalesReport';
import AdminPharmProfile from './Components/adminViewPharmReq';
import ViewAdminPharmApplications from './Components/ViewAdminPharmApplications';



function App() {
  // const signoutButtonFunc = () => {
  //   sessionStorage.removeItem('token');
  //   window.location.href = '/Health-Plus';
  // }

  return (
    <CartProvider>
      <Router>
        {/* {
          window.location.pathname == '/Health-Plus' ||  window.location.pathname == '/Health-Plus/pharmacistScreen'|| window.location.pathname == '/Health-Plus/registerPharmacist' || window.location.pathname == '/Health-Plus/registerPatient' ?
            <></>
            :
            <Navbar />
        } */}
        {/* Navbar */}

        {/* Backdrop */}

        {/* Backdrop */}


        <main>
          <Routes basename="/Health-Plus">
            <Route path="/forgotPassword" element={<ForgotPassword />} />
            <Route path="/Health-Plus" element={<SignIn />} />
            <Route path="/Health-Plus/register" element={<Register />} />
            <Route path="/Health-Plus/admin" element={<AdminPage />} />
            <Route path="/Health-Plus/adminAvailableMeds" element={<AdminAvailableMeds />} />
            <Route path="/Health-Plus/adminSalesReport" element={<AdminSalesReport />} />
            <Route path="/Health-Plus/adminPharmApplicationList" element={<ViewAdminPharmApplications />} /> 
            <Route path="/Health-Plus/adminViewReqPharm" element={<AdminPharmProfile />} /> 
            <Route path="/orderDetails" element={<OrderScreen />} />
            <Route path="/Health-Plus/pharmacistScreen" element={<PharmacistScreen />} />
            <Route path="/orderDetails/:orderId" element={<OrderDetails />} />
            <Route path="/patient" element={<Homescreen />} />
            <Route path="/patient/:id" element={<Homescreen />} />
            <Route path="/medicine" element={<Meds2 />} />
            <Route path='/monthlysales' element={<MonthlySales/>}/>
            <Route path="/medicine/:medicineId" element={<Meds2 />} />
            <Route path="/medicinepharm" element={<MedPharm/>}/>
            <Route path="/medicinepharm/:medicineId" element={<MedPharm/>}/>
            <Route path="/NewMed" element={<NewMed/>}/>
            {/* <Route path="/medicinePharm/:medicineId" element={<MedPharm/>}/> */}
            <Route path="/AvailableMeds" element={<AvailableMeds/>}/>
            {/* Pass cartItems to CartScreen */}
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/success" element={<Success />} />
            <Route path="/cancel" element={<Cancel />} />
            <Route path="/payment" element={<PaymentPage />} />
            <Route path="/Health-Plus/viewReqPharmcDoc" element={<ViewReqPharmDoc />} />
            <Route path="/cart" element={<CartScreen />} />

          </Routes>
        </main>
      </Router>
    </CartProvider>
  );
}

export default App;
