import Link from "next/link";
import Navbar from "@/app/components/navbar";
import Footer from "@/app/components/footer";
import Contact from "@/app/components/contact";

export default function Home() {
  return (
    <>
    <Navbar/>
     <main className="min-h-screen bg-gradient-to-br from-white to-gray-100 text-gray-800 p-6">
      <header className="mb-10">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-4">
          Welcome to <span className="text-purple-600">GeineTools</span>
        </h1>
        <p className="text-center text-lg text-gray-600">
          Smart Tools. Real Impact.
        </p>
      </header>

      <section className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-2">Featured Tool: AI Cover Letter Tailor</h2>
        <p className="text-gray-700 mb-4">
          Create job-winning cover letters in seconds. Just upload your resume and job description—
          let our AI craft a personalized, polished letter for you.
        </p>
        <Link href="/tools/cover-letter">
          <button className="bg-purple-600 text-white px-6 py-2 rounded-xl hover:bg-purple-700 transition">
            Try It Now
          </button>
        </Link>
      </section>

      <section className="max-w-4xl mx-auto bg-white rounded-2xl shadow-md p-6 mb-8">
        <h3 className="text-xl font-semibold mb-2">Coming Soon</h3>
        <ul className="list-disc list-inside text-gray-700 space-y-1">
          <li><strong>AI Resume Enhancer</strong> – Improve your resume instantly with smart suggestions.</li>
          <li><strong>Email Composer</strong> – Write professional emails with the right tone.</li>
          <li><strong>LinkedIn Bio Generator</strong> – Get a standout bio tailored to your field.</li>
        </ul>
      </section>

      <section className="max-w-4xl mx-auto text-center">
        <h4 className="text-xl font-semibold mb-2">Why GeineTools?</h4>
        <p className="text-gray-700 mb-4">
          Fast, accurate, and easy-to-use. Powered by the latest AI models. Free for personal use.
        </p>
        <Link href="/tools">
          <button className="bg-gray-900 text-white px-6 py-2 rounded-xl hover:bg-gray-800 transition">
            Explore All Tools
          </button>
        </Link>
      </section>
    </main>
    <Contact/>
    <Footer/>
    </>
  );
}
