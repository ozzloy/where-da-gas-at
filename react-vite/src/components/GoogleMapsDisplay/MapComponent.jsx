import { Map, AdvancedMarker } from "@vis.gl/react-google-maps";
import { useEffect, useContext, useState } from "react";
import { GoogleMapContext } from "../../context/GoogleMapContext";
import "./MapComponent.css";
import GoogleMapsNearByLocations from "./GoogleMapsNearByLocations";
import InfoWindowComponent from "./InfoWindowComponent";
import { useTheme } from "../../context/ThemeContext";

function MapComponent() {
  const {
    center,
    newCenter,
    setNewCenter,
    nearbyStations,
    selectedStation,
    map,
    zoom,
    setSelectedStation,
    setZoom,
  } = useContext(GoogleMapContext);

  const { theme } = useTheme();

  const [mapId, setMapId] = useState(
    import.meta.env.VITE_REACT_APP_GOOGLE_MAP_ID_DARK_MODE,
  );

  useEffect(() => {
    if (map && newCenter) {
      map.setCenter(newCenter);
    }
  }, [map, newCenter, center]);

  useEffect(() => {
    setMapId(
      theme === "dark"
        ? import.meta.env.VITE_REACT_APP_GOOGLE_MAP_ID_DARK_MODE
        : import.meta.env.VITE_REACT_APP_GOOGLE_MAP_ID_LIGHT_MODE,
    );
  }, [theme]);

  const handleDragEnd = () => {
    if (map) {
      const newCenter = map.getCenter();
      setNewCenter({ lat: newCenter.lat(), lng: newCenter.lng() });
    }
  };
  return (
    <>
      {/* <button onClick={() => toggleTheme}></button> */}

      <Map
        // onLoad={onLoad}
        onDragend={handleDragEnd}
        style={{ width: "100%", height: "100vh" }}
        defaultCenter={center}
        mapId={mapId}
        defaultZoom={15}
        zoom={zoom}
        onZoomChanged={() => setZoom(map.getZoom())}
        onClick={() => selectedStation && setSelectedStation(null)}
        disableDefaultUI={true}
        gestureHandling={"greedy"}
      >
        <AdvancedMarker position={center}>
          <div>
            <img
              className="user-marker"
              src="/user.svg"
              width={32}
              height={32}
            />
          </div>
        </AdvancedMarker>
        {/* Here we conditionally render the Info Window Component. If a
         * user selects a station the it will appear */}
        {selectedStation && <InfoWindowComponent />}
        {/* This is the component that will render all the nearby
         * station markers on the map */}
        <GoogleMapsNearByLocations nearbyStations={nearbyStations} />
      </Map>
    </>
  );
}

export default MapComponent;
