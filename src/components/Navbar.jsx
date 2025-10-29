"use client";
import React, { useState } from "react";
import {
  FiMenu,
  FiX,
  FiSearch,
  FiHome,
  FiHeart,
  FiSun,
  FiStar,
} from "react-icons/fi";

export default function Navbar({ onSearch }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  // Toggle mobile menu open/close
  const toggleMenu = () => setMenuOpen(!menuOpen);

  // Trigger search and scroll to results section
  const handleSearch = () => {
    if (onSearch && searchValue.trim()) {
      onSearch(searchValue);
      const section = document.getElementById("search");
      if (section) section.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Smooth scroll to a section by ID and close menu (for mobile)
  const handleScroll = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
      setMenuOpen(false);
    }
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-[#feded4] shadow-sm z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        
        {/* Brand Logo / Title */}
        <h1
          className="text-2xl font-bold text-[#cf6c50] tracking-wide cursor-pointer"
          onClick={() => handleScroll("hero")}
        >
          Taylor’s Kitchen
        </h1>

        {/* Search bar for desktop */}
        <div className="hidden md:flex items-center bg-white border border-[#cf6c50]/40 rounded-full px-3 py-1.5 w-72 shadow-sm focus-within:ring-2 focus-within:ring-[#cf6c50]/40 transition">
          <FiSearch
            className="text-[#cf6c50] text-lg mr-2 cursor-pointer"
            onClick={handleSearch}
          />
          <input
            type="text"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            placeholder="Search ingredients chicken,butter,chocolate"
            className="w-full bg-transparent outline-none text-gray-700 placeholder-gray-400"
          />
        </div>

        {/* Desktop Navigation Links */}
        <ul className="hidden md:flex space-x-8 text-gray-700 font-medium">
          <li
            className="flex text-gray-500 items-center gap-1 hover:text-[#cf6c50] transition cursor-pointer"
            onClick={() => handleScroll("hero")}
          >
            <FiHome className="text-[#cf6c50]" /> Home
          </li>
          <li
            className="flex items-center text-gray-500 gap-1 hover:text-[#cf6c50] transition cursor-pointer"
            onClick={() => handleScroll("search")}
          >
            <FiHeart className="text-[#cf6c50]" /> Ingredients
          </li>
          <li
            className="flex items-center text-gray-500 gap-1 hover:text-[#cf6c50] transition cursor-pointer"
            onClick={() => handleScroll("mood")}
          >
            <FiSun className="text-[#cf6c50]" /> Mood
          </li>
          <li
            className="flex items-center text-gray-500 gap-1 hover:text-[#cf6c50] transition cursor-pointer"
            onClick={() => handleScroll("daily")}
          >
            <FiStar className="text-[#cf6c50]" /> Daily Pick
          </li>
        </ul>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMenu}
          className="md:hidden text-2xl text-[#cf6c50] focus:outline-none"
        >
          {menuOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="md:hidden bg-[#feded4] border-t border-gray-200 shadow-md">
          <div className="flex flex-col space-y-4 px-6 py-4 text-gray-700 font-medium">
            
            {/* Mobile Search Bar */}
            <div className="flex items-center bg-white border border-[#cf6c50]/40 rounded-full px-3 py-1.5 shadow-sm">
              <FiSearch
                className="text-[#cf6c50] text-lg mr-2 cursor-pointer"
                onClick={handleSearch}
              />
              <input
                type="text"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                placeholder="Search recipes..."
                className="w-full bg-transparent outline-none text-gray-700 placeholder-gray-400"
              />
            </div>

            {/* Mobile Navigation Links */}
            <button
              onClick={() => handleScroll("hero")}
              className="flex items-center gap-2 hover:text-[#cf6c50] transition"
            >
              <FiHome /> Home
            </button>
            <button
              onClick={() => handleScroll("search")}
              className="flex items-center gap-2 hover:text-[#cf6c50] transition"
            >
              <FiHeart /> Ingredients
            </button>
            <button
              onClick={() => handleScroll("mood")}
              className="flex items-center gap-2 hover:text-[#cf6c50] transition"
            >
              <FiSun /> Mood
            </button>
            <button
              onClick={() => handleScroll("daily")}
              className="flex items-center gap-2 hover:text-[#cf6c50] transition"
            >
              <FiStar /> Daily Pick
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
