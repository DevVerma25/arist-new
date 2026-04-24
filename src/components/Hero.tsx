"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, BookOpen, Users } from "lucide-react";
import { useRouter } from "next/navigation";

const stats = [
  { icon: BookOpen, label: "Medical Titles", value: "50+" },
  { icon: Users, label: "Expert Authors", value: "30+" },
];

const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], [0, 180]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.65], [1, 0]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen w-full flex items-center overflow-hidden bg-background"
    >
      {/* Dot grid */}
      <div className="absolute inset-0 z-0 dot-grid opacity-100" />

      {/* Animated gradient orbs */}
      <div className="absolute inset-0 z-[1] pointer-events-none overflow-hidden">
        <motion.div
          animate={{ scale: [1, 1.12, 1], opacity: [0.12, 0.22, 0.12] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-32 -right-32 w-[700px] h-[700px] bg-primary rounded-full blur-[180px]"
        />
        <motion.div
          animate={{ scale: [1, 1.18, 1], opacity: [0.08, 0.18, 0.08] }}
          transition={{ duration: 11, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute -bottom-40 -left-40 w-[650px] h-[650px] bg-accent-foreground rounded-full blur-[180px]"
        />
      </div>

      {/* Heart BG parallax */}
      <motion.div
        style={{ y: bgY }}
        className="absolute inset-0 z-[2] flex items-center justify-center lg:justify-end pointer-events-none"
      >
        <div className="relative w-[300px] sm:w-[400px] lg:w-[580px] h-full opacity-[0.08] lg:opacity-[0.15] pr-0 lg:pr-8 lg:pr-24">
          <Image
            src="/images/Screenshot from 2026-04-23 16-44-47-Picsart-BackgroundRemover.png"
            alt="Anatomical Heart"
            fill
            className="object-contain"
            priority
          />
        </div>
      </motion.div>

      {/* Content */}
      <motion.div
        style={{ opacity: contentOpacity }}
        className="relative z-10 max-w-[1800px] mx-auto px-4 sm:px-8 md:px-16 lg:px-24 w-full pt-16 md:pt-20 pb-20 md:pb-40"
      >
        {/* Clearance for fixed navbar */}
        <div className="h-24 md:h-32 lg:h-40" />

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-24 items-center min-h-[88vh]">
          {/* Left — Text */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Eyebrow */}
            <div className="flex items-center gap-3 mb-6 md:mb-8">
              <div className="h-px w-8 md:w-10 bg-primary" />
              <span className="text-[9px] md:text-[10px] font-black tracking-[0.4em] md:tracking-[0.5em] text-primary uppercase">
                Aristo × Jaypee Brothers
              </span>
            </div>

            {/* Headline */}
            <h1
              className="text-[2.5rem] sm:text-[3.5rem] md:text-[5rem] lg:text-[6rem] xl:text-[7rem] font-black leading-[1.1] tracking-[-0.02em] mb-12 md:mb-20 text-foreground uppercase"
              style={{ fontFamily: "var(--font-serif), serif" }}
            >
              Advancing
              <br />
              Cardiac
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-br from-primary via-red-400 to-orange-500">
                Excellence
              </span>
            </h1>

            {/* Subtext */}
            <p className="text-sm md:text-base lg:text-lg text-foreground/50 leading-relaxed max-w-md mb-12 md:mb-16 font-medium">
              Discover a curated digital library of cardiovascular intelligence.
              The definitive resource for cardiac professionals and researchers,
              powered by Jaypee Brothers Medical Publishers.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 sm:gap-5">
              <button
                onClick={() => router.push("/library")}
                className="group flex items-center justify-center gap-3 bg-primary hover:bg-primary/90 text-white px-6 md:px-8 py-3 md:py-4 rounded-full text-[10px] md:text-[11px] font-black tracking-[0.2em] md:tracking-[0.3em] uppercase transition-all duration-300 shadow-[0_16px_40px_rgba(227,30,37,0.35)] hover:shadow-[0_20px_50px_rgba(227,30,37,0.45)] hover:-translate-y-0.5"
              >
                Explore Library
                <ArrowRight className="w-3 h-3 md:w-4 md:h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={() =>
                  document
                    .getElementById("partnership")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="flex items-center justify-center gap-3 border border-border text-foreground/50 hover:text-foreground hover:border-foreground/20 hover:bg-foreground/[0.04] px-6 md:px-8 py-3 md:py-4 rounded-full text-[10px] md:text-[11px] font-black tracking-[0.2em] md:tracking-[0.3em] uppercase transition-all duration-300"
              >
                Our Partnership
              </button>
            </div>
          </motion.div>

          {/* Right — Logo + Stat cards */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 1 }}
            className="flex flex-col gap-6 md:gap-8 justify-center mt-12 lg:mt-0"
          >
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="relative h-24 md:h-32 w-60 md:w-80 -ml-2 md:-ml-4"
            >
              <Image
                src="/images/logo.jpeg"
                alt="Aristo Logo"
                fill
                className="object-contain object-left"
                priority
              />
            </motion.div>

            {/* Stat cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4 md:gap-6">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.55 + i * 0.14, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  whileHover={{ x: 10 }}
                  className="flex items-center gap-4 md:gap-6 bg-foreground/[0.04] border border-border rounded-2xl px-6 md:px-8 py-5 md:py-7 cursor-default group hover:border-primary/20 hover:bg-foreground/[0.06] transition-all duration-300"
                >
                  <div className="h-10 w-10 md:h-12 md:w-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/15 transition-colors">
                    <stat.icon className="w-4 h-4 md:w-5 md:h-5 text-primary" />
                  </div>
                  <div>
                    <div
                      className="text-2xl md:text-3xl font-black text-foreground tracking-tight"
                      style={{ fontFamily: "var(--font-serif), serif" }}
                    >
                      {stat.value}
                    </div>
                    <div className="text-[9px] md:text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em] md:tracking-[0.3em] mt-1">
                      {stat.label}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
          className="absolute bottom-4 md:bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-[8px] md:text-[9px] tracking-[0.3em] md:tracking-[0.4em] text-foreground/30 uppercase font-bold">
            Scroll
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="w-px h-8 md:h-10 bg-gradient-to-b from-foreground/20 to-transparent"
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
