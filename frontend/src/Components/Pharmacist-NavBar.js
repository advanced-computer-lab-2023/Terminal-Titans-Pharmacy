import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import * as React from 'react';
// StarIcon from '@mui/icons-material/StarBorder';
import GlobalStyles from '@mui/material/GlobalStyles';
import Link from '@mui/material/Link';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Dropdown from 'react-bootstrap/Dropdown';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function Pricing() {
  const navigate = useNavigate();
  const location = useLocation();

  const createHandleMenuClick = (menuItem) => {
    return () => {
      console.log(`Clicked on ${menuItem}`);
    };
  };
  function goBack(){
      
    // console.log(location.pathname.substring(0,14))
    // if(location.pathname.substring(0,14)==='/viewMyProfile'){
      
    //   window.location.href = '/Health-Plus/patientHome';
    //   return;      
    // }
    navigate(-1);

    }
  function goToChat() {
    
    window.location.href = `http://localhost:3000/Health-Plus/chat/:${sessionStorage.getItem('token')}`
  }

  function goToReports() {
    window.location.href = `/monthlysales`;
  }

  const signoutButtonFunc = () => {
    sessionStorage.removeItem('token');
    window.location.href = '/Health-Plus';
  }

  return (
    require("../Styles/pharmacistNavBar.css"),
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyles styles={{ ul: { margin: 0, padding: 0, listStyle: 'none' } }} />
      <CssBaseline />
      <AppBar
        position="static"
        color="default"
        elevation={0}
        sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
      >
        <Toolbar sx={{ flexWrap: 'wrap' }}>
        {location.pathname!=='/Health-Plus/pharmacistScreen'?
           <Button
           // hena link el chatting
           style={{ color: 'black' }}
           onClick={() => { goBack() }}
                      sx={{ my: 1, mx: 0 }}
                      size="small"
         >
             <ArrowBackIosIcon />
           
         </Button>
         
            :null}
          <Typography variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
            Health Plus+
          </Typography>
          <nav>
            <Dropdown className="d-inline mx-2">
              <Dropdown.Toggle id="dropdown-autoclose-true">
                Medicines
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item href="#">Available Medicines</Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item href="#">Add a new medicine</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>

            <Link>
              <Button
                style={{ color: 'black' }}
                // hena link el chatting
                onClick={() => { goToReports() }}
                sx={{ my: 1, mx: 1.5 }}
              >
                View Reports
              </Button>
            </Link>
            <Button
              variant="button"
              color="text.primary"
              // hena link el chatting
              onClick={() => { goToChat() }}
              sx={{ my: 1, mx: 1.5 }}
            >
              Chat
            </Button>
          </nav>
          {/* mehtag a7ot hena el link ely hywadini 3ala el home page tani */}

          <Button onClick={signoutButtonFunc}>Sign Out</Button>
        </Toolbar>
      </AppBar>

    </ThemeProvider>
  );
}