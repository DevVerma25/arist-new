"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Shield, Award, BookMarked, Microscope } from "lucide-react";

const pillars = [
  {
    icon: BookMarked,
    title: "Curated Literature",
    desc: "Every title is selected by cardiology specialists for clinical relevance and academic rigor.",
  },
  {
    icon: Microscope,
    title: "Research-Grade",
    desc: "Peer-reviewed publications, case studies, and reference works from global experts.",
  },
  {
    icon: Award,
    title: "Jaypee Certified",
    desc: "Published and quality-assured by Jaypee Brothers, South Asia's leading medical publisher.",
  },
  {
    icon: Shield,
    title: "Aristo Backed",
    desc: "Supported by Aristo Pharmaceuticals to drive cardiac clinical excellence across India.",
  },
];

const PartnershipSection = () => {
  return (
    <section
      id="partnership"
      className="relative py-[11rem] md:py-[16rem] bg-background border-t border-border overflow-hidden"
    >
      {/* Background accent */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[2px] bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
        <div className="absolute top-1/2 -left-60 w-[500px] h-[500px] bg-primary/[0.04] rounded-full blur-[160px]" />
        <div className="absolute top-1/4 -right-60 w-[500px] h-[500px] bg-primary/[0.04] rounded-full blur-[160px]" />
      </div>

      <div className="relative z-10 max-w-[1800px] mx-auto px-8 md:px-16 lg:px-24">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="grid lg:grid-cols-2 gap-[8rem] items-end mb-[10rem]"
        >
          {/* Left text */}
          <div>
            <div className="flex items-center gap-3 mb-8 pt-4">
              <div className="h-px w-10 bg-accent-foreground" />
              <span className="text-[10px] font-black tracking-[0.5em] text-accent-foreground uppercase">
                The Partnership
              </span>
            </div>
            <h2
              className="text-4xl md:text-5xl lg:text-6xl font-black text-foreground tracking-tight leading-tight uppercase mb-6"
              style={{ fontFamily: "var(--font-serif), serif" }}
            >
              Two Leaders.
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-foreground to-primary">
                One Mission.
              </span>
            </h2>
          </div>

          {/* Right — logos + tagline */}
          <div>
            <p className="text-base text-muted-foreground leading-relaxed mb-10 max-w-md font-medium">
              Aristo Pharmaceuticals partners with Jaypee Brothers Medical
              Publishers to bring cardiologists across India access to the most
              comprehensive digital medical library — free, curated, and always
              up to date.
            </p>

            {/* Logos side by side */}
            <div className="flex items-center gap-8">
              <div className="relative h-10 w-28 opacity-60 hover:opacity-90 transition-opacity">
                <Image
                  src="/images/logo.jpeg"
                  alt="Aristo Pharmaceuticals"
                  fill
                  className="object-contain"
                />
              </div>
              <div className="flex items-center gap-3">
                <div className="h-px w-6 bg-border" />
                <span className="text-[9px] text-foreground/25 font-black tracking-[0.4em] uppercase">
                  ×
                </span>
                <div className="h-px w-6 bg-border" />
              </div>
              <div className="relative h-10 w-24 opacity-55 hover:opacity-85 transition-opacity">
                <Image
                  src="/images/Jaypee-Logo.png"
                  alt="Jaypee Brothers"
                  fill
                  className="object-contain"
                />
              </div>
            </div>
          </div>
        </motion.div>

        {/* 4 pillars grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-[3rem]">
          {pillars.map((pillar, i) => (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                delay: i * 0.12,
                duration: 0.7,
                ease: [0.16, 1, 0.3, 1],
              }}
              whileHover={{ y: -4 }}
              className="group bg-foreground/[0.03] border border-border rounded-2xl p-7 hover:border-primary/20 hover:bg-foreground/[0.05] transition-all duration-300"
            >
              <div className="h-11 w-11 rounded-xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/15 transition-colors">
                <pillar.icon className="w-5 h-5 text-primary" />
              </div>
              <h3 className="text-sm font-black text-foreground tracking-tight mb-2">
                {pillar.title}
              </h3>
              <p className="text-[12px] text-muted-foreground leading-relaxed font-medium">
                {pillar.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PartnershipSection;
