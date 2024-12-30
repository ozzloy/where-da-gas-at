import { convertNanosToUSD } from '../../../../utils/convertNanosToUSD';
import "./PriceOptionsDisplay.css";


function PriceOptionsDisplay({ stationInfo }) {
    if (stationInfo.types.includes("gas_station")) {
        const fuelOptions = stationInfo.fuelOptions.fuelPrices;
        return (
            <div className='options-container'>
                {fuelOptions.map((fuelOption, index) => {
                       const fuelPrice = convertNanosToUSD(fuelOption.price.units, fuelOption.price.nanos)
                return (
                <div key={index} className='price-option-container'>
                    <p>{fuelOption.type}</p>
                    <p>{isNaN(fuelPrice) ? "Not Available" : `$${fuelPrice}`}</p>
                </div>
                )})}
            </div>)
    }
}

export default PriceOptionsDisplay