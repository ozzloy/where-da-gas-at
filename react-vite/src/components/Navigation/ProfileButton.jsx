import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaUserCircle } from "react-icons/fa";
import { thunkLogout } from "../../redux/session";
import "./ProfileButton.css";
import UserMenu from "./UserMenu";

function ProfileButton({ location }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const sessionUser = useSelector((store) => store.session.user);
  const ulRef = useRef();

  const userMenuClassName =
    location === "side-header" ? "side-header" : "nav-menu";

  const toggleMenu = (e) => {
    e.stopPropagation(); // Keep from bubbling up to document and triggering closeMenu
    setShowMenu(!showMenu);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (ulRef.current && !ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const closeMenu = () => setShowMenu(false);

  const logout = (e) => {
    e.preventDefault();
    dispatch(thunkLogout());
    closeMenu();
  };

  return (
    <>
      <button onClick={toggleMenu} className="user-icon-button">
        <FaUserCircle className="user-icon" />
      </button>
      <UserMenu
        userMenuClassName={userMenuClassName}
        showMenu={showMenu}
        sessionUser={sessionUser}
        logout={logout}
        closeMenu={closeMenu}
        ulRef={ulRef}
      />
    </>
  );
}

export default ProfileButton;
