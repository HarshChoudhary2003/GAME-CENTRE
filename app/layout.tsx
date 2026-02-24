import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "ArcadeVerse | The Ultimate Gaming Nexus",
  description: "Experience ultra-modern, high-performance gaming directly in your browser. Play 76+ titles with real-time stats and competition.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased scanline" suppressHydrationWarning>
        <Navbar />
        {children}

        <footer className="w-full py-12 border-t border-white/5 bg-bg-deep text-center px-6">
          <div className="container mx-auto">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-12">
              <div className="flex flex-col items-start gap-2">
                <span className="font-black text-2xl uppercase tracking-tighter">Arcade<span className="text-primary">Verse</span></span>
                <p className="text-[10px] text-text-dim font-bold uppercase tracking-widest">Engineered for the Digital Frontier</p>
              </div>
              <div className="flex gap-10 text-xs font-black uppercase tracking-widest text-text-dim">
                <a href="#" className="hover:text-primary transition-colors">Privacy</a>
                <a href="#" className="hover:text-primary transition-colors">Terms</a>
                <a href="#" className="hover:text-primary transition-colors">Careers</a>
                <a href="#" className="hover:text-primary transition-colors">Contact</a>
              </div>
            </div>
            <p className="text-[10px] text-text-dim/50 uppercase font-bold tracking-[0.5em]">
              © 2026 NEXUS CORE SYSTEMS. ALL RIGHTS RESERVED.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
