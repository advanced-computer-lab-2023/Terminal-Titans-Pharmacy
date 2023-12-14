import React, { useState } from 'react';
import Box from '@mui/material/Box';
import AcceptRejectPharmacist from './adminPharmReq';
import Nav from "../Components/Admin-NavBar"

function ResponsiveDrawer(props) {

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
