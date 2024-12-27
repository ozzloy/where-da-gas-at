import { MdImageNotSupported } from "react-icons/md";
import { useGoogleFetchPhoto } from "../../../hooks/useGoogleFetchPhoto";
import './StationImageDisplay.css';

function StationImageDisplay() {
    const photos = useGoogleFetchPhoto();

    const placeholderImage = (
        <div className="gas-station-image">
            <MdImageNotSupported />
        </div>); 

    while (photos.length < 3) {
        photos.push(placeholderImage);
    }

    if (photos && photos.length > 0) {
        return ( <div className="gas-station-image-container">
                {photos.slice(0, 3).map((photo, index) => (
                    typeof photo === 'string' ? (
                        <img key={index} src={photo} className="gas-station-image" alt={`Gas station ${index}`} />
                    ) : (
                        placeholderImage
                    )
                ))}
        </div>)
    }
}

export default StationImageDisplay