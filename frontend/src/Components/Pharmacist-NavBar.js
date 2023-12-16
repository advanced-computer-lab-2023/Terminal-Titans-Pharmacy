import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import * as React from 'react';
// StarIcon from '@mui/icons-material/StarBorder';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import Avatar from '@mui/material/Avatar';
import GlobalStyles from '@mui/material/GlobalStyles';
import Link from '@mui/material/Link';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Dropdown from 'react-bootstrap/Dropdown';
import { useLocation, useNavigate } from 'react-router-dom';
import Badge from '@mui/material/Badge';
import axios from 'axios';
import MailIcon from '@mui/icons-material/Mail';

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function Pricing() {
  const navigate = useNavigate();
  const location = useLocation();
  const [notificationsCount, setNotificationsCount] = React.useState(0);


  React.useEffect(() => {
    async function getNotificationsCount() {
      const response = await axios('http://localhost:7000/notification/unReadNotifications', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('token')}`,
        },
      });
      console.log(response.data);
      setNotificationsCount(response.data.length);
    }
    getNotificationsCount();
  }, []);

  const createHandleMenuClick = (menuItem) => {
    return () => {
      console.log(`Clicked on ${menuItem}`);
    };
  };
  function goBack() {

    console.log(location.pathname.substring(0, 13))
    if (location.pathname.substring(0, 13) === '/pharmProfile') {

      window.location.href = '/Health-Plus/pharmacistScreen';
      return;
    }
    navigate(-1);

  }
  function goToChat() {
    window.location.href = `http://localhost:3000/Health-Plus/chat/${sessionStorage.getItem('token')}`
  }

  function goToReports() {
    window.location.href = `/monthlysales`;
  }

  const signoutButtonFunc = () => {
    sessionStorage.removeItem('token');
    window.location.href = '/Health-Plus';
  }

  function goToNotification() {
    window.location.href = `/notifications`;
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
          {location.pathname !== '/Health-Plus/pharmacistScreen' ?
            <Button
              // hena link el chatting
              style={{ color: 'black' }}
              onClick={() => { goBack() }}
              sx={{ my: 1, mx: 0 }}
              size="small"
            >
              <ArrowBackIosIcon />

            </Button>

            : null}
          <Typography variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
            <span className='homePage' onClick={() => { window.location.href = '/Health-Plus/pharmacistScreen' }}>Health Plus+</span>
          </Typography>
          <nav>
            <Dropdown className="d-inline mx-2">
              <Dropdown.Toggle id="dropdown-autoclose-true">
                Medicines
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item href="/AvailableMeds">Available Medicines</Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item href="/NewMed">Add a new medicine</Dropdown.Item>
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

          <Button
            // hena link el chatting
            style={{ color: 'black' }}
            onClick={() => { goToNotification() }}
            sx={{ my: 1, mx: 1.5 }}
          >
            <Badge color="warning" badgeContent={notificationsCount} showZero>
              <MailIcon />
            </Badge>
          </Button>

          <Dropdown className="d-inline mx-2" >
            <Dropdown.Toggle id="dropdown-autoclose-true">
              <Avatar src="/broken-image.jpg" />
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item href="/pharmProfile/0">My Profile</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item href="/pharmProfile/1">Change Password</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item href="/pharmProfile/2">Wallet</Dropdown.Item>

              <Dropdown.Divider />
              <Dropdown.Item onClick={signoutButtonFunc}>Sign Out</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

        </Toolbar>
      </AppBar>

    </ThemeProvider>
  );
}