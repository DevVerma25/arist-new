"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ExternalLink, BookOpen } from "lucide-react";

interface BookProps {
  book: {
    title: string;
    Author: string;
    speciality: string;
    category: string;
    Copyrightyear: string;
    URL: string;
    image: string;
    Edition?: string;
  };
}

const BookCard = ({ book }: BookProps) => {
  const imageUrl =
    book.image ||
    "https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=2070&auto=format&fit=crop";

  const specialty = book.speciality.split(",")[0].trim();

  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className="group relative bg-card rounded-2xl border border-border overflow-hidden cursor-pointer flex flex-col h-[400px] hover:border-primary/25 hover:shadow-[0_20px_60px_rgba(227,30,37,0.12)] transition-all duration-500"
      onClick={() => window.open(book.URL, "_blank")}
    >
      {/* Top accent bar — appears on hover */}
      <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-primary to-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />

      {/* Book Cover */}
      <div className="relative h-[200px] flex-shrink-0 overflow-hidden bg-muted ">
        <Image
          src={imageUrl}
          alt={book.title}
          fill
          className="object-contain transition-transform duration-700 group-hover:scale-105 md: pt-10 py-5 pt-7"
        />

        {/* Edition badge */}
        {book.Edition && (
          <div className="absolute top-3 right-3 bg-background/80 backdrop-blur-sm border border-border px-2.5 py-1 rounded-lg text-[8px] font-black text-foreground uppercase tracking-[0.2em]">
            {book.Edition}
          </div>
        )}

        {/* Specialty badge */}
        <div className="absolute top-3 left-3 bg-primary/90 backdrop-blur-sm px-2.5 py-1 rounded-lg text-[8px] font-black text-white uppercase tracking-[0.2em]">
          {specialty}
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-grow">
        {/* Year */}
        <div className="flex items-center gap-1.5 text-[10px] text-foreground/30 font-bold tracking-widest uppercase mb-3">
          <span>{book.Copyrightyear}</span>
        </div>

        {/* Title */}
        <h3 className="text-[15px] font-bold text-foreground leading-snug mb-2 line-clamp-2 group-hover:text-primary/90 transition-colors tracking-tight">
          {book.title}
        </h3>

        {/* Author */}
        <p className="text-[12px] text-muted-foreground font-medium leading-relaxed line-clamp-2 mb-auto">
          {book.Author || "—"}
        </p>

        {/* Footer */}
        <div className="mt-4 pt-4 border-t border-border/60 flex items-center justify-between">
          <div className="flex items-center gap-2 text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em]">
            <BookOpen className="w-3.5 h-3.5" />
            Click here to Access
          </div>
          <div className="h-8 w-8 rounded-lg bg-foreground/[0.05] flex items-center justify-center group-hover:bg-primary group-hover:border-primary border border-border transition-all duration-400">
            <ExternalLink className="w-3.5 h-3.5 text-muted-foreground group-hover:text-white transition-colors" />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default BookCard;
