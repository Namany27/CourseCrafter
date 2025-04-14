import Link from "next/link";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import Contact from "../components/contact";

export default function ToolsPage() {
  const tools = [
    {
      name: "AI Cover Letter Generator",
      description:
        "Create tailored, professional cover letters instantly using AI and your resume.",
      href: "/tools/cover-letter",
      status: "available",
    },
    {
      name: "AI Resume Enhancer",
      description: "Improve your resume instantly with smart suggestions.",
      href: "#",
      status: "coming-soon",
    },
    {
      name: "Email Composer",
      description: "Write professional emails with the right tone.",
      href: "#",
      status: "coming-soon",
    },
    {
      name: "LinkedIn Bio Generator",
      description: "Get a standout bio tailored to your field.",
      href: "#",
      status: "coming-soon",
    },
  ];

  return (
    <>
    <Navbar/>
    <div className="min-h-screen px-4 py-10 sm:px-10 bg-gray-50">
      <h1 className="text-4xl font-bold text-center mb-10 text-gray-800">
        Explore Tools Alchemy
      </h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {tools.map((tool, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-2xl shadow-md flex flex-col justify-between"
          >
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                {tool.name}
              </h2>
              <p className="text-gray-600 mb-4">{tool.description}</p>
            </div>
            {tool.status === "available" ? (
              <Link
                href={tool.href}
                className="inline-block bg-blue-600 text-white px-4 py-2 rounded-xl text-center hover:bg-blue-700"
              >
                Use Now
              </Link>
            ) : (
              <span className="inline-block bg-yellow-400 text-white px-4 py-2 rounded-xl text-center cursor-not-allowed">
                Coming Soon
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
    <Contact/>
    <Footer/>
    </>
  );
}
