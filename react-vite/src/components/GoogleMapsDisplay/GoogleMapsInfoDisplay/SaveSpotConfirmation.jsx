import { useContext, useState, useEffect } from 'react';
import { GoogleMapContext } from '../../../context/GoogleMapContext';
import { useModal } from '../../../context/Modal';
import { MdImageNotSupported } from 'react-icons/md';
import './SaveSpotConfirmation.css';

function SaveSpotConfirmation() {
    const { closeModal } = useModal();
    const { selectedStation } = useContext(GoogleMapContext);
    
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
    <div className='modal-body'>
          <h3 className='modal-question'>Are you sure you want to save this station?</h3>
          <div className='station-data-display'>
                <h3>{selectedStation.displayName.text}</h3>
                <p>{selectedStation.formattedAddress}</p>
                {selectedStation && selectedStation.photos && selectedStation?.photos.length > 0 ? (<img className="image" src={photoUrl} alt={`${selectedStation.displayName.text} image`} />)
                        : (
                        <div className="image">
                            <MdImageNotSupported />
                        </div>)
                }
          </div>
          <div className='button-container'>
            <button className="button-design">Save</button>
            <button className="button-design" onClick={closeModal}>Nahh I&apos;m good</button>
          </div>
    </div>
  )
}

export default SaveSpotConfirmation