// import React, { useState } from 'react';
// import '../Styles/checkout.css';
import Address from './addAddress';
import OrderDetails from './orderDetails';
import '../Styles/orderDetails.css';
import Payment from './paymentMethod';
import * as React from 'react';
import {useState,useEffect} from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Paper from '@mui/material/Paper';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { finalAddress,indexAddress } from './addAddress';
import axios from 'axios';
import {wallet,total} from './orderDetails';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Navbar from '../Components/Navbar';


import { Method } from './paymentMethod';


const steps = ['Review Order', 'Shipping Addres', 'Payment'];




function Checkout() {
  const params = new URLSearchParams(window.location.search);
    const id = params.get('id');
  const [activeStep, setActiveStep] = React.useState(0);
  const [value, setValue] =  useState("card");
  const  sessid  = params.get('sessid');
  if(sessid){
    sessionStorage.setItem("token", sessid);
  }

  const handleChange = (event) => {
    setValue(event.target.value);
   
    console.log(value)
    setValue(event.target.value);


  };


  const handleNext = () => {
    if(activeStep==steps.length-1)
    {
    console.log(value);
      console.log("pop")
     handlePayment();
     if(value=="card"){
     setActiveStep(activeStep);
      return;
     }
    }
    console.log("pop2")
    setActiveStep(activeStep + 1);

  };
const goToHome = () => {
    window.location.href = '/patient';
  }
  const handleBack = () => {
    
    setActiveStep(activeStep - 1);
  };


  const handlePayment = async () => {
    console.log(value);
    console.log("k");
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
 
  function getStepContent(step) {
  if(id){
    setActiveStep(3);
  
  return;}
    console.log(finalAddress)
      switch (step) {
        case 0:
          return <OrderDetails />;
        case 1:
          
          return <Address />;
        case 2:
          if(indexAddress==-1)
          {
            alert("Please select an address");
            setActiveStep(1);
            return <Address />;
          }
          else
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
          </div>);
        default:
          throw new Error('Unknown step');
      }
    }
  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar
        position="absolute"
        color="default"
        elevation={0}
        sx={{
          position: 'relative',
          borderBottom: (t) => `1px solid ${t.palette.divider}`,
        }}
      >
       <Toolbar>
           <Typography variant="h6" color="inherit" noWrap onClick={goToHome}>
            Terminal Pharmacy
          </Typography>
        </Toolbar>
      </AppBar>
      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
        <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
          <Typography component="h1" variant="h4" align="center">
            Checkout
          </Typography>
          <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {activeStep === steps.length  ? (
            
            <React.Fragment>
              <Typography variant="h5" gutterBottom>
                Thank you for your order.
              </Typography>
              <Typography variant="subtitle1">
                Your order number is #2001539.  We will send you an update when your order has
                shipped.
              </Typography>
            </React.Fragment>
          ) : (
            <React.Fragment>
              {getStepContent(activeStep)}
              <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                {activeStep !== 0 && (
                  <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                    Back
                  </Button>
                )}

                <Button
                  variant="contained"
                  onClick={handleNext}
                  sx={{ mt: 3, ml: 1 }}
                >
                  {activeStep === steps.length - 1 ? 'Place order' : 'Next'}
                </Button>
              </Box>
            </React.Fragment>
          )}
        </Paper>
        
      </Container>
    </React.Fragment>
  );
}

export default Checkout;
