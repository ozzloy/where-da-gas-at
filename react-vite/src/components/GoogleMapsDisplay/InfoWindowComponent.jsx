import { InfoWindow } from "@vis.gl/react-google-maps";
import { useContext, useState, useEffect } from 'react';
import { GoogleMapContext } from '../../context/GoogleMapContext';
import { MdImageNotSupported } from 'react-icons/md';
import './InfoWindowComponent.css';

function InfoWindowComponent() {
    const { selectedStation, setSelectedStation } = useContext(GoogleMapContext)
    const [photoUrl, setPhotoUrl] = useState(null);

    useEffect(() => {
        const fetchPhotoUrl = async () => {
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
    onCloseClick={() => setSelectedStation(null)}
  >
    <div>
        <h3>{selectedStation.displayName.text}</h3>
        <p>{selectedStation.formattedAddress}</p>
              {selectedStation && selectedStation.photos && selectedStation?.photos.length > 0 ? (<img className="image" src={photoUrl} alt={`${selectedStation.displayName.text} image`} />)
                  :
                  (
                      <div className="image">
                        
                          <MdImageNotSupported />
                        </div>
                  )
              }
    </div>
  </InfoWindow>
  )
}

export default InfoWindowComponent