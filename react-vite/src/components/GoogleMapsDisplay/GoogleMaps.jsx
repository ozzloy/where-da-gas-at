import {
  APIProvider,
  Map,
  useMapsLibrary,
  useMap,
  AdvancedMarker,
} from "@vis.gl/react-google-maps";
import { useGetCurrentLocation } from "../../hooks/useGetCurrentLocationHook";
import { useGetNearByStations } from "../../hooks/useGetNearByStations";
import AdvanceMarkerComponent from "./GoogleMapsInfoDisplay/AdvanceMarkerComponent";

const API_KEY = import.meta.env.VITE_REACT_APP_GOOGLE_MAPS_API_KEY;

function GoogleMaps() {
  const map = useMap();
  const placesLib = useMapsLibrary("places");
  const usersLocation = useGetCurrentLocation();
  const nearbyStations = useGetNearByStations({
    placesLib,
    map,
    center: usersLocation,
  });
  return (
    <APIProvider apiKey={API_KEY}>
      <Map
        style={{ width: "90vw", height: "90vh" }}
        defaultCenter={usersLocation}
        mapId={import.meta.env.VITE_REACT_APP_GOOGLE_MAP_ID}
        defaultZoom={15}
        disableDefaultUI={true}
        gestureHandling={"greedy"}
        maxZoom={20}
        // onZoomChanged={(zoom) => console.log("Zoom changed", zoom)}
      >
        <AdvancedMarker position={usersLocation}>
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
    </APIProvider>
  );
}

export default GoogleMaps;
