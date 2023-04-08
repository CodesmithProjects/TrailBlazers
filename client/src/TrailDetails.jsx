import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Typography from "@mui/material/Typography";
import TrailDetailsSideIconMenu from "../src/TrailDetailsSideIconMenu";
import TrailsDetailsOverview from "../src/TrailDetailsOverview";

export default function TrailDetails() {
  const [trail, updateTrail] = useState([{}]);
  let params = useParams();

  const getTrailById = (id) => {
    fetch(`/mocktraildetails/${id}`)
      .then((response) => response.json())
      .then((data) => {
        updateTrail(data.data[0]);
        console.log("here is data", data.data[0]);
      });
  };

  useEffect(() => {
    if (params.id) {
      getTrailById(params.id);
    }
  }, []);

  return (
    <>
      {typeof trail === "undefined" ? (
        <p>loading...</p>
      ) : (
        <>
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
        </>
      )}
    </>
  );
}
