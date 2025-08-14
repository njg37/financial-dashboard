"use client";
import { Home, Briefcase, Shield, Wallet, BarChart2, FileText, ShoppingCart, Map, PieChart, LineChart, MoreHorizontal } from "lucide-react";

const menuItems = [
  { name: "CRM", icon: Home },
  { name: "Utilities", icon: Briefcase },
  { name: "Insurance", icon: Shield },
  { name: "Assets", icon: Wallet },
  { name: "Mutual", icon: BarChart2 },
  { name: "Research", icon: FileText },
  { name: "Transact Online", icon: ShoppingCart },
  { name: "Goal GPS", icon: Map },
  { name: "Financial Planning", icon: PieChart },
  { name: "Wealth Report", icon: LineChart },
  { name: "Other", icon: MoreHorizontal },
];

export default function Navbar() {
  return (
    <nav className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 px-4 py-3 shadow-sm">
      <ul className="flex flex-wrap items-center gap-6">
        {menuItems.map((item) => (
          <li
            key={item.name}
            className="flex items-center gap-2 text-gray-700 dark:text-gray-300 cursor-pointer hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            <item.icon size={18} />
            <span className="text-sm font-medium">{item.name}</span>
          </li>
        ))}
      </ul>
    </nav>
  );
}
