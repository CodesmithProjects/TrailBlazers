import React, { useEffect, useState, SyntheticEvent } from "react";
import { useParams } from "react-router-dom";
import Typography from "@mui/material/Typography";
import TrailDetailsSideIconMenu from "./TrailDetailsSideIconMenu";
import TrailsDetailsOverview from "./TrailDetailsOverview";
import LoadingOverlay from "react-loading-overlay";
import { Paper } from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { Data } from "@react-google-maps/api";

export default function TrailDetails() {
  type CallbackFunction = () => void;

  interface Alert { 
    horizontal: 'center' | 'left'| 'right'; 
    vertical: 'bottom' | 'top' 
  }

  interface Review {
    name : string;
    review : string;
    stars : number;
  }

  type Trails = {
    data : FavoriteTrail[]
  }

  interface Trail {
    description : string;
    difficulty : string;
    length : number;
    name : string;
    averageStars: number | null;
    city : string;
    data : Review[];
    features : string;
    googleMapsURL : string;
    id : number;
    lat : string;
    lon : string;
    numberOfReviews : number;
    state : string;
    thumbnail : string;
    trailEstimate : number; 
    url : string;
  }
  
  interface FavoriteTrail {
    trailId: string;
    name: string;
  }

  const [trail, updateTrail] = useState<Trail | null>(null);
  const [showSpinner, setShowSpinner] = useState<boolean>(false);
  const [showTrailDetails, updateShowTrailDetails] = useState<boolean>(false);
  const [open, setOpen] = React.useState<boolean>(false);
  const [addedSuccess, setAddedSuccess] = useState<boolean>(false);
  const [deletedSuccess, setDeletedSuccess] = useState<boolean>(false);
  const [hasMatch, setHasMatch] = useState<boolean>(false);
  const alertState: Alert = {
    vertical: "top",
    horizontal: "right",
  };
  const { vertical, horizontal } = alertState;

  type Params = {
    id : string;
    idx : string;
  }

  let params = useParams<Params>();

  const getTrailById : CallbackFunction = () => {
    if (params.id) {
      setShowSpinner(true);
      fetch(`/api/moreInfo/${params.id}`)
        .then((response) => response.json())
        .then((data)=> data.data[0])
        .then((data : Trail) => {
          setShowSpinner(false);
          updateTrail(data);
          updateShowTrailDetails(true);
        })
        // TODO: do something more meaningful with this error
        .catch((err) =>
          console.log("error occurred during get trails by id", err)
        );
    } else {
      updateTrail(null);
    }
  };

  const addSuccessType = (bool : boolean) => {
    if (bool) {
      setDeletedSuccess(false);
      setAddedSuccess(true);
    } else {
      setAddedSuccess(false);
    }
  };

  const deleteSuccessType = (bool : boolean) => {
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

  const handleClose = (event : SyntheticEvent<Element, Event> | Event, reason: string) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const filterFavoriteTrails = (trails : Trails) => {
    const result = trails.data.filter((t : FavoriteTrail) => t.trailId === params.id);
    if (result.length > 0) {
      setHasMatch(true);
    } else {
      setHasMatch(false);
    }
  };

  const getAllFavoriteTrails = () => {
    fetch("/api/db/getAllFavoriteTrails", {
      headers: {
        Accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        filterFavoriteTrails(data);
      });
  };

  useEffect(() => {
    if (params.id) {
      getTrailById();
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
                ContentProps={{
                  classes: {
                    root: "snackbar",
                  },
                }}
              >
                <Alert
                  onClose={() => handleClose}
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
              {trail ? trail.name : null}
            </Typography>
            <TrailDetailsSideIconMenu
              trail={trail}
              showAlert={showAlert}
              addSuccessType={addSuccessType}
              deleteSuccessType={deleteSuccessType}
              hasMatch={hasMatch}
            ></TrailDetailsSideIconMenu>
          </div>
            <TrailsDetailsOverview refreshTrail={getTrailById} trail={trail}></TrailsDetailsOverview>
        </Paper>
      ) : (
        <Paper sx={{ height: "40rem" }}></Paper>
      )}
    </LoadingOverlay>
  );
}
