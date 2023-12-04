// export default Meds2;
import React, { useState, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import axios from 'axios';
import './Meds.css';
import PharmNav from '../Components/Pharmacist-NavBar';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './PharmMedView.css';


function arrayBufferToBase64(buffer) {
    let binary = '';
    const bytes = new Uint8Array(buffer);
    const len = bytes.byteLength;

    for (let i = 0; i < len; i++) {
        binary += String.fromCharCode(bytes[i]);
    }

    return btoa(binary);
}

function Meds2() {
    const [medicines, setMedicines] = useState([]);
    const location = useLocation();
    const { medicineId } = useParams();
    const userId = new URLSearchParams(location.search).get('medicineId');
    const [selectedQuantity, setSelectedQuantity] = useState(1);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        const userId = new URLSearchParams(location.search).get('medicineId');
        console.log('UserId:', userId);

        const fetchMedicines = async () => {
            try {
                const response = await axios.get('http://localhost:8000/Pharma/getAllMedicines', { headers: { Authorization: 'Bearer ' + sessionStorage.getItem("token") } }
                );
                const jsonData = response.data.meds;
                console.log(response);
                setMedicines(jsonData);
              
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchMedicines();
    }, [location.search]);

    if (!medicines || medicines.length === 0) {
        return <div>Loading or no data available.</div>;
    }

    const findMedicineById = (medicines, userId) => {
        for (let i = 0; i < medicines.length; i++) {
            if (medicines[i]._id === userId) {
                return medicines[i];
            }
        }
        return null;
    };

    const medicine = findMedicineById(medicines, userId);

    if (!medicine) {
        return <div>Medicine not found</div>;
    }

    const handleQuantityChange = (event) => {
        const newQuantity = parseInt(event.target.value);
        setSelectedQuantity(newQuantity);
    };

    const divStyles = {
        boxShadow: '1px 2px 9px #666',
        margin: '4em',
        padding: '1em',
        margin: 'auto',
        borderRadius:'10px'
      };
    return (
        <div> 
            <PharmNav/>

            <Container style={divStyles} >
      <Row sm={12} md={9} lg={9}>
        <Col sm={12} md={12} lg={6}>
        <div className="left_img">
                {medicine.Picture && medicine.Picture.data && medicine.Picture.contentType && (
                    <img
                        src={`data:${medicine.Picture.contentType};base64,${arrayBufferToBase64(
                            medicine.Picture.data.data
                        )}`}
                        className=".imagesize"
                        alt={medicine.Name}
                    />
                )}
            </div>
            <Row>
          <Col sm={0} className='editsectionMdLg'>

            <p style={{margin:'auto'}}>Additional Text Here</p>
          </Col>
        </Row>
        </Col>
        <Col sm={12} md={12} lg={6}>
        <div className="left_info">
                <p className="left_name">{medicine.Name}</p>
                <p>Price: ${medicine.Price}</p>
                <p> Active Ingredients: <span>{medicine.ActiveIngredients}</span></p>
                <p>Medical use: {medicine.MedicalUse.join(' ')}</p>
                <p>  Quantity: <span>{medicine.Quantity}</span></p>
                <p>  Sales: <span>{medicine.Sales}</span> </p>
                
            </div>
        </Col>
      </Row>
    </Container>

             <div className="meds">
        <div className="medscreen_left">
           
            <div className="left_info">
                <p className="left_name">{medicine.Name}</p>
                <p>Price: ${medicine.Price}</p>
                <p>Medical use: {medicine.MedicalUse.join(' ')}</p>
                <p>  Quantity: <span>{medicine.Quantity}</span></p>
            </div>
        </div>
        <div className="medscreen_right">
            <div className="right_info">
                <p>
                    Price: <span>${medicine.Price}</span>
                </p>
                <p>
                    Status: <span>{medicine.Quantity > 0 ? 'In stock' : 'Out of stock'}</span>
                </p>
                <p>
                    Quantity: <span>{medicine.Quantity}</span>
                </p>
                <p>
                   
                </p>
                {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
            </div>
        </div>
    </div>
    </div>
      
    );
};

export default Meds2;
