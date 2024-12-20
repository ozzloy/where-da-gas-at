import {
  APIProvider,
  Map,
  useMapsLibrary,
  AdvancedMarker,
} from "@vis.gl/react-google-maps";
import { useEffect } from "react";
import { useGetCurrentLocation } from "../../hooks/useGetCurrentLocationHook";
import { useGetNearByStations } from "../../hooks/useGetNearByStations";
import AdvanceMarkerComponent from "./GoogleMapsInfoDisplay/AdvanceMarkerComponent";

const API_KEY = import.meta.env.VITE_REACT_APP_GOOGLE_MAPS_API_KEY;

function GoogleMaps() {
  const placesLib = useMapsLibrary("places");
  const center = useGetCurrentLocation();
  const nearbyStations = useGetNearByStations({
    placesLib,
    center,
  });

  useEffect(() => {
    console.log(center, "Current Location");
  }, [center]);
  return (
    <APIProvider apiKey={API_KEY}>
      {center ? (
        <Map
          style={{ width: "100vw", height: "100vh" }}
          defaultCenter={center}
          mapId={import.meta.env.VITE_REACT_APP_GOOGLE_MAP_ID}
          defaultZoom={15}
          disableDefaultUI={true}
          gestureHandling={"greedy"}
          maxZoom={20}
          // onZoomChanged={(zoom) => console.log("Zoom changed", zoom)}
        >
          <AdvancedMarker position={center}>
            <div>
              <img src="/user.svg" width={32} height={32} />
            </div>
          </AdvancedMarker>

          {nearbyStations &&
            nearbyStations.length > 0 &&
            nearbyStations.map((station) => {
              const stationTypes = station.types;
              return (
                <div key={station.id}>
                  <AdvanceMarkerComponent
                    center={location}
                    position={station.location}
                    stationTypes={stationTypes}
                  />
                </div>
              );
            })}
        </Map>
      ) : (
        "Loading..."
      )}
    </APIProvider>
  );
}

export default GoogleMaps;
