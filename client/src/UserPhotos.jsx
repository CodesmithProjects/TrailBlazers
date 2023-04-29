import * as React from 'react';
import Typography from "@mui/material/Typography";
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import Modal from "@mui/material/Modal";
import Carousel from 'react-material-ui-carousel'
import { useTheme } from '@mui/material/styles';

export default function UserPhotos({trail}) {
  const [openReviewModal, setOpenReviewModal] = React.useState(false);

  const openReviewPhotos = (photo) => {
    setOpenReviewModal(true)
  };
  const closeReviewPhotos = () => {
    setOpenReviewModal(false)
  };

  const theme = useTheme()

  const createCarousel = () => {
    const innerCarousel = []
    for (let i = 0; i < trail.photos.length - 2; i +=3) {
      innerCarousel.push(
        <div key={i}>
          <Typography
            variant="h5"
            sx={{
              marginBottom: "10px",
              fontWeight: "300",
              letterSpacing: "2px",
            }}
            className="about"
          >
            User photos
          </Typography>
          <div className="reviewPhotosOverall">
            <div className="reviewPhotosModalDiv">
              <ImageListItem sx={{margin: "auto"}}>
                <img
                  src={trail.photos[i].photo_src}
                  alt={trail.photos[i].name}
                  loading="lazy"
                  className="reviewPhotosModal"
                />
                <ImageListItemBar
                  title={`${trail.photos[i].name}`}
                />
              </ImageListItem>
            </div>
            <div key={i+1} className="reviewPhotosModalDiv">
              <ImageListItem sx={{margin: "auto"}}>
                <img
                  src={trail.photos[i+1].photo_src}
                  alt={trail.photos[i+1].name}
                  loading="lazy"
                  className="reviewPhotosModal"
                />
                <ImageListItemBar
                  title={`${trail.photos[i+1].name}`}
                />
              </ImageListItem>
            </div>
            <div key={i+2} className="reviewPhotosModalDiv">
              <ImageListItem sx={{margin: "auto"}}>
                <img
                  src={trail.photos[i+2].photo_src}
                  alt={trail.photos[i+2].name}
                  loading="lazy"
                  className="reviewPhotosModal"
                />
                <ImageListItemBar
                  title={`${trail.photos[i+2].name}`}
                />
              </ImageListItem>
            </div>
          </div>
        </div>
      )
    }
    
    let remainder = trail.photos.length - (innerCarousel.length * 3)

    if (remainder === 1) {
      innerCarousel.push(
        <div key={innerCarousel.length * 3}>
          <Typography
            variant="h5"
            sx={{
              marginBottom: "10px",
              fontWeight: "300",
              letterSpacing: "2px",
            }}
            className="about"
          >
            User photos
          </Typography>
          <div className="reviewPhotosOverall">
            <div className="reviewPhotosModalDiv">
              <ImageListItem sx={{margin: "auto"}}>
                <img
                  src={trail.photos[innerCarousel.length * 3].photo_src}
                  alt={trail.photos[innerCarousel.length * 3].name}
                  loading="lazy"
                  className="reviewPhotosModal"
                />
                <ImageListItemBar
                  title={`${trail.photos[innerCarousel.length * 3].name}`}
                />
              </ImageListItem>
            </div>
          </div>
        </div>
      )
    }

    if (remainder === 2) {
      innerCarousel.push(
      <div key={innerCarousel.length * 3}>
        <Typography
          variant="h5"
          sx={{
            marginBottom: "10px",
            fontWeight: "300",
            letterSpacing: "2px",
          }}
          className="about"
        >
          User photos
        </Typography>
        <div className="reviewPhotosOverall">
          <div className="reviewPhotosModalDiv">
            <ImageListItem sx={{margin: "auto"}}>
              <img
                src={trail.photos[innerCarousel.length * 3].photo_src}
                alt={trail.photos[innerCarousel.length * 3].name}
                loading="lazy"
                className="reviewPhotosModal"
              />
              <ImageListItemBar
                title={`${trail.photos[innerCarousel.length * 3].name}`}
              />
            </ImageListItem>
          </div>
          <div key={innerCarousel.length * 3 + 1} className="reviewPhotosModalDiv">
            <ImageListItem sx={{margin: "auto"}}>
              <img
                src={trail.photos[innerCarousel.length * 3 + 1].photo_src}
                alt={trail.photos[innerCarousel.length * 3 + 1].name}
                loading="lazy"
                className="reviewPhotosModal"
              />
              <ImageListItemBar
                title={`${trail.photos[innerCarousel.length * 3 + 1].name}`}
              />
            </ImageListItem>
          </div>
        </div>
      </div>
      )
    }
    return innerCarousel
  }

  return (
    <div style={{backgroundColor: theme.palette.innerCard.main}} className="bottom-tile-cards" >
      <Typography
        variant="h5"
        sx={{
          margin: "20px",
          fontWeight: "300",
          letterSpacing: "2px",
        }}
        className="about"
      >
        User Photos
      </Typography>
      <ImageList 
        sx={{
          overflowY: "auto",
        }}
        variant="masonry" cols={2} gap={8}
      >
        {trail.photos.length > 0 ? (
          trail.photos.map((photo, i) => {
            return (
              <div key={i}>
                <ImageListItem key={i}>
                  <img
                    src={photo.photo_src}
                    alt={photo.name}
                    loading="lazy"
                    className="userPhotos"
                    onClick={()=>openReviewPhotos(photo)}
                  />
                  <ImageListItemBar
                    subtitle={photo.name}
                  />
                </ImageListItem>
                
              </div>
            )
          })
        ) : (<p style={{marginLeft: "20px"}}>There are no photos yet!</p>)}
      </ImageList>
      <Modal
        open={openReviewModal}
        onClose={closeReviewPhotos}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div>
          <Carousel 
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 1050,
              bgcolor: "background.paper",
              border: "2px solid #000",
              boxShadow: 24,
              p: 4,
            }}
            navButtonsAlwaysVisible = {true}
            autoPlay = {false}
          >
            {createCarousel()}
          </Carousel>
        </div>
      </Modal>
    </div>
  )
}

