import AdvanceMarkerComponent from "./GoogleMapsInfoDisplay/AdvanceMarkerComponent";

function GoogleMapsNearByLocations({ nearbyStations }) {
    return (
        <>
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
        </>
      );
    }
    

export default GoogleMapsNearByLocations