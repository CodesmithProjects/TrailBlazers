import React from "react";
import Typography from "@mui/material/Typography";
import WeatherCard from "../src/WeatherCard";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import PedalBikeOutlinedIcon from "@mui/icons-material/PedalBikeOutlined";
import TerrainOutlinedIcon from "@mui/icons-material/TerrainOutlined";
import SpeedOutlinedIcon from "@mui/icons-material/SpeedOutlined";
import StraightenOutlinedIcon from "@mui/icons-material/StraightenOutlined";
import MapComponent from './MapComponent'

export default function TrailDetailsOverview({ trail }) {
  return (
    <>
      <div>
        <div className="detail-overview-tiles tile-1">
          <Card sx={{ height: "445px", backgroundImage: "none" }}>
            <CardContent>
              <div className="tile-1-card-top">
                <div className="tile-1-card-left">
                  {trail.description ? (
                    <>
                      <Typography
                        variant="h5"
                        sx={{
                          marginBottom: "10px",
                          fontWeight: "300",
                          letterSpacing: "2px",
                        }}
                        className="about"
                      >
                        About
                      </Typography>
                      <Typography
                        sx={{
                          maxHeight: "10rem",
                          overflowY: "auto",
                        }}
                        variant="subtitle2"
                      >
                        <span className="overview-value">
                          {trail.description}
                        </span>
                      </Typography>
                    </>
                  ) : undefined}
                </div>
                <div className="tile-1-card-right">
                  <PedalBikeOutlinedIcon className="pedal-bike-icon"></PedalBikeOutlinedIcon>
                </div>
              </div>
              <div className="tile-1-card-bottom">
                <div className="tile-1-item">
                  <Typography sx={{ marginBottom: ".5rem" }} variant="subtitle1">
                    <div className="overview-key">{`Difficulty`}</div>
                    <div className="overview-icon">
                      <TerrainOutlinedIcon></TerrainOutlinedIcon>
                    </div>
                    <div className="overview-value">
                      {trail.difficulty ? `${trail.difficulty}` : "Not known"}
                    </div>
                  </Typography>
                </div>
                <div className="tile-1-item">
                  {trail.length ? (
                    <Typography
                      sx={{ marginBottom: ".5rem" }}
                      variant="subtitle1"
                    >
                      <div className="overview-key">{`Length`}</div>
                      <div className="overview-icon">
                        <StraightenOutlinedIcon></StraightenOutlinedIcon>
                      </div>
                      <div className="overview-value">
                        {trail.length > 1
                          ? `${trail.length} miles`
                          : `${trail.length} mile`}
                      </div>
                    </Typography>
                  ) : undefined}
                </div>
                <div className="tile-1-item">
                  {trail.trailEstimate ? (
                    <Typography
                      sx={{ marginBottom: ".5rem" }}
                      variant="subtitle1"
                    >
                      <div className="overview-key">{`Duration`}</div>
                      <div className="overview-icon">
                        <SpeedOutlinedIcon></SpeedOutlinedIcon>
                      </div>
                      <div className="overview-value">
                        {`${trail.trailEstimate} minutes`}
                      </div>
                    </Typography>
                  ) : undefined}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="detail-overview-tiles tile-2">
          <Card sx={{ backgroundImage: "none" }}>
            <CardContent>
              <WeatherCard trail={trail}></WeatherCard>
            </CardContent>
          </Card>
        </div>
      </div>
      <div className="test">
        <div className="detail-overview-tiles tile-3">
        <Card sx={{ backgroundImage: "none" }}>
            <CardContent>
              <WeatherCard trail={trail}></WeatherCard>
            </CardContent>
          </Card>
        </div>
        <div className="detail-overview-tiles tile-4">
          <Card sx={{ backgroundImage: "none" }}>
            <CardContent>
              <MapComponent trail={trail}></MapComponent>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
