
import { ReactNode } from "react";
import Button from "@/components/ui/Button";
interface ServiceCardProps {
  title: string;
  description: string;
  price: string;
  icon: ReactNode;
}
export default function ServiceCard({
  title,
  description,
  price,
  icon,
}: ServiceCardProps) {
  return (
    <div
      className={[
        "group relative flex flex-col gap-4 rounded-xl p-6",
        "bg-zinc-900 border border-white/10",
        "transition-all duration-300 ease-out",
        "hover:scale-[1.02] hover:border-violet-500/30",
        "hover:shadow-[0_0_32px_-4px_rgba(139,92,246,0.25)]",
        "cursor-default select-none",
      ].join(" ")}
    >
      {/* Subtle top-edge glow on hover */}
      <div
        className={[
          "pointer-events-none absolute inset-x-0 top-0 h-px rounded-t-xl",
          "bg-gradient-to-r from-transparent via-violet-500/40 to-transparent",
          "opacity-0 transition-opacity duration-300 group-hover:opacity-100",
        ].join(" ")}
      />

      {/* Icon */}
      <div
        className={[
          "flex h-11 w-11 items-center justify-center rounded-lg",
          "bg-violet-600/10 border border-violet-500/20 text-violet-400",
          "transition-colors duration-300 group-hover:bg-violet-600/15",
        ].join(" ")}
      >
        {icon}
      </div>

      {/* Content */}
      <div className="flex flex-col gap-2">
        <h3 className="font-semibold text-lg text-zinc-100 leading-snug tracking-tight">
          {title}
        </h3>
        <p className="text-zinc-400 text-sm leading-relaxed">{description}</p>
      </div>

      {/* Price */}
      <div className="flex items-baseline gap-1">
        <span className="text-violet-400 font-bold text-xl">{price}</span>
        <span className="text-zinc-500 text-xs font-medium">/ session</span>
      </div>

      {/* Divider */}
      <div className="h-px bg-white/5" />

      {/* CTA */}
      <Button variant="primary" className="w-full">
        Book Now
      </Button>
    </div>
  );
}