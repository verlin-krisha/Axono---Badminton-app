import { Aperture, Download, Layers, MonitorPlay, QrCode, Users } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";

const benefits = [
  { icon: Aperture, title: "Every Moment Captured", text: "Never miss the action from your match." },
  { icon: QrCode, title: "Simple QR Access", text: "Scan and access your match without complicated steps." },
  { icon: MonitorPlay, title: "High-Quality Recordings", text: "Relive your sporting moments with clear video quality." },
  { icon: Download, title: "Easy Downloads", text: "Save your matches and share them with friends." },
  { icon: Layers, title: "Multiple Sports", text: "One recording experience across different sports." },
  { icon: Users, title: "Made for Every Player", text: "From casual games to competitive matches." },
];

export function WhyAxono() {
  return (
    <section className="section">
      <div className="container-x">
        <SectionHeader
          eyebrow="Why Axono"
          title={["Because every game", <span key="w" className="text-brand">is worth remembering.</span>]}
        />

        <ul className="mt-12 grid border-l border-t border-line sm:grid-cols-2 lg:grid-cols-3 md:mt-16">
          {benefits.map((b, i) => {
            const Icon = b.icon;
            return (
              <Reveal
                as="li"
                key={b.title}
                delay={(i % 3) * 0.08}
                className="group border-b border-r border-line p-7 transition-colors duration-500 hover:bg-brand-tint md:p-8"
              >
                <span className="flex size-11 items-center justify-center rounded-xl bg-brand text-white transition-colors duration-500 group-hover:bg-flare">
                  <Icon className="size-5" strokeWidth={1.8} />
                </span>
                <h3 className="mt-6 text-lg font-bold text-ink">{b.title}</h3>
                <p className="mt-2 leading-relaxed text-muted">{b.text}</p>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
