import { Sparkles, Wrench, Scissors, Brush } from "lucide-react";
import ServiceSection from "@/components/ui/ServiceCard";

const services = [
  {
    title: "AI-Powered Automation",
    description:
      "Streamline repetitive workflows with intelligent automation that learns and adapts to your business processes over time.",
    price: "$49/mo",
    icon: <Sparkles className="w-5 h-5" />,
  },
  {
    title: "System Integration",
    description:
      "Connect your existing tools and platforms seamlessly. We handle the complexity so your stack works as one unified system.",
    price: "$79/mo",
    icon: <Wrench className="w-5 h-5" />,
  },
  {
    title: "Content Trimming",
    description:
      "Precision editing and content optimization that cuts the noise and keeps only what drives engagement and conversions.",
    price: "$39/mo",
    icon: <Scissors className="w-5 h-5" />,
  },
  {
    title: "Brand Styling",
    description:
      "Craft a cohesive visual identity with custom design tokens, typography, and a component system built for scale.",
    price: "$99/mo",
    icon: <Brush className="w-5 h-5" />,
  },
  {
    title: "Smart Insights",
    description:
      "Real-time analytics and reporting that surface what matters. Make faster, more confident decisions with clean data.",
    price: "$59/mo",
    icon: <Sparkles className="w-5 h-5" />,
  },
  {
    title: "Custom Tooling",
    description:
      "Purpose-built internal tools tailored to your team's exact workflow. No bloat, no compromise — just what you need.",
    price: "$129/mo",
    icon: <Wrench className="w-5 h-5" />,
  },
];

export default function ServicesSection() {
  return (
    <section id="services" className="bg-zinc-950 py-20">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-14">
          <h2 className="text-3xl font-bold text-white tracking-tight">
            Everything your team needs
          </h2>
          <p className="text-zinc-400 mt-3 text-base max-w-xl mx-auto leading-relaxed">
            A focused set of services designed to help modern teams move faster
            without sacrificing quality or control.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <ServiceSection key={service.title} {...service} />
          ))}
        </div>
      </div>
    </section>
  );
}