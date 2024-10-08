import "./Navbar.css";

export default function Navbar() {
  return (
    <nav>
      <div id="nav-logo">
        <a href="/">itsDita</a>
      </div>
      <div id="nav-links">
        <a href="/about">About</a>
        <a href="/portfolio">Portfolio</a>
        <a href="/blog">Blog</a>
        <a href="/notes">Notes</a>
      </div>
    </nav>
  );
}
