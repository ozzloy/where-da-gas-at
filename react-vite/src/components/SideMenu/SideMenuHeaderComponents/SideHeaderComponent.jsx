import "./SideHeaderComponent.css"
import ProfileButton from '../../Navigation/ProfileButton';

function SideHeaderComponent() {

  return (
      <div className='header-container'>
        <div className='user-icon-container'>
        <ProfileButton location="side-header" />
        </div>
        <h2 className={`side-menu-display-title`}>Nearby Stations</h2>
        <button className="filter-button">Filters</button>
    </div>
  )
}

export default SideHeaderComponent