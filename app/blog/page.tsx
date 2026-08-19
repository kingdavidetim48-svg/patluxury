"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { PageHeader } from "@/components/shared/page-header";
import { LuxuryBadge } from "@/components/shared/badge";
import { blogPostsData } from "@/data/blog";
import { Calendar, Clock, ArrowRight, Search, BookOpen } from "lucide-react";

const CATEGORIES = ["All", "Lifestyle", "Architecture", "Fine Dining", "Travel Guide"];

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredPosts = blogPostsData.filter((post) => {
    if (selectedCategory !== "All" && post.category !== selectedCategory) {
      return false;
    }
    if (
      searchTerm &&
      !post.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !post.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
    ) {
      return false;
    }
    return true;
  });

  const featuredPost = blogPostsData[0];

  return (
    <div className="min-h-screen bg-[#0b0d13] pb-24">
      {/* Header Banner */}
      <PageHeader
        badgeText="The Pat Luxury Journal"
        title="Stories on Architecture, Living & Hospitality"
        subtitle="Insights into quiet luxury, contemporary interior design, gastronomic discoveries, and curated travel guides."
        backgroundImage="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=2000&q=85"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 relative z-20">
        {/* Search & Category Filter Bar */}
        <div className="bg-[#121624] border border-amber-500/20 rounded-2xl p-4 sm:p-6 mb-12 flex flex-col md:flex-row gap-4 items-center justify-between shadow-xl">
          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 no-scrollbar">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-medium uppercase tracking-wider transition-all whitespace-nowrap ${
                  selectedCategory === cat
                    ? "bg-amber-400 text-black font-semibold shadow-md shadow-amber-400/20"
                    : "bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search articles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-black/40 border border-white/10 focus:border-amber-400 rounded-xl pl-10 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none transition-colors"
            />
          </div>
        </div>

        {/* Featured Hero Article (if no search filter active) */}
        {!searchTerm && selectedCategory === "All" && featuredPost && (
          <div className="mb-16 rounded-3xl bg-[#121624] border border-amber-500/30 overflow-hidden shadow-2xl group grid grid-cols-1 lg:grid-cols-12 items-center">
            <div className="lg:col-span-7 relative aspect-[16/10] w-full overflow-hidden bg-black/50">
              <Image
                src={featuredPost.coverImage}
                alt={featuredPost.title}
                fill
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            </div>

            <div className="lg:col-span-5 p-8 sm:p-10 space-y-4">
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider bg-amber-400/10 text-amber-300 border border-amber-400/30">
                  Featured Story
                </span>
                <span className="text-xs text-slate-400">{featuredPost.category}</span>
              </div>

              <h2 className="font-serif text-2xl sm:text-3xl text-white font-light group-hover:text-amber-300 transition-colors leading-snug">
                <Link href={`/blog/${featuredPost.slug}`}>
                  {featuredPost.title}
                </Link>
              </h2>

              <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed">
                {featuredPost.excerpt}
              </p>

              <div className="flex items-center justify-between pt-4 border-t border-white/5 text-xs text-slate-400">
                <div className="flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-amber-400" />
                  <span>{featuredPost.readTime}</span>
                </div>
                <Link
                  href={`/blog/${featuredPost.slug}`}
                  className="text-amber-300 font-semibold uppercase tracking-wider flex items-center gap-1 hover:text-white"
                >
                  <span>Read Article</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post) => (
            <div
              key={post.id}
              className="group rounded-3xl bg-[#121624] border border-white/10 hover:border-amber-500/40 overflow-hidden flex flex-col justify-between transition-all duration-500 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-black/70"
            >
              <div>
                {/* Cover Image */}
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-black/60">
                  <Image
                    src={post.coverImage}
                    alt={post.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#121624] via-transparent to-transparent" />
                  <span className="absolute top-4 left-4 px-3 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider bg-black/70 backdrop-blur-md text-amber-300 border border-amber-400/30">
                    {post.category}
                  </span>
                </div>

                {/* Body */}
                <div className="p-6 space-y-3">
                  <div className="flex items-center gap-3 text-[11px] text-slate-400">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-amber-400" />
                      {post.date}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-amber-400" />
                      {post.readTime}
                    </span>
                  </div>

                  <h3 className="font-serif text-lg font-medium text-white group-hover:text-amber-300 transition-colors leading-snug line-clamp-2">
                    <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                  </h3>

                  <p className="text-xs text-slate-400 font-light leading-relaxed line-clamp-3">
                    {post.excerpt}
                  </p>
                </div>
              </div>

              {/* Author and Read More */}
              <div className="p-6 pt-0 border-t border-white/5 mt-4 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="relative w-7 h-7 rounded-full overflow-hidden border border-amber-400/30">
                    <Image
                      src={post.author.avatar}
                      alt={post.author.name}
                      fill
                      sizes="28px"
                      className="object-cover"
                    />
                  </div>
                  <span className="text-xs text-slate-300 font-medium">
                    {post.author.name}
                  </span>
                </div>

                <Link
                  href={`/blog/${post.slug}`}
                  className="p-2 rounded-full bg-white/5 group-hover:bg-amber-400 group-hover:text-black text-amber-400 transition-all"
                  aria-label={`Read article: ${post.title}`}
                >
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
