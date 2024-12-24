import './SideMenuDisplay.css'
import PrimaryTypeCard from './PrimaryTypeComponents/PrimaryTypeCard'

function SideMenuDisplay({ nearbyStations, openSideMenu }) {
  return (
    <section className={`side-menu-display-container ${openSideMenu ? 'open-side-menu' : 'close-side-menu'}`}>
          <div className={`station-list-container`}>
        {nearbyStations && nearbyStations.length > 0 && nearbyStations.map((station) => {
          const primaryType = station.primaryType
                return (
                   <PrimaryTypeCard key={station.id} station={station} primaryType={primaryType}/>
                )
            })}
          </div>
    </section>
  )
}

export default SideMenuDisplay