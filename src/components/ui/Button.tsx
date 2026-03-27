import type { ReactNode, ButtonHTMLAttributes } from "react";

type Variant = "primary" | "outline";
type Theme = "dark" | "light";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: Variant;
  theme?: Theme;
  className?: string;
}

const styles: Record<Theme, Record<Variant, string>> = {
  dark: {
    primary: [
      "bg-violet-600 text-white",
      "hover:bg-violet-500",
      "shadow-[0_0_20px_rgba(139,92,246,0.35)]",
      "hover:shadow-[0_0_35px_rgba(139,92,246,0.75)]",
    ].join(" "),
    outline: [
      "border border-white/10 text-zinc-300 bg-transparent",
      "hover:bg-white/5 hover:border-white/25",
    ].join(" "),
  },
  light: {
    primary: [
      "bg-gradient-to-r from-blue-500 to-cyan-400 text-white",
      "shadow-[0_2px_10px_rgba(56,189,248,0.3)]",
      "hover:-translate-y-px hover:shadow-[0_4px_16px_rgba(56,189,248,0.45)]",
    ].join(" "),
    outline: [
      "border border-slate-200 text-slate-600 bg-transparent",
      "hover:-translate-y-px hover:shadow-sm hover:border-slate-300",
    ].join(" "),
  },
};

const base =
  "inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";

export default function Button({
  children,
  variant = "primary",
  theme = "dark",
  className = "",
  ...props
}: ButtonProps) {
  return (
    <button
      className={[base, styles[theme][variant], className]
        .filter(Boolean)
        .join(" ")}
      {...props}
    >
      {children}
    </button>
  );
}