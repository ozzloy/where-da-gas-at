import { useContext } from "react";
import { GoogleMapContext } from "../../context/GoogleMapContext";
import { NavLink } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";
// import DarkLightMode from "../DarkLightModeDisplay/DarkLightMode";
import { ThemeContext } from "../../context/ThemeContext";

function Navigation() {
  const { openSideMenu } = useContext(GoogleMapContext);
  const {
    theme, // , toggleTheme
  } = useContext(ThemeContext);

  if (!openSideMenu) {
    return (
      <ul className={`nav-data-container-${theme}`}>
        <li>
          <NavLink to="/" className={`logo-container-${theme}`}>
            <img src="/Logo.ico" className="logo" alt="logo" />
            <p>Where da gas at?</p>
          </NavLink>
        </li>
        <li>
          <ProfileButton location="navigation-header" />
        </li>
      </ul>
    );
  }
  return <></>;
}

export default Navigation;
