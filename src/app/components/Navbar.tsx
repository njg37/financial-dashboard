"use client";

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
    <nav
      style={{
        backgroundColor: "#e50000", // Bright red from screenshot
        height: "42px", // Matches screenshot height
        padding: "0",
        margin: "0",
      }}
    >
      <ul
        style={{
          display: "flex",
          justifyContent: "space-between", // Fill full width evenly
          alignItems: "center",
          height: "100%",
          padding: "0 20px", // Left-right padding
          margin: 0,
          listStyle: "none",
        }}
      >
        {menuItems.map((name) => (
          <li
            key={name}
            style={{
              fontSize: "12px", // Matching font size
              fontWeight: 700, // Bold like screenshot
              color: "#fff",
              textTransform: "uppercase",
              letterSpacing: "0.5px",
              height: "100%",
              display: "flex",
              alignItems: "center", // Vertical centering
              padding: "0 8px",
              cursor: "pointer",
            }}
            className="hover:opacity-80 transition-opacity"
          >
            {name}
          </li>
        ))}
      </ul>
    </nav>
  );
}
