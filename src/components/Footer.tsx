"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ChevronUp, Mail, Globe, MapPin } from "lucide-react";

const Footer = () => {
  const router = useRouter();
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-background border-t border-border pt-16 md:pt-32 pb-12 overflow-hidden">
      {/* Background Decor */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 dot-grid opacity-30" />
        <div className="absolute top-0 left-1/4 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-primary/[0.03] rounded-full blur-[100px] sm:blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-primary/[0.03] rounded-full blur-[100px] sm:blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-[1800px] mx-auto px-8 md:px-16 lg:px-24">
        {/* Top Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 mb-24">
          {/* Brand Column */}
          <div className="lg:col-span-5">
            <div className="flex items-center gap-8 mb-10">
              <div className="relative h-12 w-40">
                <Image
                  src="/images/logo.jpeg"
                  alt="Aristo Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <div className="h-8 w-px bg-border" />
              <div className="relative h-12 w-28">
                <Image
                  src="/images/Jaypee-Logo.png"
                  alt="Jaypee Logo"
                  fill
                  className="object-contain"
                />
              </div>
            </div>
            <p className="text-sm md:text-base text-muted-foreground max-w-md leading-relaxed font-medium mb-10">
              A premier medical collaboration between Aristo Pharmaceuticals and Jaypee Brothers Medical Publishers, dedicated to providing cardiologists with a world-class digital repository of cardiovascular intelligence.
            </p>
            <div className="flex items-center gap-5">
              {[Mail, Globe].map((Icon, i) => (
                <button
                  key={i}
                  className="w-10 h-10 rounded-full bg-foreground/[0.03] border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-foreground/20 hover:bg-foreground/[0.06] transition-all duration-300"
                >
                  <Icon className="w-4 h-4" />
                </button>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2">
            <h4 className="text-[10px] font-black text-foreground uppercase tracking-[0.4em] mb-10 opacity-40">
              Navigation
            </h4>
            <ul className="space-y-5">
              {[
                { label: "Home", href: "/" },
                { label: "Library", href: "/library" },
                { label: "Partnership", href: "/#partnership" },
              ].map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => router.push(link.href)}
                    className="text-[11px] font-black text-foreground/25 hover:text-foreground uppercase tracking-[0.2em] transition-colors duration-200"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          {/* <div className="lg:col-span-2">
            <h4 className="text-[10px] font-black text-foreground uppercase tracking-[0.4em] mb-10 opacity-40">
              Legal
            </h4>
            <ul className="space-y-5">
              {["Privacy Policy", "Terms of Use", "Cookie Policy", "Disclaimer"].map((item) => (
                <li key={item}>
                  <button className="text-[11px] font-black text-foreground/25 hover:text-foreground uppercase tracking-[0.2em] transition-colors duration-200">
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </div> */}

          {/* Contact */}
          <div className="lg:col-span-3">
            <h4 className="text-[10px] font-black text-foreground uppercase tracking-[0.4em] mb-10 opacity-40">
              Contact
            </h4>
            <ul className="space-y-6">
              <li className="flex items-start gap-4">
                <MapPin className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                <span className="text-[11px] font-bold text-muted-foreground leading-relaxed uppercase tracking-wider">
                  Corporate Office, Mumbai, India
                </span>
              </li>
              <li className="flex items-center gap-4">
                <Mail className="w-4 h-4 text-primary flex-shrink-0" />
                <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">
                  contact@aristocardiac.com
                </span>
              </li>
              <li className="flex items-center gap-4">
                <Globe className="w-4 h-4 text-primary flex-shrink-0" />
                <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">
                  www.aristopharma.com
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="pt-12 border-t border-border flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex flex-col gap-2">
            <p className="text-[10px] text-foreground/25 font-black uppercase tracking-[0.25em]">
              © {currentYear} Aristo Pharmaceuticals & Jaypee Brothers.
            </p>
            <p className="text-[9px] text-foreground/15 font-bold uppercase tracking-[0.2em]">
              Designed & Developed for Clinical Excellence
            </p>
          </div>

          {/* Back to top */}
          <button
            onClick={scrollToTop}
            className="group flex items-center gap-4 px-6 py-3 rounded-full bg-foreground/[0.03] border border-border hover:border-primary/30 transition-all duration-300"
          >
              <span className="text-[9px] font-black text-foreground/25 group-hover:text-foreground uppercase tracking-[0.3em] transition-colors">
              Back to Top
            </span>
            <div className="w-8 h-8 rounded-full bg-foreground/[0.05] flex items-center justify-center group-hover:bg-primary/20 transition-all">
              <ChevronUp className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
            </div>
          </button>

          <div className="flex items-center gap-3">
            <div className="h-px w-8 bg-border" />
            <span className="text-[9px] text-foreground/15 font-black uppercase tracking-[0.4em]">
              Advancing Cardiology
            </span>
            <div className="h-px w-8 bg-border" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
