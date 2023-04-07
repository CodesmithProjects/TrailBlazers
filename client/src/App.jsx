import ButtonAppBar from "./AppBar";
import React, { useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { lightBlue, deepOrange } from "@mui/material/colors";
import { IconButton, Paper } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import TrailInfoCard from "./TrailInfoCard";

const App = () => {
  const [zip, updateZip] = useState("");
  const [isFormInvalid, setIsFormInvalid] = useState(false);
  const [trails, setTrails] = useState([{}]);
  const [showTrails, setShowTrails] = useState(false);

  // note that themes can be nested, and theme provider can be passed another instance of a theme obj
  const theme = createTheme({
    palette: {
      mode: "dark",
      primary: {
        main: lightBlue[500],
      },
      error: {
        main: deepOrange[500],
      },
    },
  });

  const getTrailsByLocation = (e) => {
    e.preventDefault();
    const formData = {
      zip,
    };
    if (!isFormInvalid) {
      fetch("/api")
        .then((response) => response.json())
        .then((data) => {
          setTrails(data);
          setShowTrails(true);
        });
      console.log("got to submit", formData);
    } else {
      setShowTrails(false);
      setTrails([{}]);
      console.log("form is not valid");
    }
  };

  const handleZipChange = (zip) => {
    updateZip(zip);
    setIsFormInvalid(false);
  };

  const validate = () => {
    if (zip.length < 5) {
      setIsFormInvalid(true);
    } else {
      setIsFormInvalid(false);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Paper>
        <ButtonAppBar></ButtonAppBar>
        <div className="container">
          <div className="img-wrapper">
            <img
              src="src/assets/mtn-biking-3.jpeg"
              className="welcome-img"
            ></img>
            <img
              src="src/assets/mtn-biking-1.jpeg"
              className="welcome-img"
            ></img>
          </div>
          <div className="welcome-msg">
            <span>
              <h1>Discover your next adventure</h1>
            </span>
            <form onSubmit={getTrailsByLocation} noValidate>
              <TextField
                required
                error={isFormInvalid}
                helperText={isFormInvalid ? "Zipcode is required" : ""}
                value={zip}
                onChange={(e) => handleZipChange(e.target.value)}
                sx={{ backgroundColor: "rgba(0,0,0,.8)" }}
                fullWidth
                variant="filled"
                label="Search by zipcode"
                InputProps={{
                  endAdornment: (
                    <IconButton formNoValidate type="submit" onClick={validate}>
                      <SearchIcon />
                    </IconButton>
                  ),
                }}
              />
            </form>
          </div>
        </div>
        <div className="trail-info-card-container">
          {showTrails ? (
            typeof trails.data === "undefined" ? (
              // TODO: change this to a spinner
              <p>Loading</p>
            ) : (
              trails.data.map((trail, i) => {
                return <TrailInfoCard key={i} index={i} trail={trail} />;
              })
            )
          ) : undefined}
        </div>
      </Paper>
    </ThemeProvider>
  );
};

export default App;
