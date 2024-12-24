import { useState, createContext } from "react";

//Here we initialize the context that will hold all the values shared between the components

const GoogleMapContext = createContext();


export function GoogleMapProvider({ children }) { 
    //These are all the bits of state that will be shared between the components
    //If you need to add more feel free to add them here
    const [center, setCenter] = useState(null);
    const [nearbyStations, setNearbyStations] = useState(null);
    const [openSideMenu, setOpenSideMenu] = useState(false);
    const [newCenter, setNewCenter] = useState(center);
    
    const contextValue = {
        center,
        setCenter,
        nearbyStations,
        setNearbyStations,
        openSideMenu,
        setOpenSideMenu,
        newCenter,
        setNewCenter,
    };
    
    return (
        <GoogleMapContext.Provider value={contextValue}>
        {children}
        </GoogleMapContext.Provider>
    );
}

export { GoogleMapContext };

