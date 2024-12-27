import "./SideMenuButton.css"

function OpenSideMenuButton({ openSideMenu, setOpenSideMenu }) {
    return (
        <button onClick={() => setOpenSideMenu((prev) => !prev)} className="open-side-menu-button">
            <img src="/sideButton.svg" alt="Open Side Menu" className={`side-menu-button ${openSideMenu == true ? "open-side-menu-button" : "close-side-menu-button"}`} />
        </button>
    )
}

export default OpenSideMenuButton