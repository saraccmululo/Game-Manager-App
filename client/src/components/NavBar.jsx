import { Link } from "react-router-dom";
import { useThemeStore } from "../store/useThemeStore";

const NavBar = () => {
  const { theme, toggleTheme } = useThemeStore();
  const isDarkMode = theme === "dark";

  return (
    <div className="navbar">
      <div className="navbar-title">Game Collection Manager</div>
      <div className="navbar-links">
        <Link to="/">Home</Link>
        <Link to="/create">Add Game</Link>

        <label className="theme-switch" htmlFor="checkbox">
          <input
            id="checkbox"
            type="checkbox"
            onChange={toggleTheme}
            checked={isDarkMode}
            aria-label="toggle theme between light and dark mode"
          />
          <span className="slider round"></span>
        </label>
      </div>
    </div>
  );
};

export default NavBar;
