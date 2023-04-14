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

export default function TrailDetailsReviewCard({ trail }) {
  const [averageStars, setAverageStars] = useState(5);
  const [numberOfReviews, setNumberOfReviews] = useState(0);
  const [reviews, setReviews] = useState([]);
  const [userRating, setUserRating] = useState(5);
  const [userReview, setUserReview] = useState("");
  const [open, setOpen] = useState(false);
  const [name, updateName] = useState("");
  const [isFormInvalid, setIsFormInvalid] = useState(false);

  const fakeMockObject = {
    data: [
      {
        name: "bob",
        review: "best trail ever",
        stars: 5,
      },
      {
        name: "shirley",
        review: "worst trail ever",
        stars: 1,
      },
      {
        name: "sarah",
        review: "difficult and challenging",
        stars: 3,
      },
    ],
    averageStars: 3,
    numberOfReviews: 3,
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleFormChange = (name) => {
    updateName(name);
    setIsFormInvalid(false);
  };

  const validate = () => {
    return name.length < 1 ? setIsFormInvalid(true) : setIsFormInvalid(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      name: name,
      stars: userRating,
      review: userReview,
      trailId: trail.id,
    };
    if (!isFormInvalid) {
      handleClose();
      console.log("here is the valid form data", formData);
      // TODO: call the /addReview POST with this formData
    }
  };

  useEffect(() => {
    setAverageStars(fakeMockObject.averageStars);
    setNumberOfReviews(fakeMockObject.numberOfReviews);
    setReviews(fakeMockObject.data);
  }, []);

  return (
    <>
      <Card>
        <CardContent>
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
              {reviews.length ? (
                <List
                  sx={{
                    bgcolor: "background.paper",
                    maxHeight: "300px",
                    overflowY: "auto",
                  }}
                >
                {
                  reviews.map((review, i) => {
                    return (
                      <>
                      <ListItem key={i}>
                        <ListItemText
                          primary={
                           <>
                           <div className="review-primary-wrapper">
                           {review.name}
                            <Rating name="read-only" sx={{fontSize: "13px", marginLeft: '5px'}} value={review.stars} readOnly />
                           </div>
                           </> 
                          }  
                          secondary={review.review}
                        />
                      </ListItem>
                      </>                
                    )
                  })
                }
                </List>
              ) : (
                <p>There are no reviews yet!</p>
              )}
            </div>
            <div className="tile-1-card-right">
              <Box sx={{ textAlign: "center" }}>
                <Rating name="read-only" value={averageStars} readOnly />
                <Typography variant="subtitle2">
                  Rating: {averageStars} • {numberOfReviews} reviews
                </Typography>
              </Box>
            </div>
          </div>
          <div className="tile-1-card-bottom"></div>
        </CardContent>
      </Card>
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
              error={isFormInvalid}
              helperText={isFormInvalid ? "Name is required" : ""}
              label="Name"
              size="small"
              value={name}
              onChange={(e) => handleFormChange(e.target.value)}
              InputLabelProps={{ shrink: true }}
              color="primary"
              required
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
            <div className="modal-button-wrapper">
              <Button
                formNoValidate
                type="submit"
                variant="contained"
                sx={{ marginRight: "1rem" }}
                onClick={validate}
                onChange={handleFormChange}
              >
                Save
              </Button>
              <Button variant="outlined" onClick={handleClose}>
                Cancel
              </Button>
            </div>
          </form>
        </Box>
      </Modal>
    </>
  );
}
