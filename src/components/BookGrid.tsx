"use client";

import React, { useEffect, useState } from "react";
import { motion, Variants } from "framer-motion";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";
import BookCard from "./BookCard";
import SkeletonLoader from "./SkeletonLoader";
import booksData from "../../books.json";

interface Book {
  title: string;
  Author: string;
  speciality: string;
  category: string;
  Copyrightyear: string;
  URL: string;
  image: string;
  Edition?: string;
}

interface BookGridProps {
  limit?: number;
  showTitle?: boolean;
  books?: Book[];
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.07, delayChildren: 0.1 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

const BookGrid = ({ limit, showTitle = true, books: booksProp }: BookGridProps) => {
  const [loading, setLoading] = useState(true);
  const [books, setBooks] = useState<Book[]>([]);
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (booksProp !== undefined) {
        setBooks(booksProp);
      } else {
        const data = limit ? (booksData as Book[]).slice(0, limit) : (booksData as Book[]);
        setBooks(data);
      }
      setLoading(false);
    }, 600);
    return () => clearTimeout(timer);
  }, [limit, booksProp]);

  // Re-trigger loading when booksProp changes (for live filtering)
  useEffect(() => {
    if (booksProp !== undefined) {
      setBooks(booksProp);
      setLoading(false);
    }
  }, [booksProp]);

  return (
    <section id="library" className="relative py-[6rem] md:py-[15rem] bg-background overflow-hidden">
      {/* Subtle bg glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 -right-20 sm:-right-40 w-[400px] sm:w-[600px] h-[400px] sm:h-[600px] bg-primary/[0.05] rounded-full blur-[150px] sm:blur-[200px]" />
        <div className="absolute bottom-1/4 -left-20 sm:-left-40 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-primary/[0.04] rounded-full blur-[120px] sm:blur-[180px]" />
      </div>

      <div className="relative z-10 max-w-[1800px] mx-auto px-8 md:px-16 lg:px-24">
        {showTitle && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="mb-[8rem]"
          >
            <div className="flex items-center gap-3 mb-8 pt-4">
              <div className="h-px w-10 bg-primary" />
              <span className="text-[10px] font-black tracking-[0.5em] text-primary uppercase">
                Featured Titles
              </span>
            </div>
            <h2
              className="text-4xl md:text-6xl lg:text-7xl font-black text-foreground tracking-tight leading-[1.1] mb-6 uppercase"
              style={{ fontFamily: "var(--font-serif), serif" }}
            >
              Digital{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-red-600">
                Library
              </span>
            </h2>
            <p className="text-base text-muted-foreground max-w-2xl leading-relaxed font-medium">
              Powered by{" "}
              <span className="text-accent-foreground font-bold">
                Jaypee Brothers Medical Publishers
              </span>
              . The definitive archive for cardiovascular literature and clinical research.
            </p>
          </motion.div>
        )}

        {loading ? (
          <SkeletonLoader count={limit || 8} />
        ) : books.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-32 text-muted-foreground">
            <span className="text-6xl mb-4">📚</span>
            <p className="text-lg font-bold tracking-widest uppercase">No titles found</p>
          </div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-10 md:gap-14 w-full"
          >
            {books.map((book, index) => (
              <motion.div key={index} variants={itemVariants}>
                <BookCard book={book} />
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* View all CTA — only shown on home (when limit is set) */}
        {limit && !loading && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="mt-20 flex justify-center"
          >
            <button
              onClick={() => router.push("/library")}
              className="group flex items-center gap-4 border border-border hover:border-primary/30 text-muted-foreground hover:text-foreground px-10 py-5 rounded-full text-[11px] font-black tracking-[0.4em] uppercase transition-all duration-300 hover:bg-primary/5 hover:shadow-[0_0_40px_rgba(227,30,37,0.1)]"
            >
              Explore Full Repository
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default BookGrid;
