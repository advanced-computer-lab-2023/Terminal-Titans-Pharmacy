// import React from "react";
import "../Styles/LoginForm.css";
import Button from '@mui/material/Button';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import Navbar from '../Components/Navbar';
import Sidebar from '../Components/sidebar.js';

function WalletPatient() {
    const [MyTransactions, setMyTransactions] = useState([]);
    const [wallet, setWallet] = useState(0);


const getMyTransactions=async()=>{
    await axios.get(`http://localhost:7000/patient/getTransactionHistory`, {
        headers: {
          Authorization: 'Bearer ' + sessionStorage.getItem("token")//the token is a variable which holds the token
        }
      }).then(
        (res) => {
          const InfoData = res.data
          console.log(InfoData)
          setMyTransactions(InfoData.transactions)
          setWallet(InfoData.wallet)
         
         
  
        }
      );
}
useEffect(()=>{
  getMyTransactions();
   
    },[]
    )
   

   
    return (
        <div>
        <Navbar />
        <div style={{ display: 'flex', flexDirection: 'row' }}>

        <Sidebar />
        <div className="content-wrapper">

        <div style={{textAlign:'center',width:'425%'}}>
            <h5>Wallet Amount</h5>
            <h1 style={{ fontSize: '64px' }}>{wallet}</h1>
            <div style={{ backgroundColor: 'black', color: 'white', width: '100%', textAlign: 'left' , paddingLeft:'50px'}}>
              <h3>All transaction details</h3>
            </div>
            <Table striped bordered hover style={{marginRight:'-200'}}>
              <thead>
                <tr>
                  <th>Description</th>
                  <th className="small-column" style={{width: '100px'}} >Amount</th>
                </tr>
              </thead>
              <tbody>
                {MyTransactions.map((transaction, index) => (
                  <tr>
                    <React.Fragment key={index}>
                      <td>{transaction.description}</td>
                      <td className="small-column" style={{width: '100px'}}>{transaction.amount}</td>
                      
                       </React.Fragment>
                  </tr>
                ))}
              </tbody>
            </Table>
            </div>
            </div>
            </div>
            </div>
            );
            }

            export default WalletPatient;
