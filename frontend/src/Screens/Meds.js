import React, { useState, useEffect } from 'react';
import { useLocation,useParams } from 'react-router-dom';
import axios from 'axios';
import "./Meds.css"
const Meds2 = () => {
    const [medicines, setMedicines] = useState([]);
    const location = useLocation();
    const { medicineId } = useParams();
    const userId = new URLSearchParams(location.search).get('medicineId');
    const [selectedQuantity, setSelectedQuantity] = useState(1); 
    const handleQuantityChange = (event) => {
        const newQuantity = parseInt(event.target.value);
        setSelectedQuantity(newQuantity);
    };
    
    useEffect(() => {
        const userId = new URLSearchParams(location.search).get('medicineId');
        console.log('UserId:', userId);

        const fetchMedicines = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/Admin/getAllMedicine/`);
                const jsonData = response.data.Result;
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

    const handleAddToCart = async () => {
        try {
            const response = await axios.post('http://localhost:8000/Patient/addToCart', {
                medicineId: medicine._id,
                
            });

            if (response.status === 200) {
                const cartItem = response.data;
                console.log('Added to cart:', cartItem);
                // You can update your UI or state here as needed
            } else {
                console.error('Failed to add to cart');
            }
        } catch (error) {
            console.error('Error adding to cart:', error);
        }
    };

    return (
        <div className="meds">
            <div className="medscreen_left">
                <div className="left_img">
                    {medicine.Picture && (
                        <img src={`data:image/jpeg;base64,${medicine.Picture.data.toString('base64')}`} alt={medicine.Name} />
                    )}
                </div>
                <div className="left_info">
                    <p className="left_name">{medicine.Name}</p>
                    <p>Price: ${medicine.Price}</p>
                    <p>{medicine.MedicalUse.join(' ')}</p>
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
                    <p>
                        Quantity
                        <select value={selectedQuantity} onChange={handleQuantityChange}>
                            {Array.from({ length: medicine.Quantity }, (_, i) => (
                                <option key={i} value={i + 1}>
                                    {i + 1}
                                </option>
                            ))}
                        </select>
                    </p>

                    </p>
                    <p>
                        <button type="button" onClick={handleAddToCart}>Add to cart</button>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Meds2;
