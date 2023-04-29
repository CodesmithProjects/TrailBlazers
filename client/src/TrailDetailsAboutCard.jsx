import React from "react";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import PedalBikeOutlinedIcon from "@mui/icons-material/PedalBikeOutlined";
import TerrainOutlinedIcon from "@mui/icons-material/TerrainOutlined";
import SpeedOutlinedIcon from "@mui/icons-material/SpeedOutlined";
import StraightenOutlinedIcon from "@mui/icons-material/StraightenOutlined";
import { useTheme } from '@mui/material/styles';

export default function TrailDetailsAboutCard({ trail }) {
  const theme = useTheme()
  return (
    <>
      {/* <Card>
        <CardContent> */}
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
                      minWidth: "12rem",
                      overflowY: "auto",
                    }}
                    variant="subtitle2"
                  >
                    <span className="overview-value">{trail.description}</span>
                  </Typography>
                </>
              ) : undefined}
            </div>
            <div className="tile-1-card-right">
              <PedalBikeOutlinedIcon color="secondary" className="pedal-bike-icon"></PedalBikeOutlinedIcon>
            </div>
          </div>
          <div style={{backgroundColor: theme.palette.innerCard.main}} className="tile-1-card-bottom">
            <div className="tile-1-item">
              <Typography sx={{ marginBottom: ".5rem" }} variant="subtitle1">
                <div className="overview-key">{`Difficulty`}</div>
                <div className="overview-icon">
                  <TerrainOutlinedIcon color="secondary"></TerrainOutlinedIcon>
                </div>
                <div className="overview-value">
                  {trail.difficulty ? `${trail.difficulty}` : "Not known"}
                </div>
              </Typography>
            </div>
            <div className="tile-1-item">
              {trail.length ? (
                <Typography sx={{ marginBottom: ".5rem" }} variant="subtitle1">
                  <div className="overview-key">{`Length`}</div>
                  <div className="overview-icon">
                    <StraightenOutlinedIcon color="secondary"></StraightenOutlinedIcon>
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
                <Typography sx={{ marginBottom: ".5rem" }} variant="subtitle1">
                  <div className="overview-key">{`Duration`}</div>
                  <div className="overview-icon">
                    <SpeedOutlinedIcon color="secondary"></SpeedOutlinedIcon>
                  </div>
                  <div className="overview-value">
                    {`${trail.trailEstimate} minutes`}
                  </div>
                </Typography>
              ) : undefined}
            </div>
          </div>
        {/* </CardContent>
      </Card> */}
    </>
  );
}
