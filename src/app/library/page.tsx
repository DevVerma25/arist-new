"use client";

import React, { useState, useMemo, useEffect } from "react";
import { motion } from "framer-motion";
import { Search, Filter, X } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BookCard from "@/components/BookCard";
import SkeletonLoader from "@/components/SkeletonLoader";
import booksData from "../../../books.json";

interface Book {
  title: string;
  Author: string;
  speciality: string;
  category: string;
  Copyrightyear: string;
  URL: string;
  image: string;
  ISBN?: string;
  Edition?: string;
}

// Extract all unique specialties from the data
const allSpecialties: string[] = Array.from(
  new Set(
    (booksData as Book[]).flatMap((b) =>
      b.speciality.split(",").map((s) => s.trim())
    )
  )
).sort();

const sortOptions = [
  { label: "Newest First", value: "year-desc" },
  { label: "Oldest First", value: "year-asc" },
  { label: "Title A–Z", value: "title-asc" },
  { label: "Title Z–A", value: "title-desc" },
];

export default function LibraryPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeSpecialty, setActiveSpecialty] = useState("All");
  const [sortBy, setSortBy] = useState("year-desc");
  const [loading, setLoading] = useState(true);
  const [showSort, setShowSort] = useState(false);

  // Simulate initial load
  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 700);
    return () => clearTimeout(t);
  }, []);

  const filteredBooks = useMemo(() => {
    let result = booksData as Book[];

    // Filter by specialty
    if (activeSpecialty !== "All") {
      result = result.filter((b) =>
        b.speciality
          .split(",")
          .map((s) => s.trim())
          .includes(activeSpecialty)
      );
    }

    // Filter by search query (title or author)
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (b) =>
          b.title.toLowerCase().includes(q) ||
          b.Author.toLowerCase().includes(q)
      );
    }

    // Sort
    result = [...result].sort((a, b) => {
      if (sortBy === "year-desc") return Number(b.Copyrightyear) - Number(a.Copyrightyear);
      if (sortBy === "year-asc") return Number(a.Copyrightyear) - Number(b.Copyrightyear);
      if (sortBy === "title-asc") return a.title.localeCompare(b.title);
      if (sortBy === "title-desc") return b.title.localeCompare(a.title);
      return 0;
    });

    return result;
  }, [searchQuery, activeSpecialty, sortBy]);

  const chips = ["All", ...allSpecialties];

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      {/* ── Library Hero Header ── */}
      <section className="relative pt-20 pb-32 overflow-hidden bg-background">
        {/* BG glows */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-primary/[0.07] rounded-full blur-[180px]" />
          <div className="absolute bottom-0 -left-40 w-[500px] h-[500px] bg-primary/[0.06] rounded-full blur-[160px]" />
        </div>
        {/* Dot grid */}
        <div className="absolute inset-0 dot-grid opacity-100 pointer-events-none" />

        <div className="relative z-10 max-w-[1800px] mx-auto px-8 md:px-16 lg:px-24">
          {/* Clearance for fixed navbar */}
          <div className="h-32 md:h-40" />

          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="flex items-center gap-3 mb-7"
          >
            <div className="h-px w-10 bg-primary" />
            <span className="text-[10px] font-black tracking-[0.5em] text-primary uppercase">
              Aristo × Jaypee
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="text-[3rem] sm:text-[4rem] lg:text-[5.5rem] font-black tracking-tight text-foreground uppercase leading-tight mb-12"
            style={{ fontFamily: "var(--font-serif), serif" }}
          >
            Digital
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-br from-primary via-red-400 to-secondary">
              Repository
            </span>
          </motion.h1>

          <div className="h-16" /> {/* Spacer */}

          {/* Subtext + stat */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col lg:flex-row lg:items-end gap-12 mb-20"
          >
            <p className="text-base md:text-lg text-muted-foreground font-medium leading-relaxed max-w-3xl">
              A validated collection of cardiovascular medical titles. Search,
              filter by specialty, and access clinical knowledge from anywhere.
            </p>
          </motion.div>

          <div className="h-24" /> {/* Massive Spacer */}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45 }}
            className="flex flex-col gap-10"
          >
            <div className="flex items-center gap-6">
              <div className="bg-muted border border-border rounded-2xl px-6 py-4">
                <div
                  className="text-2xl font-black text-foreground"
                  style={{ fontFamily: "var(--font-serif), serif" }}
                >
                  {(booksData as Book[]).length}
                </div>
                <div className="text-[8px] font-black text-muted-foreground uppercase tracking-[0.3em] mt-0.5">
                  Collection size
                </div>
              </div>
              <div className="h-px flex-grow bg-border" />
            </div>

            <div className="flex flex-col sm:flex-row gap-6 max-w-4xl">
            <div className="relative flex-grow group">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors duration-200" />
              <input
                id="library-search"
                type="text"
                placeholder="Search by title or author…"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-muted border border-border focus:border-primary/30 focus:bg-accent rounded-2xl py-4 pl-14 pr-5 text-base text-foreground placeholder:text-muted-foreground font-medium outline-none transition-all duration-200 focus:shadow-[0_0_0_4px_rgba(227,30,37,0.08)]"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Sort dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowSort(!showSort)}
                className="flex items-center gap-2 bg-muted border border-border hover:border-border/80 rounded-2xl px-5 py-5 text-[11px] font-black tracking-[0.2em] text-muted-foreground hover:text-foreground uppercase transition-all duration-200 whitespace-nowrap"
              >
                <Filter className="w-4 h-4" />
                <span className="hidden sm:inline">Sort</span>
              </button>
              {showSort && (
                <motion.div
                  initial={{ opacity: 0, y: 6, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute right-0 top-full mt-2 z-50 bg-card border border-border rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.2)] min-w-[180px]"
                >
                  {sortOptions.map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => { setSortBy(opt.value); setShowSort(false); }}
                        className={`w-full text-left px-5 py-3.5 text-[11px] font-bold uppercase tracking-widest transition-colors ${
                          sortBy === opt.value
                            ? "text-primary bg-primary/10"
                            : "text-muted-foreground hover:text-foreground hover:bg-muted"
                        }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </motion.div>
              )}
            </div>
          </div>
        </motion.div>
        </div>
      </section>

      {/* ── Book Grid ── */}
      <section className="py-16 md:py-20 bg-background">
        <div className="max-w-[1800px] mx-auto px-8 md:px-16 lg:px-24">
          {/* Result count */}
          {!loading && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-[11px] font-bold text-foreground/25 uppercase tracking-[0.3em] mb-10"
            >
              {filteredBooks.length} result{filteredBooks.length !== 1 ? "s" : ""}
              {activeSpecialty !== "All" ? ` in ${activeSpecialty}` : ""}
              {searchQuery ? ` for "${searchQuery}"` : ""}
            </motion.p>
          )}

          {loading ? (
            <SkeletonLoader count={12} />
          ) : filteredBooks.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-40 text-center">
              <span className="text-6xl mb-5">📚</span>
              <p className="text-lg font-black text-muted-foreground uppercase tracking-widest mb-3">
                No titles found
              </p>
              <p className="text-sm text-muted-foreground/60 font-medium">
                Try a different search term or specialty
              </p>
              <button
                onClick={() => { setSearchQuery(""); setActiveSpecialty("All"); }}
                className="mt-8 px-6 py-3 rounded-full border border-border text-[11px] font-black tracking-widest text-muted-foreground hover:text-foreground hover:border-foreground/20 uppercase transition-all"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <motion.div
              key={`${activeSpecialty}-${searchQuery}-${sortBy}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-12 md:gap-16"
            >
              {filteredBooks.map((book, index) => (
                <motion.div
                  key={`${book.ISBN ?? book.URL}-${index}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: Math.min(index * 0.04, 0.4),
                    duration: 0.5,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  <BookCard book={book} />
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
