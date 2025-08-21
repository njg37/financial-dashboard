"use client";

import {
  Filter,
  Lightbulb,
  Settings,
  Bell,
  Star,
  Users,
  Search as SearchIcon,
  Lock,
  Eye,
  Shield,
  FileText,
  Wallet,
  LogOut,
  Menu,
} from "lucide-react";
import { useState } from "react";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative z-50">
      {/* Header Container */}
      <header className="w-full bg-white dark:bg-[#121212] border-b dark:border-gray-700 shadow-sm px-4 py-2">
        <div className="flex items-center justify-between w-full gap-4">
          {/* Left: Logo */}
          <div className="flex items-center gap-2">
            <span className="text-xl font-semibold text-blue-900 dark:text-white">
              Wealth <span className="text-green-600">Elite</span>
            </span>
          </div>

          {/* Center: Search bar (Desktop only) */}
          <div className="hidden md:flex flex-1 mx-4">
            <div className="relative w-full max-w-lg mx-auto">
              <input
                type="text"
                placeholder="ex: Live portfolio"
                className="w-full border dark:border-gray-600 dark:bg-[#1e1e1e] dark:text-white rounded-md py-2 pl-4 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-gray-300 dark:focus:ring-gray-600"
              />
              <SearchIcon className="absolute right-3 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
            </div>
          </div>

          {/* Right: Icons or Mobile Menu Button */}
          <div className="flex items-center gap-4 text-gray-700 dark:text-gray-200">
            {/* Desktop Icons */}
            <div className="hidden lg:flex items-center gap-4">
              <Filter className="icon" />
              <Lightbulb className="icon" />
              <Settings className="icon" />
              <Bell className="icon" />
              <Star className="icon" />
              <Users className="icon" />
              <SearchIcon className="icon" />
              <Lock className="icon" />
              <Eye className="icon" />
              <Shield className="icon" />
              <FileText className="icon" />
              <Wallet className="icon" />
              <button className="flex items-center gap-1 font-medium hover:text-red-600 transition">
                <LogOut className="h-4 w-4" />
                LOGOUT
              </button>
            </div>

            {/* Mobile Menu Button (always on right) */}
            <button
              className="lg:hidden text-gray-700 dark:text-gray-200"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
              type="button"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="absolute top-full left-0 w-full bg-white dark:bg-[#1e1e1e] shadow-md p-4 flex flex-col gap-4 lg:hidden z-50">
          <div className="flex flex-wrap gap-4 text-gray-700 dark:text-gray-200">
            <Filter className="icon" />
            <Lightbulb className="icon" />
            <Settings className="icon" />
            <Bell className="icon" />
            <Star className="icon" />
            <Users className="icon" />
            <SearchIcon className="icon" />
            <Lock className="icon" />
            <Eye className="icon" />
            <Shield className="icon" />
            <FileText className="icon" />
            <Wallet className="icon" />
          </div>
          <button className="flex items-center gap-2 text-gray-700 dark:text-gray-200 font-medium hover:text-red-600">
            <LogOut className="h-4 w-4" />
            LOGOUT
          </button>
        </div>
      )}
    </div>
  );
}
