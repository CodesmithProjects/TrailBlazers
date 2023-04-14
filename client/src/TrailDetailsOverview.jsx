import React from "react";
import TrailDetailsWeatherCard from "./TrailDetailsWeatherCard";
import TrailDetailsAboutCard from './TrailDetailsAboutCard';
import TrailDetailsReviewCard from "./TrailDetailsReviewCard";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import MapComponent from "./MapComponent";
import { Grid } from "@mui/material";

export default function TrailDetailsOverview({ trail }) {
  return (
    <>
      <div className="details-overview-row-1-container">
        <div className="detail-overview-tiles tile-1">
          <TrailDetailsAboutCard trail={trail}></TrailDetailsAboutCard>
        </div>
        <div className="detail-overview-tiles tile-2">
          <Card>
            <CardContent>
              <TrailDetailsWeatherCard trail={trail}></TrailDetailsWeatherCard>
            </CardContent>
          </Card>
        </div>
      </div>
      <Grid container>
        <Grid item xs={6}>
          <Card sx={{ margin: "1rem" }}>
            <CardContent>
              <TrailDetailsReviewCard trail={trail}></TrailDetailsReviewCard>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={6}>
          <Card sx={{ margin: "1rem" }}>
            <CardContent>
              <MapComponent trail={trail}></MapComponent>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
}
