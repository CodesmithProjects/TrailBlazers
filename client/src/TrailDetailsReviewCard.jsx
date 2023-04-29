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
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import Carousel from 'react-material-ui-carousel'
import { useTheme } from '@mui/material/styles';
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

const reviewPhotoStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 520,
  height: 600,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  display:"flex",
  flexDirection: "column",
  justifyContent: "center"
}

export default function TrailDetailsReviewCard({ userData, trail, refreshTrail }) {
  const [userRating, setUserRating] = useState(5);
  const [userReview, setUserReview] = useState("");
  const [open, setOpen] = useState(false);
  const [openReviewModal, setOpenReviewModal] = useState(false);
  const [isFormInvalid, setIsFormInvalid] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setSelectedFiles("")
    setOpen(false)
  };
  const openReviewPhotos = (review) => {
    setSelectedReview(review)
    setOpenReviewModal(true)
  };
  const closeReviewPhotos = () => {
    setSelectedReview({photos: []})
    setOpenReviewModal(false)
  };
  const [selectedFiles, setSelectedFiles] = useState("")
  const [editReview, setEditReview] = useState(false);
  const [updatedReviewId, setUpdatedReviewId] = useState(0);
  const [selectedReview, setSelectedReview] = useState({photos: []})

  const theme = useTheme()

  const submitRating = async () => {
    if (selectedFiles !== "") {
      const uploadURLList = [];
      for (let i = 0; i < Object.entries(selectedFiles).length; i++) {
        uploadURLList[i] = await axios.get('/api/db/uploadURL')
      }
      for (let i = 0; i < uploadURLList.length; i++) {
        await fetch(uploadURLList[i].data, {
          method: "PUT",
          headers: {
            "Content-Type": "multipart/form-data"
          },
          body: selectedFiles[i]
        })
        selectedFiles[i].fileName = selectedFiles[i].name
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
        setUserRating(5);
        setUserReview("");
      })
      .catch((err) => {
        console.log("err on submitting a review", err);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    //When editing existing review
    if (editReview) {
      updateReview(updatedReviewId);
      handleClose();
      setEditReview(false);
      setUserRating(5);
      setUserReview("");
      setUpdatedReviewId(0);
    //When creating a new review
    } else {
      if (!isFormInvalid) {
        submitRating();
      }  
    }
  };

  const handleEdit = (review) => {
    //When user clicks Edit from trail-specific page
    if (!editReview) {
      handleOpen();
      setEditReview(true);
      getReview(review.review_id);
      setUpdatedReviewId(review.review_id);
    //When user clicks Cancel from the Edit review popup
    } else {
      handleClose();
      setEditReview(false);
      setUserRating(5);
      setUserReview("");
      setUpdatedReviewId(0);
    }
  }

  const deleteReview = (review) => {
    fetch(`/api/db/deleteReview/${review.review_id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      }
    })
      .then(() => {
        refreshTrail();
      })
      .catch((err) => {
        console.log("err on deleting a review", err);
      });
  }
  
  const getReview = (review_id) => {
    fetch(`/api/db/getReview/${review_id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      }
    })
      .then(data => data.json())
      .then(data => {
        setUserReview(data.review);
        setUserRating(data.stars);
        refreshTrail();
      })
      .catch((err) => {
        console.log("err on getting a review", err);
      });
  }

  const updateReview = (review_id) => {
    const review = {
      stars: userRating,
      review: userReview,
      date: Date().split(' ').slice(0,4).join(' ')
    };
    fetch(`/api/db/updateReview/${review_id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(review),
    })
     .then(() => {
        refreshTrail();
        setEditReview(false);
        setUserRating(5);
        setUserReview("");
      })
      .catch((err) => {
        console.log("err on updating a review", err);
      });
  }

  const onChangeFile = async (event) => {
    setSelectedFiles(event.target.files)
  }

  return (
    <>
      <div style={{backgroundColor: theme.palette.innerCard.main}} className="tile-1-card-top">
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
                bgcolor: theme.palette.outerCard.main,
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
                          {review.photos.length > 0 ? (
                            <div>
                              <img onClick={()=>openReviewPhotos(review)} className="reviewThumbNail" src={review.photos[0].photo_src}></img>
                              <Modal
                                open={openReviewModal}
                                onClose={closeReviewPhotos}
                                aria-labelledby="modal-modal-title"
                                aria-describedby="modal-modal-description"
                              >
                                <div>
                                  <Carousel 
                                    sx={reviewPhotoStyle}
                                    navButtonsAlwaysVisible= {true}
                                    autoPlay = {false}
                                  >
                                    {selectedReview.photos.map((el, i) => {
                                      return (
                                        <div key={i} className="reviewPhotosModalDiv">
                                          <div style={{display:"grid", gridTemplateColumns: "2fr 1fr", marginBottom: "15px"}}>
                                            <div style={{display:"flex", flexDirection:"column", justifyContent:"center"}}>
                                            <div style={{display:"flex", flexDirection:"row", justifyContent:"start", marginLeft: "20px"}}>
                                            {`${el.name}:`}
                                            <Rating
                                              name="read-only"
                                              sx={{ fontSize: "22px", marginLeft: "5px", marginBottom: "7px" }}
                                              value={selectedReview.stars}
                                              readOnly
                                            />
                                            </div>
                                            <span style={{minWidth: "400px", wordWrap: "break-word", marginLeft: "20px", marginBottom: "20px", marginTop: "10px", maxHeight: "200px", overflow: "scroll"}}>{selectedReview.review}</span>
                                            </div>
                                          </div>
                                          <ImageListItem sx={{display: "flex", justifyContent: " center", margin: "auto"}}>
                                            <img
                                              src={el.photo_src}
                                              alt={el.name}
                                              loading="lazy"
                                              className="reviewPhotosModal"
                                              onClick={()=>openReviewPhotos()}
                                            />
                                            <ImageListItemBar
                                              title={`${el.name}'s photos`}
                                            />
                                          </ImageListItem>
                                        </div>
                                      )
                                    })}
                                  </Carousel>
                                </div>
                              </Modal>
                            </div>
                          ) : ([])}
                          <div className="modify-or-delete" hidden={review.user_id !== userData.user_id}>
                            <Button variant="text" onClick={ () => { handleEdit(review) } }>
                              Edit
                            </Button>
                            <Button variant="text" onClick={ () => { deleteReview(review) }}>
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
      <div style={{backgroundColor: theme.palette.innerCard.main}} className="tile-1-card-bottom"></div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          { editReview ? (
          <>
          <Typography id="modal-modal-title" variant="h6" component="h2">Update review</Typography>
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
              defaultValue={userReview}
              onChange={(e) => setUserReview(e.target.value)}
            />
            <div className="modal-button-wrapper">
              <Button
                formNoValidate
                type="submit"
                variant="contained"
                sx={{ marginRight: "1rem" }}
                // onChange={handleFormChange}
              >
                Update
              </Button>
              <Button variant="outlined" onClick={() => {handleEdit()}}>
                Cancel
              </Button>
            </div>
          </form>
          </>) : (
            <>
            <Typography id="modal-modal-title" variant="h6" component="h2">Leave a review</Typography>
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
                <IconButton color="primary" aria-label="upload picture" component="label" onChange={onChangeFile}>
                  <input hidden accept="image/*"  multiple type="file" />
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
          </>)}
        </Box>
      </Modal>
    </>
  );
}
