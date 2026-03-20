import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const features = [
  {
    title: "VO2 Max Testing",
    description:
      "Precisely measure your aerobic capacity to optimise training zones and track cardiovascular fitness improvements over time.",
  },
  {
    title: "Body Composition Analysis",
    description:
      "Advanced DEXA-level scanning technology to measure fat mass, lean muscle, and bone density with clinical accuracy.",
  },
  {
    title: "Movement Screening",
    description:
      "Comprehensive biomechanical assessment to identify imbalances, reduce injury risk, and improve movement efficiency.",
  },
  {
    title: "Metabolic Testing",
    description:
      "Understand your resting metabolic rate and fuel utilisation to build a nutrition plan grounded in science.",
  },
  {
    title: "Lactate Threshold Testing",
    description:
      "Pinpoint the intensity at which performance drops off, enabling smarter pacing and endurance programming.",
  },
  {
    title: "Recovery Monitoring",
    description:
      "Track heart rate variability, sleep quality, and recovery status to ensure optimal training load management.",
  },
];

export default function PerformanceLabPage() {
  return (
    <>
      <Navbar />
      <main className="bg-black min-h-screen pt-24">
      {/* Hero */}
      <section className="relative max-w-[1440px] mx-auto px-6 py-16">
        <p className="text-xs font-medium tracking-widest text-white/60 mb-4">
          PERFORMANCE LAB
        </p>
        <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white max-w-3xl leading-tight">
          Train smarter with science-backed performance insights.
        </h1>
        <p className="text-white/70 text-lg mt-6 max-w-2xl">
          Our Performance Lab uses cutting-edge diagnostics to remove the
          guesswork from your training. Understand your body at the deepest
          level and unlock your true potential.
        </p>
      </section>

      {/* Hero Image */}
      <section className="max-w-[1440px] mx-auto px-6 pb-16">
        <div className="relative aspect-[21/9] rounded-lg overflow-hidden">
          <Image
            src="/luxury.png"
            alt="Performance Lab"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        </div>
      </section>

      {/* Features Grid */}
      <section className="max-w-[1440px] mx-auto px-6 pb-20">
        <h2 className="font-serif text-3xl md:text-4xl text-white mb-12">
          What we offer
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="bg-white/5 border border-white/10 rounded-lg p-8 hover:border-white/20 transition-colors"
            >
              <h3 className="text-white text-lg font-medium mb-3">
                {feature.title}
              </h3>
              <p className="text-white/60 text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-[1440px] mx-auto px-6 pb-24">
        <div className="bg-white/5 border border-white/10 rounded-lg p-12 text-center">
          <h2 className="font-serif text-3xl md:text-4xl text-white mb-4">
            Book your assessment
          </h2>
          <p className="text-white/70 mb-8 max-w-xl mx-auto">
            Start with a comprehensive performance assessment and receive a
            personalised training blueprint.
          </p>
          <Link
            href="/personal-training/find-a-trainer"
            className="inline-block border border-white text-white text-xs font-medium tracking-widest px-8 py-3 rounded-full hover:bg-white hover:text-black transition-colors"
          >
            GET STARTED
          </Link>
        </div>
      </section>
    </main>
      <Footer />
    </>
  );
}
