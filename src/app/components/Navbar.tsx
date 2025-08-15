"use client";

import React, { useState, useEffect, useRef } from "react";
import DarkModeToggle from "./DarkModeToggle";

const menuItems = [
  "Home",
  "CRM",
  "Utilities",
  "Insurance *",
  "Assets *",
  "Mutual",
  "Research",
  "Transact Online",
  "Goal GPS",
  "Financial Planning",
  "Wealth Report",
  "Other *",
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLUListElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        !(event.target as HTMLElement).closest(".menu-button")
      ) {
        setMenuOpen(false);
      }
    }
    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuOpen]);

  // Toggle dropdown open/close on hamburger click
  const toggleMenu = () => setMenuOpen((prev) => !prev);

  return (
    <nav className="navbar">
      {/* Hamburger button (tablet/mobile) */}
      <button
        className="menu-button"
        aria-label="Toggle menu"
        onClick={toggleMenu}
        type="button"
      >
        ☰
      </button>

      {/* Desktop menu (hidden on tablet/mobile) */}
      <ul className="navbar-menu desktop">
        {menuItems.map((name) => (
          <li key={name} className="navbar-item">
            {name}
          </li>
        ))}
      </ul>

      {/* Mobile dropdown menu */}
      <ul
        ref={menuRef}
        className={`navbar-menu mobile ${menuOpen ? "active" : ""}`}
      >
        {menuItems.map((name) => (
          <li
            key={name}
            className="navbar-item"
            onClick={() => setMenuOpen(false)}
          >
            {name}
          </li>
        ))}
      </ul>

      {/* Dark mode toggle - always visible on right side */}
      <div className="dark-mode-toggle">
        <DarkModeToggle />
      </div>
    </nav>
  );
}
