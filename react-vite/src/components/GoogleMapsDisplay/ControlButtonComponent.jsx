import { FaMapMarkerAlt } from 'react-icons/fa'

function ControlButtonComponent({ openSideMenu, setOpenSideMenu, handleButtonClick }) {
  return (
    <div className="control-buttons-container">
        {/* This is the button that will find the current location of the user 
        and change the position of the map. If you want to edit it ctrl click into it.*/}
        <button onClick={() => setOpenSideMenu((prev) => !prev)} className="open-side-menu-button">
            <img src="/sideButton.svg" alt="Open Side Menu" className={`control-button open-side-button ${openSideMenu == true ? "open-side-menu-button" : "close-side-menu-button"}`} />
        </button>
        {/* This is the side menu display. When a user clicks the side menu button this will open up
        and display the nearby stations and other settings. If you want to edit it ctrl click into it.
        */}
        <div className="map-marker-icon-container" onClick={handleButtonClick}>
            <FaMapMarkerAlt className="control-button current-location" />
        </div>
    </div>
  )
}

export default ControlButtonComponent