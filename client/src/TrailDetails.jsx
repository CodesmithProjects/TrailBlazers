import React, { useEffect, useLayoutEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Typography from "@mui/material/Typography";
import TrailDetailsSideIconMenu from "../src/TrailDetailsSideIconMenu";
import TrailsDetailsOverview from "../src/TrailDetailsOverview";
import LoadingOverlay from "react-loading-overlay";
import { Paper } from "@mui/material";

export default function TrailDetails() {
  const [trail, updateTrail] = useState([{}]);
  const [showSpinner, setShowSpinner] = useState(false);
  const [showTrailDetails, updateShowTrailDetails] = useState(false);
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

  useEffect(() => {
    if (params.id) {
      getTrailById(params.id);
    }
  }, []);

  return (
    <LoadingOverlay active={showSpinner} spinner text="Loading trail...">
      {showTrailDetails ? (
        <Paper sx={{height: '26rem'}}>
          <div className="container">
            <div className="banner-wrapper">
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
            <TrailDetailsSideIconMenu trail={trail}></TrailDetailsSideIconMenu>
          </div>
          <TrailsDetailsOverview trail={trail}></TrailsDetailsOverview>
        </Paper>
      ) : (
        <Paper sx={{ height: "40rem" }}></Paper>
      )}
    </LoadingOverlay>
  );
}
