import './SideMenuDisplay.css'
import { useContext } from 'react';
import PrimaryTypeCard from './PrimaryTypeComponents/PrimaryTypeCard'
import { useGetNearByStations } from '../../hooks/useGetNearByStations'
import { GoogleMapContext } from '../../context/GoogleMapContext';
import SideHeaderComponent from './SideMenuHeaderComponents/SideHeaderComponent';

function SideMenuDisplay({ openSideMenu }) {
  const { center } = useContext(GoogleMapContext);
  const nearbyStations = useGetNearByStations({
    center
  });
  return (
    <section className={`side-menu-display-container ${openSideMenu ? 'open-side-menu' : 'close-side-menu'}`}>
      <SideHeaderComponent />
        <div className={`station-list-container`}>
        {nearbyStations && nearbyStations.length > 0 && nearbyStations.map((station) => {
          const primaryType = station.primaryType
              return (
                <PrimaryTypeCard key={station.id} station={station} primaryType={primaryType} />
              )
            })}
        </div>
    </section>
  )
}

export default SideMenuDisplay