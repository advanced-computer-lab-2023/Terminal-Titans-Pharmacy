import FilterListIcon from '@mui/icons-material/FilterList';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import Popper from '@mui/material/Popper';
import { css, styled } from '@mui/material/styles';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Meds from '../Components/Meds';
import Nav from "../Components/Admin-NavBar"
import "./Homescreen.css";
import "../Screens/AdminScreen.css";

import { useParams } from 'react-router-dom';

const Homescreen = () => {
  const [allMedicines, setAllMedicines] = useState([]);
  const [medicalUses, setMedicalUses] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [medicalUseValue, setMedicalUseValue] = React.useState('');

  // get from params token
  const params = new URLSearchParams(window.location.search);
  const  sessid  = params.get('id');
  if(sessid){
    sessionStorage.setItem("token", sessid);
  }

  const getMedicines = async () => {
    //   setAnchorEl(null);
    try {
      const response = await fetch('http://localhost:7000/Admin/getAllMedicine/', { headers: { Authorization: 'Bearer ' + sessionStorage.getItem("token") } });
      debugger
      const jsonData = await response.json();

      if (Array.isArray(jsonData.Result)) {
        setAllMedicines(jsonData.Result);
      } else {
        console.error('Invalid data format. Expected an array.');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  useEffect(() => {
    getMedicines();
  }, []);

  const handleSearch = async () => {
    const inputValue = document.getElementById('searchInput').value;
    try {
      const response = await axios.get(`http://localhost:7000/Admin/getMedicine/${inputValue}`, { headers: { Authorization: 'Bearer ' + sessionStorage.getItem("token") } });

      if (response.status === 200) {
        const result = response.data.Result;

        if (result && result.Quantity > 0) {
          setAllMedicines([response.data.Result]);
        } else if (result && result.Quantity === 0) {
          setErrorMessage(`The medicine is out of stock. Here are some alternatives.`);

          // Set a timer to clear the error message after 2 minutes (adjust as needed)
          setTimeout(() => {
            setErrorMessage('');
          }, 4000);

        //   const alternativesResponse = await axios.get(`http://localhost:7000/Admin/findAlternatives/${inputValue}`, { headers: { Authorization: 'Bearer ' + sessionStorage.getItem("token") } });

        //   if (alternativesResponse.status === 200) {
        //     setAllMedicines(alternativesResponse.data.Alternatives);
        //   } else {
        //     console.error('Failed to find alternatives. Unexpected response:', alternativesResponse);
        //   }
        }
      } else {
        console.error('Failed to search medicines. Unexpected response:', response);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleMedicalUseFilter = async (medicalUse) => {
    try {
      // setAnchorEl(null);

      const response = await axios.get(`http://localhost:7000/Admin/filterMedical/${medicalUse}`, { headers: { Authorization: 'Bearer ' + sessionStorage.getItem("token") } });
      if (response.status === 200) {
        setAllMedicines(response.data.Result);
      } else {
        console.error('Failed to filter medicines. Unexpected response:', response);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const medicalUsesResponse = await axios.get('http://localhost:7000/Admin/getAllMedicalUses', { headers: { Authorization: 'Bearer ' + sessionStorage.getItem("token") } });
        if (medicalUsesResponse.status === 200) {
          setMedicalUses(medicalUsesResponse.data.medicalUses);
        } else {
          console.error('Failed to get medical uses. Unexpected response:', medicalUsesResponse);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    // Fetch initially
    fetchData();

    // Poll for updates every 5 seconds (adjust the interval as needed)
    const intervalId = setInterval(fetchData, 5000);

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, []); // Runs once on mount

  const handleClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };
  const StyledPopperDiv = styled('div')(
    ({ theme }) => css`
      background-color: ${theme.palette.mode === 'dark' ? '#1C2025' : '#fff'};
      border-radius: 8px;
      border: 1px solid ${theme.palette.mode === 'dark' ? '#434D5B' : '#DAE2ED'};
      box-shadow: ${theme.palette.mode === 'dark'
        ? `0px 4px 8px rgb(0 0 0 / 0.7)`
        : `0px 4px 8px rgb(0 0 0 / 0.1)`};
      padding: 0.75rem;
      color: ${theme.palette.mode === 'dark' ? '#E5EAF2' : '#434D5B'};
      font-size: 0.875rem;
      font-family: 'IBM Plex Sans', sans-serif;
      font-weight: 500;
      opacity: 1;
      margin: 0.25rem 0;
    `,
  );
  const open = Boolean(anchorEl);

  return (
    <div>
    <Nav/>
    <div style={{ padding:'2%' }}>
     <div>
      <InputGroup className="mb-3">
        <Button

          variant="outline-secondary"
          className='admin-button'
          title="Search"
          id="segmented-button-dropdown-1"
          onClick={handleSearch}
        >
          Search
          {/* <Dropdown.Header>Filter</Dropdown.Header>
          {medicalUses.map((use, index) => (
            <Dropdown.Item key={index} onClick={() => handleMedicalUseFilter(use)}>
              {use}
            </Dropdown.Item>
          ))}
          <Dropdown.Divider /> */}
        </Button>
        <Form.Control
          id="searchInput"
          type="search"
          placeholder="Search"
          aria-label="Text input for search"
        />
         <Button
          variant="outline-secondary"
          className='admin-button'
          title="Search"
          id="segmented-button"
          onClick={handleClick}
        >  <FilterListIcon />
        Filter</Button>
        <Popper id={open ? 'simple-popper' : undefined} open={open} anchorEl={anchorEl} style={{width:'20%'}}>
        <StyledPopperDiv>
        <FormControl fullWidth>
         <InputLabel id="demo-simple-select-label">Medical Use</InputLabel>
        <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={medicalUseValue}
            label="medicalUse"
            
            onChange={(e) => setMedicalUseValue(e.target.value)}          
          >
            <MenuItem value=''>any</MenuItem> 
            {medicalUses.map((use, index) => (
               <MenuItem value={use}>
                {use}
               </MenuItem>
           
            ))}
    </Select>
    <div>
      <Button variant="outline-dark" style={{ width: '45%', marginRight: '5%', marginTop: '2%' }} onClick={() => { handleClick(); handleMedicalUseFilter(medicalUseValue); }}>
        Filter
      </Button>
      <Button variant="outline-dark" style={{ width: '45%', marginTop: '2%' }} onClick={() => { handleClick(); getMedicines(); }}>
        Reset
      </Button>
    </div>
    </FormControl>
          </StyledPopperDiv>
        </Popper>

        </InputGroup>
        {errorMessage && (
          <div className="alert alert-danger" role="alert">
            {errorMessage}
          </div>
        )}
       </div>
      <div className="homescreen_admin">
        <h2 className="homescreen_title">Meds</h2>
        <div className="homescreen_meds_admin" >
          {Array.isArray(allMedicines) ? (
            allMedicines.map((medicine) => <Meds key={medicine.Name} medicines={[medicine]} />)
          ) : (
            <p>Error: Medicines data is not in the expected format.</p>
          )}
        </div>

      </div>
    </div>
    </div>
  );
};

export default Homescreen;
