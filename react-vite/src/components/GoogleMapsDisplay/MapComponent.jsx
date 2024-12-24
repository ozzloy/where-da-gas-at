import {  Map, AdvancedMarker, useMap } from "@vis.gl/react-google-maps";
import { useEffect, useContext } from "react";
import { GoogleMapContext } from "../../context/GoogleMapContext";
import "./MapComponent.css";
import GoogleMapsNearByLocations from "./GoogleMapsNearByLocations";

function MapComponent() {
  //Use map hook is made by vis.gl to get the map instance
  //We can use this to get all the information about the map
  const map = useMap();
  
  const { center, newCenter, setNewCenter, nearbyStations } = useContext(GoogleMapContext);
  
  //This useEffect will run when the map and newCenter is available
    useEffect(() => {
      if (map && newCenter) {
        map.setCenter(newCenter);
      }
    }, [map, newCenter, center]);
  
    const handleDragEnd = () => {
      if (map) {
        const newCenter = map.getCenter();
        setNewCenter({ lat: newCenter.lat(), lng: newCenter.lng() });
      }
    };
  
    return (
      <Map
        onLoad={(mapInstance) =>  mapInstance.setCenter(center)}
        onDragend={handleDragEnd}
        style={{ width: '100vw', height: '100vh' }}
        defaultCenter={center}
        mapId={import.meta.env.VITE_REACT_APP_GOOGLE_MAP_ID}
        defaultZoom={15}
        disableDefaultUI={true}
        gestureHandling={'greedy'}
        maxZoom={20}
      >
        <AdvancedMarker position={center}>
          <div>
            <img className="user-marker" src="/user.svg" width={32} height={32} />
          </div>
        </AdvancedMarker>
  
        <GoogleMapsNearByLocations nearbyStations={nearbyStations} />
      </Map>
    );
}
  
export default MapComponent;