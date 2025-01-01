import { useEffect, useContext, useState } from "react";
import { GoogleMapContext } from "../context/GoogleMapContext";

function useGoogleFetchPhoto() {
  const { selectedStation } = useContext(GoogleMapContext);
  const [photoUrlList, setPhotoUrlList] = useState([]);

  // In order to display the images from the Google Places API, we
  // need to fetch the image from the Google Places API
  useEffect(() => {
    const fetchPhotoUrl = async () => {
      // This creates a long URL string that we fetch from using the
      // Google Places API
      if (
        selectedStation &&
        selectedStation.photos &&
        selectedStation.photos.length > 0
      ) {
        const photoList = selectedStation.photos;
        const photoUrls = await Promise.all(
          photoList.map(async (photo) => {
            const photoName = photo.name;
            const response = await fetch(
              `https://places.googleapis.com/v1/${photoName}/media?maxHeightPx=400&maxWidthPx=400&key=${import.meta.env.VITE_REACT_APP_GOOGLE_MAPS_API_KEY}`,
            );

            if (!response.ok) {
              throw new Error(
                `HTTP error! status: ${response.status}`,
              );
            }

            return response.url;
          }),
        );
        setPhotoUrlList(photoUrls);
      }
    };

    fetchPhotoUrl();
  }, [selectedStation]);

  return photoUrlList;
}

export { useGoogleFetchPhoto };
