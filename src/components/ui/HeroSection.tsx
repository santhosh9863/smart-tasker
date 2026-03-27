"use client";

import Button from "@/components/ui/Button";
import { ArrowRight, Sparkles } from "lucide-react";

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

export default function HeroSection() {
  return (
    <section className="relative w-full min-h-[calc(100vh-64px)] bg-zinc-950 flex items-center justify-center overflow-hidden">

      {/* Radial glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
      >
        <div className="h-[520px] w-[520px] rounded-full bg-violet-600/10 blur-[120px]" />
      </div>

      {/* Subtle grid overlay */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          maskImage:
            "radial-gradient(ellipse 80% 60% at 50% 40%, black 30%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 80% 60% at 50% 40%, black 30%, transparent 100%)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 mx-auto w-full max-w-4xl px-6 py-28 text-center">

        {/* Eyebrow badge */}
        <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-violet-500/25 bg-violet-500/10 px-4 py-1.5 text-xs font-medium tracking-widest text-violet-300 uppercase">
          <Sparkles className="h-3 w-3" />
          Now in public beta
        </div>

        {/* Heading */}
        <h1 className="mx-auto max-w-3xl text-5xl font-bold leading-[1.1] tracking-tight text-white sm:text-6xl">
          Book services{" "}
          <span className="relative inline-block">
            <span className="relative z-10 bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
              instantly
            </span>
            <span
              aria-hidden
              className="absolute -bottom-1 left-0 h-px w-full bg-gradient-to-r from-violet-500/60 to-fuchsia-500/60"
            />
          </span>
          , without hassle
        </h1>

        {/* Subtext */}
        <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-zinc-400">
          One platform to discover, compare, and confirm bookings — all in
          seconds. No back-and-forth, no confusion.
        </p>

        {/* CTA buttons */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          {/* Primary action — scroll to services grid */}
          <Button
            variant="primary"
            className="group h-12 px-7 rounded-full"
            onClick={() => scrollTo("services")}
          >
            Get Started
            <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
          </Button>

          {/* Secondary action — outline style, scroll to services */}
          <Button
            variant="outline"
            className="h-12 px-7 rounded-full"
            onClick={() => scrollTo("services")}
          >
            Learn More
          </Button>
        </div>

        {/* Social proof */}
        <p className="mt-10 text-xs tracking-wide text-zinc-600">
          Trusted by{" "}
          <span className="text-zinc-400 font-medium">2,400+</span> businesses
          worldwide · No credit card required
        </p>
      </div>

      {/* Bottom fade */}
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 left-0 h-32 w-full bg-gradient-to-t from-zinc-950 to-transparent"
      />
    </section>
  );
}