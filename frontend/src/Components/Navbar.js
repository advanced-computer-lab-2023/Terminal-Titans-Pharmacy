   import './Navbar.css';
// // // // import {Link} from 'react-router-dom';
// // // // const Navbar = ({click}) =>{
// // // //     return (
// // // //         <nav className = "navbar">
// // // //     {/*logo*/}
// // // //     <div className="navbar_logo">
// // // //         <h2>Titans Pharmacy</h2>

// // // //     </div>
// // // //     {/* links*/}
// // // //     <ul className="navbar_links">
// // // //         <li>
// // // //             <Link to="/cart" className='cart__link'>
// // // //                 <i className='fas fa-shopping-cart'></i>
// // // //                 {/*con*/}
// // // //                 <span>
// // // //                     Cart 
// // // //                     <span className='cartlogo_badge'>0</span>
// // // //                 </span>
                
// // // //             </Link>
// // // //         </li>
// // // //         <li>
// // // //             <Link to="/patient">
// // // //                 store

// // // //             </Link>
// // // //         </li>
// // // //     </ul>
// // // //     {/*menu*/}
// // // //     <div className='ham_menu' onClick={click}>
// // // //         <div></div>
// // // //         <div></div>
// // // //         <div></div>

// // // //     </div>

// // // // </nav>
        

// // // //     )
// // // // }
// // // // export default Navbar;
// // // // Navbar.js
// // // // Navbar.js
// // // import React from 'react';
// // // import { Link } from 'react-router-dom';
// // // import { useCart } from '../Components/CartContext'; // Import the useCart hook

// // // const Navbar = ({ click }) => {
// // //   const { cartItems } = useCart();

// // //   return (
// // //     <nav className="navbar">
// // //       {/*logo*/}
// // //       <div className="navbar_logo">
// // //         <h2>Titans Pharmacy</h2>
// // //       </div>
// // //       {/* links*/}
// // //       <ul className="navbar_links">
// // //         <li>
// // //           <Link to="/cart" className='cart__link'>
// // //             <i className='fas fa-shopping-cart'></i>
// // //             {/*con*/}
// // //             <span>
// // //               Cart
// // //               <span className='cartlogo_badge'>{cartItems.length}</span>
// // //             </span>
// // //           </Link>
// // //         </li>
// // //         <li>
// // //           <Link to="/patient">
// // //             Store
// // //           </Link>
// // //         </li>
// // //       </ul>
// // //       {/*menu*/}
// // //       <div className='ham_menu' onClick={click}>
// // //         <div></div>
// // //         <div></div>
// // //         <div></div>
// // //       </div>
// // //     </nav>
// // //   );
// // // };

// // // export default Navbar;

// // import React, { useState, useEffect } from 'react';
// // import { Link } from 'react-router-dom';
// // import axios from 'axios';
// // import { useCart } from '../Components/CartContext'; // Import the useCart hook

// // const Navbar = ({ click }) => {
// //   const { cartItems } = useCart();
// //   const [cartItemCount, setCartItemCount] = useState(0);

// //   useEffect(() => {
// //     const fetchCartItemCount = async () => {
// //       try {
// //         const response = await axios.get('http://localhost:8000/Patient/cartItemCount');
// //         if (response.status === 200) {
// //           setCartItemCount(response.data.itemCount);
// //         } else {
// //           console.error('Failed to get cart item count. Unexpected response:', response);
// //         }
// //       } catch (error) {
// //         console.error('Error getting cart item count:', error);
// //       }
// //     };

// //     fetchCartItemCount();
// //   }, []);

// //   return (
// //     <nav className="navbar">
// //       {/*logo*/}
// //       <div className="navbar_logo">
// //         <h2>Titans Pharmacy</h2>
// //       </div>
// //       {/* links*/}
// //       <ul className="navbar_links">
// //         <li>
// //           <Link to="/cart" className='cart__link'>
// //             <i className='fas fa-shopping-cart'></i>
// //             {/*con*/}
// //             <span>
// //               Cart
// //               <span className='cartlogo_badge'>{cartItemCount}</span>
// //             </span>
// //           </Link>
// //         </li>
// //         <li>
// //           <Link to="/patient">
// //             Store
// //           </Link>
// //         </li>
// //       </ul>
// //       {/*menu*/}
// //       <div className='ham_menu' onClick={click}>
// //         <div></div>
// //         <div></div>
// //         <div></div>
// //       </div>
// //     </nav>
// //   );
// // };

// // export default Navbar;

// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import axios from 'axios';
// import { useCart } from '../Components/CartContext'; // Import the useCart hook

// const Navbar = ({ click }) => {
//   const { cartItems } = useCart();
//   const [cartItemCount, setCartItemCount] = useState(0);

//   useEffect(() => {
//     const fetchCartItemCount = async () => {
//       try {
//         const response = await axios.get('http://localhost:8000/Patient/cartItemCount');
//         if (response.status === 200) {
//           setCartItemCount(response.data.itemCount);
//         } else {
//           console.error('Failed to get cart item count. Unexpected response:', response);
//         }
//       } catch (error) {
//         console.error('Error getting cart item count:', error);
//       }
//     };

//     fetchCartItemCount();
//   }, [cartItems]); // Trigger the effect whenever cartItems change

//   return (
//     <nav className="navbar">
//       {/*logo*/}
//       <div className="navbar_logo">
//         <h2>Titans Pharmacy</h2>
//       </div>
//       {/* links*/}
//       <ul className="navbar_links">
//         <li>
//           <Link to="/cart" className='cart__link'>
//             <i className='fas fa-shopping-cart'></i>
//             {/*con*/}
//             <span>
//               Cart
//               <span className='cartlogo_badge'>{cartItemCount}</span>
//             </span>
//           </Link>
//         </li>
//         <li>
//           <Link to="/patient">
//             Store
//           </Link>
//         </li>
//       </ul>
//       {/*menu*/}
//       <div className='ham_menu' onClick={click}>
//         <div></div>
//         <div></div>
//         <div></div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useCart } from '../Components/CartContext'; // Import the useCart hook

const Navbar = ({ click }) => {
  const { cartItems } = useCart();
  const [cartItemCount, setCartItemCount] = useState(0);

  useEffect(() => {
    const fetchCartItemCount = async () => {
      try {
        const response = await axios.get('http://localhost:8000/Patient/cartItemCount',{headers:{Authorization:'Bearer '+sessionStorage.getItem("token")}});
        if (response.status === 200) {
          setCartItemCount(response.data.itemCount);
        } else {
          console.error('Failed to get cart item count. Unexpected response:', response);
        }
      } catch (error) {
        console.error('Error getting cart item count:', error);
      }
    };

    // Fetch initially
    fetchCartItemCount();

    // Poll for updates every 5 seconds (adjust the interval as needed)
    // const intervalId = setInterval(fetchCartItemCount, 1000);

    // Cleanup interval on component unmount
    // return () => clearInterval(intervalId);
  }, []); // Runs once on mount

  return (
    <nav className="navbar">
      {/*logo*/}
      <div className="navbar_logo">
        <h2>Titans Pharmacy</h2>
      </div>
      {/* links*/}
      <ul className="navbar_links">
        <li>
          <Link to="/cart" className='cart__link'>
            <i className='fas fa-shopping-cart'></i>
            {/*con*/}
            <span>
              Cart
              <span className='cartlogo_badge'>{cartItemCount}</span>
            </span>
          </Link>
        </li>
        <li>
          <Link to="/patient">
            Store
          </Link>
        </li>
      </ul>
      {/*menu*/}
      <div className='ham_menu' onClick={click}>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </nav>
  );
};

export default Navbar;
