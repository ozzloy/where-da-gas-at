import { InfoWindow } from "@vis.gl/react-google-maps";
import { useContext } from "react";
import { GoogleMapContext } from "../../context/GoogleMapContext";
import { useGoogleFetchPhoto } from "../../hooks/useGoogleFetchPhoto";
import "./InfoWindowComponent.css";
import SaveSpotIcon from "./GoogleMapsInfoDisplay/SaveSpotIcon";
import DisplayCard from "./DisplayCard";

function InfoWindowComponent() {
  const { selectedStation, setSelectedStation } =
    useContext(GoogleMapContext);
  const photoUrl = useGoogleFetchPhoto();

  return (
    <InfoWindow
      position={{
        lat: selectedStation.location.latitude,
        lng: selectedStation.location.longitude,
      }}
      headerContent={<SaveSpotIcon />}
      onCloseClick={() => setSelectedStation(null)}
    >
      <DisplayCard
        selectedStation={selectedStation}
        photoUrl={photoUrl}
      />
    </InfoWindow>
  );
}

export default InfoWindowComponent;
