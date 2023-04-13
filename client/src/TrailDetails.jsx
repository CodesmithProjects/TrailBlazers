import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Typography from "@mui/material/Typography";
import TrailDetailsSideIconMenu from "../src/TrailDetailsSideIconMenu";
import TrailsDetailsOverview from "../src/TrailDetailsOverview";
import LoadingOverlay from "react-loading-overlay";
import { Paper } from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

export default function TrailDetails() {
  const [trail, updateTrail] = useState([{}]);
  const [showSpinner, setShowSpinner] = useState(false);
  const [showTrailDetails, updateShowTrailDetails] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [addedSuccess, setAddedSuccess] = useState(false);
  const [deletedSuccess, setDeletedSuccess] = useState(false);
  const [hasMatch, setHasMatch] = useState(false);
  const [alertState, setState] = React.useState({
    vertical: "top",
    horizontal: "right",
  });
  const { vertical, horizontal } = alertState;
  let params = useParams();

  const getTrailById = (id) => {
    if (id) {
      setShowSpinner(true);
      fetch(`/api/moreInfo/${id}`)
        .then((response) => response.json())
        .then((data) => {
          setShowSpinner(false);
          updateTrail(data.data[0]);
          updateShowTrailDetails(true);
        })
        // TODO: do something more meaningful with this error
        .catch((err) =>
          console.log("error occurred during get trails by id", err)
        );
    } else {
      updateTrail([]);
    }
  };

  const addSuccessType = (bool) => {
    if (bool) {
      setDeletedSuccess(false);
      setAddedSuccess(true);
    } else {
      setAddedSuccess(false);
    }
  };

  const deleteSuccessType = (bool) => {
    if (bool) {
      setAddedSuccess(false);
      setDeletedSuccess(true);
    } else {
      setDeletedSuccess(false);
    }
  };

  const showSuccessMessage = () => {
    if (addedSuccess) {
      return "Successfully added";
    } else if (deletedSuccess) {
      return "Successfully deleted";
    } else {
      return "Error - please try again";
    }
  };

  const showAlert = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const filterFavoriteTrails = (trails) => {
    const result = trails.data.filter((t) => t.id.toString() === params.id);
    if (result.length > 0) {
      setHasMatch(true);
    } else {
      setHasMatch(false);
    }
  };

  const getAllFavoriteTrails = () => {
    fetch("/getAllFavoriteTrails", {
      headers: {
        Accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        filterFavoriteTrails(data);
      });
  };

  useEffect(() => {
    if (params.id) {
      getTrailById(params.id);
      getAllFavoriteTrails();
    }
  }, []);

  return (
    <LoadingOverlay active={showSpinner} spinner text="Loading trail...">
      {showTrailDetails ? (
        <Paper sx={{ height: "26rem" }}>
          <div className="container">
            <div className="banner-wrapper">
              <Snackbar
                anchorOrigin={{ vertical, horizontal }}
                open={open}
                autoHideDuration={3000}
                onClose={handleClose}
                contentprops={{
                  classes: {
                    root: "snackbar",
                  },
                }}
              >
                <Alert
                  onClose={handleClose}
                  sx={{ width: "100%" }}
                  severity={
                    addedSuccess || deletedSuccess ? "success" : "error"
                  }
                >
                  {showSuccessMessage()}
                </Alert>
              </Snackbar>
              <img
                className="banner-img"
                src={`../../src/assets/mtn-banner-${params.idx}.jpeg`}
              ></img>
            </div>
            <Typography
              gutterBottom
              variant="h4"
              component="div"
              className="details-title"
            >
              {trail.name}
            </Typography>
            <TrailDetailsSideIconMenu
              trail={trail}
              showAlert={showAlert}
              addSuccessType={addSuccessType}
              deleteSuccessType={deleteSuccessType}
              hasMatch={hasMatch}
            ></TrailDetailsSideIconMenu>
          </div>
          <TrailsDetailsOverview trail={trail}></TrailsDetailsOverview>
        </Paper>
      ) : (
        <Paper sx={{ height: "40rem" }}></Paper>
      )}
    </LoadingOverlay>
  );
}
