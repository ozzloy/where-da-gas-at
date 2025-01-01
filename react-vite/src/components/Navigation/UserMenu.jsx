import OpenModalMenuItem from "./OpenModalMenuItem";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import "./UserMenu.css";

function UserMenu({
  showMenu,
  sessionUser,
  logout,
  closeMenu,
  ulRef,
  userMenuClassName,
}) {
  return (
    <>
      {showMenu && (
        <ul
          className={`${userMenuClassName} profile-dropdown`}
          ref={ulRef}
        >
          {sessionUser && sessionUser.user ? (
            <div className="modal-item-container">
              <li>{sessionUser.user}</li>
              <li>{sessionUser.email}</li>
              <li>
                <button className="logout-button" onClick={logout}>
                  Log Out
                </button>
              </li>
            </div>
          ) : (
            <div className="modal-item-container">
              <OpenModalMenuItem
                itemText="Log In"
                onItemClick={closeMenu}
                modalComponent={<LoginFormModal />}
              />
              <OpenModalMenuItem
                itemText="Sign Up"
                onItemClick={closeMenu}
                modalComponent={<SignupFormModal />}
              />
            </div>
          )}
        </ul>
      )}
    </>
  );
}

export default UserMenu;
