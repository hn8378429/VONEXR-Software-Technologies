"use client";

import { useState } from "react";

const links = [
  ["Services", "#services"],
  ["Work", "#work"],
  ["Process", "#process"],
  ["Join us", "#team"],
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <header className="nav">
      <a href="#top" className="brand" onClick={close}>
        <img src="/logo.png" alt="" width="40" height="40" />
        <span>VONEXR</span>
      </a>

      <button
        type="button"
        className="menu-btn"
        aria-label="Open menu"
        aria-expanded={open}
        onClick={() => setOpen(!open)}
      >
        <span />
        <span />
        <span />
      </button>

      <nav className={open ? "open" : ""}>
        {links.map(([label, href]) => (
          <a key={href} href={href} onClick={close}>
            {label}
          </a>
        ))}
        <a className="btn small" href="#contact" onClick={close}>
          Get a quote
        </a>
      </nav>
    </header>
  );
}