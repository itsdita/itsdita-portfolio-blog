import { NavLink } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  return (
    <nav>
      <div id="nav-logo">
        <NavLink to="/">itsDita</NavLink>
      </div>
      <div id="nav-links">
        <NavLink to="/about">About</NavLink>
        <NavLink to="/portfolio">Portfolio</NavLink>
        <NavLink to="/blog">Blog</NavLink>
        <NavLink to="/notes">Notes</NavLink>
        <NavLink to="/auth">Join</NavLink>
      </div>
    </nav>
  );
}
