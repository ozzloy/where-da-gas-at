import { InfoWindow } from "@vis.gl/react-google-maps";
import { useContext, useState, useEffect } from 'react';
import { GoogleMapContext } from '../../context/GoogleMapContext';
import { MdImageNotSupported } from 'react-icons/md';
import './InfoWindowComponent.css';
import { NavLink } from "react-router-dom";
import SaveSpotIcon from "./GoogleMapsInfoDisplay/SaveSpotIcon";

function InfoWindowComponent() {
    const { selectedStation, setSelectedStation } = useContext(GoogleMapContext)
    const [photoUrl, setPhotoUrl] = useState(null);

  //In order to display the images from the google places api we need to fetch the image from the google places api
    useEffect(() => {
      const fetchPhotoUrl = async () => {
          //This creates a long url string that we fetch from using the google places api
            if (selectedStation.photos && selectedStation.photos.length > 0) {
                const photoName = selectedStation.photos[0].name;
                const response = await fetch(
                    `https://places.googleapis.com/v1/${photoName}/media?maxHeightPx=400&maxWidthPx=400&key=${import.meta.env.VITE_REACT_APP_GOOGLE_MAPS_API_KEY
                    }`
                );
    
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
    
                const imageBlob = await response.blob();
                const imageObjectURL = URL.createObjectURL(imageBlob);
                setPhotoUrl(imageObjectURL);
            }
        };
        fetchPhotoUrl();
    }, [selectedStation.photos])


  return (
    <InfoWindow
    position={{
      lat: selectedStation.location.latitude,
      lng: selectedStation.location.longitude
      }}
    headerContent={<SaveSpotIcon />}
    onCloseClick={() => setSelectedStation(null)}
  >
    <div className="info-window-display">
        <h3>{selectedStation.displayName.text}</h3>
        <p>{selectedStation.formattedAddress}</p>
        <div className="button-container">
        {/* We can either change the page by state or we can change by navigation This is a reminder to talk about it */}
          <NavLink to={`station/${selectedStation.id}`} className="view-more-design">View More</NavLink>
          <a className="view-more-design" target="_blank" rel="noopener noreferrer" href={selectedStation.googleMapsUri}>Click for direction</a>
        </div>
        {/* Conditionally render an image or the no image icon */}
        <div className="image-container">
          {selectedStation && selectedStation.photos && selectedStation?.photos.length > 0 ? (
            <img className="image" src={photoUrl} alt={`${selectedStation.displayName.text} image`} />
          )
            :
            (
              <div className="no-image">
                  <MdImageNotSupported />
              </div>
            )
          }
        </div>
    </div>
  </InfoWindow>
  )
}

export default InfoWindowComponent