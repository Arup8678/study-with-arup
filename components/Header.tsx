"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Moon, Sun, Menu, X, Shield, Phone, Mail } from "lucide-react";
import { useTheme } from "./ThemeProvider";

const NAV_LINKS = [
  { href: "/",               label: "Home" },
  { href: "/exams",          label: "Exams" },
  { href: "/current-affairs", label: "Current Affairs" },
  { href: "/contact",        label: "Contact Us" },
];

export default function Header() {
  const { theme, toggleTheme } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const solidBg = !isHome || scrolled;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        solidBg
          ? "bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800/60 shadow-sm"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 flex-shrink-0">
          <div className={`w-8 h-8 rounded-xl flex items-center justify-center font-black text-xs ${solidBg ? "bg-blue-600 text-white" : "bg-white/20 text-white border border-white/30"}`}>
            SWA
          </div>
          <span className={`font-extrabold font-heading text-base tracking-tight hidden sm:block ${solidBg ? "text-slate-900 dark:text-white" : "text-white"}`}>
            Study With Arup
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map(link => {
            const active = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                  active
                    ? solidBg
                      ? "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400"
                      : "bg-white/20 text-white"
                    : solidBg
                    ? "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                    : "text-white/80 hover:text-white hover:bg-white/10"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Right actions */}
        <div className="flex items-center gap-2">

          {/* Contact Quick Info (desktop) */}
          <div className={`hidden lg:flex items-center gap-3 text-xs border-r pr-3 my-1 ${solidBg ? "border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400" : "border-white/20 text-white/80"}`}>
            <a href="tel:9382326813" className="flex items-center gap-1 hover:underline">
              <Phone size={12} className="text-emerald-500" /> 9382326813
            </a>
            <a href="mailto:fitcop455@gmail.com" className="flex items-center gap-1 hover:underline">
              <Mail size={12} className="text-blue-500" /> fitcop455@gmail.com
            </a>
          </div>

          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all ${
              solidBg
                ? "text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                : "text-white/70 hover:text-white hover:bg-white/10"
            }`}
          >
            {theme === "dark" ? <Sun size={17} /> : <Moon size={17} />}
          </button>

          {/* Admin Button */}
          <Link
            href="/admin"
            className={`hidden sm:flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
              pathname.startsWith("/admin")
                ? "bg-blue-600 text-white"
                : solidBg
                ? "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
                : "bg-white/15 text-white border border-white/20 hover:bg-white/25"
            }`}
          >
            <Shield size={13} /> Admin
          </Link>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle mobile menu"
            className={`md:hidden w-9 h-9 rounded-xl flex items-center justify-center transition-all ${
              solidBg
                ? "text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                : "text-white/80 hover:bg-white/10"
            }`}
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 px-4 py-4 space-y-2">
          {NAV_LINKS.map(link => {
            const active = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={`block px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                  active
                    ? "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400"
                    : "text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
                }`}
              >
                {link.label}
              </Link>
            );
          })}

          <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
            <div className="font-bold text-slate-900 dark:text-white mb-1">Direct Contact:</div>
            <a href="tel:9382326813" className="flex items-center gap-2 text-slate-700 dark:text-slate-200 font-medium">
              <Phone size={13} className="text-emerald-500" /> Mobile: 9382326813
            </a>
            <a href="mailto:fitcop455@gmail.com" className="flex items-center gap-2 text-slate-700 dark:text-slate-200 font-medium">
              <Mail size={13} className="text-blue-500" /> Email: fitcop455@gmail.com
            </a>
          </div>

          <Link
            href="/admin"
            onClick={() => setMobileOpen(false)}
            className="flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all"
          >
            <Shield size={14} /> Admin Panel
          </Link>
        </div>
      )}
    </header>
  );
}
