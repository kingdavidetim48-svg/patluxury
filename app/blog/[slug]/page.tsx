import React from "react";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { blogPostsData } from "@/data/blog";
import { LuxuryBadge } from "@/components/shared/badge";
import { Calendar, Clock, ArrowLeft, ArrowRight, Share2, Tag } from "lucide-react";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return blogPostsData.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPostsData.find((p) => p.slug === slug);

  if (!post) {
    return { title: "Article Not Found" };
  }

  return {
    title: `${post.title} | Pat Luxury Journal`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [{ url: post.coverImage }],
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = blogPostsData.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = blogPostsData
    .filter((p) => p.id !== post.id)
    .slice(0, 2);

  return (
    <article className="min-h-screen bg-[#0b0d13] pt-32 pb-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Link */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-300 hover:text-white transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Articles</span>
        </Link>

        {/* Header Metadata */}
        <div className="space-y-4 mb-8">
          <div className="flex items-center gap-3">
            <LuxuryBadge>{post.category}</LuxuryBadge>
            <span className="text-xs text-slate-400 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-amber-400" />
              {post.readTime}
            </span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl font-light text-white leading-tight">
            {post.title}
          </h1>

          {/* Author Profile */}
          <div className="flex items-center justify-between border-y border-white/10 py-4">
            <div className="flex items-center gap-3">
              <div className="relative w-11 h-11 rounded-full overflow-hidden border border-amber-400/40">
                <Image
                  src={post.author.avatar}
                  alt={post.author.name}
                  fill
                  sizes="44px"
                  className="object-cover"
                />
              </div>
              <div>
                <p className="text-sm font-semibold text-white">{post.author.name}</p>
                <p className="text-xs text-slate-400">{post.author.role} • {post.date}</p>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs text-slate-400">
              <Share2 className="w-4 h-4 text-amber-400" />
              <span className="hidden sm:inline">Pat Luxury Exclusive</span>
            </div>
          </div>
        </div>

        {/* Featured Cover Image */}
        <div className="relative aspect-[16/9] w-full rounded-3xl overflow-hidden border border-amber-500/20 shadow-2xl mb-12 bg-black/50">
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 800px"
            className="object-cover"
          />
        </div>

        {/* Article Body Content */}
        <div className="prose prose-invert max-w-none space-y-8 text-slate-300 font-light leading-relaxed">
          <p className="text-lg sm:text-xl text-slate-200 font-normal leading-relaxed italic border-l-2 border-amber-400 pl-4">
            {post.content.intro}
          </p>

          {post.content.sections.map((section, idx) => (
            <div key={idx} className="space-y-4 pt-4">
              <h2 className="font-serif text-2xl sm:text-3xl text-white font-light">
                {section.heading}
              </h2>
              <p className="text-base text-slate-300 leading-relaxed">
                {section.body}
              </p>
              {section.image && (
                <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden my-6 border border-white/10">
                  <Image
                    src={section.image}
                    alt={section.heading}
                    fill
                    sizes="(max-width: 1024px) 100vw, 800px"
                    className="object-cover"
                  />
                </div>
              )}
            </div>
          ))}

          <div className="p-6 rounded-2xl bg-[#121624] border border-amber-500/20 text-slate-200 text-sm mt-8">
            <p className="font-serif text-lg font-medium text-amber-300 mb-2">
              Conclusion
            </p>
            <p>{post.content.conclusion}</p>
          </div>

          {/* Tags */}
          <div className="pt-6 border-t border-white/10 flex flex-wrap items-center gap-2">
            <Tag className="w-4 h-4 text-amber-400" />
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 rounded-full text-xs bg-white/5 border border-white/10 text-slate-300"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>

        {/* Related Articles */}
        {relatedPosts.length > 0 && (
          <div className="mt-20 pt-12 border-t border-amber-500/20 space-y-8">
            <h3 className="font-serif text-2xl text-white font-light">
              Related Editorial Stories
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {relatedPosts.map((rel) => (
                <Link
                  key={rel.id}
                  href={`/blog/${rel.slug}`}
                  className="p-6 rounded-2xl bg-[#121624] border border-white/10 hover:border-amber-500/30 transition-all block group"
                >
                  <span className="text-[10px] uppercase font-semibold tracking-wider text-amber-300">
                    {rel.category}
                  </span>
                  <h4 className="font-serif text-lg text-white font-medium group-hover:text-amber-300 transition-colors mt-1">
                    {rel.title}
                  </h4>
                  <p className="text-xs text-slate-400 mt-2 line-clamp-2">
                    {rel.excerpt}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </article>
  );
}
