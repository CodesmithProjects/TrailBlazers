import React from "react";
import Typography from "@mui/material/Typography";
import { IconButton } from "@mui/material";
import DirectionsOutlinedIcon from "@mui/icons-material/DirectionsOutlined";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import ReadMoreOutlinedIcon from "@mui/icons-material/ReadMoreOutlined";

export default function TrailDetailsSideIconMenu({ trail }) {
  return (
    <>
      <div className="button-wrapper">
        {/* TODO: add functionality to save this to a user list */}
        <IconButton className="details-banner-button">
          <BookmarkBorderOutlinedIcon></BookmarkBorderOutlinedIcon>
          <Typography className="details-icons-text">Save</Typography>
        </IconButton>
        <IconButton
          className="details-banner-button"
          onClick={() => {
            window.open(`${trail.url}`, "_blank");
          }}
        >
          <ReadMoreOutlinedIcon></ReadMoreOutlinedIcon>
          <Typography className="details-icons-text">More</Typography>
        </IconButton>
        {/* TODO: add functionality to open google maps with long/lat */}
        <IconButton className="details-banner-button">
          <DirectionsOutlinedIcon></DirectionsOutlinedIcon>
          <Typography className="details-icons-text">Directions</Typography>
        </IconButton>
      </div>
    </>
  );
}
