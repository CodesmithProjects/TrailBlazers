import React from "react";
import Typography from "@mui/material/Typography";
import { IconButton } from "@mui/material";
import DirectionsOutlinedIcon from "@mui/icons-material/DirectionsOutlined";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import ReadMoreOutlinedIcon from "@mui/icons-material/ReadMoreOutlined";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import BookmarkAddedIcon from "@mui/icons-material/BookmarkAdded";
import { useEffect } from "react";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function TrailDetailsSideIconMenu({
  trail,
  showAlert,
  addSuccessType,
  deleteSuccessType,
  hasMatch,
}) {
  const [session, setSession] = React.useState(false);
  const [openAdd, setAddOpen] = React.useState(false);
  const [filled, showFilled] = React.useState(false);
  const handleOpen = () => setAddOpen(true);
  const handleClose = () => setAddOpen(false);

  // useEffect(() => {
  //   fetch('/api/sessions/')
  // })

  const saveTrail = () => {
    const faveTrail = {
      id: trail.id,
      name: trail.name,
    };
    showFilled(true);
    fetch("/api/db/saveFavoriteTrail", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(faveTrail),
    })
      .then(() => {
        handleClose();
        showAlert();
        addSuccessType(true);
      })
      .catch((err) => {
        addSuccessType(false);
        showFilled(false);
        handleClose();
        console.log("err on save favorite trails", err);
      });
  };

  const deleteTrail = () => {
    showFilled(false);
    fetch(`/api/db/deleteFavoriteTrail/${trail.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }).then(() => {
      handleClose();
      showAlert();
      deleteSuccessType(true);
    })
    .catch((err) => {
      deleteSuccessType(false);
      console.log('error on delete favorite trail', err)
    });
  }

  return (
    <>
      <div className="button-wrapper">
        <IconButton className="details-banner-button" onClick={handleOpen}>
          {filled || hasMatch ? (
            <BookmarkAddedIcon></BookmarkAddedIcon>
          ) : (
            <BookmarkBorderOutlinedIcon></BookmarkBorderOutlinedIcon>
          )}
          <Typography className="details-icons-text">Save</Typography>
        </IconButton>
        {filled || hasMatch ? (
          <Modal open={openAdd} onClose={handleClose}>
            <Box sx={style}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Remove from favorite trails?
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                You'll no longer see this under your saved trails.
              </Typography>
              <div className="modal-button-wrapper">
                <Button
                  variant="contained"
                  onClick={deleteTrail}
                  sx={{ marginRight: "1rem" }}
                >
                  Delete
                </Button>
                <Button variant="outlined" onClick={handleClose}>
                  Cancel
                </Button>
              </div>
            </Box>
          </Modal>
        ) : (
          <Modal open={openAdd} onClose={handleClose}>
            <Box sx={style}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Save as a favorite trail?
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                You'll be able to find this under your saved trails.
              </Typography>
              <div className="modal-button-wrapper">
                <Button
                  variant="contained"
                  onClick={saveTrail}
                  sx={{ marginRight: "1rem" }}
                >
                  Save
                </Button>
                <Button variant="outlined" onClick={handleClose}>
                  Cancel
                </Button>
              </div>
            </Box>
          </Modal>
        )}
        <IconButton
          className="details-banner-button"
          onClick={() => {
            window.open(`${trail.url}`, "_blank");
          }}
        >
          <ReadMoreOutlinedIcon></ReadMoreOutlinedIcon>
          <Typography className="details-icons-text">More</Typography>
        </IconButton>
        <IconButton
          className="details-banner-button"
          onClick={() => {
            window.open(trail.googleMapsURL, "_blank");
          }}
        >
          <DirectionsOutlinedIcon></DirectionsOutlinedIcon>
          <Typography className="details-icons-text">Directions</Typography>
        </IconButton>
      </div>
    </>
  );
}
