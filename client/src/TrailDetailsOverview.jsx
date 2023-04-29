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
import { useTheme } from '@mui/material/styles';

export default function TrailDetailsOverview({ userData, refreshTrail, trail, lightMode }) {
  const theme = useTheme()
  
  return (
    <>
      <div className="details-overview-row-1-container"></div>
      <Grid container>
      <Grid item xs={12} lg={6}>
          <Card sx={{ margin: "20px" }}>
            <CardContent sx={{height: "442px", backgroundColor: theme.palette.outerCard.main}}>
              <TrailDetailsAboutCard trail={trail}></TrailDetailsAboutCard>
            </CardContent>
          </Card>
        </Grid>
      <Grid item xs={12} lg={6}>
          <Card sx={{ margin: "20px" }}>
            <CardContent style={{height: "442px", backgroundColor: theme.palette.outerCard.main}}>
              <TrailDetailsWeatherCard lightMode={lightMode} trail={trail}></TrailDetailsWeatherCard>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} lg={6}>
          <Card sx={{ margin: "20px" }}>
            <CardContent style={{backgroundColor: theme.palette.outerCard.main}}>
              <TrailDetailsReviewCard userData={userData} refreshTrail={refreshTrail} trail={trail}></TrailDetailsReviewCard>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} lg={6}>
          <Card sx={{ margin: "20px" }}>
            <CardContent style={{backgroundColor: theme.palette.outerCard.main}}>
              <MapComponent trail={trail}></MapComponent>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} lg={6}>
          <Card sx={{ margin: "20px" }}>
            <CardContent style={{backgroundColor: theme.palette.outerCard.main}}>
              <UserPhotos trail={trail}></UserPhotos>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} lg={6}>
          <Card sx={{ margin: "20px" }}>
            <CardContent style={{backgroundColor: theme.palette.outerCard.main}}>
              <ChatContainer userData={userData} trail={trail}/>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
}