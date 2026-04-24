"use client";

import React from "react";

const SkeletonCard = () => (
  <div className="bg-card rounded-2xl border border-border overflow-hidden flex flex-col h-[400px]">
    {/* Image skeleton */}
    <div className="h-[200px] w-full shimmer flex-shrink-0" />

    {/* Content skeleton */}
    <div className="p-5 flex flex-col gap-3 flex-grow">
      <div className="h-3 w-10 rounded-full shimmer" />
      <div className="h-4 w-full rounded-lg shimmer" />
      <div className="h-4 w-3/4 rounded-lg shimmer" />
      <div className="h-3 w-1/2 rounded-lg shimmer mt-1" />
      <div className="mt-auto pt-4 border-t border-border/50 flex items-center justify-between">
        <div className="h-3 w-20 rounded-full shimmer" />
        <div className="h-8 w-8 rounded-lg shimmer" />
      </div>
    </div>
  </div>
);

const SkeletonLoader = ({ count = 8 }: { count?: number }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6 md:gap-8 w-full">
    {Array.from({ length: count }).map((_, i) => (
      <SkeletonCard key={i} />
    ))}
  </div>
);

export default SkeletonLoader;
