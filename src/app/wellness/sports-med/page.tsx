import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const treatments = [
  {
    name: "Physiotherapy",
    description:
      "Expert assessment and treatment for injury rehabilitation, chronic pain and movement dysfunction. Our physiotherapists work with athletes at every level.",
    duration: "60 min",
    price: "£85",
  },
  {
    name: "Sports Massage",
    description:
      "Deep tissue and sports-specific massage to release tension, improve mobility and accelerate recovery between training sessions.",
    duration: "60 min",
    price: "£75",
  },
  {
    name: "Osteopathy",
    description:
      "Whole-body assessment and manual treatment for musculoskeletal issues, joint pain and postural imbalances.",
    duration: "60 min",
    price: "£90",
  },
  {
    name: "Biomechanical Assessment",
    description:
      "Comprehensive gait and movement analysis using video technology to identify imbalances and reduce injury risk.",
    duration: "90 min",
    price: "£120",
  },
  {
    name: "Injury Screening",
    description:
      "Pre-season or pre-programme screening to assess injury risk and create a tailored prevention strategy.",
    duration: "45 min",
    price: "£65",
  },
  {
    name: "Rehabilitation Programme",
    description:
      "Structured return-to-training plans combining physiotherapy, strength work and progressive loading.",
    duration: "Ongoing",
    price: "From £200",
  },
];

export default function SportsMed() {
  return (
    <main className="bg-black min-h-screen">
      <Navbar />

      {/* Hero */}
      <section className="relative h-[60vh] flex items-end">
        <Image
          src="/personal_training.png"
          alt="Sports Med"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
        <div className="relative z-10 max-w-[1440px] mx-auto w-full px-6 pb-16">
          <p className="text-xs font-medium tracking-widest text-white/70 mb-4">
            WELLNESS
          </p>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white max-w-3xl leading-tight">
            Sports Med
          </h1>
          <p className="text-white/70 text-lg mt-4 max-w-xl">
            Expert sports medicine to keep you performing at your best — from injury prevention to full rehabilitation.
          </p>
        </div>
      </section>

      {/* Treatments */}
      <section className="py-20 md:py-28 px-6">
        <div className="max-w-[1440px] mx-auto">
          <p className="text-xs font-medium tracking-widest text-white/70 mb-4">
            TREATMENTS
          </p>
          <h2 className="font-serif text-3xl md:text-4xl text-white mb-16">
            Prevention. Treatment. Recovery.
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {treatments.map((treatment) => (
              <div
                key={treatment.name}
                className="border border-white/10 p-8 hover:border-white/30 transition-colors"
              >
                <h3 className="text-white text-xl font-medium mb-3">
                  {treatment.name}
                </h3>
                <p className="text-white/50 text-sm leading-relaxed mb-6">
                  {treatment.description}
                </p>
                <div className="flex items-center gap-4 text-sm">
                  <span className="text-white/70">{treatment.duration}</span>
                  <span className="text-white/30">|</span>
                  <span className="text-white font-medium">{treatment.price}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 border-t border-white/10">
        <div className="max-w-[1440px] mx-auto text-center">
          <h2 className="font-serif text-3xl md:text-4xl text-white mb-6">
            Book a consultation.
          </h2>
          <p className="text-white/60 max-w-lg mx-auto mb-8">
            Speak with our sports medicine team to find the right treatment for you.
          </p>
        </div>
      </section>

      <Footer />
    </main>
  );
}
