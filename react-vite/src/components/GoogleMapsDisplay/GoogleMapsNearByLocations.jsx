import AdvanceMarkerComponent from "./GoogleMapsInfoDisplay/AdvanceMarkerComponent";
import "./GoogleMapsNearByLocations.css";

function GoogleMapsNearByLocations({ nearbyStations }) {
    return (
        <>
          {nearbyStations &&
            nearbyStations.length > 0 &&
            nearbyStations.map((station) => {
              const stationTypes = station.types;
              return (
                <div className="station-map-marker" key={station.id}>
                  <AdvanceMarkerComponent
                    center={location}
                    station={station}
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