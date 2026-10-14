
import React from "react";
import "./Footer.css";

export default function Footer() {
  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <footer className="omt-footer">
      <button
        className="footer-logo"
        onClick={() => scrollTo("home")}
        aria-label="Back to home"
      >
        <span className="logo-mark">
          <i />
        </span>
        <span>ONE MORE TAKE</span>
      </button>

      <nav className="footer-nav" aria-label="Footer navigation">
        {[
          ["home", "Home"],
          ["about", "About"],
          ["work", "Work"],
          ["services", "Services"],
          ["contact", "Contact"],
        ].map(([id, label]) => (
          <button key={id} onClick={() => scrollTo(id)}>
            {label}
          </button>
        ))}
      </nav>

      <div className="footer-social">
        <a
          href="https://www.instagram.com/"
          target="_blank"
          rel="noreferrer"
          aria-label="Instagram"
        >
          IG
        </a>

        <a
          href="https://www.youtube.com/"
          target="_blank"
          rel="noreferrer"
          aria-label="YouTube"
        >
          YT
        </a>

        <a
          href="https://www.linkedin.com/"
          target="_blank"
          rel="noreferrer"
          aria-label="LinkedIn"
        >
          IN
        </a>
      </div>

      <p className="footer-copyright">
        © {new Date().getFullYear()} One More Take. All rights reserved.
      </p>
    </footer>
  );
}
