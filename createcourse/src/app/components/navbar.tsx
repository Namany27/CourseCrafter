"use client";
import { useState } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-blue-600 text-white px-6 py-4 shadow">
      <div className="max-w-5xl mx-auto flex items-center justify-between">
        <h1 className="text-lg font-bold">Course Crafter</h1>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-4 text-sm">
          <a href="/" className="hover:underline">
            Home
          </a>
        </div>

        {/* Hamburger Button (Mobile) */}
        <button
          className="md:hidden"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
            />
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden mt-4 space-y-2 text-sm text-center">
          <a href="/" className="block hover:underline">
            Home
          </a>
        </div>
      )}
    </nav>
  );
}