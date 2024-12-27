import { MdImageNotSupported } from "react-icons/md";
import { useGoogleFetchPhoto } from "../../../hooks/useGoogleFetchPhoto";
import './StationImageDisplay.css';

function StationImageDisplay() {
    const photos = useGoogleFetchPhoto();

    const placeholderImage = (index) => (
        <div key={index} className="gas-station-image">
            <MdImageNotSupported />
        </div>
    );

    while (photos.length < 3) {
        photos.push(placeholderImage(photos.length));
    }

    if (photos && photos.length > 0) {
        return (
            <div className="gas-station-image-container">
                {photos.slice(0, 3).map((photo, index) => (
                    typeof photo === 'string' ? (
                        <img key={index} src={photo} className="gas-station-image" alt={`Gas station ${index}`} />
                    ) : (
                        placeholderImage(index)
                    )
                ))}
            </div>
        );
    }

    return null;
}

export default StationImageDisplay;