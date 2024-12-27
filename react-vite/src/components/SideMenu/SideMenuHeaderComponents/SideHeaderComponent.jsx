import "./SideHeaderComponent.css"
import ProfileButton from '../../Navigation/ProfileButton';
import OpenModalMenuItem from "../../Navigation/OpenModalMenuItem";
import MapFilterComponent from "./MapFiltersComponents/MapFilterComponent";

function SideHeaderComponent() {

  return (
      <div className='header-container'>
        <div className='user-icon-container'>
        <ProfileButton location="side-header" />
        </div>
      <h2 className={`side-menu-display-title`}>Nearby Stations</h2>
      {/* Opens the filter modal */}
      <div className="filter-button">
        <OpenModalMenuItem
          itemText={"Filters"}
          modalComponent={<MapFilterComponent />}
        />
      </div>
    </div>
  )
}

export default SideHeaderComponent