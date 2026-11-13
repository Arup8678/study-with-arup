import Link from "next/link";
import { IDO_COURSE } from "@/lib/course";

const discount = Math.round((1 - IDO_COURSE.offerPrice / IDO_COURSE.regularPrice) * 100);

export default function IdoCourseBanner() {
  return (
    <section className="px-4 sm:px-6 pt-4 sm:pt-8">
      <Link
        href="/courses/psc-ido"
        aria-label={`Enroll in ${IDO_COURSE.title} for ₹${IDO_COURSE.offerPrice}`}
        className="group block max-w-6xl mx-auto relative overflow-hidden rounded-3xl bg-gradient-to-r from-orange-500 via-rose-500 to-fuchsia-600 text-white shadow-2xl shadow-rose-500/25 transition-transform hover:scale-[1.01]"
      >
        {/* decorative glows */}
        <div className="absolute -top-16 -right-10 w-64 h-64 rounded-full bg-yellow-300/30 blur-3xl" />
        <div className="absolute -bottom-20 -left-10 w-72 h-72 rounded-full bg-fuchsia-300/20 blur-3xl" />

        <div className="relative grid md:grid-cols-[1fr_auto] items-center gap-6 px-6 sm:px-10 py-8 sm:py-10">
          <div className="space-y-3">
            <div className="flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white text-rose-600 text-[11px] font-black tracking-widest uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-ping" /> New course
              </span>
              <span className="px-3 py-1 rounded-full bg-yellow-300 text-slate-900 text-[11px] font-black tracking-widest uppercase">
                Launch offer • {discount}% off
              </span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold font-heading leading-tight drop-shadow">
              🏭 WBPSC IDO Complete Course 2026
            </h2>
            <p className="text-white/90 text-sm sm:text-base max-w-xl">
              Notes for all 7 subjects • 925+ MCQs • 10 full mock tests • 3-month study plan • WhatsApp doubt support
            </p>
          </div>

          <div className="flex md:flex-col items-center md:items-end justify-between gap-4">
            <div className="text-left md:text-right">
              <div className="text-white/75 text-lg line-through leading-none">₹{IDO_COURSE.regularPrice}</div>
              <div className="text-5xl sm:text-6xl font-black leading-none">₹{IDO_COURSE.offerPrice}</div>
            </div>
            <span className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-white text-rose-600 font-extrabold shadow-xl group-hover:bg-yellow-300 group-hover:text-slate-900 transition-colors">
              Enroll Now →
            </span>
          </div>
        </div>
      </Link>
    </section>
  );
}
