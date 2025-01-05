import { useState, createContext } from "react";
import { useMap } from "@vis.gl/react-google-maps";

//Here we initialize the context that will hold all the values shared between the components

const GoogleMapContext = createContext();

export function GoogleMapProvider({ children }) {
  //These are all the bits of state that will be shared between the components
  //If you need to add more feel free to add them here
  const [center, setCenter] = useState(null);
  const [nearbyStations, setNearbyStations] = useState([]);
  const [openSideMenu, setOpenSideMenu] = useState(false);
  const [newCenter, setNewCenter] = useState(center);
  const [selectedStation, setSelectedStation] = useState(null);
  const [radius, setRadius] = useState(5000);
  const [filter, setFilter] = useState([
    "gas_station",
    "electric_vehicle_charging_station",
  ]);
  const [zoom, setZoom] = useState(17);

  //Use map hook is made by vis.gl to get the map instance
  //We can use this to get all the information about the map
  const map = useMap();

  const contextValue = {
    center,
    setCenter,
    nearbyStations,
    setNearbyStations,
    openSideMenu,
    setOpenSideMenu,
    newCenter,
    setNewCenter,
    selectedStation,
    setSelectedStation,
    radius,
    setRadius,
    map,
    filter,
    setFilter,
    zoom,
    setZoom,
  };

  return (
    <GoogleMapContext.Provider value={contextValue}>
      {children}
    </GoogleMapContext.Provider>
  );
}

export { GoogleMapContext };
