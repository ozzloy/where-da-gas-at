import { useContext } from "react";
import { GoogleMapContext } from "../../context/GoogleMapContext";
import AdvanceMarkerComponent from "./GoogleMapsInfoDisplay/AdvanceMarkerComponent";

function GoogleMapsNearByLocations({ nearbyStations }) {
  const { setSelectedStation} = useContext(GoogleMapContext);
    return (
        <>
          {nearbyStations &&
            nearbyStations.length > 0 &&
            nearbyStations.map((station) => {
              const stationTypes = station.types;
              return (
                <div key={station.id} onClick={() => setSelectedStation(station)}>
                  <AdvanceMarkerComponent
                    center={location}
                    position={station.location}
                    stationTypes={stationTypes}
                  />
                </div>
              );
            })}
        </>
      );
    }
    

export default GoogleMapsNearByLocations