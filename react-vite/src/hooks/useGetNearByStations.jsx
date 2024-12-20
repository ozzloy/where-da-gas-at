import { useEffect, useState } from "react";
import { useMapsLibrary } from "@vis.gl/react-google-maps";

const API_KEY = import.meta.env.VITE_REACT_APP_GOOGLE_MAPS_API_KEY;

function useGetNearByStations({ center }) {
  const [stations, setStations] = useState(null);
  const placesLib = useMapsLibrary("places");

  useEffect(() => {
    const fetchNearbyPlaces = async () => {
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Goog-Api-Key": API_KEY,
          "X-Goog-FieldMask": import.meta.env.VITE_REACT_APP_GOOGLE_FIELD_MAPS,
        },
        body: JSON.stringify({
          locationRestriction: {
            circle: {
              center: {
                latitude: center.lat,
                longitude: center.lng,
              },
              radius: 5000,
            },
          },
          includedPrimaryTypes: [
            "gas_station",
            "electric_vehicle_charging_station",
          ],
        }),
      };

      try {
        const response = await fetch(
          "https://places.googleapis.com/v1/places:searchNearby",
          requestOptions
        );
        const data = await response.json();
        setStations(data.places);
      } catch (error) {
        console.error("Error fetching nearby places:", error);
      }
    };

    fetchNearbyPlaces();
  }, [placesLib, center]);

  return stations;
}

export { useGetNearByStations };
