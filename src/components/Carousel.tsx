"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const slides = [
  { src: "/images/carasol1.jpeg", alt: "Slide 1" },
  { src: "/images/carasol2.jpeg", alt: "Slide 2" },
  { src: "/images/carasol3.jpeg", alt: "Slide 3" },
];

const Carousel = () => {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);

  const go = useCallback((index: number, dir: number) => {
    setDirection(dir);
    setCurrent((index + slides.length) % slides.length);
  }, []);

  const prev = () => go(current - 1, -1);
  const next = useCallback(() => go(current + 1, 1), [current, go]);

  useEffect(() => {
    const id = setInterval(next, 5000);
    return () => clearInterval(id);
  }, [next]);

  const variants = {
    enter: (d: number) => ({ x: d > 0 ? 60 : -60, opacity: 0, scale: 0.96 }),
    center: { x: 0, opacity: 1, scale: 1 },
    exit: (d: number) => ({ x: d > 0 ? -60 : 60, opacity: 0, scale: 0.96 }),
  };

  return (
    <section className="relative bg-background py-12 overflow-hidden">
      <div className="max-w-[1800px] mx-auto px-8 md:px-16 lg:px-24">

        {/* Card track */}
        <div className="relative flex items-center justify-center">
          {/* Prev button */}
          <button
            onClick={prev}
            aria-label="Previous slide"
            className="absolute left-0 z-10 h-10 w-10 rounded-full bg-card border border-border shadow-sm flex items-center justify-center text-foreground hover:border-primary hover:text-primary transition-all duration-200"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Card */}
          <div className="w-full overflow-hidden px-8 sm:px-14">
            <AnimatePresence custom={direction} initial={false} mode="wait">
              <motion.div
                key={current}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="relative w-full rounded-2xl overflow-hidden border border-border shadow-md bg-card"
                style={{ aspectRatio: "16/7" }}
              >
                <Image
                  src={slides[current].src}
                  alt={slides[current].alt}
                  fill
                  className="object-cover"
                  priority
                />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Next button */}
          <button
            onClick={next}
            aria-label="Next slide"
            className="absolute right-0 z-10 h-10 w-10 rounded-full bg-card border border-border shadow-sm flex items-center justify-center text-foreground hover:border-primary hover:text-primary transition-all duration-200"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Dot indicators */}
        <div className="mt-6 flex items-center justify-center gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => go(i, i > current ? 1 : -1)}
              aria-label={`Go to slide ${i + 1}`}
              className={`rounded-full transition-all duration-300 ${
                i === current
                  ? "w-6 h-2 bg-primary"
                  : "w-2 h-2 bg-foreground/25 hover:bg-foreground/50"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Carousel;
