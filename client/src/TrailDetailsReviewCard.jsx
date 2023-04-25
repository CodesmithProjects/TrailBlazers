import React, { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import IconButton from '@mui/material/IconButton';
import { ConstructionOutlined, PhotoCamera } from '@mui/icons-material';
import { useSlotProps } from "@mui/base";
import axios from "axios";

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

export default function TrailDetailsReviewCard({ userData, trail, refreshTrail }) {
  const [userRating, setUserRating] = useState(5);
  const [userReview, setUserReview] = useState("");
  const [open, setOpen] = useState(false);
  // const [name, updateName] = useState("");
  const [isFormInvalid, setIsFormInvalid] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setSelectedFiles("")
    setOpen(false)
  };
  const [selectedFiles, setSelectedFiles] = useState("")
  // const handleFormChange = (name) => {
  //   updateName(name);
  //   setIsFormInvalid(false);
  // };


  const submitRating = async () => {
    const uploadURLList = [];
    if (selectedFiles !== "") {
      for (let i = 0; i < Object.entries(selectedFiles).length; i++) {
        uploadURLList[i] = await axios.get('/api/db/uploadURL')
        console.log('file INFO??',selectedFiles[i])
      }
      for (let i = 0; i < uploadURLList.length; i++) {
        await fetch(uploadURLList[i].data, {
          method: "PUT",
          headers: {
            "Content-Type": "multipart/form-data"
          },
          body: selectedFiles[i]
        })
        selectedFiles[i].url = selectedFiles[i].name
        selectedFiles[i].url = uploadURLList[i].data.split('?')[0]
      }
    }

    const review = {
      trail_id: trail.id,
      user_id: userData.user_id,
      stars: userRating,
      review: userReview,
      date: Date().split(' ').slice(0,4).join(' '),
      photos: selectedFiles
    };
    console.log('review: ', review);
    fetch(`/api/db/createReview/${trail.id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(review),
    })
      .then(() => {
        refreshTrail();
        handleClose();
      })
      .catch((err) => {
        console.log("err on submitting a review", err);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isFormInvalid) {
      submitRating();
    }
  };

  const deleteReview = (review_id) => {
    fetch(`/api/db/deleteReview/${review_id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      }
    })
      .then(() => {
        refreshTrail();
        handleClose();
      })
      .catch((err) => {
        console.log("err on deleting a review", err);
      });
  } 

  const onChangeFile = async (event) => {
    setSelectedFiles(event.target.files)
  }
  console.log("Trail Data: ", trail.data);

  return (
    <>
      <div className="tile-1-card-top">
        <div className="tile-1-card-left">
          <div className="title-wrapper">
            <Typography
              variant="h5"
              sx={{
                marginBottom: "10px",
                fontWeight: "300",
                letterSpacing: "2px",
              }}
              className="about"
            >
              Reviews
            </Typography>
            <Button variant="text" onClick={handleOpen}>
              Leave a review
            </Button>
          </div>
          {trail.data.length ? (
            <List
              sx={{
                bgcolor: "background.paper",
                maxHeight: "300px",
                overflowY: "auto",
              }}
            >
              {trail.data.map((review, i) => {
                return (
                  <ListItem key={i}>
                    <ListItemText
                      primary={
                        <>
                          <div className="review-primary-wrapper">
                            {review.name}
                            <Rating
                              name="read-only"
                              sx={{ fontSize: "13px", marginLeft: "5px" }}
                              value={review.stars}
                              readOnly
                            />
                          </div>
                          <div>
                            Posted: {review.date}
                          </div>
                        </>
                      }
                      secondary={
                        <>
                          {review.review}
                          <div className="modify-or-delete" hidden={review.user_id !== userData.user_id}>
                            <Button variant="text" onClick={handleOpen}>
                              Edit
                            </Button>
                            <Button variant="text" onClick={ () => {deleteReview(review.review_id)} }>
                              Delete
                            </Button>
                          </div>
                        </>
                      }
                    />
                  </ListItem>
                );
              })}
            </List>
          ) : (
            <p>There are no reviews yet!</p>
          )}
        </div>
        <div className="tile-1-card-right">
          <Box sx={{ textAlign: "center" }}>
            <Rating name="read-only" value={trail.averageStars} readOnly />
            <Typography variant="subtitle2">
              {trail.averageStars ? `Rating: ${trail.averageStars} •` : undefined}{" "}
              {trail.numberOfReviews === 1 ? `${trail.numberOfReviews} review` : `${trail.numberOfReviews} reviews`}
            </Typography>
          </Box>
        </div>
      </div>
      <div className="tile-1-card-bottom"></div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Leave a review
          </Typography>
          <form onSubmit={handleSubmit} noValidate>
            <Rating
              name="simple-controlled"
              value={userRating}
              onChange={(event, rating) => {
                setUserRating(rating);
              }}
            />
            <TextField
              sx={{ width: "100%", marginTop: "1rem" }}
              id="outlined-multiline-static"
              label="Review"
              multiline
              rows={3}
              defaultValue=" "
              onChange={(e) => setUserReview(e.target.value)}
            />
            <div className="uploadPhotoDiv">
              <Button variant="text" component="label" onChange={onChangeFile}>
                Upload Photos
                <input hidden accept="image/*" multiple type="file" />
              </Button>
              <IconButton color="primary" aria-label="upload picture" component="label" onClick={()=>console.log('TEST', S3Client)}>
                <input hidden accept="image/*" type="file" />
                <PhotoCamera />
              </IconButton>
            </div>
            <ul>
              {Object.entries(selectedFiles).map((key, i) => {
                return (
                  <li key={i}>
                    {key[1].name}
                  </li>
                )
              })}
            </ul>
            <div className="modal-button-wrapper">
              <Button
                formNoValidate
                type="submit"
                variant="contained"
                sx={{ marginRight: "1rem" }}
                // onChange={handleFormChange}
              >
                Save
              </Button>
              <Button variant="outlined" onClick={() => {handleClose()}}>
                Cancel
              </Button>
            </div>
          </form>
        </Box>
      </Modal>
    </>
  );
}
