import { Link } from "react-router-dom"

const NavBar = () => {
  return (
    <div className="navbar">
      <div className="navbar-title">My Game Site</div>
      <div className="navbar-links">
        <Link to="/">Home</Link>
        <Link to="/">Add Game</Link>
      </div>
    </div>
  )
}

export default NavBar