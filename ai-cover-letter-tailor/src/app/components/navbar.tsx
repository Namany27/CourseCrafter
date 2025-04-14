// components/Navbar.tsx
export default function Navbar() {
    return (
      <nav className="bg-blue-600 text-white px-6 py-4 shadow">
        <div className="max-w-5xl mx-auto flex justify-between items-center">
          <h1 className="text-lg font-bold">Genie Tools</h1>
          <div className="space-x-4 text-sm">
            <a href="/" className="hover:underline">
              Home
            </a>
            <a href="/tools" className="hover:underline">
              Tools
            </a>
            <a href="#contact" className="hover:underline">
              Contact
            </a>
          </div>
        </div>
      </nav>
    );
  }
  