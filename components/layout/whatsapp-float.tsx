"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  MessageCircle,
  X,
  Send,
  Sparkles,
  RotateCcw,
  Bot,
  User,
  ArrowRight,
  ShieldCheck,
  Zap,
  ExternalLink,
  ChevronDown,
} from "lucide-react";
import Link from "next/link";

interface ChatMessage {
  id: string;
  role: "assistant" | "user";
  content: string;
  timestamp: string;
}

const INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: "welcome-1",
    role: "assistant",
    content:
      "Welcome to **Pat Luxury Suites & Residences**! ✨\n\nI am your AI VIP Concierge, trained with comprehensive details about our luxury penthouses, 24/7 sovereign power, private chefs, and bespoke amenities in Uyo.\n\nHow may I assist your upcoming stay today?",
    timestamp: "Just now",
  },
];

const SUGGESTION_CHIPS = [
  "What suites and penthouses are available?",
  "How much is the Grand Presidential Penthouse?",
  "Tell me about your 24/7 power & security guarantee",
  "Can I request a private in-suite chef?",
  "How do I reserve a suite?",
];

export function WhatsAppFloat() {
  const [isOpen, setIsOpen] = useState(false);
  const [inputMessage, setInputMessage] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_MESSAGES);
  const [isLoading, setIsLoading] = useState(false);
  const [hasUnread, setHasUnread] = useState(true);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      setHasUnread(false);
      setTimeout(() => {
        inputRef.current?.focus();
        scrollToBottom();
      }, 150);
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isLoading]);

  const handleSendMessage = async (userText: string) => {
    if (!userText.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      role: "user",
      content: userText.trim(),
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInputMessage("");
    setIsLoading(true);

    try {
      // Send conversation history to our Groq-backed API endpoint
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: newMessages.map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });

      if (!response.ok) {
        throw new Error("Chat request failed");
      }

      const data = await response.json();
      const assistantMsg: ChatMessage = {
        id: `assistant-${Date.now()}`,
        role: "assistant",
        content:
          data.reply ||
          "I am delighted to help with any details regarding Pat Luxury Suites & Residences. You may also connect with our live human front desk anytime via WhatsApp at +234 703 096 8954.",
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };

      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err) {
      console.error("AI Concierge error:", err);
      const fallbackMsg: ChatMessage = {
        id: `assistant-${Date.now()}`,
        role: "assistant",
        content:
          "I apologize for the brief pause. Our live VIP concierge is always available 24/7 on WhatsApp (+234 703 096 8954) or you can explore our full collection of suites on our website.",
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSendMessage(inputMessage);
  };

  const handleResetChat = () => {
    setMessages(INITIAL_MESSAGES);
    setInputMessage("");
  };

  // Helper to render simple markdown formatting (bold, newlines, bullet lists)
  const renderFormattedContent = (content: string) => {
    const lines = content.split("\n");
    return lines.map((line, lineIdx) => {
      // Check if line is a bullet point
      const isBullet = line.trim().startsWith("- ") || line.trim().startsWith("* ");
      const formattedLine = line.replace(/^[-*]\s+/, "");

      // Simple parser for **bold** text
      const parts = formattedLine.split(/(\*\*.*?\*\*)/g);

      return (
        <p
          key={lineIdx}
          className={`${
            isBullet ? "flex items-start gap-1.5 ml-2 my-1" : "my-1"
          } ${line.trim() === "" ? "h-2" : ""}`}
        >
          {isBullet && (
            <span className="text-amber-400 font-bold leading-relaxed shrink-0">
              •
            </span>
          )}
          <span>
            {parts.map((part, pIdx) => {
              if (part.startsWith("**") && part.endsWith("**")) {
                return (
                  <strong
                    key={pIdx}
                    className="font-semibold text-amber-200 tracking-wide"
                  >
                    {part.slice(2, -2)}
                  </strong>
                );
              }
              return part;
            })}
          </span>
        </p>
      );
    });
  };

  return (
    <div className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-50 flex flex-col items-end">
      {/* Floating Chat Modal */}
      {isOpen && (
        <div className="mb-3 w-[92vw] sm:w-[420px] max-w-lg h-[580px] max-h-[82vh] rounded-3xl bg-[#0e121d] border border-amber-500/30 shadow-2xl shadow-black/90 flex flex-col overflow-hidden backdrop-blur-2xl animate-in fade-in slide-in-from-bottom-5 duration-300">
          {/* Header */}
          <div className="bg-gradient-to-r from-[#0b0d13] via-[#161c2d] to-[#0b0d13] p-4 border-b border-amber-500/20 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-amber-400 via-amber-500 to-amber-600 flex items-center justify-center text-black shadow-lg shadow-amber-500/20">
                  <Sparkles className="w-5 h-5" />
                </div>
                <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-400 border-2 border-[#0e121d]" />
              </div>
              <div>
                <h4 className="text-white font-medium text-sm flex items-center gap-1.5 font-serif">
                  <span>Pat Luxury AI Concierge</span>
                </h4>
                <p className="text-[11px] text-amber-300/90 font-medium flex items-center gap-1">
                  <span>Trained on Pat Luxury</span>
                  <span>•</span>
                  <span className="text-emerald-400">24/7 Live</span>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              {/* Reset Chat Button */}
              <button
                type="button"
                onClick={handleResetChat}
                title="Reset conversation"
                className="text-slate-400 hover:text-amber-300 p-2 rounded-lg hover:bg-white/5 transition-colors"
                aria-label="Reset chat"
              >
                <RotateCcw className="w-4 h-4" />
              </button>

              {/* Close Button */}
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="text-slate-400 hover:text-white p-2 rounded-lg hover:bg-white/5 transition-colors"
                aria-label="Close concierge chat"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Quick WhatsApp Bar in Chat */}
          <div className="bg-[#121726] px-4 py-2 border-b border-white/5 flex items-center justify-between text-xs shrink-0">
            <span className="text-slate-400 text-[11px]">
              Need direct human support?
            </span>
            <a
              href="https://wa.me/2347030968954?text=Hello%20Pat%20Luxury%20Concierge!%20I'd%20like%20to%20make%20an%20enquiry."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/40 text-emerald-400 font-semibold text-[11px] transition-colors"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>WhatsApp Us</span>
              <ExternalLink className="w-2.5 h-2.5 ml-0.5 opacity-70" />
            </a>
          </div>

          {/* Chat Messages Body */}
          <div className="flex-1 p-4 space-y-3.5 bg-[#090b11]/90 overflow-y-auto custom-scrollbar text-xs">
            {messages.map((msg) => {
              const isAssistant = msg.role === "assistant";
              return (
                <div
                  key={msg.id}
                  className={`flex items-start gap-2.5 ${
                    isAssistant ? "justify-start" : "justify-end"
                  }`}
                >
                  {isAssistant && (
                    <div className="w-7 h-7 rounded-full bg-amber-500/20 text-amber-300 flex items-center justify-center text-xs font-bold shrink-0 border border-amber-500/30 mt-0.5">
                      <Sparkles className="w-3.5 h-3.5" />
                    </div>
                  )}

                  <div
                    className={`p-3.5 rounded-2xl max-w-[85%] sm:max-w-[82%] leading-relaxed space-y-1 shadow-md ${
                      isAssistant
                        ? "bg-[#14192b] border border-white/10 text-slate-200 rounded-tl-sm"
                        : "bg-gradient-to-r from-amber-500 to-amber-600 text-black font-medium rounded-tr-sm shadow-amber-500/20"
                    }`}
                  >
                    <div className={isAssistant ? "text-slate-300 font-light" : "text-black"}>
                      {renderFormattedContent(msg.content)}
                    </div>
                    <div
                      className={`text-[10px] text-right pt-1 ${
                        isAssistant ? "text-slate-500" : "text-black/60"
                      }`}
                    >
                      {msg.timestamp}
                    </div>
                  </div>

                  {!isAssistant && (
                    <div className="w-7 h-7 rounded-full bg-white/10 text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                      <User className="w-3.5 h-3.5" />
                    </div>
                  )}
                </div>
              );
            })}

            {/* Typing indicator */}
            {isLoading && (
              <div className="flex items-start gap-2.5">
                <div className="w-7 h-7 rounded-full bg-amber-500/20 text-amber-300 flex items-center justify-center text-xs font-bold shrink-0 border border-amber-500/30">
                  <Sparkles className="w-3.5 h-3.5 animate-spin" />
                </div>
                <div className="bg-[#14192b] border border-white/10 p-3.5 rounded-2xl rounded-tl-sm text-xs text-amber-300 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-amber-400 animate-bounce" />
                  <span
                    className="w-2 h-2 rounded-full bg-amber-400 animate-bounce"
                    style={{ animationDelay: "150ms" }}
                  />
                  <span
                    className="w-2 h-2 rounded-full bg-amber-400 animate-bounce"
                    style={{ animationDelay: "300ms" }}
                  />
                  <span className="text-[11px] text-slate-400 ml-1">
                    Pat Luxury AI is preparing your answer...
                  </span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Suggestion Chips (shown when fewer than 4 messages or user is at bottom) */}
          {messages.length <= 3 && !isLoading && (
            <div className="p-2.5 bg-[#0e121d] border-t border-white/5 flex gap-1.5 overflow-x-auto no-scrollbar shrink-0">
              {SUGGESTION_CHIPS.map((chip, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleSendMessage(chip)}
                  className="text-[11px] px-3 py-1.5 rounded-full bg-[#161c2d] hover:bg-amber-500/20 border border-white/10 hover:border-amber-400/40 text-slate-300 hover:text-amber-200 transition-all whitespace-nowrap shrink-0 text-left"
                >
                  {chip}
                </button>
              ))}
            </div>
          )}

          {/* Chat Input Bar */}
          <form
            onSubmit={handleFormSubmit}
            className="p-3 bg-[#121622] border-t border-white/10 shrink-0"
          >
            <div className="flex items-center gap-2">
              <input
                ref={inputRef}
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Ask about suites, rates, 24/7 power, chefs..."
                disabled={isLoading}
                className="flex-1 bg-black/50 border border-white/15 focus:border-amber-400 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none transition-colors disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={!inputMessage.trim() || isLoading}
                className="p-2.5 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 disabled:opacity-40 disabled:hover:from-amber-400 disabled:hover:to-amber-500 text-black rounded-xl shadow-md shadow-amber-500/20 transition-transform active:scale-95 shrink-0"
                aria-label="Send message"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>

            <div className="flex items-center justify-between pt-2 px-1 text-[10px] text-slate-500">
              <span>Powered by Pat Luxury Intelligence</span>
              <Link
                href="/book"
                className="text-amber-400 hover:text-amber-300 font-medium transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Book a Suite →
              </Link>
            </div>
          </form>
        </div>
      )}

      {/* Floating Buttons Group */}
      <div className="flex items-center gap-2.5">
        {/* Direct WhatsApp Quick Launch Pill */}
        <a
          href="https://wa.me/2347030968954?text=Hello%20Pat%20Luxury%20Concierge!%20I'd%20like%20to%20make%20an%20enquiry."
          target="_blank"
          rel="noopener noreferrer"
          className="hidden sm:flex items-center gap-2 px-3.5 py-3 rounded-full bg-emerald-600/90 hover:bg-emerald-500 text-white shadow-xl shadow-emerald-600/30 hover:scale-105 active:scale-95 transition-all duration-300 border border-emerald-400/40 text-xs font-semibold uppercase tracking-wider backdrop-blur-md"
          title="Direct WhatsApp Chat"
          aria-label="Direct WhatsApp Chat"
        >
          <MessageCircle className="w-4 h-4" />
          <span>WhatsApp</span>
        </a>

        {/* Main AI Concierge Floating Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="group relative flex items-center gap-2.5 pl-4 pr-5 py-3.5 rounded-full bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:from-amber-300 hover:to-amber-500 text-black shadow-2xl shadow-amber-500/40 hover:shadow-amber-500/60 hover:scale-105 active:scale-95 transition-all duration-300 border border-amber-300/40 font-medium"
          aria-label="Pat Luxury AI Concierge Assistant"
        >
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-black opacity-75" />
            <span className="relative inline-flex rounded-full h-3 w-3 bg-black" />
          </span>
          <Sparkles className="w-5 h-5 text-black" />
          <span className="text-xs font-bold uppercase tracking-wider hidden sm:inline">
            Pat Luxury AI
          </span>
          {hasUnread && (
            <span className="absolute -top-1 -right-1 px-1.5 py-0.5 rounded-full bg-red-600 text-white text-[9px] font-bold shadow-md">
              AI
            </span>
          )}
        </button>
      </div>
    </div>
  );
}
