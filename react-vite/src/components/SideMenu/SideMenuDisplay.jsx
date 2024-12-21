import './SideMenuDisplay.css'

function SideMenuDisplay({nearbyStations, openSideMenu}) {
  return (
      <section className={`side-menu-display-container ${openSideMenu ? 'open-side-menu' : 'close-side-menu'}`}>
          <div className={`station-list-container`}>
            {nearbyStations && nearbyStations.length > 0 && nearbyStations.map((station) => {
                return (
                    <div key={station.id} className='side-menu-display-item'>
                        <h3>{station.displayName.text}</h3>
                    </div>)
            })}
          </div>
    </section>
  )
}

export default SideMenuDisplay