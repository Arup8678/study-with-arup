import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PWARegister from "@/components/PWARegister";
import AITutorWidget from "@/components/AITutorWidget";

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#2563eb",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://studywithrootx.in"),
  title: "Study With RootX | West Bengal Competitive Exam Prep",
  description: "Prepare smart for WBPSC IDO, WBP Constable, SSC GD Constable, Agniveer Army, and WB Panchayat exams with notes, mock tests and the Study With RootX AI Assistant.",
  keywords: ["WBPSC IDO", "PSC IDO", "Industrial Development Officer", "WBP Constable", "SSC GD", "Agniveer Army", "WB Panchayat exam", "Study With RootX", "studywithrootx", "AI Tutor"],
  authors: [{ name: "Study With RootX Team" }],
  manifest: "/manifest.json",
  robots: "index, follow",
  verification: {
    google: "QPmC59486DdFsTDZw3g0GstUJ1U5phBQ-v-rzljXnb0",
  },
  openGraph: {
    title: "Study With RootX | West Bengal Exam Prep Platform",
    description: "The best preparation portal for WBP Constable, SSC GD, Agniveer Army, and WB Panchayat exams.",
    siteName: "Study With RootX",
    url: "https://studywithrootx.in",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="antialiased min-h-screen flex flex-col font-body">
        <ThemeProvider>
          <PWARegister />
          <Header />
          <main className="flex-grow">
            {children}
          </main>
          <AITutorWidget />
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
