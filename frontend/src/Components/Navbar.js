import './Navbar.css';
// export default Navbar;
import React, { useState, useEffect } from 'react';
import validator from 'validator'
import Modal from 'react-bootstrap/Modal';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useCart } from '../Components/CartContext'; // Import the useCart hook
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Badge from 'react-bootstrap/Badge';

const Navbar1 = ({ click }) => {
  const { cartItems } = useCart();
  const [cartItemCount, setCartItemCount] = useState(0);
  const [modalShow, setModalShow] = React.useState(false);


  const signoutButtonFunc = () => {
    sessionStorage.removeItem('token');
    window.location.href = '/Health-Plus';
  }

  useEffect(() => {
    const fetchCartItemCount = async () => {
      try {
        const response = await axios.get('http://localhost:8000/Patient/cartItemCount', { headers: { Authorization: 'Bearer ' + sessionStorage.getItem("token") } });
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
    const intervalId = setInterval(fetchCartItemCount, 1000);

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
        <Navbar.Brand href="/patient">Titans Pharmacy</Navbar.Brand>
        <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${'xl'}`} />
        <Navbar.Offcanvas
          id={`offcanvasNavbar-expand-${'xl'}`}
          aria-labelledby={`offcanvasNavbarLabel-expand-${'xl'}`}
          placement="end"
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${'xl'}`}>
              Titans Pharmacy
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav className="justify-content-end flex-grow-1 pe-3">
              <Nav.Link href="/cart">
                <Button variant="primary">
                  Cart <Badge bg="secondary">{cartItemCount}</Badge>
                </Button>
                {/* <Link to="/cart">
                  <i className='fas fa-shopping-cart'></i>
                  <span>
                    Cart
                    <span className='cartlogo_badge'>{cartItemCount}</span>
                  </span>
                </Link> */}
              </Nav.Link>
              <Nav.Link href="/orderDetails">Order</Nav.Link>
              <Nav.Link href="/patient">Store</Nav.Link>
              <Nav.Link><Button variant="light" onClick={() => setModalShow(true)}>Change Password</Button></Nav.Link>
              <Nav.Link>
                <Button variant="danger" onClick={signoutButtonFunc}>Sign Out</Button>
              </Nav.Link>
              {/* <NavDropdown
                title="Dropdown"
                id={`offcanvasNavbarDropdown-expand-${'xl'}`}
              >
                <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action4">
                  Another action
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action5">
                  Something else here
                </NavDropdown.Item>
              </NavDropdown> */}
            </Nav>
            {/* <Form className="d-flex">
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
              />
              <Button variant="outline-success">Search</Button>
            </Form> */}
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
    // <nav className="navbar">
    //   {/*logo*/}
    //   <div className="navbar_logo">
    //     <h2>Titans Pharmacy</h2>
    //   </div>
    //   {/* links*/}
    //   <ul className="navbar_links">
    //     <li>
    //       <Link to="/cart" className='cart__link'>
    //         <i className='fas fa-shopping-cart'></i>
    //         {/*con*/}
    //         <span>
    //           Cart
    //           <span className='cartlogo_badge'>{cartItemCount}</span>
    //         </span>
    //       </Link>
    //     </li>
    //     <li>
    //       <Link to="/patient">
    //         Store
    //       </Link>
    //     </li>
    //     <li>
    //       <Link to="/orderDetails">
    //         Orders
    //       </Link>
    //     </li>
    //   </ul>
    //   {/*menu*/}
    //   <div className='ham_menu' onClick={() => { console.log('Navbar Clicked'); click(); }}>
    //   <div></div>
    //   <div></div>
    //   <div></div>
    //  </div>
    // </nav>
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

    fetch('http://localhost:8000/security/changePassword', {
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
        {errorMessagePass === '' ? null :
          <h5 style={{
            color: 'red',
          }}>{errorMessagePass}</h5>}
        <br />
      </Modal.Body>
      <Modal.Footer>
        <Button type="submit" onClick={changePassword}>Submit</Button>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}