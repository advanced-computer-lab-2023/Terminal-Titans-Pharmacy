import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Divider, Card, CardHeader, IconButton, Paper, SvgIcon, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import DeleteIcon from '@mui/icons-material/Delete';
import Nav from "./Admin-NavBar.js";
import { Scrollbar } from './scrollbar';
import '../Styles/AdminScreen.css';
import { Container, Grid } from '@mui/material';
import PharmApplicationCard from './PharmApplicationCard'; // Import your PharmApplicationCard component

const ViewPharmApplications = () => {
  const [pharmacists, setPharmacists] = useState([]);

  const acceptPharmacist = async (username) => {
    await axios({
      method: 'post',
      url: `http://localhost:7000/Admin/Acceptance/${username}`,
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem('token')}`
      }
    }).then((response) => {
      console.log(response);
      setPharmacists(response.data.Result);
    }).catch((error) => {
      console.log(error);
    });
  }

  const rejectPharmacist = async (username) => {
    console.log(username);
    await axios({
      method: 'delete',
      url: `http://localhost:7000/Admin/Rejection/${username}`,
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem('token')}`
      }
    }).then((response) => {
      console.log(response);
      setPharmacists(response.data.Result);
    }).catch((error) => {
      console.log(error);
    });
  }

  const getPharmacists = async () => {
    await axios({
      method: 'get',
      url: 'http://localhost:7000/Admin/viewReqPharm',
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem('token')}`
      }
    }).then((response) => {
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
      <Nav />
      <div style={{ width: '100%', padding: '10px' }}>
        <h1 style={{ color: 'white', textAlign: 'center', backgroundColor: 'black', borderRadius: '15px' }}>Manage Requested Pharmacists</h1>
      </div>

      <Box
        component="main"
        sx={{
          display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}
      >
        {pharmacists.length === 0 ? (
          <Paper sx={{ width: '80%', textAlign: 'center', mt: 2, boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', p: 2, borderRadius: '8px' }}>
            <h3>No pharmacist requests at the moment</h3>
          </Paper>
        ) : (
          <Paper elevation={0} sx={{}}>
            <Container>
              <Grid container>
                <Grid item>
                  <Card style={{ width: '100%', height: '100%' }}>
                    <CardHeader title="Pharmacist Applications Table" />
                    <Divider />

                    <Scrollbar sx={{ flexGrow: 1 }}>
                      <Box sx={{ minWidth: 800 }}>
                        <Table>
                          <TableHead>
                            <TableRow>
                              <TableCell align="center">Name</TableCell>
                              <TableCell align="center">Email</TableCell>
                              <TableCell align="center">Date of Birth</TableCell>
                              <TableCell align="center">Hourly Rate</TableCell>
                              <TableCell align="center">Affiliation</TableCell>
                              <TableCell align="center">Education</TableCell>
                              <TableCell align="center">Actions</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {pharmacists.map((pharmacist, index) => (
                              <TableRow hover key={index}>
                                <TableCell align="center">{pharmacist.Name}</TableCell>
                                <TableCell align="center">{pharmacist.Email}</TableCell>
                                <TableCell align="center">{pharmacist.DateOfBirth?.substring(0, 10)}</TableCell>
                                <TableCell align="center">{pharmacist.HourlyRate}</TableCell>
                                <TableCell align="center">{pharmacist.Affiliation}</TableCell>
                                <TableCell align="center">{pharmacist.EducationalBackground}</TableCell>
                                <TableCell align="center">
                                  <IconButton
                                    endIcon={(
                                      <SvgIcon fontSize="small">
                                        <ArrowRightIcon />
                                      </SvgIcon>
                                    )}
                                    onClick={() => window.location.href = `/Health-Plus/adminViewReqPharm?Id=${pharmacist._id}`}
                                    style={{ backgroundColor: 'black', width: '98%', margin: '2%', fontSize: 'medium', color: 'white', borderRadius: '5px', padding: '6px' }}
                                  >
                                    View Pharmacist
                                  </IconButton>
                                  <IconButton style={{ backgroundColor: '#198754', width: '48%', margin: '1%', fontSize: 'medium', color: 'white', borderRadius: '5px', padding: '6px' }} variant="success" onClick={() => acceptPharmacist(pharmacist.Username)}>
                                    Accept
                                  </IconButton>
                                  <IconButton style={{ backgroundColor: '#dc3545', width: '48%', margin: '1%', fontSize: 'medium', color: 'white', borderRadius: '5px', padding: '6px' }} variant="success" onClick={() => rejectPharmacist(pharmacist.Username)}>
                                    Reject
                                  </IconButton>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </Box>
                    </Scrollbar>
                  </Card>
                </Grid>
              </Grid>
            </Container>
          </Paper>
        )}
      </Box>
    </div>
  );
};

export default ViewPharmApplications;
