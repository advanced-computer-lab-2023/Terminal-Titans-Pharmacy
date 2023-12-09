import "../Styles/LoginForm.css";
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { Button } from "@mui/material";
import {finalAddress} from './addAddress';
import {wallet,total} from './orderDetails';
import Typography from '@mui/material/Typography';

let Method='COD';
const PaymentPage = () => {
  const [value, setValue] = React.useState('COD');
   

    const handleChange = (event) => {
      setValue(event.target.value);
    };


  const handlePayment = async () => {
    console.log(finalAddress);
    try {
      const response = await axios.post(
        `http://localhost:7000/Patient/payment/`,
        {
          paymentMethod: value,
          address: finalAddress,
          
        },
        {
          headers: {
            Authorization: 'Bearer ' + sessionStorage.getItem("token")
          },
          
        }
      );
      console.log(response);
      console.log('l')
      if (response.status === 200) {
        if(response.data.url){
          const url = response.data.url;
          window.location = url;
        }else{
             //window.location ='/patient'
          //setErrorMessage("Success");
        }
      } else {
        alert(response.data)
        //setErrorMessage(response.data.message);
      }
    } catch (error) {
      console.error('Error in payment:', error.message);
     // setErrorMessage(error.message);
    }
  };

  useEffect(() => {
  }, []);

  return (
    <div>
      <h1>Select Payment Method</h1>
      <Typography variant="h2" component="div" style={{textAlign:'center'}}>
       ${total}
      </Typography>
      <FormControl style={{width:'100%',textAlign:'left'}}>
            <FormLabel id="">Payment Method</FormLabel>
            <RadioGroup
                aria-labelledby="demo-controlled-radio-buttons-group"
                name="controlled-radio-buttons-group"
                value={value}
                onChange={handleChange}
            >
              <FormControlLabel value="COD" control={<Radio />} label="Cash On Delievery" />
                <FormControlLabel value="card" control={<Radio />} label="Card" />
                {wallet < total ? (
                    <FormControlLabel
                        value="wallet"
                        disabled
                        control={<Radio />}
                        label={`Wallet ($${wallet})`}
                    />
                ) : (
                    <FormControlLabel
                    value="wallet"
                    control={<Radio />}
                    label={`Wallet ($${wallet})`}
                />
                )}
            </RadioGroup>
        </FormControl>
      
        <Button size="small" variant='dark' style={{marginLeft:'70%',width:'20%'}}
        onClick={handlePayment}
        >Proceed</Button>
      
    </div>
  );
};
export {Method}
export default PaymentPage;
