import { convertNanosToUSD } from '../../../../utils/convertNanosToUSD';
import "./PriceOptionsDisplay.css";


function PriceOptionsDisplay({ stationInfo }) {
    if (stationInfo.types.includes("gas_station")) {
        const fuelOptions = stationInfo.fuelOptions.fuelPrices;
        return (
            <div>
                {fuelOptions.map((fuelOption, index) => (
                <div key={index}>
                    <p>{fuelOption.type}</p>
                    <p>${convertNanosToUSD(fuelOption.price.units, fuelOption.price.nanos)}</p>
                </div>
                ))}
            </div>)
    }
}

export default PriceOptionsDisplay