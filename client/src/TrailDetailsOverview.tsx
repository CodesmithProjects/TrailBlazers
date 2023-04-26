import React from "react";
import TrailDetailsWeatherCard from "./TrailDetailsWeatherCard";
import TrailDetailsAboutCard from './TrailDetailsAboutCard';
import TrailDetailsReviewCard from "./TrailDetailsReviewCard";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import MapComponent from "./MapComponent";
import { Grid } from "@mui/material";

type TrailDetailsOverviewProps = {
  refreshTrail: () => void;
  trail: Trail;
}

interface Trail {
  data: any[];
  name: string;
  length: number;
  difficulty: string,
  description: string,
  id: number;
  url: string;
  googleMapsURL: string;
  map: () => void;
  averageStars: number;
  numberOfReviews: number;
  city: string;
  lat: number;
  lon: number;
}


export default function TrailDetailsOverview({ refreshTrail, trail }: TrailDetailsOverviewProps) {
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
          <Card sx={{ margin: "20px" }}>
            <CardContent>
              <TrailDetailsReviewCard refreshTrail={refreshTrail} trail={trail} setUserRating={function (value: number): void {
                throw new Error("Function not implemented.");
              } }></TrailDetailsReviewCard>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={6}>
          <Card sx={{ margin: "20px" }}>
            <CardContent>
              <MapComponent trail={trail}></MapComponent>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
}
