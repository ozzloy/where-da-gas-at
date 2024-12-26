import { useEffect,  useContext, useState } from "react";
import { useMapsLibrary } from "@vis.gl/react-google-maps";
import { GoogleMapContext } from "../context/GoogleMapContext";

const API_KEY = import.meta.env.VITE_REACT_APP_GOOGLE_MAPS_API_KEY;

function useGetNearByStations({ center }) {
  const { nearbyStations, setNearbyStations, radius, map, filter } = useContext(GoogleMapContext);

  // const [getNextPage, setGetNextPage] = useState(null);

  const placesLib = useMapsLibrary("places");

  useEffect(() => {
      if (!placesLib || !center) {
        return;
      }
      // const service = new google.maps.places.PlacesService(map);
      // const fetchNearbyStations = () => {
      //   service.nearbySearch(
      //     {
      //       location: center,
      //       radius: radius,
      //       type: ["gas_station"],
      //     },
      //     (results, status, pagination) => {
      //       if (status !== google.maps.places.PlacesServiceStatus.OK || !results) {
      //         console.error("Error fetching nearby places:", status);
      //         return;
      //       }
  
      //       setNearbyStations((prevStations) => [...prevStations, ...results]);
      //       setGetNextPage(() => {
      //         if (pagination && pagination.hasNextPage) {
      //           return () => pagination.nextPage();
      //         }
      //         return null;
      //       });
      //     }
      //   );
      // };
  
      // fetchNearbyStations();
        const requestOptions = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-Goog-Api-Key": API_KEY,
            "X-Goog-FieldMask":
              "places.accessibilityOptions,places.addressComponents,places.adrFormatAddress,places.attributions,places.businessStatus,places.containingPlaces,places.displayName,places.formattedAddress,places.googleMapsLinks,places.googleMapsUri,places.iconBackgroundColor,places.iconMaskBaseUri,places.id,places.location,places.name,places.photos,places.plusCode,places.primaryType,places.primaryTypeDisplayName,places.pureServiceAreaBusiness,places.shortFormattedAddress,places.rating,places.subDestinations,places.types,places.utcOffsetMinutes,places.viewport,places.priceLevel",
          },
          body: JSON.stringify({
            locationRestriction: {
              circle: {
                center: {
                  latitude: center.lat,
                  longitude: center.lng,
                },
                radius: radius,
              },
            },
            includedPrimaryTypes: filter,
          }),
        };
    async function fetchNearbyPlaces() {
      try {
        const response = await fetch(
          "https://places.googleapis.com/v1/places:searchNearby",
          requestOptions
        );
        const data = await response.json();
        setNearbyStations(data.places);
      } catch (error) {
        console.error("Error fetching nearby places:", error);
      }
    }
    fetchNearbyPlaces();

    }, [placesLib, center, setNearbyStations, radius, map, filter]);

  return nearbyStations;
}

export { useGetNearByStations };
