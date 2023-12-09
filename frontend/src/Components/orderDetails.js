
import '../Styles/orderDetails.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useParams } from 'react-router-dom';
import Typography from '@mui/material/Typography';

var total;
var wallet;

const OrderDetails = ({ item }) => {
  const [cart, setCart] = useState(null);
  const [index, setIndex] = useState(0);
  const [fees, setFees] = useState(0);
  



  const getCart = async () => {
    await axios.get('http://localhost:7000/Patient/cartinCheckOut', {
      headers: {
        Authorization: 'Bearer ' + sessionStorage.getItem("token")//the token is a variable which holds the token
      }
    }).then(
      (res) => {
        const medicine = res.data
        console.log(medicine)
        setCart(medicine)
        setFees(medicine.total)
total=medicine.total
wallet=medicine.wallet
      }
    );
  }
  useEffect(() => {
    getCart();
  }, []);
  if (!cart) {
    return <div>Loading or no data in your order.</div>;
  }
  let elements = []; // Create an empty array
  
  console.log(cart.medInfo);
  for (let i in cart.medInfo) {
    let medicine = cart.medInfo[i];
console.log(cart)
    elements.push(
      <div key={i}>
        <div className="cartitem">
        
          
          <p>{medicine.Name}</p>
          <p className="Cart_price">${medicine.Price}</p>
          <p className="Cart_quantity">{cart.medInfo[i].Quantity}</p>

        </div>
      </div>
    );
  }

  
  return ( 
  <div >


     
      
      <Typography variant="h2" component="div" style={{textAlign:'center'}}>
       ${fees}
      </Typography>
      <br></br>
      <div>{elements}</div>
     
     
  
  </div>);

};
export{total,wallet}
export default OrderDetails;
