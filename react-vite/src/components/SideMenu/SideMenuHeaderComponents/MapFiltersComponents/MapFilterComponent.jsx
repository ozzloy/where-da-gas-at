import './MapFilterComponent.css'
import { useContext, useState } from 'react'
import { GoogleMapContext } from '../../../../context/GoogleMapContext'

function MapFilterComponent() {
    const { radius, setRadius, setFilter, filter} = useContext(GoogleMapContext);
    const [distanceValue, setDistanceValue] = useState(radius);
    const [filterValue, setFilterValue] = useState(filter);

    function onSubmitHandler(e) { 
        e.preventDefault();
        setRadius(distanceValue)
        setFilter(filterValue)
    }

const filterOptions = [
    { label: 'Gas Station', value: 'gas_station' },
    { label: 'Electric Vehicle Charging Station', value: 'electric_vehicle_charging_station' },
];
    
    const handleCheckboxChange = (event) => {
        const { value, checked } = event.target;
        if (checked) {
            setFilterValue((prevFilter) => [...prevFilter, value]);
        } else {
            setFilterValue((prevFilter) => prevFilter.filter((item) => item !== value));
        }
    };
    
    return (
        <form className='filter-body-container' onSubmit={onSubmitHandler}>
            <p>Radius: {distanceValue} meters</p>
            <input type='range' min='5000' max='30000' value={distanceValue} onChange={(e) => setDistanceValue(e.target.value)} />
            <input type='submit' value='Submit' />
            {filterOptions.map((option) => (
            <div key={option.value}>
                <label>
                    <input
                    type="checkbox"
                    value={option.value}
                    checked={filterValue.includes(option.value)}
                    onChange={handleCheckboxChange}
                    />
                    {option.label}
                </label>
            </div>
      ))}
        </form>
    )
}

export default MapFilterComponent