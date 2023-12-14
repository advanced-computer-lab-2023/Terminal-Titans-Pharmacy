import React, { useState } from 'react';
import Box from '@mui/material/Box';
import AcceptRejectPharmacist from './adminPharmReq';
import Nav from "../Components/Admin-NavBar"

function ResponsiveDrawer(props) {
    const params = new URLSearchParams(window.location.search);
  const  sessid  = params.get('id');
  if(sessid){
    sessionStorage.setItem("token", sessid);
  }


    return (
        <div>
        <Nav/>
        <Box sx={{ display: 'grid' }}>
            <Box position='inherit' justifySelf='center'>
                {<AcceptRejectPharmacist />}
            </Box>
        </Box>
        </div>
    );
}

export default ResponsiveDrawer;
