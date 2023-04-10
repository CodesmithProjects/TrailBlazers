import React from "react";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Divider from "@mui/material/Divider";

export default function TrailDetailsOverview({ trail }) {
  return (
    <Paper sx={{ marginTop: "2rem", marginLeft: "1rem", marginRight: "1rem" }}>
      <Divider sx={{ marginBottom: "1rem", fontSize: "12px" }}>
        Overview
      </Divider>
      {trail.city && trail.region ? (
        <Typography sx={{ marginBottom: ".5rem" }} variant="subtitle2">
          {`Location: `}
          <span className="overview-value">
            {`${trail.city}, ${trail.region}`}
          </span>
        </Typography>
      ) : undefined}
      <Typography sx={{ marginBottom: ".5rem" }} variant="subtitle2">
        {`Difficulty: `}
        <span className="overview-value">
          {trail.difficulty ? `${trail.difficulty}` : "Not known"}
        </span>
      </Typography>
      {
        // TODO: add time in this if condition when added to SVC
        trail.length ? (
          <Typography sx={{ marginBottom: ".5rem" }} variant="subtitle2">
            {`Length: `}
            <span className="overview-value">
              {trail.length > 1
                ? `${trail.length} miles`
                : `${trail.length} mile`}
            </span>
          </Typography>
        ) : undefined
      }
      {trail.description ? (
        <Typography sx={{ marginBottom: ".5rem" }} variant="subtitle2">
          {`Description: `}
          <span className="overview-value">{trail.description}</span>
        </Typography>
      ) : undefined}
      <Divider sx={{ marginTop: '1rem', marginBottom: "1rem", fontSize: "12px" }}>
        Weather forecast
      </Divider>
      <h3>Weather coming soon!</h3>
    </Paper>
  );
}
