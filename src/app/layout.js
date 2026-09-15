import { Geist, Geist_Mono } from "next/font/google";
import Sidebar from "@/components/Sidebar";
import MobileNavigation from "@/components/MobileNavigation";
import Footer from "@/components/Footer";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "LaunchGraph — Public Launch Intelligence",
  description:
    "Public intelligence for technology product launches. Analyze how high-distribution technology launches are framed across public portfolio patterns.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#fbfbfb] text-[#1a1a1a] selection:bg-[#991b1b]/15 selection:text-[#991b1b]">
        {/* Desktop Fixed Sidebar */}
        <Sidebar />

        {/* Mobile Navigation Header */}
        <MobileNavigation />

        {/* Main Content Area */}
        <div className="flex flex-1 flex-col md:pl-60">
          <main className="flex-1 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
            {children}
            <Footer />
          </main>
        </div>
      </body>
    </html>
  );
}
