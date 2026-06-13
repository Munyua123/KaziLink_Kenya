import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { MessageCircle } from "lucide-react";
import { Providers } from "./Providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "KaziLink Kenya - Find Your Dream Job",
  description: "Kenya's trusted job platform connecting professionals with employers",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
        {children}
        
        {/* Floating WhatsApp Button */}
        <a
          href="https://wa.me/254743861565?text=Hello%20KaziLink%20Kenya!%20I%20need%20help%20with%20job%20search."
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 bg-green-500 text-white rounded-full shadow-lg hover:bg-green-600 transition-all duration-300 hover:scale-110 hover:shadow-xl group"
          aria-label="Chat with us on WhatsApp"
        >
          <MessageCircle size={28} />
          
          {/* Tooltip on hover */}
          {/* <div className="absolute right-16 bg-gray-900 text-white text-sm py-2 px-3 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none">
            Chat with our team
            <div className="absolute top-1/2 right-[-6px] transform -translate-y-1/2 w-3 h-3 bg-gray-900 rotate-45"></div>
          </div>
           */}
          {/* Pulse animation */}
          <div className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-20"></div>
        </a>

        {/* Optional: WhatsApp notification badge */}
        {/* <div className="fixed bottom-16 right-4 z-40 animate-bounce">
          <div className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
            Live Chat
          </div>
        </div> */}
        </Providers>
      </body>
    </html>
  );
}