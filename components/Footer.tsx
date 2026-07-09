"use client";

import React from "react";
import Link from "next/link";
import { Phone, Mail } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-slate-400 dark:bg-slate-950 border-t border-slate-800 transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">

          {/* Brand Info */}
          <div className="space-y-3">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white font-black text-xs shadow-md shadow-blue-500/20">
                SWA
              </div>
              <span className="font-heading font-extrabold text-lg text-white">
                Study With Arup
              </span>
            </Link>
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Dedicated preparation platform for WBP Constable, SSC GD Constable, Agniveer Army and WB Panchayat exams.
            </p>
          </div>

          {/* Contact Info */}
          <div className="space-y-3">
            <h4 className="font-bold text-white text-sm">Direct Contact</h4>
            <div className="space-y-2 text-xs">
              <a href="tel:9382326813" className="flex items-center gap-2 text-slate-300 hover:text-white transition-colors font-medium">
                <Phone size={14} className="text-emerald-400" /> Mobile: 9382326813
              </a>
              <a href="mailto:fitcop455@gmail.com" className="flex items-center gap-2 text-slate-300 hover:text-white transition-colors font-medium">
                <Mail size={14} className="text-blue-400" /> Email: fitcop455@gmail.com
              </a>
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div className="space-y-3">
            <h4 className="font-bold text-white text-sm">Target Exams</h4>
            <ul className="grid grid-cols-2 gap-2 text-xs">
              <li><Link href="/exams/wbp-constable" className="hover:text-white transition-colors">WBP Constable</Link></li>
              <li><Link href="/exams/ssc-gd" className="hover:text-white transition-colors">SSC GD Constable</Link></li>
              <li><Link href="/exams/agniveer-army" className="hover:text-white transition-colors">Agniveer Army</Link></li>
              <li><Link href="/exams/wb-panchayat" className="hover:text-white transition-colors">WB Panchayat</Link></li>
              <li><Link href="/exams/psc-miscellaneous" className="hover:text-white transition-colors">PSC Miscellaneous</Link></li>
            </ul>
          </div>

        </div>

        <div className="border-t border-slate-800 mt-8 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-3">
          <p>© {currentYear} Study With Arup. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="/contact" className="hover:text-slate-300">Contact Us</Link>
            <Link href="/privacy" className="hover:text-slate-300">Privacy Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
