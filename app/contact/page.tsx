"use client";

import React, { useState } from "react";
import { Mail, Phone, MapPin, Send, CheckCircle2 } from "lucide-react";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setSuccess(true);
      setLoading(false);
      setName("");
      setEmail("");
      setSubject("");
      setMessage("");
      setTimeout(() => setSuccess(false), 5000);
    }, 1200);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-16 space-y-12 text-left pt-24">

      {/* Title */}
      <div className="space-y-2 text-center">
        <h1 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-900 dark:text-white">
          Contact Study With Arup
        </h1>
        <p className="text-slate-500 dark:text-slate-400 text-sm max-w-xl mx-auto">
          Have questions about WBP Constable, SSC GD, Agniveer Army or WB Panchayat exam preparation? Contact us directly.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

        {/* Left Side: Support Channels */}
        <div className="lg:col-span-5 bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700/60 p-6 rounded-3xl shadow-sm space-y-6">
          <h2 className="font-heading font-bold text-lg text-slate-900 dark:text-white">Contact Info</h2>

          <div className="space-y-5">
            <div className="flex gap-4 items-center">
              <div className="w-11 h-11 rounded-xl bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 flex items-center justify-center flex-shrink-0">
                <Phone size={20} />
              </div>
              <div>
                <span className="text-[10px] text-slate-400 block font-semibold uppercase tracking-wider">Mobile Number</span>
                <a href="tel:9382326813" className="text-base font-bold text-slate-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400">
                  +91 9382326813
                </a>
              </div>
            </div>

            <div className="flex gap-4 items-center">
              <div className="w-11 h-11 rounded-xl bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center flex-shrink-0">
                <Mail size={20} />
              </div>
              <div>
                <span className="text-[10px] text-slate-400 block font-semibold uppercase tracking-wider">Email Address</span>
                <a href="mailto:fitcop455@gmail.com" className="text-base font-bold text-slate-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400">
                  fitcop455@gmail.com
                </a>
              </div>
            </div>

            <div className="flex gap-4 items-center">
              <div className="w-11 h-11 rounded-xl bg-purple-50 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 flex items-center justify-center flex-shrink-0">
                <MapPin size={20} />
              </div>
              <div>
                <span className="text-[10px] text-slate-400 block font-semibold uppercase tracking-wider">Location</span>
                <span className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                  West Bengal, India
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Message Form */}
        <div className="lg:col-span-7 bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700/60 p-6 sm:p-8 rounded-3xl shadow-sm space-y-6">
          <h2 className="font-heading font-bold text-lg text-slate-900 dark:text-white">Send a Message</h2>

          {success && (
            <div className="p-3.5 rounded-xl bg-green-50 dark:bg-green-950/20 border border-green-200/50 dark:border-green-800/30 text-xs font-semibold text-green-600 dark:text-green-400 flex items-center gap-2">
              <CheckCircle2 size={16} /> Message sent successfully! We will contact you back shortly.
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-500 dark:text-slate-400">Full Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your Name"
                  className="w-full bg-slate-50 dark:bg-slate-900 rounded-xl py-2.5 px-4 border border-slate-200 dark:border-slate-700 focus:outline-none focus:border-blue-500 text-xs text-slate-800 dark:text-white transition-all"
                  required
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-500 dark:text-slate-400">Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="yourname@gmail.com"
                  className="w-full bg-slate-50 dark:bg-slate-900 rounded-xl py-2.5 px-4 border border-slate-200 dark:border-slate-700 focus:outline-none focus:border-blue-500 text-xs text-slate-800 dark:text-white transition-all"
                  required
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-500 dark:text-slate-400">Subject</label>
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Course inquiry, notes feedback..."
                className="w-full bg-slate-50 dark:bg-slate-900 rounded-xl py-2.5 px-4 border border-slate-200 dark:border-slate-700 focus:outline-none focus:border-blue-500 text-xs text-slate-800 dark:text-white transition-all"
                required
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-500 dark:text-slate-400">Message Details</label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Write your message here..."
                rows={5}
                className="w-full bg-slate-50 dark:bg-slate-900 rounded-xl py-2.5 px-4 border border-slate-200 dark:border-slate-700 focus:outline-none focus:border-blue-500 text-xs text-slate-800 dark:text-white transition-all resize-none"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading || success}
              className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-md shadow-blue-500/20 disabled:opacity-50 transition-all flex items-center justify-center gap-1.5 text-xs group"
            >
              <span>{loading ? "Sending..." : "Send Message"}</span>
              {!loading && <Send size={14} className="group-hover:translate-x-0.5 transition-transform" />}
            </button>
          </form>
        </div>

      </div>

    </div>
  );
}
