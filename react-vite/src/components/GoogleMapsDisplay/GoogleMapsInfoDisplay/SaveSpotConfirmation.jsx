import { useContext } from 'react';
import { GoogleMapContext } from '../../../context/GoogleMapContext';
import { useModal } from '../../../context/Modal';
import { MdImageNotSupported } from 'react-icons/md';
import { useGoogleFetchPhoto } from '../../../hooks/useGoogleFetchPhoto';
import './SaveSpotConfirmation.css';
import { useNavigate } from 'react-router-dom';




function SaveSpotConfirmation() {
    const { closeModal } = useModal();
    const { selectedStation } = useContext(GoogleMapContext);
    const photoUrl = useGoogleFetchPhoto();
    const navigate = useNavigate();


    return (
        <div className='modal-body'>
            <h3 className='modal-question'>Are you sure you want to save this station?</h3>
            <div className='station-data-display'>
                    <h3>{selectedStation.displayName.text}</h3>
                    <p>{selectedStation.formattedAddress}</p>
                    {selectedStation && selectedStation.photos && selectedStation?.photos.length > 0 ? (<img className="image" src={photoUrl[0]} alt={`${selectedStation.displayName.text} image`} />)
                            : (
                            <div className="image">
                                <MdImageNotSupported />
                            </div>)
                    }
            </div>
            <div className='button-container'>
                <button className="button-design" onClick={() => navigate('/')} > Save
                    </button>
                <button className="button-design" onClick={closeModal}>Nahh I&apos;m good</button>
            </div>
        </div>
    )
}

export default SaveSpotConfirmation