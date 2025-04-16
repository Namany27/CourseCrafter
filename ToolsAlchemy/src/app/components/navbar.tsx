"use client";
import { useState } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-blue-600 text-white px-6 py-4 shadow">
      <div className="max-w-5xl mx-auto flex items-center justify-between">
        <h1 className="text-lg font-bold">Tools Alchemy</h1>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-4 text-sm">
          <a href="/" className="hover:underline">
            Home
          </a>
          <a href="/tools" className="hover:underline">
            Tools
          </a>
          <a href="#contact" className="hover:underline">
            Contact
          </a>
          <a
            href="https://www.buymeacoffee.com/ToolAlchemy"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png"
              alt="Buy Me A Coffee"
              style={{ height: "36px", width: "130px" }}
            />
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
          <a href="/tools" className="block hover:underline">
            Tools
          </a>
          <a href="#contact" className="block hover:underline">
            Contact
          </a>
          <a
            href="https://www.buymeacoffee.com/ToolAlchemy"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-2"
          >
            <img
              src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png"
              alt="Buy Me A Coffee"
              style={{ height: "36px", width: "130px" }}
            />
          </a>
        </div>
      )}
    </nav>
  );
}