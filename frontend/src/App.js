import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
// Screens
import Homescreen from './Screens/Homescreen';
import Meds from './Screens/Meds';
import CartScreen from './Screens/cartScreen';

// Components
import Navbar from './Components/Navbar';
import Sidedrawer from './Components/sidedrawer';
import Backdrop from './Components/backdrop';


function App() {

  const [sideToggle, setSideToggle] = useState(false);

  return (
    <Router>
      {/* Navbar */}
      <Navbar click={()=> setSideToggle(true)}/>
      {/* Backdrop */}
      <Sidedrawer show={sideToggle} click={()=> setSideToggle(false)}/>
      {/* Backdrop */}
      <Backdrop show={sideToggle} click={()=> setSideToggle(false)}/>
      
     
      <main>
        <Routes>
          <Route path="/patient" element={<Homescreen />} />
          <Route path="/medicine/:id" element={<Meds />} />
          <Route path="/cart" element={<CartScreen />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
