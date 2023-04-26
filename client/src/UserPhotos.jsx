import * as React from 'react';
import Button from '@mui/material/Button';
import Typography from "@mui/material/Typography";
import IconButton from '@mui/material/IconButton';
import { PhotoCamera } from '@mui/icons-material';

export default function UserPhotos({trail}) {
  console.log('TRAIL', trail.photos)
  return (
    <div>
      <Typography
        variant="h5"
        sx={{
          marginBottom: "10px",
          fontWeight: "300",
          letterSpacing: "2px",
        }}
        className="about"
      >
        User Photos
      </Typography>
      <div>
        {trail.photos.length > 0 ? (trail.photos.map((photo, i)=>{
          return (
            <img key={i} className="userPhotos" src={photo.photo_src}></img>
          )
        })) : (<p>There are no photos yet!</p>)}
      </div>
    </div>
  )
}

