import "./primaryType.css"

function PrimaryTypeCard({ station, primaryType }) {
    let icon = ''
    if (primaryType === 'gas_station') {
        icon = '/gasIcon.svg'
    }
    if(primaryType === 'electric_vehicle_charging_station') {
        icon = '/evIcon.svg'
    }
console.log(station)
    return (
        <div className='station-card-container'>
            <div className='station-card-header'>
                <img src={icon} alt='icon' className='station-card-icon'/>
                <h3 className="station-display-name">{station.displayName.text}</h3>
            </div>
            <ul className="under-line"/>
        </div>
    )
}

export default PrimaryTypeCard