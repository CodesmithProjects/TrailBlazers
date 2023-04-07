import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

export default function TrailInfoCard(props) {
  return (
    <Card sx={{ maxWidth: 345, minWidth: 345 }} className="trail-info-card">
      <CardActionArea>
        <CardMedia
          component="img"
          height="200"
          width="200"
          src={`src/assets/mtn-biking-${props.index}.jpeg`}
        />
        <CardContent>
          <Typography gutterBottom variant="h6" component="div">
            {props.trail.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {props.trail.description}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
