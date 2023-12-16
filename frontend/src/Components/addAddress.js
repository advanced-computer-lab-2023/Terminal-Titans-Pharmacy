import "../Styles/LoginForm.css";
import '../Styles/address.css';

import axios from 'axios';
import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { useEffect, useState } from 'react';
import { Button } from "@mui/material";
import { Unstable_Popup as BasePopup } from '@mui/base/Unstable_Popup';
import { styled } from '@mui/system';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import SliderValueLabel from "@mui/material/Slider/SliderValueLabel";
var finalAddress;
var indexAddress;
function Address() {
  const [addresses, setAddresses] = useState([]);
  const [address, setAddress] = useState('');
  const [selectedAddress, setselectedAddress] = useState(-1);
  const [flag, setFlag] = useState(false);
  const [name, setName] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [anchor, setAnchor] = React.useState(null);
  const [error, setError] = useState(false);

  const handleClick = (event) => {
    setAnchor(anchor ? null : event.currentTarget);
  };

  const open = Boolean(anchor);
  const id = open ? 'simple-popup' : undefined;


  const handleChooseAddress = (event) => {
    console.log(event.target.value);
    console.log("k");
    const temp=event.target.value.split(",");
          console.log(temp[0])
          setAddress(temp[0]);
          setCity(temp[1]);
          setCountry(temp[2]);
    const index=addresses.indexOf(event.target.value);
    setselectedAddress(index);
    finalAddress = event.target.value;
    indexAddress=index;
  }

  const addAddress = async (event) => {
    event.preventDefault(); // Prevent the default form submission behavior
    if (!address || !city || !country) {
      setError(true);
      return;
    }
    // Create a JSON object with the username and password
    const newAddress=address+","+city+","+country;
    const data = { address: newAddress };

    // Make a POST request to your backend register route
    await fetch('http://localhost:7000/Patient/addAddress', {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + sessionStorage.getItem("token"),//the token is a variable which holds the token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json()).then(data => {
        window.location.reload();
        if (data.success) {
          setFlag(true);
        }
        else {
          alert(data.message)
        }
      })
      .catch((error) => {

        console.error('Error:', error);
      });

  };
  const getAddresses = async () => {
    fetch('http://localhost:7000/Patient/getAddresses', {
      headers: {
        Authorization: 'Bearer ' + sessionStorage.getItem("token"),//the token is a variable which holds the token,
        'Content-Type': 'application/json',
      }
    })
      .then(response => response.json())
      .then(data =>{ 
        console.log(data.result.address.length)
        setName(data.result.Name);
        setAddresses(data.result.address);
        if(data.result.address.length>0){
          setselectedAddress(data.result.address.length-1);
          finalAddress =data.result.address[data.result.address.length-1];
          setFlag(true);
          const temp=data.result.address[data.result.address.length-1].split(",");
          console.log(temp[0])
          setAddress(temp[0]);
          setCity(temp[1]);
          setCountry(temp[2]);
          console.log(address)
          indexAddress=data.result.address.length-1;
        }
      })
      .catch(error => console.error('Error fetching addresses: ', error));
    }
  useEffect(() => {
    // Fetch addresses when the component mounts
    getAddresses();
      
      //console.log(finalAddress)
  }, []);
  const PopupBody = styled('div')(
    ({ theme }) => `
    width: max-content;
    padding: 12px 16px;
    margin: 8px;
    border-radius: 8px;
    border: 1px solid ${theme.palette.mode === 'dark' ? '#434D5B' :'#DAE2ED'};
    background-color: ${theme.palette.mode === 'dark' ? '#1C2025' : '#fff'};
    box-shadow: ${
      theme.palette.mode === 'dark'
        ? `0px 4px 8px rgb(0 0 0 / 0.7)`
        : `0px 4px 8px rgb(0 0 0 / 0.1)`
    };
    font-family: 'IBM Plex Sans', sans-serif;
    font-size: 0.875rem;
    z-index: 1;
  `,
  );
  const resetForm = (event) => {
    setselectedAddress(-1);
    setFlag(false);
    setAddress('');
    setCity('');
    setCountry('');
    indexAddress=-1;
    setAnchor(anchor ? null : event.currentTarget);
  }
  const popup=(
    
<BasePopup id={id} open={open} anchor={anchor}>
<PopupBody>
<FormControl style={{width:'100%',textAlign:'left'}}>
            <FormLabel id="">Choose Address</FormLabel>
            <RadioGroup
                aria-labelledby="demo-controlled-radio-buttons-group"
                name="controlled-radio-buttons-group"
                value={address+","+city+","+country}
                onChange={handleChooseAddress}
                
            >
                {addresses.map((value,index) => (
                    <FormControlLabel value={value} control={<Radio />} label={value}  />
                ))}
               
                
            </RadioGroup>
        </FormControl>
        <Button variant="contained" color="primary" onClick={resetForm} style={{marginBottom:"10px",width:'100%'}}>
             Add new address
           </Button>
           <br></br>
           <Button variant="contained" color="primary" onClick={handleClick}  style={{width:'100%'}}>
             Save
           </Button>

</PopupBody>
      </BasePopup>
  )
 console.log(selectedAddress==-1)
    return (
      <React.Fragment>
        <Typography variant="h6" gutterBottom>
          Shipping address
        </Typography>
      
        <Grid container spacing={3}>
         
         {selectedAddress===-1?(
          console.log("here"), 
          <Grid item xs={12}>
           <TextField
          required
          fullWidth
          id="outlined-required"
          label="address"
          onChange={(event) => setAddress(event.target.value)}
          error={address === '' && error}
        />
          </Grid>
         ):(
          console.log("here2"),
          console.log(address),
          
          <Grid item xs={12}>
           
          <input  type="text" id="add"  style={{width: "50%", border:"0px", padding:'8px'}} value='Address'  />
        <input type="text" id="add"  style={{width: "50%", border:"0px",padding:'8px'}} value={address}  />


          </Grid>
         )}
            {selectedAddress===-1?( 
          <Grid item xs={12} sm={6}>
             <TextField
          required
          fullWidth
          id="outlined-required2"
          label="city"
          onChange={(event) => setCity(event.target.value)}
          error={city === '' && error}
        />
          </Grid>
         ):(
          <Grid item xs={12} >
            <input  type="text" id="add"  style={{width: "50%", border:"0px", padding:'8px'}} value='City'  />
        <input type="text" id="add"  style={{width: "50%", border:"0px",padding:'8px'}} value={city}  />
      
          </Grid>
         )}
          {selectedAddress==-1?( 
          <Grid item xs={12} sm={6}>
             <TextField
          required
          fullWidth
          id="outlined-required"
          label="country"
        error={country === '' && error}
              onChange={(event) => setCountry(event.target.value)}
            />
          </Grid>
         ):(

          <Grid item xs={12} >
         
         <input  type="text" id="add"  style={{width: "50%", border:"0px", padding:'8px'}} value='Country'  />
        <input type="text" id="add"  style={{width: "50%", border:"0px",padding:'8px'}} value={country}  />

          </Grid>
         )}
         {selectedAddress==-1?( 
           <Grid item xs={12} sm={6}>
           <Button variant="contained" color="primary" onClick={addAddress}>
             Add address
           </Button>
         </Grid>
         ):(
          <Grid item xs={12}>
          <Button variant="contained" color="primary"onClick={handleClick}>
            change address
          </Button>
          
       {popup}

        </Grid>
         )}
        
         
          
          
          </Grid>
          
          
         
      </React.Fragment>
      
    );



}
export { finalAddress,indexAddress };
export default Address;
