import { Map, AdvancedMarker } from "@vis.gl/react-google-maps";
import { useEffect, useContext, useState } from "react";
import { GoogleMapContext } from "../../context/GoogleMapContext";
import { useSelector } from "react-redux";
import "./MapComponent.css";
import GoogleMapsNearByLocations from "./GoogleMapsNearByLocations";
import InfoWindowComponent from "./InfoWindowComponent";
import { useTheme } from "../../context/ThemeContext";
import { useModal } from "../../context/Modal";
import LoginFormModal from "../LoginFormModal";

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
  const { signedUp } = useModal();
  const [mapId, setMapId] = useState(
    import.meta.env.VITE_REACT_APP_GOOGLE_MAP_ID_DARK_MODE,
  );

  const [stations, setStations] = useState([]);
  const sessionUser = useSelector((state) => state.session.user);

  //This useEffect will run when the map and newCenter is available
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

  useEffect(() => {
    if (sessionUser === null || sessionUser.errors) return;

    const fetchStations = async () => {
      try {
        const res = await fetch("/api/station/");

        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        const data = await res.json();
        setStations(Object.values(data.station));
      } catch (error) {
        console.error("Failed to fetch stations:", error);
      }
    };
    fetchStations();
  }, [sessionUser]);

  useEffect(() => {
    if (sessionUser?.errors) return;

    const postStation = async (station) => {
      const body = {
        id: station.id,
        name: station.displayName.text,
        lat: station.location.latitude,
        lng: station.location.longitude,
        address: station.formattedAddress,
        uri: station.googleMapsUri,
      };

      try {
        const res = await fetch("/api/station/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        });

        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        const data = await res.json();
      } catch (error) {
        console.error("Failed to post station:", error);
      }
    };

    const postUnsavedStations = async () => {
      const existingStationIds = stations.map(
        (station) => station.id,
      );
      const unsavedStations = nearbyStations.filter(
        (station) => !existingStationIds.includes(station.id),
      );

      for (const station of unsavedStations) {
        await postStation(station);
      }
    };

    postUnsavedStations();
  }, [nearbyStations, sessionUser, stations]);

  return (
    <>
      {!sessionUser?.nick && signedUp && (
        <div className="log-in-modal-item-container">
          <LoginFormModal />
        </div>
      )}
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
