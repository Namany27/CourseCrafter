// components/Navbar.tsx
export default function Navbar() {
    return (
      <nav className="bg-blue-600 text-white px-6 py-4 shadow">
        <div className="max-w-5xl mx-auto flex justify-between items-center">
          <h1 className="text-lg font-bold">Tools Alchemy</h1>
          <div className="space-x-4 text-sm">
<a
  href="https://www.buymeacoffee.com/ToolAlchemy"
  target="_blank"
  rel="noopener noreferrer"
>
  <img
    src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png"
    alt="Buy Me A Coffee"
    style={{ height: "45px", width: "162px" }}
  />
</a>
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
  