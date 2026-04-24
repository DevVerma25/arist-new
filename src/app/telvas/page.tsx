"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Download, ExternalLink, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function TelvasPage() {
  const router = useRouter();
  const [loaded, setLoaded] = useState(false);

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      {/* Header */}
      <section className="relative pt-20 pb-10 overflow-hidden bg-background border-b border-border">
        <div className="absolute inset-0 dot-grid opacity-50 pointer-events-none" />
        <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-primary/[0.06] rounded-full blur-[160px] pointer-events-none" />

        <div className="relative z-10 max-w-[1800px] mx-auto px-8 md:px-16 lg:px-24">
          <div className="h-28 md:h-32" />

          <motion.button
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            onClick={() => router.back()}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground text-[11px] font-black uppercase tracking-[0.3em] mb-8 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back
          </motion.button>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row sm:items-end justify-between gap-6"
          >
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="h-px w-10 bg-primary" />
                <span className="text-[10px] font-black tracking-[0.5em] text-primary uppercase">
                  Aristo × Jaypee
                </span>
              </div>
              <h1
                className="text-3xl md:text-5xl font-black text-foreground tracking-tight leading-tight uppercase"
                style={{ fontFamily: "var(--font-serif), serif" }}
              >
                Telvas
              </h1>
            </div>

            <div className="flex items-center gap-3">
              <a
                href="/display.pdf"
                download
                className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-full text-[11px] font-black tracking-[0.25em] uppercase transition-all duration-300 shadow-[0_8px_24px_rgba(227,30,37,0.25)]"
              >
                <Download className="w-3.5 h-3.5" />
                Download
              </a>
              <a
                href="/display.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 border border-border text-muted-foreground hover:text-foreground hover:border-foreground/20 px-6 py-3 rounded-full text-[11px] font-black tracking-[0.25em] uppercase transition-all duration-300"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                Open
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* PDF Viewer */}
      <section className="py-10 bg-background">
        <div className="max-w-[1800px] mx-auto px-4 md:px-8 lg:px-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="relative rounded-2xl overflow-hidden border border-border shadow-md bg-card"
            style={{ minHeight: "85vh" }}
          >
            {!loaded && (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-card z-10">
                <div className="w-8 h-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
                <p className="text-[11px] font-black uppercase tracking-[0.3em] text-muted-foreground">
                  Loading PDF…
                </p>
              </div>
            )}
            <iframe
              src="/display.pdf"
              className="w-full"
              style={{ height: "85vh", border: "none" }}
              onLoad={() => setLoaded(true)}
              title="Aristo × Jaypee Telvas"
            />
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
