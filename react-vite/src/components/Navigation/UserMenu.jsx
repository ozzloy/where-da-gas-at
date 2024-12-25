import OpenModalMenuItem from "./OpenModalMenuItem";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";

function UserMenu({ showMenu, sessionUser, logout, closeMenu, ulRef, userMenuClassName }) {
    return (
        <>
        {showMenu && (
            <ul className={`${userMenuClassName} profile-dropdown`} ref={ulRef}>
              {sessionUser && sessionUser.user ? (
                <>
                  <li>{sessionUser.user}</li>
                  <li>{sessionUser.email}</li>
                  <li>
                    <button onClick={logout}>Log Out</button>
                  </li>
                </>
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