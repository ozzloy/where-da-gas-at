import "./primaryType.css";
import { GoogleMapContext } from "../../../context/GoogleMapContext";
import { useContext } from "react";

function PrimaryTypeCard({ station, primaryType }) {
  const { setSelectedStation, setNewCenter, setOpenSideMenu } =
    useContext(GoogleMapContext);
  let icon = "";
  if (primaryType === "gas_station") {
    icon = "/gasIcon.svg";
  }
  if (primaryType === "electric_vehicle_charging_station") {
    icon = "/evIcon.svg";
  }

  function onClickHandler(station) {
    setSelectedStation(station);
    setNewCenter({
      lat: station.location.latitude,
      lng: station.location.longitude,
    });
    setOpenSideMenu(false);
  }
  return (
    <div
      className="station-card-container"
      onClick={() => onClickHandler(station)}
    >
      <div className="station-card-header">
        <img src={icon} alt="icon" className="station-card-icon" />
        <h3 className="station-display-name">
          {station.displayName.text}
        </h3>
      </div>
      <ul className="under-line" />
    </div>
  );
}

export default PrimaryTypeCard;
