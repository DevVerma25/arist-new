"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sun, Moon } from "lucide-react";

const links = [
  { label: "Home", href: "/" },
  { label: "Library", href: "/library" },
  { label: "Telvas", href: "/telvas" },
];

const Navbar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains("dark"));
  }, []);

  const toggleTheme = () => {
    const newDark = !isDark;
    setIsDark(newDark);
    if (newDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  return (
    <>
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-background/95 backdrop-blur-xl border-b border-border shadow-sm"
            : "bg-gradient-to-b from-background/80 to-transparent backdrop-blur-sm"
        }`}
      >
        <div className="max-w-[1800px] mx-auto px-3 sm:px-8 md:px-16 lg:px-24 h-16 sm:h-20 md:h-28 flex items-center justify-between">
          {/* Logos */}
          <div className="flex items-center gap-2 sm:gap-6 md:gap-8 flex-1 min-w-0">
            <div
              className="relative h-8 sm:h-10 md:h-14 w-24 sm:w-32 md:w-44 cursor-pointer transition-transform hover:scale-105 active:scale-95 flex-shrink-0"
              onClick={() => router.push("/")}
            >
              <Image
                src="/images/logo.jpeg"
                alt="Aristo Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
            <div className="h-4 sm:h-5 md:h-7 w-px bg-border flex-shrink-0" />
            <span
              className="text-sm sm:text-lg md:text-xl lg:text-2xl font-black tracking-tight cursor-pointer select-none min-w-0"
              onClick={() => router.push("/")}
              style={{ fontFamily: "var(--font-serif), serif" }}
            >
              e-<span className="text-primary">Shiksha</span>{" "}
              <span className="hidden sm:inline text-xs md:text-sm font-bold text-muted-foreground tracking-widest uppercase text-primary">by Aristo</span>
            </span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6 lg:gap-10">
            {links.map((link) => (
              <button
                key={link.href}
                onClick={() => router.push(link.href)}
                className={`relative pb-1 text-[11px] lg:text-[12px] font-bold tracking-[0.3em] lg:tracking-[0.35em] uppercase transition-colors duration-200 ${
                  pathname === link.href
                    ? "text-foreground"
                    : "text-foreground/35 hover:text-foreground/70"
                }`}
              >
                {link.label}
                {pathname === link.href && (
                  <motion.div
                    layoutId="nav-underline"
                    className="absolute -bottom-0.5 left-0 right-0 h-[2px] bg-primary rounded-full"
                  />
                )}
              </button>
            ))}
          </div>

          {/* Right */}
          <div className="flex items-center gap-1 sm:gap-2 md:gap-4 flex-shrink-0">
            <div className="hidden lg:flex items-center gap-2 bg-foreground/[0.05] border border-border px-3 md:px-4 py-1.5 md:py-2 rounded-full">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-60" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-primary" />
              </span>
              <span className="text-[8px] md:text-[9px] font-black tracking-[0.2em] md:tracking-[0.25em] text-muted-foreground uppercase">
                Live Library
              </span>
            </div>

            {/* Dark mode toggle */}
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="p-2 sm:p-2.5 rounded-full border border-border text-muted-foreground hover:text-foreground hover:bg-foreground/[0.06] transition-all duration-200 flex-shrink-0"
            >
              {isDark ? <Sun className="w-4 h-4 sm:w-4 sm:h-4" /> : <Moon className="w-4 h-4 sm:w-4 sm:h-4" />}
            </button>

            <button
              className="md:hidden p-2 sm:p-2.5 text-foreground/50 hover:text-foreground transition-colors border border-border rounded-full flex-shrink-0"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              {menuOpen ? <X className="w-4 h-4 sm:w-5 sm:h-5" /> : <Menu className="w-4 h-4 sm:w-5 sm:h-5" />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="fixed top-16 sm:top-20 md:top-28 left-0 right-0 z-40 bg-background/98 backdrop-blur-2xl border-b border-border px-4 sm:px-6 py-6 md:py-8 flex flex-col gap-4 md:gap-6 md:hidden"
          >
            {/* Live Library Indicator */}
            <div className="flex items-center gap-2 bg-foreground/[0.05] border border-border px-3 py-2 rounded-full self-start">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-60" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-primary" />
              </span>
              <span className="text-[8px] font-black tracking-[0.2em] text-muted-foreground uppercase">
                Live Library
              </span>
            </div>

            {/* Navigation Links */}
            <div className="flex flex-col gap-2">
              {links.map((link) => (
                <button
                  key={link.href}
                  onClick={() => {
                    router.push(link.href);
                    setMenuOpen(false);
                  }}
                  className={`text-left text-sm sm:text-base font-bold tracking-[0.3em] uppercase transition-colors py-2 px-1 ${
                    pathname === link.href ? "text-primary" : "text-foreground/40 hover:text-foreground"
                  }`}
                >
                  {link.label}
                </button>
              ))}
            </div>

            {/* Theme Toggle in Mobile Menu */}
            <div className="flex items-center justify-between pt-2 border-t border-border">
              <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
                Theme
              </span>
              <button
                onClick={() => {
                  toggleTheme();
                  setMenuOpen(false);
                }}
                className="flex items-center gap-2 p-2 rounded-full border border-border text-muted-foreground hover:text-foreground hover:bg-foreground/[0.06] transition-all duration-200"
              >
                {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                <span className="text-xs font-bold uppercase tracking-wider">
                  {isDark ? "Light" : "Dark"}
                </span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
