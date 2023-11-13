import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { finalAddress } from './addAddress';
import {total} from './orderDetails';
import { Method } from './paymentMethod';
function Success() {
useEffect(async () => {
    const response = await axios.post(
        `http://localhost:8000/Patient/checkout/`,
        {
            paymentMethod:Method,
            address:finalAddress,
        },
        {
          headers: {
            Authorization: 'Bearer ' + sessionStorage.getItem("token")
          },
          
        }
      );
      window.location ='/patient'
      console.log(response);
      alert('payment successful')
});

}

export default Success;