
import "./CartItem.css"
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useLocation, useParams } from 'react-router-dom';

let total = 0;
function arrayBufferToBase64(buffer) {
  let binary = '';
  const bytes = new Uint8Array(buffer);
  const len = bytes.byteLength;


  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }

  return btoa(binary);
}

const OrderDetails = ({ item }) => {
  const [cart, setCart] = useState(null);
  const [index, setIndex] = useState(0);
  const [flag, setflag] = useState(0);



  const getCart = async () => {
    await axios.get('http://localhost:8000/Patient/cartinCheckOut', {
      headers: {
        Authorization: 'Bearer ' + sessionStorage.getItem("token")//the token is a variable which holds the token
      }
    }).then(
      (res) => {
        const medicine = res.data
        console.log(medicine)
        console.log(medicine[0])
        setCart(medicine)

      }
    );
  }
  if (flag === 0) {
    getCart();
    setflag(1);
  }
  if (!cart) {
    return <div>Loading or no data in your order.</div>;
  }
  let elements = []; // Create an empty array
  elements.push(
    <div>
      <div className="cartitem">
        <h4> Order  Summary: </h4>
      </div>
    </div>
  )
  console.log(cart.medInfo);
  for (let i in cart.medInfo) {
    console.log(i)
    let medicine = cart.medInfo[i];
    total += cart.cartItems[i].price;

    elements.push(
      <div key={i}>
        <div className="cartitem">
          <div className="cart_image">
            {medicine.Picture && medicine.Picture.data && medicine.Picture.contentType && (
              <img
                src={`data:${medicine.Picture.contentType};base64,${arrayBufferToBase64(medicine.Picture.data.data)}`}
                alt={medicine.Name}
              />
            )}
          </div>
          <p>{medicine.Name}</p>
          <p className="Cart_price">${medicine.Price}</p>
          <p className="Cart_quantity">{cart.cartItems[i].quantity}</p>

        </div>
      </div>
    );
  }
  elements.push(
    <div>
      <div className="cartitem">
        Total:
        <p className="Cart_quantity"></p>
        <p className="Cart_quantity"></p>
        <p className="Cart_quantity">${total}</p>

      </div>

    </div>
  )
  console.log(elements);
  return <div>{elements}</div>;
  // return (


  //   <div>

  //   {cart.medicineInfo.map((medicine) => (
  //    <div> 
  //   <div className="cartitem">
  //     <div className="cart_image">
  //     {medicine.Picture && medicine.Picture.data && medicine.Picture.contentType && (
  //                       <img
  //                           src={`data:${medicine.Picture.contentType};base64,${arrayBufferToBase64(medicine.Picture.data.data)}`}
  //                           alt={medicine.Name}
  //                       />
  //                   )}
  //     </div>

  //       <p>{medicine.Name}</p>

  //     <p className="Cart_price">${medicine.Price}</p>

  //     {setIndex(index+1)}
  //     {index}
  //     </div>

  //   </div>
  //    ))}
  //    </div>
  // );
};
export { total };
export default OrderDetails;
