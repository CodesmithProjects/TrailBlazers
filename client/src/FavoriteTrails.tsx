import React, { useEffect, useState, SyntheticEvent } from "react";
import IconButton from "@mui/material/IconButton";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import ListSubheader from "@mui/material/ListSubheader";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";


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

export default function FavoriteTrails() {
  
  interface FavoriteTrail {
    trailId: string;
    trailName: string;
  }

  interface Alert { 
    horizontal: 'center' | 'left'| 'right'; 
    vertical: 'bottom' | 'top' 
  }

  const [favoriteTrails, setFavoriteTrails] = useState<FavoriteTrail[]>([]);
  const [openModal, setOpenModal] = React.useState<boolean>(false);
  const [openAlert, setOpenAlert] = React.useState<boolean>(false);
  const [deletedSuccess, setDeletedSuccess] = useState<boolean>(false);
  const [selectedTrailId, setSelectedTrailId] = useState<string | null>(null);
  const alertState: Alert = {
    vertical: "top",
    horizontal: "right",
  };
  const { vertical, horizontal } = alertState;

  const handleOpen = (trailId : string) => {
    setOpenModal(true);
    if (trailId) {
      setSelectedTrailId(trailId);
    }
  };
  const handleClose = () => setOpenModal(false);

  const handleCloseAlert = (event: SyntheticEvent<Element, Event> | Event, reason: string) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenAlert(false);
  };

  const getAllFavoriteTrails = () => {
    fetch("/api/db/getAllFavoriteTrails", {
      headers: {
        Accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => data.data)
      .then((data: FavoriteTrail[]) => {
        setFavoriteTrails(data);
      });
  };

  const deleteTrail = () => {
    fetch(`/api/db/deleteFavoriteTrail/${selectedTrailId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(() => {
        handleClose();
        setOpenAlert(true);
        setDeletedSuccess(true);
        getAllFavoriteTrails();
      })
      .catch((err) => {
        setDeletedSuccess(false);
        console.log("error on delete favorite trail", err);
      });
  };

  useEffect(() => {
    getAllFavoriteTrails();
  }, []);

  return (
    <>
      <div className="saved-trails-container">
        <ImageList
          gap={100}
          cols={1}
          sx={{ width: "35%", gap: "50px !important" }}
        >
          <ImageListItem key="Subheader">
            <ListSubheader
              sx={{ fontSize: "1.5rem", textAlign: "center" }}
              component="div"
            >
              {
                favoriteTrails.length > 0 ? 'Your saved trails' : 'You have no saved trails' 
              }
            </ListSubheader>
          </ImageListItem>
          {favoriteTrails.map((item: FavoriteTrail, index: number) => (
            <ImageListItem key={index}>
              <img
                className="faveImg"
                src={`src/assets/mtn-biking-${index}.jpeg`}
                loading="lazy"
              />
              <ImageListItemBar
                key={index}
                title={item.trailName}
                actionIcon={
                  <IconButton
                    sx={{ color: "rgba(255, 255, 255, 0.54)" }}
                    onClick={() => handleOpen(item.trailId)}
                  >
                    <DeleteOutlineIcon />
                  </IconButton>
                }
              />
            </ImageListItem>
          ))}
        </ImageList>
        <Modal
          open={openModal}
          onClose={handleClose}
          sx={{ textAlign: "center" }}
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Remove from favorite trails?
            </Typography>
            <div className="delete-favorite-confirm-wrapper">
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
        <Snackbar
          anchorOrigin={{ vertical, horizontal }}
          open={openAlert}
          autoHideDuration={3000}
          onClose={handleCloseAlert}
          ContentProps={{
            classes: {
              root: "snackbar",
            },
          }}
        >
          <Alert
            onClose={()=>handleCloseAlert}
            sx={{ width: "100%" }}
            severity={deletedSuccess ? "success" : "error"}
          >
            {deletedSuccess ? "Successfully deleted" : "Failed to delete"}
          </Alert>
        </Snackbar>
      </div>
    </>
  );
}
