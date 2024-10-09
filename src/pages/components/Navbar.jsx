import { NavLink } from "react-router-dom";
import { useAuth } from "../util/auth-context.jsx";
import "./Navbar.css";

export default function Navbar() {
  const { isAdmin } = useAuth();
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
        {isAdmin?(
          <NavLink to="/auth">Logout</NavLink>
        ):(
          <NavLink to="/auth">Join</NavLink>
        )}
      </div>
    </nav>
  );
}
