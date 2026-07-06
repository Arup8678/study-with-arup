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
  title: "Study With Arup | West Bengal Competitive Exam Prep",
  description: "Prepare smart for WBP Constable, SSC GD Constable, Agniveer Army, and WB Panchayat exams with Study With Arup AI Assistant.",
  keywords: ["WBP Constable", "SSC GD", "Agniveer Army", "WB Panchayat exam", "Study With Arup", "AI Tutor"],
  authors: [{ name: "Study With Arup Team" }],
  manifest: "/manifest.json",
  robots: "index, follow",
  verification: {
    google: "QPmC59486DdFsTDZw3g0GstUJ1U5phBQ-v-rzljXnb0",
  },
  openGraph: {
    title: "Study With Arup | West Bengal Exam Prep Platform",
    description: "The best preparation portal for WBP Constable, SSC GD, Agniveer Army, and WB Panchayat exams.",
    siteName: "Study With Arup",
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
      <head>
        <meta name="google-site-verification" content="QPmC59486DdFsTDZw3g0GstUJ1U5phBQ-v-rzljXnb0" />
      </head>
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
