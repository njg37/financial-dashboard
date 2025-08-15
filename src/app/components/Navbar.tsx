"use client";

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
  return (
    <nav className="navbar">
      <ul className="navbar-list">
        {/* Left menu */}
        <div className="navbar-menu">
          {menuItems.map((name) => (
            <li key={name} className="navbar-item">
              {name}
            </li>
          ))}
        </div>

        {/* Dark mode toggle */}
        <div>
          <DarkModeToggle />
        </div>
      </ul>
    </nav>
  );
}
