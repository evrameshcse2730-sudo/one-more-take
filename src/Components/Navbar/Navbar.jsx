
import React, { useState } from "react";
import "./Navbar.css";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Services", href: "#services" },
    { label: "Work", href: "#work" },
    { label: "Reviews", href: "#reviews" },
    { label: "Contact", href: "#contact" },
  ];

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="omt-navbar">
      <a
        href="#home"
        className="omt-navbar-logo"
        onClick={closeMenu}
        aria-label="One More Take home"
      >
        <img
          src="/One More Take Logo.png"
          alt="One More Take"
        />
      </a>

      <button
        type="button"
        className={`omt-menu-toggle ${
          menuOpen ? "active" : ""
        }`}
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label={menuOpen ? "Close menu" : "Open menu"}
        aria-expanded={menuOpen}
      >
        <span />
        <span />
      </button>

      <nav
        className={`omt-navbar-links ${
          menuOpen ? "open" : ""
        }`}
      >
        {navLinks.map((link) => (
          <a
            key={link.label}
            href={link.href}
            onClick={closeMenu}
          >
            {link.label}
          </a>
        ))}

        <a
          href="#contact"
          className="omt-navbar-cta"
          onClick={closeMenu}
        >
          LET'S TALK <span>↗</span>
        </a>
      </nav>
    </header>
  );
};

export default Navbar;
