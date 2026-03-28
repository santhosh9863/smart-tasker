"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Menu, X, Zap } from "lucide-react";
import Button from "@/components/ui/Button";
import { UserButton, useUser } from "@clerk/nextjs";
const THEME: "dark" | "light" = "dark";

const themes = {
  dark: {
    nav: "bg-zinc-950/90 border-b border-white/[0.06] backdrop-blur-xl",
    logo: "text-zinc-50 tracking-tight font-semibold",
    logoAccent: "text-violet-400",
    link: "text-zinc-400 hover:text-zinc-50 transition-colors duration-200 text-sm font-medium",
    divider: "bg-white/10",
    hamburger: "text-zinc-400 hover:text-zinc-50 transition-colors duration-200",
    mobileMenu: "bg-zinc-950/95 border-t border-white/[0.06] backdrop-blur-xl",
    mobileLink:
      "text-zinc-400 hover:text-zinc-50 transition-colors duration-200 text-sm font-medium py-3 border-b border-white/[0.05] last:border-0",
    mobileDivider: "my-3",
  },
  light: {
    nav: "bg-slate-50/90 border-b border-slate-200/70 backdrop-blur-xl",
    logo: "text-slate-900 tracking-tight font-semibold",
    logoAccent:
      "bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent",
    link: "text-slate-500 hover:text-slate-900 transition-all duration-200 text-sm font-medium hover:-translate-y-px",
    divider: "bg-slate-200",
    hamburger:
      "text-slate-500 hover:text-slate-900 transition-colors duration-200",
    mobileMenu:
      "bg-slate-50/95 border-t border-slate-200/70 backdrop-blur-xl",
    mobileLink:
      "text-slate-500 hover:text-slate-900 transition-colors duration-200 text-sm font-medium py-3 border-b border-slate-100 last:border-0",
    mobileDivider: "my-3",
  },
} as const;

const NAV_LINKS = [
  { label: "Services", href: "#services", scrollTo: "services" },
  { label: "Pricing", href: "#pricing" },
  { label: "About", href: "#about" },
];

function smoothScroll(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

export default function Navbar() {
  const { isSignedIn } = useUser();
  const [mobileOpen, setMobileOpen] = useState(false);
  const router = useRouter(); // ✅ FIXED HERE
  const t = themes[THEME];

  function handleNavClick(
    e: React.MouseEvent<HTMLAnchorElement>,
    scrollTo?: string
  ) {
    if (!scrollTo) return;
    e.preventDefault();
    smoothScroll(scrollTo);
    setMobileOpen(false);
  }

  return (
    <header className={`fixed top-0 inset-x-0 z-50 ${t.nav}`}>
      <nav className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <a href="/" className="flex items-center gap-2 shrink-0">
            <div className="flex items-center justify-center w-7 h-7 rounded-md bg-violet-600">
              <Zap size={14} className="text-white fill-white" />
            </div>
            <span className={`text-[15px] ${t.logo}`}>
              Smart<span className={t.logoAccent}>Tasker</span>
            </span>
          </a>

          {/* Desktop Links */}
          <ul className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map(({ label, href, scrollTo }) => (
              <li key={label}>
                <a
                  href={href}
                  className={t.link}
                  onClick={(e) => handleNavClick(e, scrollTo)}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>

          {/* Desktop Right Actions */}
          <div className="hidden md:flex items-center gap-3">
            <div className={`h-4 w-px ${t.divider}`} />

           {isSignedIn ? (
  <UserButton />
) : (
  <Button
    variant="outline"
    onClick={() => router.push("/login")}
  >
    Log in
  </Button>
)}

            <Button
              variant="primary"
              onClick={() => smoothScroll("services")}
            >
              Get Started
            </Button>
          </div>

          {/* Mobile Hamburger */}
          <button
            className={`md:hidden p-1.5 rounded-md ${t.hamburger}`}
            onClick={() => setMobileOpen((prev) => !prev)}
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className={`md:hidden px-4 pb-5 ${t.mobileMenu}`}>
          <ul className="flex flex-col pt-1">
            {NAV_LINKS.map(({ label, href, scrollTo }) => (
              <li key={label}>
                <a
                  href={href}
                  className={`block ${t.mobileLink}`}
                  onClick={(e) => handleNavClick(e, scrollTo)}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>

          <div className={`flex flex-col gap-2.5 ${t.mobileDivider}`}>
            <Button
              variant="outline"
              onClick={() => {
                router.push("/login");
                setMobileOpen(false);
              }}
            >
              Log in
            </Button>

            <Button
              variant="primary"
              onClick={() => {
                smoothScroll("services");
                setMobileOpen(false);
              }}
            >
              Get Started
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}