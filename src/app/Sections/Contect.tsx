"use client";

import React, { useState } from "react";
import emailjs from "@emailjs/browser";

interface FormData {
  name: string;
  email: string;
  message: string;
}

export default function Contact() {
  const [loading, setLoading] = useState(false);
  const [Form, setForm] = useState<FormData>({
    name: "",
    email: "",
    message: "",
  });

  const HandleChange = ({
    target: { name, value },
  }: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...Form, [name]: value });
  };

  const HandleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      await emailjs.send(
        "service_9xkra5d", 
        "template_y7eaafb", 
        {
          from_name: Form.name,
          to_name: "Vipul Suthar",
          from_email: Form.email,
          to_email: "vipulsuthar9351@gmail.com",
          message: Form.message,
        },
        "WmKAI2X-A2t7BdleF" 
      );

      alert("Your Message Has Been Sent");
      setForm({ name: "", email: "", message: "" });
    } catch (error) {
      console.error("Email sending error:", error);
      console.error("Email sending error:", JSON.stringify(error, null, 2));
      alert("Something Went Wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="min-h-screen bg-black sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">

        <form onSubmit={HandleSubmit} className=" bg-gray-950 p-10 sm:p-10 md:p-12 ring-1 ring-white rounded-2xl max-w-2xl md:max-w-3xl lg:max-w-4xl mx-auto space-y-6 flex flex-col">
        <h3 className="text-4xl md:text-5xl font-bold text-white mb-6">Lets Talk</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2 ">
              <label htmlFor="Name" className="font-mono text-white text-3xl md:text-4xl" >Name</label>
              <input
                type="text"
                name="name"
                className="bg-gradient-to-l from-blue-600 to-red-700 text-xl md:text-2xl text-black font-mono rounded-xl p-2 md:p-3 focus:outline-0 w-full"
                value={Form.name}
                onChange={HandleChange}
                placeholder="Full Name"
                required
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="Name" className="font-mono text-white text-xl md:text-4xl" >Your Email</label>
              <input
                type="email"
                name="email"
                value={Form.email}
                className="bg-gradient-to-l from-blue-600 to-red-700 text-xl md:text-2xl text-black font-mono rounded-xl p-2 md:p-3 focus:outline-0 w-full"
                onChange={HandleChange}
                placeholder="Email"
                required
              />
            </div>
            <div className="flex flex-col gap-2 md:col-span-2" >
              <label htmlFor="Name" className="font-mono text-white text-3xl md:text-4xl" >Message</label>
              <textarea
                name="message"
                value={Form.message}
                className=" bg-gradient-to-l from-blue-600 to-red-700 text-xl md:text-2xl text-black font-mono rounded-xl p-2 md:p-3 focus:outline-0 w-full"
                onChange={HandleChange}
                placeholder="Message"
                rows={5}
                required
              />
            </div>
          </div>
          <div className="flex justify-center md:justify-end">
            <button type="submit" className="bg-blue-400 text-black font-bold ring-1 ring-black font-mono p-2 text-xl md:text-2xl rounded-2xl size-fit w-full sm:w-auto sm:px-6 md:px-8 sm:py-2 md:py-3 disabled:opacity-60 disabled:cursor-not-allowed transition-colors" disabled={loading} aria-busy={loading} aria-disabled={loading}>
              {loading ? "Sending..." : "Send Message"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
