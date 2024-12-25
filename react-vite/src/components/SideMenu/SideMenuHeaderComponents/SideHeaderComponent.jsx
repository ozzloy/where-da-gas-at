import { FaUser } from 'react-icons/fa';
import "./SideHeaderComponent.css"

function SideHeaderComponent() {
  return (
      <div className='header-container'>
        <div className='user-icon-container'>
            <FaUser className='user-icon'/>
        </div>
        <h2 className={`side-menu-display-title`}>Nearby Stations</h2>
        <button className="filter-button">Filters</button>
    </div>
  )
}

export default SideHeaderComponent