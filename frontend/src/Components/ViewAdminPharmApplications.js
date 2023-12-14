// import React from "react";
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import "../Styles/LoginForm.css";
import PharmacistCard from './PharmApplicationCard';
import Nav from "../Components/Admin-NavBar"


function ViewPharmApplications() {
    const [pharmacists, setPharmacists] = useState([]);
    const params = new URLSearchParams(window.location.search);
    const  sessid  = params.get('id');
    if(sessid){
      sessionStorage.setItem("token", sessid);
    }
  
    const acceptPharmacist = async (username) => {
        await axios(
            {
                method: 'post',
                url: `http://localhost:7000/Admin/Acceptance/${username}`,
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem('token')}`
                }
            }
        ).then((response) => {
            console.log(response);
            setPharmacists(response.data.Result);
        }).catch((error) => {
            console.log(error);
        });
    }

    const rejectPharmacist = async (username) => {
        console.log(username);
        await axios(
            {
                method: 'delete',
                url: `http://localhost:7000/Admin/Rejection/${username}`,
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem('token')}`
                }
            }
        ).then((response) => {
            console.log(response);
            setPharmacists(response.data.Result);
        }).catch((error) => {
            console.log(error);
        });
    }

    const getPharmacists = async () => {
        
        await axios(
            {
                method: 'get',
                url: 'http://localhost:7000/Admin/viewReqPharm',
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem('token')}`
                }
            }
        ).then((response) => {
            console.log(response);
            setPharmacists(response.data.Result);
        }).catch((error) => {
            console.log(error);
        });
    }

    useEffect(() => {
        getPharmacists();
    }, []);

    return (
        <div>
    <Nav/>
        <div>
          <div style={{ width: "100%", padding: '10px' }}>
            <h1 style={{ color: 'white', textAlign: 'center',backgroundColor: 'black',borderRadius:'15px' }}>Requested Pharmacists List </h1>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap' }}>
            {pharmacists.map((pharmacist, index) => (
              <PharmacistCard
                key={index}
                pharmacist={pharmacist}
                onAccept={acceptPharmacist}
                onReject={rejectPharmacist}
              />
            ))}
          </div>
        </div>
        </div>
      );
}

export default ViewPharmApplications;
