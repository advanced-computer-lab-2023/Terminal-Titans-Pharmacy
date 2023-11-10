import React, { useState } from 'react';
import '../Styles/checkout.css';
import Address from './addAddress';
import OrderDetails from './orderDetails';
import { finalAddress } from './addAddress';
import {total} from './orderDetails';

function Checkout() {
  const [selectedStep, setSelectedStep] = useState(0);

  let steps = [
   <OrderDetails/>,
    <Address/>,
    "Step 3: Payment"
  ];

  const handleCircleClick = (index) => {
    setSelectedStep(index);
  };

  return (
  <div style={{ paddingLeft: '100px' ,paddingRight:'100px'}}>
      
    <div className="checkout">
      <div className="timeline">
        {steps.map((step, index) => (
          <div
            className={`circle ${selectedStep > index ? "active" : ""}`}
            key={index}
            onClick={() => handleCircleClick(index)}
          >
            <div style={{ float: 'center', paddingTop: '10px' }}></div>
            {index < 2 && <div className={`line ${selectedStep === index ? " height: 3px;" : "height: 1px;"}`}></div>}          </div>
        ))}
      </div>
      <div className="btn-container" style={{ textAlign: 'right' }}>
              <button className="btn" onClick={() => handleCircleClick(selectedStep+1)}>Next</button>
            </div>
      <div className="content">
        {steps.map((step, index) => (
          selectedStep === index && step
        ))}
      </div>
      </div>
          
      
    </div>
  );
}

export default Checkout;
