import { useEffect, useContext, useState } from "react";
import { GoogleMapContext } from "../context/GoogleMapContext";

function useGoogleFetchPhoto() {
    const { selectedStation } = useContext(GoogleMapContext)
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


    return photoUrl;
}

export  {useGoogleFetchPhoto}