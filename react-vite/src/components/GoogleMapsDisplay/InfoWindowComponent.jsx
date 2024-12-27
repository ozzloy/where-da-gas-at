import { InfoWindow } from "@vis.gl/react-google-maps";
import { useContext } from 'react';
import { GoogleMapContext } from '../../context/GoogleMapContext';
import { MdImageNotSupported } from 'react-icons/md';
import { useGoogleFetchPhoto } from '../../hooks/useGoogleFetchPhoto';
import './InfoWindowComponent.css';
import { NavLink } from "react-router-dom";
import SaveSpotIcon from "./GoogleMapsInfoDisplay/SaveSpotIcon";

function InfoWindowComponent() {
    const { selectedStation, setSelectedStation } = useContext(GoogleMapContext)
    const photoUrl = useGoogleFetchPhoto();

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
          ):(
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