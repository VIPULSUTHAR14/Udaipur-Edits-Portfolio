"use client";

import React, { useState } from "react";
import emailjs from "@emailjs/browser";
import { Send } from "lucide-react";

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
      // Save message to database
      const dbResponse = await fetch("/api/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: Form.name,
          email: Form.email,
          message: Form.message,
        }),
      });

      if (!dbResponse.ok) {
        const errorData = await dbResponse.json().catch(() => ({}));
        throw new Error(errorData.error || "Failed to save message to database");
      }

      // Send email notification (failsafe, do not block success if email fails)
      try {
        await emailjs.send(
          "service_b12yqee",
          "template_7aigf11",
          {
            name: Form.name,
            to_name: "Udaipur Editz",
            from_email: Form.email,
            to_email: "UdaipurEditz@gmail.com",
            message: Form.message,
          },
          "m1In5IeKPPu5a1QIx"
        );
      } catch (emailError) {
        console.error("Email notification sending error:", emailError);
      }

      alert("Your Message Has Been Sent");
      setForm({ name: "", email: "", message: "" });
    } catch (error) {
      console.error("Submission error:", error);
      alert("Something Went Wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="max-w-full bg-white py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 border-t border-neutral-150">
      <div className="mx-auto max-w-7xl">
        <form
          onSubmit={HandleSubmit}
          className="bg-[#fafafa] border border-neutral-200 p-8 sm:p-10 md:p-12 rounded-2xl w-full max-w-lg mx-auto space-y-6 flex flex-col shadow-sm"
        >
          {/* Card Header Section */}
          <div className="flex flex-col items-center text-center gap-1.5 mb-2">
            <span className="text-xs uppercase tracking-widest text-neutral-400 font-bold font-mono">
              Get in Touch
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold font-sans text-neutral-900 tracking-tight">
              {"Let's create together"}
            </h3>
            <p className="text-sm font-sans text-neutral-500 max-w-xs leading-relaxed">
              Tell us about your project vision or inquiry, and we will get back to you shortly.
            </p>
          </div>

          <div className="w-full flex flex-col gap-4">

            {/* Name Field */}
            <div className="flex flex-col gap-2">
              <label htmlFor="name" className="text-neutral-700 font-semibold text-xs uppercase tracking-wider font-sans">
                Name
              </label>
              <input
                id="name"
                type="text"
                name="name"
                className="w-full text-base text-neutral-950 font-sans border border-neutral-200 rounded-xl px-4 py-3 bg-white focus:outline-none focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900 transition-all placeholder:text-neutral-400 font-mono shadow-sm"
                value={Form.name}
                onChange={HandleChange}
                placeholder="Your Full Name"
                required
              />
            </div>

            {/* Email Field */}
            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="text-neutral-700 font-semibold text-xs uppercase tracking-wider font-sans">
                Your Email
              </label>
              <input
                id="email"
                type="email"
                name="email"
                className="w-full text-base text-neutral-950 font-sans border border-neutral-200 rounded-xl px-4 py-3 bg-white focus:outline-none focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900 transition-all placeholder:text-neutral-400 font-mono shadow-sm"
                value={Form.email}
                onChange={HandleChange}
                placeholder="hello@norex.com"
                required
              />
            </div>

            {/* Message/Project Vision Field */}
            <div className="flex flex-col gap-2">
              <label htmlFor="message" className="text-neutral-700 font-semibold text-xs uppercase tracking-wider font-sans">
                Project Vision
              </label>
              <textarea
                id="message"
                name="message"
                className="w-full text-base text-neutral-950 font-sans border border-neutral-200 rounded-xl px-4 py-3 bg-white focus:outline-none focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900 transition-all placeholder:text-neutral-400 font-mono shadow-sm resize-none"
                value={Form.message}
                onChange={HandleChange}
                placeholder="Tell us about your inquiry..."
                rows={4}
                required
              />
            </div>

          </div>

          {/* Submit Button */}
          <div className="w-full pt-2">
            <button
              type="submit"
              className="w-full text-white font-bold font-mono py-3.5 px-6 text-base bg-neutral-900 hover:bg-neutral-800 active:bg-black rounded-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-sm cursor-pointer flex items-center justify-center gap-2 group"
              disabled={loading}
              aria-busy={loading}
              aria-disabled={loading}
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-neutral-400 border-t-white rounded-full animate-spin"></div>
                  <span>Sending...</span>
                </>
              ) : (
                <>
                  <span>Send Message</span>
                  <Send className="w-4 h-4 text-neutral-400 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200 shrink-0" />
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
