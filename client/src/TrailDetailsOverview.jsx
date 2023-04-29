import React from "react";
import TrailDetailsWeatherCard from "./TrailDetailsWeatherCard";
import TrailDetailsAboutCard from './TrailDetailsAboutCard';
import TrailDetailsReviewCard from "./TrailDetailsReviewCard";
import UserPhotos from "./UserPhotos";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import MapComponent from "./MapComponent";
import { Grid } from "@mui/material";
import ChatContainer from "./chatroom/ChatContainer";

export default function TrailDetailsOverview({ userData, refreshTrail, trail }) {
  console.log("TrailDetailsOverview trail: ", trail);
  
  return (
    <>
      {/* <div className="details-overview-row-1-container">
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
      </div> */}

      <div className="details-overview-row-1-container"></div>

      
      <Grid container>

      <Grid item xs={12} lg={6}>
          <Card sx={{ margin: "20px" }}>
            <CardContent>
              <TrailDetailsAboutCard trail={trail}></TrailDetailsAboutCard>
            </CardContent>
          </Card>
          {/* <TrailDetailsAboutCard trail={trail}></TrailDetailsAboutCard> */}
        </Grid>

      <Grid item xs={12} lg={6}>
          <Card sx={{ margin: "20px" }}>
            <CardContent>
              <TrailDetailsWeatherCard trail={trail}></TrailDetailsWeatherCard>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} lg={6}>
          <Card sx={{ margin: "20px" }}>
            <CardContent>
              <TrailDetailsReviewCard userData={userData} refreshTrail={refreshTrail} trail={trail}></TrailDetailsReviewCard>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} lg={6}>
          <Card sx={{ margin: "20px" }}>
            <CardContent>
              <MapComponent trail={trail}></MapComponent>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} lg={6}>
          <Card sx={{ margin: "20px" }}>
            <CardContent>
              <UserPhotos trail={trail}></UserPhotos>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} lg={6}>
          <Card sx={{ margin: "20px" }}>
            <CardContent>
              <ChatContainer userData={userData} trail={trail}/>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
}