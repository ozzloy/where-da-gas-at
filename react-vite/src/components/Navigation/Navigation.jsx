import { useContext } from "react";
import { GoogleMapContext } from "../../context/GoogleMapContext";
import { NavLink } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";

function Navigation() {
  const { openSideMenu } = useContext(GoogleMapContext);

  if (!openSideMenu) {
    return (
      <ul className="nav-data-container">
        <li>
          <NavLink to="/" className="logo-container">
            <img
              src="../public/Logo.ico"
              className="logo"
              alt="logo"
            />
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
