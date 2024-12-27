import { useParams } from "react-router-dom";
import { useContext, useEffect } from "react";
import { GoogleMapContext } from "../../context/GoogleMapContext";
import { useGetSelectedStation } from "../../hooks/useGetSelectedStation";
import "./StationDisplay.css";
import StationImageDisplay from "./StationDataComponents/StationImageDisplay";
import PriceOptionsDisplay from "./StationDataComponents/PriceOptionsDisplay";

function StationDisplay() {
    const { id } = useParams();
    const stationInfo = useGetSelectedStation({ id });
    const { setSelectedStation } = useContext(GoogleMapContext);
    useEffect(() => {
        if (stationInfo) {
        setSelectedStation(stationInfo);
        }
    }, [stationInfo, setSelectedStation]);

    if (!stationInfo) return <h1>Loading...</h1>;

    return (
        <section className="station-display-main-container">
            <StationImageDisplay />
            <div className="station-data-container">
                <h1>{stationInfo.displayName.text}</h1>
                <p>{stationInfo.formattedAddress}</p>
                <PriceOptionsDisplay stationInfo={ stationInfo } />
            </div>
        </section>
    );
}

export default StationDisplay;