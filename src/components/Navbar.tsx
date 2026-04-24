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
        <div className="max-w-[1800px] mx-auto px-8 md:px-16 lg:px-24 h-28 flex items-center justify-between">
          {/* Logos */}
          <div className="flex items-center gap-6 md:gap-8">
            <div
              className="relative h-14 w-44 cursor-pointer transition-transform hover:scale-105 active:scale-95"
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
            <div className="h-7 w-px bg-border" />
            <span
              className="text-xl md:text-2xl font-black tracking-tight cursor-pointer select-none"
              onClick={() => router.push("/")}
              style={{ fontFamily: "var(--font-serif), serif" }}
            >
              e-<span className="text-primary">Shiksha</span>{" "}
              <span className="text-sm font-bold text-muted-foreground tracking-widest uppercase text-primary">by Aristo</span>
            </span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-10">
            {links.map((link) => (
              <button
                key={link.href}
                onClick={() => router.push(link.href)}
                className={`relative pb-1 text-[12px] font-bold tracking-[0.35em] uppercase transition-colors duration-200 ${
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
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2 bg-foreground/[0.05] border border-border px-4 py-2 rounded-full">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-60" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-primary" />
              </span>
              <span className="text-[9px] font-black tracking-[0.25em] text-muted-foreground uppercase">
                Live Library
              </span>
            </div>

            {/* Dark mode toggle */}
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="p-2 rounded-full border border-border text-muted-foreground hover:text-foreground hover:bg-foreground/[0.06] transition-all duration-200"
            >
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            <button
              className="md:hidden p-2 text-foreground/50 hover:text-foreground transition-colors"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
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
            className="fixed top-28 left-0 right-0 z-40 bg-background/98 backdrop-blur-2xl border-b border-border px-6 py-8 flex flex-col gap-6 md:hidden"
          >
            {links.map((link) => (
              <button
                key={link.href}
                onClick={() => {
                  router.push(link.href);
                  setMenuOpen(false);
                }}
                className={`text-left text-sm font-bold tracking-[0.3em] uppercase transition-colors ${
                  pathname === link.href ? "text-primary" : "text-foreground/40"
                }`}
              >
                {link.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
