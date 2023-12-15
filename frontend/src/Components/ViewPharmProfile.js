// import React from "react";
import "../Styles/LoginForm.css";
import Button from '@mui/material/Button';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ViewPharmProfile() {
    const [myInfo, setMyInfo] = useState({});
    const [email, setEmail] = useState('');
    const [affiliation, setAffiliation] = useState('');
    const [hourlyRate, setHourlyRate] = useState('');

const getMyInfo=async()=>{
    await axios.get(`http://localhost:7000/Pharma/getCurrentPharm`, {
        headers: {
          Authorization: 'Bearer ' + sessionStorage.getItem("token")//the token is a variable which holds the token
        }
      }).then(
        (res) => {
          const InfoData = res.data
          console.log(InfoData)
         setMyInfo(InfoData.Result)
         setEmail(InfoData.Result.Email)
            setAffiliation(InfoData.Result.Affiliation)
            setHourlyRate(InfoData.Result.HourlyRate)
         
  
        }
      );
}
useEffect(()=>{
    getMyInfo();
    },[]
    )
    

   
    return (
        <div>
            <div id="login-form"  style={{ width: "600px " }}>
                <form style={{paddingTop:'10px'}}>
                    
                    <div className="form-group">
            <div style={{paddingTop:'15px'}}>
                        <input  type="text" id="name"  style={{width: "50%", border:"0px", padding:'8px'}} value='Name'  />
                        <input type="text" id="name"  style={{width: "50%", border:"0px",padding:'8px'}} value={myInfo.Name} disabled />

                        <input type="text" id="Username"  style={{width: "50%", border:"0px",padding:'8px'}} value='Username' readOnly />
                        <input type="text" id="Username"  style={{width: "50%", border:"0px",padding:'8px'}} value={myInfo.Username} disabled />
                       

                        <input type="text" id="DateOfBirth"  style={{width: "50%", border:"0px",padding:'8px'}} value='Date of birth' readOnly />
                        <input type="text" id="DateOfBirth"  style={{width: "50%", border:"0px",padding:'8px'}} value={myInfo.DateOfBirth?.substring(0,10)} disabled />

                        <input type="text" id="Email"  style={{width: "50%", border:"0px",padding:'8px'}} value='Email' readOnly />
                        <input type="text" id="Email"  style={{width: "50%", border:"0px",padding:'8px'}} value={myInfo.Email} disabled />

                        <input type="text" id="Affiliation"  style={{width: "50%", border:"0px",padding:'8px'}} value='Affiliation' readOnly />
                        <input type="text" id="Affiliation"  style={{width: "50%", border:"0px",padding:'8px'}} value={myInfo.Affiliation} disabled />

                        <input type="text" id="Education"  style={{width: "50%", border:"0px",padding:'8px'}} value='Education' readOnly />
                        <input type="text" id="Education"  style={{width: "50%", border:"0px",padding:'8px'}} value={myInfo.EducationalBackground} disabled />

                        <input type="text" id="hourlyRate"  style={{width: "50%", border:"0px",padding:'8px'}} value='Hourly Rate' readOnly />
                        <input type="text" id="hourlyRate"  style={{width: "50%", border:"0px",padding:'8px'}} value={myInfo.HourlyRate} disabled />


           
            </div>
            
                    </div>

                </form>
            </div>
        </div>
    );
}

export default ViewPharmProfile;