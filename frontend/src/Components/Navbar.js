import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-bootstrap/Modal';
import { useCart } from '../Components/CartContext';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Badge from 'react-bootstrap/Badge';
import validator from 'validator';
import Meds from './Meds';
import Homescreen from '../Screens/Homescreen';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Sidebar from './sidebar';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { Button as MyButton } from '@mui/material';
import PaidIcon from '@mui/icons-material/Paid';
import './Navbar.css'

const Navbar1 = ({ click, onSearch, onFilter }) => {
  const { cartItems } = useCart();
  const [cartItemCount, setCartItemCount] = useState(0);
  const [modalShow, setModalShow] = React.useState(false);
  const [medicalUses, setMedicalUses] = useState([]);
  const [filteredMedicines, setFilteredMedicines] = useState([]);
  const [searchedMedicines, setSearchedMedicines] = useState([]); // Updated variable name
  const [filteredAndSearchedMedicines, setFilteredAndSearchedMedicines] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  // const handleSearch = async (Name) => {
  //   try {
  //     const response = await axios.get(`http://localhost:7000/Patient/getMedicine/${Name}`, { headers: { Authorization: 'Bearer ' + sessionStorage.getItem("token") } });
  //     if (response.status === 200) {
  //       //setSearchedMedicines(response.data.Result);
  //       // Update filteredMedicines as well, if needed
  //       setFilteredMedicines(response.data.Result);
  //     } else {
  //       console.error('Failed to search medicines. Unexpected response:', response);
  //     }
  //   } catch (error) {
  //     console.error('Error:', error);
  //   }
  // };

  // const handleSearch = async () => {
  //   const inputValue = document.getElementById('searchInput').value;
  //   try {
  //     const response = await axios.get(`http://localhost:7000/Patient/getMedicine/${inputValue}`, { headers: { Authorization: 'Bearer ' + sessionStorage.getItem("token") } });
  //     if (response.status === 200) {
  //       setFilteredAndSearchedMedicines(response.data.Result);
  //     } else {
  //       console.error('Failed to search medicines. Unexpected response:', response);
  //     }
  //   } catch (error) {
  //     console.error('Error:', error);
  //   }
  // };
  // const handleSearch = async () => {
  //   const inputValue = document.getElementById('searchInput').value;
  //   try {
  //     const response = await axios.get(`http://localhost:7000/Patient/getMedicine/${inputValue}`, { headers: { Authorization: 'Bearer ' + sessionStorage.getItem("token") } });
  //     if (response.status === 200) {
  //       setFilteredAndSearchedMedicines(response.data.Result);
  //       onSearch(response.data.Result);
  //     } else {
  //       console.error('Failed to search medicines. Unexpected response:', response);
  //     }
  //   } catch (error) {
  //     console.error('Error:', error);
  //   }
  // };

  // const handleMedicalUseFilter = async (medicalUse) => {
  //   try {
  //     const response = await axios.get(`http://localhost:7000/Patient/filterMedical/${medicalUse}`, { headers: { Authorization: 'Bearer ' + sessionStorage.getItem("token") } });
  //     if (response.status === 200) {
  //       setFilteredAndSearchedMedicines(response.data.Result);
  //       onFilter(response.data.Result);
  //      // onSearch(response.data.Result);
  //     } else {
  //       console.error('Failed to filter medicines. Unexpected response:', response);
  //     }
  //   } catch (error) {
  //     console.error('Error:', error);
  //   }
  // };

  const signoutButtonFunc = () => {
    sessionStorage.removeItem('token');
    window.location.href = '/Health-Plus';
  };
  const token = sessionStorage.getItem("token");
  const navigateChat = () => {
    window.postMessage({ key: "token", value: sessionStorage.getItem("token") }, "*");
    window.location.href = `http://localhost:3000/Health-Plus/chat/${token}`;
  }

  // const handleMedicalUseFilter = async (medicalUse) => {
  //   try {
  //     const response = await axios.get(`http://localhost:7000/Patient/filterMedical/${medicalUse}`, { headers: { Authorization: 'Bearer ' + sessionStorage.getItem("token") } });
  //     if (response.status === 200) {
  //       setFilteredMedicines(response.data.Result);
  //       setFilteredAndSearchedMedicines(response.data.Result);
  //       onSearch(response.data.Result);
  //     } else {
  //       console.error('Failed to filter medicines. Unexpected response:', response);
  //     }
  //   } catch (error) {
  //     console.error('Error:', error);
  //   }
  // };
  function goBack() {

    // console.log(location.pathname.substring(0,14))
    // if(location.pathname.substring(0,14)==='/viewMyProfile'){

    //   window.location.href = '/Health-Plus/patientHome';
    //   return;      
    // }
    navigate(-1);

  }
  useEffect(() => {
    const fetchData = async () => {
      try {
        const cartResponse = await axios.get('http://localhost:7000/Patient/cartItemCount', { headers: { Authorization: 'Bearer ' + sessionStorage.getItem("token") } });
        if (cartResponse.status === 200) {
          setCartItemCount(cartResponse.data.itemCount);
        } else {
          console.error('Failed to get cart item count. Unexpected response:', cartResponse);
        }

        const medicalUsesResponse = await axios.get('http://localhost:7000/Patient/getAllMedicalUses', { headers: { Authorization: 'Bearer ' + sessionStorage.getItem("token") } });
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
    const intervalId = setInterval(fetchData, 1000);

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, []); // Runs once on mount

  return (

    <Navbar key={'xl'} expand={'xl'} className="bg-body-tertiary mb-3">
      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
      <Container fluid>
        <MyButton
          // hena link el chatting
          variant="text"
          style={{ color: 'black' }}
          onClick={() => { goBack() }}
          sx={{ my: 1, mx: 0 }}
          size="small"

        >
          <ArrowBackIosIcon />

        </MyButton>
        <Navbar.Brand href="/patient">Titans Pharmacy</Navbar.Brand>
        <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${'xl'}`} />
        
        <Navbar.Offcanvas
          id={`offcanvasNavbar-expand-${'xl'}`}
          aria-labelledby={`offcanvasNavbarLabel-expand-${'xl'}`}
          placement="end"
        >

          <Nav className="justify-content-end flex-grow-1 pe-3">
            <Nav.Link href="/wallet">
              <Button className="navButton">
                <PaidIcon />
                Wallet
              </Button>
            </Nav.Link>
            <Nav.Link href="/cart">
              <Button className='navButton'>
                Cart <Badge bg="secondary">{cartItemCount}</Badge>
              </Button>
            </Nav.Link>


            <Nav.Link href="/patient">
              <Button className='navButton'>
                Home
              </Button>
            </Nav.Link>



            {/*<Nav.Link href="/orderDetails">Order</Nav.Link>
            <Nav.Link href="/patient">Store</Nav.Link>
            <NavDropdown title="Filter" id="basic-nav-dropdown">
              {medicalUses.map((use, index) => (
                <NavDropdown.Item key={index} onClick={() => handleMedicalUseFilter(use)}>
                  {use}
                </NavDropdown.Item>
              ))}
              </NavDropdown>*/}

            {/* Display filtered medicines
            <Nav.Link>
              <Button variant="danger" onClick={signoutButtonFunc}>Sign Out</Button>
            </Nav.Link> */}

            {/* <Nav.Link><Button variant="light" onClick={() => setModalShow(true)}>Change Password</Button></Nav.Link> */}

          </Nav>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
};

export default Navbar1;

function MyVerticallyCenteredModal(props) {
  const [oldPassword, setoldPassword] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessagePass, setErrorMessagePass] = useState('')
  const validatePass = (value) => {
    setPassword(value);
    if (value !== '' && validator.isStrongPassword(value, {
      minLength: 8, minLowercase: 1,
      minUppercase: 1, minNumbers: 1, minSymbols: 0
    })) {
      setErrorMessagePass('Is Strong Password')
    } else {
      setErrorMessagePass('Password has to be 8 characters long and contain at least 1 lowercase, 1 uppercase, 1 number ')
    }
  }
  const changePassword = async (event) => {
    event.preventDefault(); // Prevent the default form submission behavior

    // Create a JSON object with the username and password
    const data = { password, oldPassword };

    fetch('http://localhost:7000/security/changePassword', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + sessionStorage.getItem("token") },
      body: JSON.stringify(data),
    }).then((response) => response.json()).then(data => {
      console.log(data);
      if (data.success) {
        alert("Password Changed Successfully")
        sessionStorage.removeItem('token');
        window.location.href = '/Health-Plus';
      }
      else {
        alert(data.message)
      }
    })
      .catch((error) => {

        console.error('Error:', error);
        alert(error.response.data.message)

      });
    // Make a POST request to your backend register route
  };

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Change Password
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>Enter your new Password</h4>
        <label htmlFor="oldPassword">old Password:</label>
        <input
          type="password"
          value={oldPassword}
          onChange={(e) => setoldPassword(e.target.value)}></input>

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => validatePass(e.target.value)}></input> <br />
        {errorMessagePass && <p>{errorMessagePass}</p>}
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
        <Button variant="success" onClick={changePassword} disabled={errorMessagePass !== 'Is Strong Password'}>Update Password</Button>
      </Modal.Footer>
    </Modal>
  );
}
