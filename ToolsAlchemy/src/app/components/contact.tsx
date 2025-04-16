// app/contact/page.tsx (or src/app/contact/page.tsx if you're using src dir)
'use client';

import { useState } from "react";
import Image from "next/image";
import contactImg from "@/app/assets/contact-img.svg";
import 'animate.css';
import TrackVisibility from 'react-on-screen';

export default function ContactPage() {
  const formInitialDetails = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: ''
  };

  const [formDetails, setFormDetails] = useState(formInitialDetails);
  const [buttonText, setButtonText] = useState('Send');
  const [status, setStatus] = useState<{ success?: boolean; message?: string }>({});

  const onFormUpdate = (category: string, value: string) => {
    setFormDetails({
      ...formDetails,
      [category]: value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setButtonText("Sending...");
    const response = await fetch("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(formDetails),
    });
    setButtonText("Send");
    let result = await response.json();
setFormDetails(formInitialDetails);

if (result.success) {
  setStatus({ success: true, message: 'Message sent successfully' });
} else {
  setStatus({ success: false, message: 'Something went wrong, please try again later.' });
}
  };

  return (
    <section className="contact py-12 px-4" id="contact">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        <TrackVisibility>
          {({ isVisible }) => (
            <div className={isVisible ? "animate__animated animate__zoomIn" : ""}>
              <iframe
  src="https://www.buymeacoffee.com/ToolAlchemy?embed=true"
  width="100%"
  height="500"
  allow="payment"
  className="border rounded-lg shadow"
/>
            </div>
          )}
        </TrackVisibility> 

        <TrackVisibility>
          {({ isVisible }) => (
            <div className={isVisible ? "animate__animated animate__fadeIn" : ""}>
              <h2 className="text-3xl font-bold mb-6">Get In Touch</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex flex-col md:flex-row gap-4">
                  <input
                    type="text"
                    placeholder="First Name"
                    value={formDetails.firstName}
                    onChange={(e) => onFormUpdate('firstName', e.target.value)}
                    className="w-full p-2 border rounded"
                  />
                  <input
                    type="text"
                    placeholder="Last Name"
                    value={formDetails.lastName}
                    onChange={(e) => onFormUpdate('lastName', e.target.value)}
                    className="w-full p-2 border rounded"
                  />
                </div>
                <div className="flex flex-col md:flex-row gap-4">
                  <input
                    type="email"
                    placeholder="Email"
                    value={formDetails.email}
                    onChange={(e) => onFormUpdate('email', e.target.value)}
                    className="w-full p-2 border rounded"
                  />
                  <input
                    type="tel"
                    placeholder="Phone"
                    value={formDetails.phone}
                    onChange={(e) => onFormUpdate('phone', e.target.value)}
                    className="w-full p-2 border rounded"
                  />
                </div>
                <textarea
                  rows={6}
                  placeholder="Message"
                  value={formDetails.message}
                  onChange={(e) => onFormUpdate('message', e.target.value)}
                  className="w-full p-2 border rounded"
                ></textarea>
                <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
                  {buttonText}
                </button>
                {status.message && (
                  <p className={`mt-2 ${status.success ? 'text-green-600' : 'text-red-600'}`}>{status.message}</p>
                )}
              </form>
            </div>
          )}
        </TrackVisibility>
      </div>
    </section>
  );
}
