import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import axios from "axios";

export default function ButtonAppBar(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [intervalID, setintervalID] = React.useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const fetchUserData = async () => {
    try {
      const response = await axios.get("/api/sessions/currentuser", {withCredentials: true});
      if (response.data) {
        props.setUserData(response.data);
      }
    } catch (err) {
      console.log("Error fetching user data: ", err);
    }
  }

  //checks if user is authenticated without updating state
  const authenticationCheck = async () => {
    try {
      const response = await axios.get("/api/sessions/currentuser", {withCredentials: true});
    } catch (err) {
      if (window.location.pathname !== '/'){
        alert('Your session has timed out, please log in again')
        console.log('redirecting to login')
        window.location.href = 'http://localhost:5173'
      }
      console.log("Error fetching user data: ", err);
    }
    () => clearInterval(id);
  }


  React.useEffect(() => {
    fetchUserData();
    let id = setInterval(authenticationCheck, 15000);
    setintervalID(id)
  }, []);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <div hidden={!props.userData.name}>
            <IconButton
              onClick={handleMenu}
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              sx={{ marginTop: "2rem" }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <Link to="/favoriteTrails" style={{ textDecoration: "none" }}>
                <MenuItem sx={{ color: "#fff" }} onClick={handleClose}>Favorite trails</MenuItem>
              </Link>
            </Menu>
          </div>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, letterSpacing: "1px" }}
          >
            <Link
              to="/"
              style={{
                textDecoration: "none",
                boxShadow: "none",
                color: "#fff",
              }}
            >
              Trail Blazers
            </Link>
          </Typography>
          {Object.keys(props.userData).length > 0 ? (
            <Button color="inherit" component="a" href="http://localhost:4000/logout">Logout</Button>
          ) : (
            <Button color="inherit" component="a"href="http://localhost:4000/auth/google">Login</Button>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
