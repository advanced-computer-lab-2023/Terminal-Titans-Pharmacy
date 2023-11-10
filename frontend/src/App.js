 import './App.css';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// // Screens
// import Homescreen from './Screens/Homescreen';
// import Meds2 from './Screens/Meds';
// import CartScreen from './Screens/cartScreen';

// // Components
// import Navbar from './Components/Navbar';
// import Sidedrawer from './Components/sidedrawer';
// import Backdrop from './Components/backdrop';


// // function App() {

// //   const [sideToggle, setSideToggle] = useState(false);

// //   return (
// //     <Router>
// //       {/* Navbar */}
// //       <Navbar click={()=> setSideToggle(true)}/>
// //       {/* Backdrop */}
// //       <Sidedrawer show={sideToggle} click={()=> setSideToggle(false)}/>
// //       {/* Backdrop */}
// //       <Backdrop show={sideToggle} click={()=> setSideToggle(false)}/>
      
     
// //       <main>
// //         <Routes>
// //           <Route path="/patient" element={<Homescreen />} />
// //           <Route path="/medicine" element={<Meds2 />} />
// //           <Route path="/medicine/:medicineId" element={<Meds2 />}/>
// //           <Route path="/cart" element={<CartScreen />} />
// //         </Routes>
// //       </main>
// //     </Router>
// //   );
// // }

// // export default App;
// // ... (your imports remain the same)

// function App() {
//   const [sideToggle, setSideToggle] = useState(false);
//   const [cartItems, setCartItems] = useState([]);

//   useEffect(() => {
//     // Fetch cart items when the component mounts
//     axios.get('http://localhost:8000/Patient/cart')
//       .then((response) => {
//         setCartItems(response.data);
//       })
//       .catch((error) => {
//         console.error('Error fetching cart items:', error);
//       });
//   }, []);

//   return (
//     <Router>
//       {/* Navbar */}
//       <Navbar click={() => setSideToggle(true)} cartItemsCount={cartItems.length} />
//       {/* Backdrop */}
//       <Sidedrawer show={sideToggle} click={() => setSideToggle(false)} />
//       {/* Backdrop */}
//       <Backdrop show={sideToggle} click={() => setSideToggle(false)} />
      
//       <main>
//         <Routes>
//           <Route path="/patient" element={<Homescreen />} />
//           <Route path="/medicine" element={<Meds2 />} />
//           <Route path="/medicine/:medicineId" element={<Meds2 />} />
//           {/* Pass cartItems to CartScreen */}
//           <Route path="/cart" element={<CartScreen cartItems={cartItems} />} />
//         </Routes>
//       </main>
//     </Router>
//   );
// }

// export default App;
// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './Components/CartContext'; // Import the CartProvider
import Navbar from './Components/Navbar';
import Sidedrawer from './Components/sidedrawer';
import Backdrop from './Components/backdrop';
import Homescreen from './Screens/Homescreen';
import Meds2 from './Screens/Meds';
import CartScreen from './Screens/cartScreen';
import Checckout from './Components/Checkout';
import OrderDetails from './Components/orderDetails';
import Address from './Components/addAddress';
import Checkout from './Components/Checkout';

function App() {
  return (
    <CartProvider>
      <Router>
        {/* Navbar */}
        <Navbar />
        {/* Backdrop */}
        <Sidedrawer />
        {/* Backdrop */}
        <Backdrop />
        
        <main>
          <Routes>
            <Route path="/patient" element={<Homescreen />} />
            <Route path="/medicine" element={<Meds2 />} />
            <Route path="/medicine/:medicineId" element={<Meds2 />} />
            {/* Pass cartItems to CartScreen */}
            <Route path="/checkout" element={<Checkout />} />

          </Routes>
        </main>
      </Router>
    </CartProvider>
  );
}

export default App;
