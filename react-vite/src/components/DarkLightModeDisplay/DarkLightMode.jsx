import "./DarkLightMode.css";

export default function DarkLightMode({ theme, toggleTheme }) {
  return (
    <button className="icon" onClick={toggleTheme}>
      {theme === "dark" ? (
        <span className="light" role="img" aria-label="Light Mode">
          ☀️
        </span>
      ) : (
        <span className="dark" role="img" aria-label="Dark Mode">
          🌙
        </span>
      )}
    </button>
  );
}
