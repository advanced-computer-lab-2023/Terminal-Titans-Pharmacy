import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
// StarIcon from '@mui/icons-material/StarBorder';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Dropdown from 'react-bootstrap/Dropdown';
import GlobalStyles from '@mui/material/GlobalStyles';
import Container from '@mui/material/Container';


// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function Pricing() {

  const createHandleMenuClick = (menuItem) => {
    return () => {
      console.log(`Clicked on ${menuItem}`);
    };
  };

  function goToChat() {
    window.location.href = `chat/${sessionStorage.getItem('token')}`;
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
                onClick={() => { goToChat() }}
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