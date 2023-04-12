import React from 'react';
import Typography from '@mui/material/Typography';
import { IconButton } from '@mui/material';
import DirectionsOutlinedIcon from '@mui/icons-material/DirectionsOutlined';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import ReadMoreOutlinedIcon from '@mui/icons-material/ReadMoreOutlined';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import MuiAlert from '@mui/material/Alert';
import BookmarkAddedIcon from '@mui/icons-material/BookmarkAdded';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />;
});

export default function TrailDetailsSideIconMenu({
  trail,
  showAlert,
  successType,
  hasMatch
}) {
  const [open, setOpen] = React.useState(false);
  const [filled, showFilled] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const saveTrail = () => {
    const faveTrail = {
      id: trail.id,
      name: trail.name,
    };
    showFilled(true);
    fetch('/saveFavoriteTrail', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(faveTrail),
    })
      .then(() => {
        handleClose();
        showAlert();
        successType(true);
      })
      .catch((err) => {
        successType(false);
        showFilled(false);
        console.log('err on save favorite trails', err);
      });
  };

  return (
    <>
      <div className='button-wrapper'>
        <IconButton className='details-banner-button' onClick={handleOpen}>
          {(filled || hasMatch) ? (
            <BookmarkAddedIcon></BookmarkAddedIcon>
          ) : (
            <BookmarkBorderOutlinedIcon></BookmarkBorderOutlinedIcon>
          )}
          <Typography className='details-icons-text'>Save</Typography>
        </IconButton>
        <Modal open={open} onClose={handleClose}>
          <Box sx={style}>
            <Typography id='modal-modal-title' variant='h6' component='h2'>
              Save as a favorite trail?
            </Typography>
            <Typography id='modal-modal-description' sx={{ mt: 2 }}>
              You'll be able to find this under your saved trails.
            </Typography>
            <div className='modal-button-wrapper'>
              <Button
                variant='contained'
                onClick={saveTrail}
                sx={{ marginRight: '1rem' }}
              >
                Save
              </Button>
              <Button variant='outlined' onClick={handleClose}>
                Cancel
              </Button>
            </div>
          </Box>
        </Modal>
        <IconButton
          className='details-banner-button'
          onClick={() => {
            window.open(`${trail.url}`, '_blank');
          }}
        >
          <ReadMoreOutlinedIcon></ReadMoreOutlinedIcon>
          <Typography className='details-icons-text'>More</Typography>
        </IconButton>
        <IconButton
          className='details-banner-button'
          onClick={() => {
            window.open(trail.googleMapsURL, '_blank');
          }}
        >
          <DirectionsOutlinedIcon></DirectionsOutlinedIcon>
          <Typography className='details-icons-text'>Directions</Typography>
        </IconButton>
      </div>
    </>
  );
}
