// import "./cartScreen.css"
// import CartItem from "../Components/CartItem";
// const cartScreen = () =>{
//     return(
//         <div className="cartscreen">
//             <div className="cart_left">
//                 <h2>Shopping Cart</h2>
//                 <CartItem/>
//                 <CartItem/>
//                 <CartItem/>

//                 <CartItem/>

//             </div>
//             <div className="cart_right">
//                 <div className="cart_info">
//                     <p>Subtotal (0) items</p>
//                     <p>$1000</p>
//                 </div>
//                 <div>
//                     <button>Checkout</button>        
//                 </div>
        
//             </div>

//         </div>
//     )
// } 

// export default cartScreen;


import React, { useState, useEffect } from 'react';
import axios from 'axios';

import "./cartScreen.css";
import CartItem from "../Components/CartItem";

const CartScreen = () => {
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        // Make a GET request to your backend API to fetch cart items
        axios.get('http://localhost:8000/Patient/cart')
            .then((response) => {
                setCartItems(response.data);
            })
            .catch((error) => {
                console.error('Error fetching cart items:', error);
            });
    }, []);

    // Calculate the total price based on the items in the cart
    const calculateSubtotal = () => {
        return cartItems.reduce((total, item) => total + item.price, 0);
    };

    return (
        <div className="cartscreen">
            <div className="cart_left">
                <h2>Shopping Cart</h2>
                {cartItems.map((item) => (
                    <CartItem key={item._id} item={item} />
                ))}
            </div>
            <div className="cart_right">
                <div className="cart_info">
                    <p>Subtotal ({cartItems.length}) items</p>
                    <p>${calculateSubtotal()}</p>
                </div>
                <div>
                    <button>Checkout</button>
                </div>
            </div>
        </div>
    );
};

export default CartScreen;

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// import "./cartScreen.css";
// import CartItem from "../Components/CartItem";

// const CartScreen = () => {
//     const [cartItems, setCartItems] = useState([]);

//     useEffect(() => {
//         // Make a GET request to your backend API to fetch cart items
//         axios.get('http://localhost:8000/Patient/cart')
//             .then((response) => {
//                 setCartItems(response.data);
//             })
//             .catch((error) => {
//                 console.error('Error fetching cart items:', error);
//             });
//     }, []);

//     return (
//         <div className="cartscreen">
//             <div className="cart_left">
//                 <h2>Shopping Cart</h2>
//                 {cartItems.map((item) => (
//                     <CartItem key={item._id} item={item} />
//                 ))}
//             </div>
//             <div className="cart_right">
//                 <div className="cart_info">
//                     <p>Subtotal ({cartItems.length}) items</p>
//                     {/* Calculate the total price based on the items in the cart */}
//                     <p>${cartItems.reduce((total, item) => total + item.price, 0)}</p>
//                 </div>
//                 <div>
//                     <button>Checkout</button>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default CartScreen;
